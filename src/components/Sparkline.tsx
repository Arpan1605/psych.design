import { emotionColor } from './Face'

/** A small, static feeling curve for the case-study list. */
export function Sparkline({ values }: { values: number[] }) {
  const W = 220, H = 64, P = 8
  const x = (i: number) => P + (i * (W - P * 2)) / Math.max(values.length - 1, 1)
  const y = (e: number) => P + ((3 - e) / 6) * (H - P * 2)
  const d = values.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="spark" aria-hidden>
      <line x1="0" x2={W} y1={y(0)} y2={y(0)} stroke="var(--ink)" strokeOpacity="0.15" strokeDasharray="3 4" />
      <path d={d} fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      {values.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="4" fill={emotionColor(v)} stroke="var(--ink)" strokeWidth="1.5" />
      ))}
    </svg>
  )
}
