import { motion, useReducedMotion } from 'framer-motion'

/** Arrow-key cluster whose right key keeps "pressing" itself, with a note underneath. */
export function KeyHint() {
  const reduce = useReducedMotion()
  const press = reduce
    ? {}
    : {
        animate: { y: [0, 0, 4, 0, 0], boxShadow: glow },
        transition: { duration: 1.6, repeat: Infinity, times: [0, 0.45, 0.55, 0.65, 1] },
      }
  return (
    <div className="keyhint" aria-hidden>
      <div className="keys">
        <span className="key key--up">▲</span>
        <span className="key key--left">◀</span>
        <span className="key key--down">▼</span>
        <motion.span className="key key--right" {...press}>▶</motion.span>
      </div>
      <p className="keyhint-note keyhint-note--keys">
        Use your <strong>arrow keys</strong>
        <br />to move through the story
      </p>
      <p className="keyhint-note keyhint-note--touch">
        <strong>Tap</strong> anywhere or use <strong>›</strong>
        <br />to move through the story
      </p>
    </div>
  )
}

const glow = [
  '0 4px 0 #157a3f, 0 0 18px 4px rgba(46, 204, 113, 0.45)',
  '0 4px 0 #157a3f, 0 0 18px 4px rgba(46, 204, 113, 0.45)',
  '0 0px 0 #157a3f, 0 0 28px 8px rgba(46, 204, 113, 0.7)',
  '0 4px 0 #157a3f, 0 0 18px 4px rgba(46, 204, 113, 0.45)',
  '0 4px 0 #157a3f, 0 0 18px 4px rgba(46, 204, 113, 0.45)',
]
