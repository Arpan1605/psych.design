import type { ComponentType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './shot.css'

/** Area of the screenshot to highlight, in % of the image (x, y = top-left corner). */
export interface Box { x: number; y: number; w: number; h: number }

interface Options {
  /** Highlight per beat index; null or missing = no highlight for that beat */
  highlights?: (Box | null)[]
  /** Where a partial screenshot sits inside the phone: top (default), center or bottom */
  align?: 'top' | 'center' | 'bottom'
  alt: string
}

/**
 * Turns a real screenshot into a Screen component for the player.
 * The image fills the phone width; highlights are drawn on top in % of the image,
 * so they stay in place at any size.
 */
export function shot(src: string, { highlights = [], align = 'top', alt }: Options): ComponentType<{ beat: number }> {
  function ShotScreen({ beat }: { beat: number }) {
    // keep the most recent highlight that's set up to this beat
    let box: Box | null = null
    for (let b = Math.min(beat, highlights.length - 1); b >= 0; b--) {
      if (highlights[b] !== undefined) { box = highlights[b]; break }
    }
    return (
      <div className={`shot shot--${align}`}>
        <div className="shot-frame">
          <img src={src} alt={alt} draggable={false} />
          <AnimatePresence>
            {box && (
              <motion.div
                key={`${box.x}-${box.y}-${box.w}-${box.h}`}
                className="shot-hi"
                style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }
  return ShotScreen
}
