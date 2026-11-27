import { AnimatePresence, motion } from 'framer-motion'
import type { Goal, GoalIcon } from '../data/types'

/**
 * "Goal 2 of 4" label, the current goal's title, and a row of connected circles.
 * Finished goals show a green tick; the current one is highlighted.
 */
export function GoalTracker({ goals, current, done }: { goals: Goal[]; current: number; done: boolean[] }) {
  const allDone = done.every(Boolean)
  return (
    <div className="goals">
      <p className="goals-count">{allDone ? 'All goals done' : `Goal ${current + 1} of ${goals.length}`}</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={current + String(done[current])}
          className="goals-title"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {done[current] && <span className="goals-tick-inline"><Check size={14} /></span>}
          {goals[current].title}
        </motion.p>
      </AnimatePresence>
      <ol className="goals-row">
        {goals.map((g, i) => {
          const state = done[i] ? 'done' : i === current ? 'current' : 'todo'
          return (
            <li key={g.title} className={`goal goal--${state}`} title={g.title}>
              {i > 0 && <span className={`goal-link ${done[i - 1] ? 'is-done' : ''}`} aria-hidden />}
              <span className="goal-dot">
                <AnimatePresence mode="wait" initial={false}>
                  {state === 'done' ? (
                    <motion.span
                      key="tick"
                      initial={{ scale: 0, rotate: -40 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 14 }}
                    >
                      <Check size={20} />
                    </motion.span>
                  ) : (
                    <motion.span key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <GoalGlyph name={g.icon} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="sr-only">{g.title}: {state === 'done' ? 'done' : state === 'current' ? 'in progress' : 'not started'}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Check({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.5 L10 17.5 L19 7" />
    </svg>
  )
}

function GoalGlyph({ name }: { name: GoalIcon }) {
  const p = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  switch (name) {
    case 'bell':
      return <svg {...p}><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
    case 'key':
      return <svg {...p}><circle cx="8" cy="12" r="4" /><path d="M12 12h9M18 12v3M21 12v2" /></svg>
    case 'search':
      return <svg {...p}><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></svg>
    case 'calendar':
      return <svg {...p}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>
    case 'card':
      return <svg {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h4" /></svg>
    case 'check':
    default:
      return <svg {...p}><circle cx="12" cy="12" r="8" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>
  }
}
