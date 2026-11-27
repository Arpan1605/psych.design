import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { caseStudies } from '../data/caseStudies'
import { narrator } from '../data/narrator'
import { Brain } from '../components/Brain'
import { psychColor } from '../components/PsychMeter'
import '../styles/home.css'

/** How Arpan works with AI, from arpansheth.digital/ai-workflow.html */
const aiSteps: { title: string; tools: string[]; text: ReactNode; icon: 'search' | 'spark' | 'shield' | 'code' }[] = [
  {
    title: 'Making sense of the chaos',
    tools: ['Claude', 'ChatGPT', 'Stakeholder Research'],
    text: 'Every project starts with the same goal: getting to clarity before I open Figma.',
    icon: 'search',
  },
  {
    title: 'Exploring before committing',
    tools: ['Figma Make'],
    text: 'The biggest advantage isn’t speed — it’s flexibility. More directions explored before committing to one.',
    icon: 'spark',
  },
  {
    title: 'Refining the decision, not just the screen',
    tools: ['Claude', 'Figma AI'],
    text: 'This is where most of the real thinking happens: pressure-testing assumptions and arguing the other side before I commit.',
    icon: 'shield',
  },
  {
    title: 'Shipping faster, without skipping steps',
    tools: ['Codex', 'Claude Code', 'GitHub Copilot'],
    text: 'An AI-orchestrated pipeline: a three-portal product shipped in under five months, not a traditional year.',
    icon: 'code',
  },
]

