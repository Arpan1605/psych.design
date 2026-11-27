import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import robotThumbsUp from '../assets/bitmoji/library/robot-thumbs-up.webp'
import confused from '../assets/bitmoji/library/confused-questions.webp'
import scribbleBrain from '../assets/bitmoji/library/scribble-brain.webp'
import painting from '../assets/bitmoji/library/painting.webp'
import thinkSmart from '../assets/bitmoji/library/think-smart.webp'
import paperPlane from '../assets/bitmoji/library/paper-plane.webp'
import onFireCalm from '../assets/bitmoji/library/on-fire-calm.webp'
import '../styles/home.css'
import '../styles/ai-workflow.css'

/** Copy from arpansheth.digital/ai-workflow.html */
const stages: { title: string; tools: string[]; bubble: string; sticker: string; alt: string; body: ReactNode }[] = [
  {
    title: 'Making sense of the chaos',
    tools: ['Claude', 'ChatGPT', 'Stakeholder Research'],
    bubble: 'Every project starts with the same goal: getting to clarity before I open Figma.',
    sticker: scribbleBrain,
    alt: 'Arpan with a tangled scribble where his brain should be',
    body: (
      <p>
        I use Claude and ChatGPT to break down PRDs, meeting notes, and stakeholder feedback, surface the gaps, and
        identify the questions nobody’s answered yet — feeding that synthesis back into research and stakeholder
        workshops rather than skipping straight to screens.
      </p>
    ),
  },
  {
    title: 'Exploring before committing',
    tools: ['Figma Make'],
    bubble: 'The biggest advantage isn’t speed — it’s flexibility.',
    sticker: painting,
    alt: 'Arpan painting with a brush and palette',
    body: (
      <>
        <p>
          Once the problem is clear, I use Figma Make to turn ideas into wireframes and flows in minutes instead of
          hours.
        </p>
        <p>
          When a new direction costs ten minutes instead of an afternoon, I’m willing to explore more of them before
          committing to one, which is exactly how{' '}
          <a href="https://arpansheth.digital/tastex.html" target="_blank" rel="noreferrer">tasteX</a> went from
          concept to a deployed UAT build in under 5 months.
        </p>
      </>
    ),
  },
  {
    title: 'Refining the decision, not just the screen',
    tools: ['Claude', 'Figma AI'],
    bubble: 'This is where most of the real thinking happens.',
    sticker: thinkSmart,
    alt: 'Arpan tapping his temple, thinking',
    body: (
      <p>
        I use Claude as a design-thinking partner — pressure-testing assumptions, checking flows against established
        heuristics, and arguing the other side of a decision before I commit to it. Figma AI’s auto-layout and
        variant generation handle the repetitive structural work so I can stay focused on the product decision
        underneath it.
      </p>
    ),
  },
  {
    title: 'Shipping faster, without skipping steps',
    tools: ['Codex', 'Claude Code', 'GitHub Copilot'],
    bubble: 'Shipped in under five months.',
    sticker: paperPlane,
    alt: 'Arpan riding a paper plane',
    body: (
      <>
        <p>
          On projects where I’m also driving implementation, Codex and GitHub Copilot accelerate code generation, and
          Claude Code handles deployment and CI/CD — directing an AI-orchestrated pipeline rather than working through
          it screen by screen.
        </p>
        <p>
          It’s the difference between a three-portal product taking a traditional year to build and one that shipped
          in under five months.
        </p>
      </>
    ),
  },
]

export function AiWorkflow() {
  const reduce = useReducedMotion()
  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { delay, type: 'spring' as const, stiffness: 120, damping: 18 },
        }

  return (
    <div className="home aiw">
      {/* ---------- Hero ---------- */}
      <section className="aiw-hero">
        <div className="aiw-hero-text">
          <span className="pill"><span className="pill-dot" />AI workflow</span>
          <h1>How I design in the age of AI</h1>
          <p className="h-tagline">…not to make the decisions for me, but to help me think faster.</p>
        </div>
        <motion.div className="aiw-actor" {...rise(0.15)}>
          <div className="h-bubble aiw-bubble">Think faster. Explore more. Ship sooner.</div>
          <img src={robotThumbsUp} alt="Arpan giving a thumbs up with a robot hand" className="aiw-hero-img sticker" />
        </motion.div>
      </section>

      {/* ---------- Intro ---------- */}
      <motion.section className="aiw-intro" {...rise()}>
        <img src={confused} alt="Arpan surrounded by question marks" className="aiw-intro-img sticker" />
        <div>
          <h2><span className="aiw-star" aria-hidden>✦</span> How I turn ambiguity into design decisions</h2>
          <p>
            Most projects don’t start with clarity — they start with scattered ideas, incomplete requirements,
            conflicting opinions, and a lot of unanswered questions.
          </p>
          <p>
            Over time, I’ve built a process for moving from that uncertainty to a confident decision, and AI has become
            part of it — not to make the decisions for me, but to help me think faster, explore more directions, and
            get to a shippable answer sooner.
          </p>
          <p className="aiw-handoff">Here’s how it shows up across my workflow.</p>
        </div>
      </motion.section>

      {/* ---------- Stages ---------- */}
      <ol className="aiw-stages">
        {stages.map((s, i) => (
          <motion.li key={s.title} className={`aiw-stage${i % 2 ? ' aiw-stage--flip' : ''}`} {...rise()}>
            <div className="aiw-stage-art">
              <div className={`h-bubble aiw-bubble${i % 2 ? ' aiw-bubble--flip' : ''}`}>{s.bubble}</div>
              <img src={s.sticker} alt={s.alt} className="aiw-stage-img sticker" loading="lazy" />
            </div>
            <div className="aiw-stage-text">
              <span className="aiw-num" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
              <h2><span className="aiw-star" aria-hidden>✦</span> {s.title}</h2>
              <ul className="h-ai-tools" aria-label="Tools">
                {s.tools.map((t) => <li key={t}>{t}</li>)}
              </ul>
              {s.body}
            </div>
          </motion.li>
        ))}
      </ol>

      {/* ---------- What changed ---------- */}
      <motion.section className="aiw-changed" {...rise()}>
        <div>
          <h2><span className="aiw-star" aria-hidden>✦</span> What AI has actually changed</h2>
          <p className="aiw-big">The biggest change isn’t that I design faster — it’s that I get stuck less.</p>
          <p>
            I spend less time stalled at the start of a problem and more time refining the parts that actually matter,
            and I can explore more directions before I have to commit to one.
          </p>
          <p className="aiw-mic">
            The tools will keep changing. The advantage is staying curious enough to keep changing with them.
          </p>
        </div>
        <img src={onFireCalm} alt="Arpan calm in the middle of flames" className="aiw-changed-img sticker" loading="lazy" />
      </motion.section>

      {/* ---------- Closing ---------- */}
      <section className="aiw-cta">
        <Link className="h-btn" to="/">See the case studies</Link>
        <a className="h-btn h-btn--ghost" href="https://linkedin.com/in/arpan-sheth-939171171" target="_blank" rel="noreferrer">
          Message me on LinkedIn
        </a>
      </section>
    </div>
  )
}
