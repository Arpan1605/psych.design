import { AnimatePresence, motion } from 'framer-motion'
import { narrator, poses, type PoseName } from '../data/narrator'
import { emotionWord } from './Face'

/**
 * Arpan's Bitmoji. Shows the sticker for the emotion (-3 … +3),
 * or a specific reaction pose when a story beat asks for one.
 */
export function Avatar({ emotion, size = 300, pose }: { emotion: number; size?: number; pose?: PoseName }) {
  const e = Math.max(-3, Math.min(3, Math.round(emotion)))
  const src = pose ? poses[pose] : narrator.moods[e]
  return (
    <div className="avatar" style={{ width: size, height: size }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={pose ?? e}
          src={src}
          alt={`${narrator.name} looks ${emotionWord(e).toLowerCase()}`}
          width={size}
          height={size}
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
        />
      </AnimatePresence>
    </div>
  )
}