export function Home() {
  const reduce = useReducedMotion()
  const first = caseStudies[0]

  return (
    <div className="home">
      {/* ---------- Hero ---------- */}
      <section className="h-hero">
        <div className="h-hero-text">
          <span className="pill"><span className="pill-dot" />Product designer, healthcare UX</span>
          <h1>Every screen changes how someone feels.</h1>
          <p className="h-tagline">…comic-style UX case studies about the psychology behind every tap.</p>
          <p className="h-lede">
            I’m Arpan, a product designer working on enterprise healthcare software. Each case study walks
            through a real flow one screen at a time, tracks the user’s psych level, and shows what I’d fix.
          </p>
          <div className="h-actions">
            {first && <Link className="h-btn" to={`/case-studies/${first.slug}`}>Start the first case study</Link>}
            <a className="h-btn h-btn--ghost" href="#/ai-workflow" target="_blank" rel="noopener">How I design with AI</a>
          </div>
        </div>

        <div className="h-stage" aria-label="Arpan standing next to a brain mascot in a spotlight">
          <div className="h-spotlight" aria-hidden />
          <motion.div
            className="h-actor h-actor--me"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120, damping: 16 }}
          >
            <motion.div
              className="h-bubble"
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 300, damping: 18 }}
            >
              I design for how people feel—
            </motion.div>
            <img src={narrator.extras.standing} alt="Arpan’s avatar" className="h-me" />
          </motion.div>
          <motion.div
            className="h-actor h-actor--brain"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, type: 'spring', stiffness: 120, damping: 16 }}
          >
            <motion.div
              className="h-bubble h-bubble--right"
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, type: 'spring', stiffness: 300, damping: 18 }}
            >
              …and I bring the AI superpowers!
            </motion.div>
            <Brain size={230} />
          </motion.div>
        </div>
      </section>

      {/* ---------- Case studies ---------- */}
      <section className="h-section" aria-labelledby="studies-h">
        <h2 id="studies-h">Case studies</h2>
        <p className="h-section-lede">Use your arrow keys inside each one. Every story ends with the full psych level journey.</p>
        <ul className="h-studies">
          {caseStudies.map((cs) => (
            <li key={cs.slug}>
              <Link to={`/case-studies/${cs.slug}`} className="h-study">
                <div className="h-study-text">
                  <span className="pill pill--small"><span className="pill-dot" />{cs.category}</span>
                  <h3>{cs.title}</h3>
                  <p className="h-study-tagline">{cs.tagline}</p>
                  <p className="h-study-meta">
                    <span>Duration: {cs.readingTime}</span>
                    <span>{cs.slides.length} screens</span>
                    <span>{cs.goals.length} goals</span>
                    {cs.sample && <span className="h-sample">Sample content</span>}
                  </p>
                </div>
                <MiniJourney start={cs.startPsych} levels={cs.slides.map((s) => s.psych)} />
              </Link>
            </li>
          ))}
          <li>
            <div className="h-study h-study--soon">
              <div className="h-study-text">
                <span className="pill pill--small pill--violet"><span className="pill-dot" />User psychology</span>
                <h3>The user psychology series</h3>
                <p className="h-study-tagline">…biases and habits that quietly shape every click.</p>
                <p className="h-study-meta"><span className="h-soon">Coming soon</span></p>
              </div>
              <img src={narrator.extras.shush} alt="Arpan with a finger on his lips: it’s a secret for now" className="h-soon-art sticker" />
            </div>
          </li>
        </ul>
      </section>

      {/* ---------- Designing with AI ---------- */}
      <section className="h-section" id="ai" aria-labelledby="ai-h">
        <div className="h-ai-head">
          <div>
            <h2 id="ai-h">How I design in the age of AI</h2>
            <p className="h-section-lede">
              Most projects don’t start with clarity. AI helps me move from uncertainty to a confident decision —
              not to make the decisions for me, but to help me think faster.
            </p>
          </div>
          <img src={narrator.extras.useThis} alt="Arpan holding a brain, saying use this" className="h-ai-sticker sticker" />
        </div>
        <ol className="h-ai">
          {aiSteps.map((s) => (
            <li key={s.title} className="h-ai-step">
              <span className="h-ai-icon"><StepIcon name={s.icon} /></span>
              <h3>{s.title}</h3>
              <ul className="h-ai-tools" aria-label="Tools">
                {s.tools.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="h-ai-more">
          <a className="h-btn" href="#/ai-workflow" target="_blank" rel="noopener">Read the full AI workflow</a>
        </p>
      </section>

      {/* ---------- Closing ---------- */}
      <section className="h-closing">
        <img src={narrator.extras.weNeedToTalk} alt="Arpan on a sofa: We need to talk. This is serious." className="h-closing-img sticker" />
        <div>
          <h2>Want to talk design, psychology or AI?</h2>
          <p>
            <a className="h-btn" href="https://linkedin.com/in/arpan-sheth-939171171" target="_blank" rel="noreferrer">Message me on LinkedIn</a>
          </p>
        </div>
      </section>
    </div>
  )
}

/** Small psych level journey for each case study row. */
function MiniJourney({ start, levels }: { start: number; levels: number[] }) {
  const all = [start, ...levels]
  const W = 240, H = 90, P = 10
  const x = (i: number) => P + (i * (W - P * 2)) / (all.length - 1)
  const y = (v: number) => P + ((100 - v) / 100) * (H - P * 2)
  const col = (d: number) => (d >= 0 ? '#2ecc71' : d > -15 ? '#f5b82e' : '#ef4f43')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="h-mini" aria-hidden>
      <line x1={0} x2={W} y1={y(start)} y2={y(start)} stroke="#e8e2da" strokeOpacity="0.3" strokeDasharray="4 5" />
      {all.slice(1).map((v, i) => (
        <line key={i} x1={x(i)} y1={y(all[i])} x2={x(i + 1)} y2={y(v)} stroke={col(v - all[i])} strokeWidth="3.5" strokeLinecap="round" />
      ))}
      {all.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="4.5" fill={i === 0 ? '#e8e2da' : psychColor(v)} stroke="#16120f" strokeWidth="1.5" />
      ))}
    </svg>
  )
}

function StepIcon({ name }: { name: 'search' | 'spark' | 'code' | 'shield' }) {
  const p = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  switch (name) {
    case 'search':
      return <svg {...p}><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></svg>
    case 'spark':
      return <svg {...p}><path d="M12 3c.8 4.6 2.4 6.2 7 7-4.6.8-6.2 2.4-7 7-.8-4.6-2.4-6.2-7-7 4.6-.8 6.2-2.4 7-7Z" /><path d="M19 15c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" /></svg>
    case 'code':
      return <svg {...p}><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></svg>
    case 'shield':
      return <svg {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></svg>
  }
}
