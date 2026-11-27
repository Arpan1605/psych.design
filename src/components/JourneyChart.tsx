import { AnimatePresence, motion } from 'framer-motion'
import type { ComponentType } from 'react'
import { Avatar } from './Avatar'

export interface JourneyPoint {
  label: string
  psych: number
  emotion: number
  recap?: string
  screen: ComponentType<{ beat: number }>
  lastBeat: number
  note?: { kind: 'principle' | 'fix'; title: string; text: string }
}

const W = 1000
const H = 600
const L = 70     // y-axis
const R = 40
const T = 30     // top of the plot
const PLOT_B = 330 // bottom of the plot area (psych 0); thumbnails live below
const AXIS_Y = 570

/** Segment colour by how much the psych level moved. */
const segColor = (d: number) => (d >= 0 ? '#2ecc71' : d > -15 ? '#f5b82e' : '#ef4f43')

/**
 * End-of-story chart, revealed one point per arrow press.
 * `upto` is the index of the last revealed screen (-1 shows only the start point).
 */
export function JourneyChart({ start, points, upto }: { start: number; points: JourneyPoint[]; upto: number }) {
  const all = [{ psych: start }, ...points]
  const x = (i: number) => L + 40 + (i * (W - L - R - 80)) / (all.length - 1)
  const y = (v: number) => T + ((100 - v) / 100) * (PLOT_B - T)
  const shown = Math.min(upto + 1, points.length) // number of screen points revealed
  const cur = shown > 0 ? points[shown - 1] : null
  const ci = shown // index in `all` of the current point
  const pctX = (i: number) => `${(x(i) / W) * 100}%`
  const pctY = (v: number) => `${(y(v) / H) * 100}%`

  return (
    <div className="journey">
      <svg viewBox={`0 0 ${W} ${H}`} className="journey-svg" role="img" aria-label="Psych level over the customer journey">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10" fill="none" stroke="#e8e2da" strokeWidth="1.6" />
          </marker>
        </defs>

        <line x1={L} y1={AXIS_Y} x2={L} y2={8} stroke="#e8e2da" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <line x1={L} y1={AXIS_Y} x2={W - 8} y2={AXIS_Y} stroke="#e8e2da" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <text x={L - 22} y={(T + PLOT_B) / 2} transform={`rotate(-90 ${L - 22} ${(T + PLOT_B) / 2})`} textAnchor="middle" className="journey-axis">Psych level</text>
        <text x={(L + W) / 2} y={AXIS_Y + 26} textAnchor="middle" className="journey-axis journey-axis--x">Customer journey</text>

        <line x1={L} x2={W - R} y1={y(start)} y2={y(start)} stroke="#e8e2da" strokeOpacity="0.35" strokeDasharray="6 8" strokeWidth="2" />

        {/* segments up to the current point; only the newest one animates */}
        {all.slice(1, ci + 1).map((p, i) => {
          const a = all[i]
          const isNew = i === ci - 1
          return (
            <motion.line
              key={`seg-${i}`}
              x1={x(i)} y1={y(a.psych)} x2={x(i + 1)} y2={y(p.psych)}
              stroke={segColor(p.psych - a.psych)}
              strokeWidth="5"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              initial={{ strokeDashoffset: isNew ? 1 : 0 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          )
        })}

        {all.slice(0, ci + 1).map((p, i) => (
          <motion.circle
            key={`pt-${i}`}
            cx={x(i)}
            cy={y(p.psych)}
            r="9"
            fill={i === 0 ? '#e8e2da' : segColor(p.psych - all[i - 1].psych)}
            stroke="#16120f"
            strokeWidth="2"
            initial={{ scale: i === ci ? 0 : 1 }}
            animate={{ scale: 1 }}
            transition={{ delay: i === ci ? 0.45 : 0, type: 'spring', stiffness: 400, damping: 16 }}
            style={{ transformOrigin: `${x(i)}px ${y(p.psych)}px` }}
          />
        ))}
      </svg>

      {/* avatar + recap bubble travel to the current point */}
      {cur && (
        <motion.div
          className={`journey-avatar ${y(cur.psych) / H < 0.3 ? 'journey-avatar--high' : ''} ${x(ci) / W < 0.3 ? 'journey-avatar--left' : x(ci) / W > 0.7 ? 'journey-avatar--right' : ''}`}
          initial={false}
          animate={{ left: pctX(ci), top: pctY(cur.psych) }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          <AnimatePresence mode="wait">
            {cur.recap && (
              <motion.div
                key={ci}
                className="journey-bubble"
                initial={{ opacity: 0, scale: 0.85, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 320, damping: 22 }}
              >
                {cur.recap}
              </motion.div>
            )}
          </AnimatePresence>
          <Avatar emotion={cur.emotion} size={110} />
        </motion.div>
      )}

      {/* the screen + its note, under the current point */}
      <AnimatePresence mode="wait">
        {cur && (
          <motion.div
            key={`thumb-${ci}`}
            className="journey-thumb"
            style={{ left: `clamp(0%, calc(${pctX(ci)} - 170px), calc(100% - 340px))` }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="mini-phone">
              <div className="mini-phone-screen">
                <cur.screen beat={cur.lastBeat} />
              </div>
            </div>
            {cur.note && (
              <div className={`mini-note mini-note--${cur.note.kind}`}>
                <span>{cur.note.kind === 'principle' ? 'Psychology' : 'The fix'}</span>
                <strong>{cur.note.title}</strong>
                <p>{cur.note.text}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Letter grade from the average psych level across the journey. */
export function experienceGrade(levels: number[]) {
  const avg = levels.reduce((a, b) => a + b, 0) / levels.length
  return avg >= 70 ? 'A' : avg >= 55 ? 'B' : avg >= 40 ? 'C' : avg >= 25 ? 'D' : 'F'
}
