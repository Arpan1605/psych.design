import { useEffect, useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import { emotionColor } from './Face'

interface Props {
  points: { label: string; emotion: number }[]
  /** Index of the current step; points after it render as ghosts */
  current: number
  onSelect?: (i: number) => void
}

const W = 1000
const H = 180
const PAD_X = 50
const PAD_Y = 34

const draw: Variants = {
  from: { strokeDashoffset: 1 },
  to: { strokeDashoffset: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
}

/**
 * The feeling curve: one point per screen, from -3 (frustrated) to +3 (delighted).
 * The solid line is drawn up to the current step; the rest waits, dashed.
 */
export function EmpathyGraph({ points, current, onSelect }: Props) {
  const step = points.length > 1 ? (W - PAD_X * 2) / (points.length - 1) : 0
  const x = (i: number) => PAD_X + i * step
  const y = (e: number) => PAD_Y + ((3 - e) / 6) * (H - PAD_Y * 2)
  const pathFor = (upto: number) =>
    points
      .slice(0, upto + 1)
      .map((p, i) => {
        if (i === 0) return `M${x(0)} ${y(p.emotion)}`
        const px = x(i - 1), py = y(points[i - 1].emotion)
        const cx = (px + x(i)) / 2
        return `C${cx} ${py} ${cx} ${y(p.emotion)} ${x(i)} ${y(p.emotion)}`
      })
      .join(' ')

  const segment = (i: number) => {
    const px = x(i - 1), py = y(points[i - 1].emotion)
    const cx = (px + x(i)) / 2
    return `M${px} ${py} C${cx} ${py} ${cx} ${y(points[i].emotion)} ${x(i)} ${y(points[i].emotion)}`
  }

  const cur = points[current]

  // On narrow screens the curve scrolls sideways; keep the current step in view.
  const figRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = figRef.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    const target = (x(current) / W) * el.scrollWidth - el.clientWidth / 2
    el.scrollTo({ left: target, behavior: 'smooth' })
  }, [current]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <figure ref={figRef} className="graph" aria-label="How the user feels at each step">
      <div className="graph-inner">
      <div className="graph-plot">
      <svg viewBox={`0 0 ${W} ${H}`} className="graph-svg">
        {/* mood bands */}
        <rect x="0" y={PAD_Y} width={W} height={(H - PAD_Y * 2) / 2} fill="var(--delight)" opacity="0.07" />
        <rect x="0" y={H / 2} width={W} height={(H - PAD_Y * 2) / 2} fill="var(--frustration)" opacity="0.07" />
        <line x1="0" x2={W} y1={y(0)} y2={y(0)} stroke="var(--ink)" strokeOpacity="0.2" strokeDasharray="4 6" />

        {/* full path, ghosted */}
        <path d={pathFor(points.length - 1)} fill="none" stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
        {/* drawn-so-far path, plus the newest segment drawing itself in */}
        {current > 0 && (
          <path d={pathFor(current - 1)} fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
        )}
        {current > 0 && (
          <motion.path
            key={current}
            d={segment(current)}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1 1"
            variants={draw}
            initial="from"
            animate="to"
          />
        )}

        {points.map((p, i) => (
          <g key={i} onClick={() => onSelect?.(i)} style={{ cursor: onSelect && i <= current ? 'pointer' : 'default' }}>
            <circle
              cx={x(i)}
              cy={y(p.emotion)}
              r={i === current ? 0 : 7}
              fill={i <= current ? emotionColor(p.emotion) : 'var(--paper)'}
              stroke="var(--ink)"
              strokeOpacity={i <= current ? 1 : 0.3}
              strokeWidth="2.5"
            />
          </g>
        ))}
      </svg>

      {cur && (
        <motion.div
          className="graph-now"
          style={{ background: emotionColor(cur.emotion) }}
          animate={{ left: `${(x(current) / W) * 100}%`, top: `${(y(cur.emotion) / H) * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
      )}
      </div>

      <ol className="graph-labels">
        {points.map((p, i) => (
          <li
            key={i}
            style={{ left: `${(x(i) / W) * 100}%` }}
            className={i === current ? 'is-current' : i > current ? 'is-future' : ''}
            aria-current={i === current ? 'step' : undefined}
          >
            {p.label}
          </li>
        ))}
      </ol>
      </div>
    </figure>
  )
}
