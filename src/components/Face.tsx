import { AnimatePresence, motion } from 'framer-motion'
import type { Emotion } from '../data/types'
// Fluent Emoji 3D by Microsoft (MIT): https://github.com/microsoft/fluentui-emoji
import m3 from '../assets/emoji/m3.png'
import m2 from '../assets/emoji/m2.png'
import m1 from '../assets/emoji/m1.png'
import z0 from '../assets/emoji/z0.png'
import p1 from '../assets/emoji/p1.png'
import p2 from '../assets/emoji/p2.png'
import p3 from '../assets/emoji/p3.png'

const faces: Record<number, string> = { [-3]: m3, [-2]: m2, [-1]: m1, 0: z0, 1: p1, 2: p2, 3: p3 }

export const emotionColor = (e: number) =>
  e > 0 ? 'var(--delight)' : e < 0 ? 'var(--frustration)' : 'var(--neutral)'

export const emotionWord = (e: number) =>
  ({ '-3': 'Furious', '-2': 'Frustrated', '-1': 'Annoyed', '0': 'Neutral', '1': 'Pleased', '2': 'Happy', '3': 'Delighted' } as Record<string, string>)[String(e)]

/** 3D emoji for the emotion; pops in whenever the emotion changes. */
export function Face({ emotion, size = 40 }: { emotion: Emotion | number; size?: number }) {
  return (
    <span className="face" style={{ width: size, height: size }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={emotion}
          src={faces[emotion]}
          alt={emotionWord(emotion)}
          width={size}
          height={size}
          initial={{ scale: 0.4, rotate: -12, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 14 }}
        />
      </AnimatePresence>
    </span>
  )
}
