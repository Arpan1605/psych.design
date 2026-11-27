import { motion } from 'framer-motion'
import type { Beat } from '../data/types'

const variants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

/** Renders one story beat: narration, a thought or speech bubble, a principle, or a fix. */
export function BeatView({ beat, personaName }: { beat: Beat; personaName: string }) {
  const inner = (() => {
    switch (beat.kind) {
      case 'narration':
        return <p className="beat-narration">{beat.text}</p>
      case 'thought':
        return (
          <div className="bubble bubble--thought">
            <span className="bubble-who">{personaName} thinks</span>
            {beat.text}
          </div>
        )
      case 'speech':
        return (
          <div className="bubble bubble--speech">
            <span className="bubble-who">{personaName} says</span>
            {beat.text}
          </div>
        )
      case 'principle':
        return (
          <aside className="principle">
            <h3>{beat.title}</h3>
            <p>{beat.text}</p>
            {beat.source && <a href={beat.source.url} target="_blank" rel="noreferrer">{beat.source.label}</a>}
          </aside>
        )
      case 'fix':
        return (
          <aside className="fix">
            <h3>How we’d fix it</h3>
            <p>{beat.text}</p>
          </aside>
        )
    }
  })()
  return (
    <motion.div variants={variants} initial="hidden" animate="shown" layout>
      {inner}
    </motion.div>
  )
}
