import { AnimatePresence, motion } from 'framer-motion'

/** Colour of the meter for a given level: green when there's plenty of motivation, amber, then red. */
export const psychColor = (level: number) => (level >= 40 ? '#2ecc71' : level >= 22 ? '#f5b82e' : '#ef4f43')

/**
 * Vertical psych level gauge. `delta` is the change from the previous screen,
 * shown as a chip that pops in at the top of the fill.
 */
export function PsychMeter({ level, delta, stepKey }: { level: number; delta: number; stepKey: string }) {
  const color = psychColor(level)
  const pct = Math.max(0, Math.min(100, level))
  return (
    <div className="meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Psych level">
      <div className="meter-track">
        {/* tick marks every 20% */}
        {[20, 40, 60, 80].map((t) => (
          <span key={t} className="meter-tick" style={{ bottom: `${t}%` }} />
        ))}
        <div className="meter-fill" style={{ ['--lvl' as string]: `${pct}%`, ['--c' as string]: color }}>
          <AnimatePresence mode="wait">
            {delta !== 0 && (
              <motion.span
                key={stepKey}
                className="meter-delta"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.35 }}
              >
                {delta > 0 ? `+${delta}` : `−${Math.abs(delta)}`}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="meter-label" style={{ ['--lvl' as string]: `${pct}%` }}>
        Psych level: <strong>{pct}%</strong>
      </div>
    </div>
  )
}
