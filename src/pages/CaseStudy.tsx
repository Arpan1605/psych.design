import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getCaseStudy } from '../data/caseStudies'
import type { Beat } from '../data/types'
import { PsychMeter, psychColor } from '../components/PsychMeter'
import { GoalTracker } from '../components/GoalTracker'
import { JourneyChart, experienceGrade } from '../components/JourneyChart'
import { Avatar } from '../components/Avatar'
import { KeyHint } from '../components/KeyHint'
import { emotionWord } from '../components/Face'
import { narrator, poses } from '../data/narrator'
import { NotFound } from './NotFound'
import '../styles/player.css'

/** Background glow for each mood: warm red when it hurts, amber when neutral, green when it works. */
const moodGlow = (e: number) =>
  e <= -2
    ? ['#6b2530', '#5a3410']
    : e === -1
      ? ['#5b2c3c', '#4d3a12']
      : e === 0
        ? ['#4c2a3a', '#4a3a10']
        : e === 1
          ? ['#24424a', '#3e4214']
          : ['#1d4a3a', '#2f4a18']

/**
 * Full-screen comic player. Frame 0 is the cover, the last frame is the outro,
 * everything between is one panel per slide with beats revealed in order.
 */
export function CaseStudy() {
  const { slug = '' } = useParams()
  const cs = getCaseStudy(slug)

  const frames = useMemo(() => {
    if (!cs) return []
    const list: { slide: number; beat: number }[] = [{ slide: -1, beat: 0 }]
    cs.slides.forEach((s, si) => s.beats.forEach((_, bi) => list.push({ slide: si, beat: bi })))
    // journey summary: one frame per screen, then one for the grade
    for (let k = 0; k <= cs.slides.length; k++) list.push({ slide: cs.slides.length, beat: k })
    list.push({ slide: cs.slides.length + 1, beat: 0 })  // goodbye
    return list
  }, [cs])

  const [i, setI] = useState(0)
  const [copied, setCopied] = useState(false)
  const next = useCallback(() => setI((n) => Math.min(n + 1, frames.length - 1)), [frames.length])
  const prev = useCallback(() => setI((n) => Math.max(n - 1, 0)), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  if (!cs) return <NotFound />

  const { slide: si, beat: bi } = frames[i]
  const isCover = si === -1
  const isSummary = si === cs.slides.length
  const isEnd = si === cs.slides.length + 1
  const slide = si >= 0 && si < cs.slides.length ? cs.slides[si] : null

  // psych level and goals
  const prevPsych = slide ? (si > 0 ? cs.slides[si - 1].psych : cs.startPsych) : cs.startPsych
  const delta = slide ? slide.psych - prevPsych : 0
  const lastFrameOfGoal = cs.goals.map((_, g) =>
    frames.reduce((m, f, idx) => (f.slide >= 0 && f.slide < cs.slides.length && cs.slides[f.slide].goal === g ? idx : m), -1),
  )
  const goalsDone = lastFrameOfGoal.map((last) => last >= 0 && i >= last)
  const principles = cs.slides.flatMap((s, idx) =>
    s.beats.filter((b) => b.kind === 'principle').map((b) => ({ title: (b as { title: string }).title, slide: idx })),
  )
  const showGrade = isSummary && bi >= cs.slides.length
  const grade = experienceGrade(cs.slides.map((s) => s.psych))

  const shown = slide ? slide.beats.slice(0, bi + 1) : []
  const last = <K extends Beat['kind']>(...kinds: K[]) =>
    [...shown].reverse().find((b) => kinds.includes(b.kind as K)) as Extract<Beat, { kind: K }> | undefined
  const caption = last('narration')
  const bubble = last('thought', 'speech')
  const card = last('principle', 'fix')
  // a pose lasts until Arpan's next line (narration, thought or speech) that doesn't set one
  const pose = (() => {
    for (const b of [...shown].reverse()) {
      if (b.pose) return b.pose
      if (b.kind === 'narration' || b.kind === 'thought' || b.kind === 'speech') return undefined
    }
    return undefined
  })()
  const Screen = slide?.screen

  const mood = slide ? slide.emotion : isSummary || isEnd ? cs.slides[cs.slides.length - 1].emotion : 0
  const [g1, g2] = moodGlow(mood)

  const copyLink = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked: nothing to do */ }
  }

  return (
    <div className="comic">
      {/* glowing background that shifts with the mood */}
      <motion.div
        className="comic-bg"
        animate={{
          background: `radial-gradient(ellipse 55% 60% at 18% 20%, ${g1} 0%, rgba(22,18,15,0) 70%), radial-gradient(ellipse 50% 55% at 55% 55%, ${g2} 0%, rgba(22,18,15,0) 70%), #16120f`,
        }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        aria-hidden
      />
      <div className="comic-grain" aria-hidden />

      <div className="comic-progress" aria-hidden>
        <motion.div animate={{ width: `${(i / (frames.length - 1)) * 100}%` }} />
      </div>

      <main className="comic-stage" onClick={next}>
        <AnimatePresence mode="wait">
          {isCover && (
            <motion.section key="cover" className="cover" {...fade}>
              <div className="cover-text">
                <span className="pill"><span className="pill-dot" />{cs.category}</span>
                <h1>{cs.title}</h1>
                <p className="tagline">{cs.tagline}</p>
                <p className="duration"><ClockIcon />Duration: {cs.readingTime}</p>
                {cs.sample && <p className="sample-note">Sample content</p>}
              </div>
              <div className="cover-host spot">
                <img src={narrator.extras.hi} alt="Arpan waving hi" />
              </div>
              <div className="cover-hint">
                <KeyHint />
              </div>
            </motion.section>
          )}

          {slide && Screen && (
            <motion.section key={slide.id} className={`panel ${slide.frame === 'card' ? 'panel--card' : ''}`} {...fade}>
              <div className="panel-meter">
                <PsychMeter level={slide.psych} delta={delta} stepKey={slide.id} />
              </div>

              <AnimatePresence mode="wait">
                {caption && (
                  <motion.p key={caption.text} className="caption" {...pop}>
                    {caption.text}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="panel-cast spot">
                <AnimatePresence mode="wait">
                  {bubble && (
                    <motion.div key={bubble.text} className={`comic-bubble comic-bubble--${bubble.kind}`} {...pop}>
                      {bubble.text}
                    </motion.div>
                  )}
                </AnimatePresence>
                <Avatar emotion={slide.emotion} size={300} pose={pose} />
              </div>

              <div className="panel-goals">
                <GoalTracker goals={cs.goals} current={slide.goal} done={goalsDone} />
              </div>

              <div className="panel-phone">
                {slide.frame === 'card' ? (
                  <div className="screen-card"><Screen beat={bi} /></div>
                ) : (
                  <div className="phone">
                    <div className="phone-notch" aria-hidden />
                    <div className="phone-screen"><Screen beat={bi} /></div>
                  </div>
                )}
              </div>

              <div className="panel-card">
                <AnimatePresence mode="wait">
                  {card && (
                    <motion.aside
                      key={card.kind + ('title' in card ? card.title : card.text)}
                      className={`pin-card pin-card--${card.kind}`}
                      initial={{ opacity: 0, x: 40, rotate: 4 }}
                      animate={{ opacity: 1, x: 0, rotate: card.kind === 'principle' ? -2 : 1.5 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    >
                      <Pin />
                      <span className="pin-kind">{card.kind === 'principle' ? 'Psychology' : 'The fix'}</span>
                      <h3>{card.kind === 'principle' ? card.title : 'How we’d fix it'}</h3>
                      <p>{card.text}</p>
                    </motion.aside>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          )}

          {isSummary && (
            <motion.section key="summary" className="summary" {...fade}>
              <div className="summary-chart">
                <JourneyChart
                  start={cs.startPsych}
                  upto={Math.min(bi, cs.slides.length - 1)}
                  points={cs.slides.map((s) => {
                    const note = s.beats.find((b) => b.kind === 'principle') ?? s.beats.find((b) => b.kind === 'fix')
                    return {
                      label: s.label,
                      psych: s.psych,
                      emotion: s.emotion,
                      recap: s.recap,
                      screen: s.screen,
                      lastBeat: s.beats.length - 1,
                      note: note?.kind === 'principle'
                        ? { kind: 'principle' as const, title: note.title, text: note.text }
                        : note?.kind === 'fix'
                          ? { kind: 'fix' as const, title: 'How we’d fix it', text: note.text }
                          : undefined,
                    }
                  })}
                />
              </div>
              <div className="summary-side">
                <aside className="insights">
                  <span className="insights-kind">Key insights summary</span>
                  <h2>What this journey teaches</h2>
                  <ol>
                    {principles.map((pr) => (
                      <li key={pr.title}>
                        <AnimatePresence>
                          {pr.slide <= bi && (
                            <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                              {pr.title}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </li>
                    ))}
                  </ol>
                </aside>
                <AnimatePresence>
                  {showGrade && (
                    <motion.div
                      className="grade"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                    >
                      <img src={narrator.grades[grade]} alt="" className="grade-sticker sticker" />
                      <span>Overall experience score</span>
                      <strong style={{ color: psychColor(grade <= 'B' ? 60 : grade === 'C' ? 30 : 10) }}>{grade}</strong>
                      <p className="grade-next">One last thing, press → to finish</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          )}

          {isEnd && (
            <motion.section key="end" className="cover" {...fade}>
              <div className="cover-text">
                <span className="pill"><span className="pill-dot" />The end</span>
                <h1>That’s the whole journey.</h1>
                {cs.takeaway ? (
                  <p className="takeaway">{cs.takeaway}</p>
                ) : (
                  <p className="tagline">
                    …from {emotionWord(Math.min(...cs.slides.map((s) => s.emotion))).toLowerCase()} to{' '}
                    {emotionWord(cs.slides[cs.slides.length - 1].emotion).toLowerCase()} in {cs.slides.length} screens.
                  </p>
                )}
                <Link className="end-link" to="/" onClick={(e) => e.stopPropagation()}>See all case studies</Link>
              </div>
              <div className="cover-host spot">
                <img src={poses[cs.farewell ?? 'dropMic']} alt="Arpan waving goodbye" />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* edge chevrons */}
      <button className="chevron chevron--prev" onClick={prev} disabled={i === 0} aria-label="Previous">
        <ChevronIcon flip />
      </button>
      <button className="chevron chevron--next" onClick={next} disabled={isEnd} aria-label="Next">
        <ChevronIcon />
      </button>

      {/* round icon buttons */}
      <nav className="rail" aria-label="Story tools">
        <Link to="/" className="rail-btn" title="All case studies" aria-label="All case studies"><GridIcon /></Link>
        <button className="rail-btn" onClick={(e) => { e.stopPropagation(); setI(0) }} title="Start over" aria-label="Start over"><RestartIcon /></button>
        <button className="rail-btn" onClick={copyLink} title="Copy link" aria-label="Copy link"><LinkIcon /></button>
        <AnimatePresence>
          {copied && (
            <motion.span className="rail-toast" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              Link copied
            </motion.span>
          )}
        </AnimatePresence>
      </nav>

    </div>
  )
}

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 },
}

const pop = {
  initial: { opacity: 0, scale: 0.85, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { type: 'spring' as const, stiffness: 340, damping: 22 },
}

const ic = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

function ChevronIcon({ flip }: { flip?: boolean }) {
  return (
    <svg width="34" height="46" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M7 4 L18 16 L7 28" />
    </svg>
  )
}
function ClockIcon() {
  return <svg {...ic} width={18} height={18}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
}
function GridIcon() {
  return <svg {...ic}><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>
}
function RestartIcon() {
  return <svg {...ic}><path d="M4 12a8 8 0 1 0 2.4-5.7" /><path d="M4 4v4h4" /></svg>
}
function LinkIcon() {
  return <svg {...ic}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
}
function Pin() {
  return (
    <svg className="pin" width="28" height="34" viewBox="0 0 28 34" aria-hidden>
      <circle cx="14" cy="11" r="9" fill="#e0483e" stroke="#1c2340" strokeWidth="2" />
      <circle cx="11" cy="8" r="3" fill="#fff" opacity="0.6" />
      <path d="M14 20 L14 33" stroke="#1c2340" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
