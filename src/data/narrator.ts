// Arpan's own Bitmoji stickers (exported and supplied by Arpan).
// All stickers live in src/assets/bitmoji; only the ones imported here are bundled.
// To change which pose shows for a mood, swap the import.
import furious from '../assets/bitmoji/red-card.webp'
import frustrated from '../assets/bitmoji/hmph.webp'
import annoyed from '../assets/bitmoji/phone-squint.webp'
import neutral from '../assets/bitmoji/salute.webp'
import pleased from '../assets/bitmoji/clock-it.webp'
import happy from '../assets/bitmoji/thumbs-up.webp'
import delighted from '../assets/bitmoji/laugh-cry.webp'
import bye from '../assets/bitmoji/bye.webp'
import hi from '../assets/bitmoji/hi.webp'
import standing from '../assets/bitmoji/standing-arms-crossed.webp'
// reaction poses, used for specific story moments and pages
import waiting from '../assets/bitmoji/ellipses.webp'
import yellowCard from '../assets/bitmoji/yellow-card.webp'
import itIsWhatItIs from '../assets/bitmoji/it-is-what-it-is.webp'
import sippingTea from '../assets/bitmoji/sipping-tea.webp'
import noComment from '../assets/bitmoji/no-comment.webp'
import halfListening from '../assets/bitmoji/half-listening.webp'
import boring from '../assets/bitmoji/boring.webp'
import shush from '../assets/bitmoji/shush.webp'
import useThis from '../assets/bitmoji/use-this.webp'
import weNeedToTalk from '../assets/bitmoji/we-need-to-talk.webp'
import stopSign from '../assets/bitmoji/stop-sign.webp'
import icedCoffee from '../assets/bitmoji/iced-coffee.webp'
import bonVoyage from '../assets/bitmoji/bon-voyage.webp'
import thinking from '../assets/bitmoji/thinking.webp'
import clap from '../assets/bitmoji/clap.webp'
import yTho from '../assets/bitmoji/y-tho.webp'
import puppyEyes from '../assets/bitmoji/puppy-eyes.webp'
import goodJob from '../assets/bitmoji/good-job.webp'
import aPlus from '../assets/bitmoji/a-plus.webp'
import dropMic from '../assets/bitmoji/drop-mic.webp'
import tenTen from '../assets/bitmoji/ten-ten.webp'
import sleepyCoffee from '../assets/bitmoji/sleepy-coffee.webp'

/** Poses a story beat can switch to (beat.pose), or a case study can wave goodbye with (farewell). */
export const poses = {
  waiting,        // "…" while something loads
  yellowCard,     // a mild UX foul
  itIsWhatItIs,   // resigned shrug at a dead end
  sippingTea,     // pointing out a flaw ("spilling the tea")
  noComment,      // a flaw that speaks for itself
  halfListening,  // skimming past something on the phone
  boring,         // a slow or dull step
  thinking,       // hand on chin, working something out
  clap,           // applauding a good design decision
  yTho,           // questioning a confusing choice
  puppyEyes,      // hopeful, wanting something
  dropMic,        // a closing line that lands
  sleepyCoffee,   // tired, slow start
  bye,
  bonVoyage,
  hi,
} as const

export type PoseName = keyof typeof poses

export const narrator = {
  name: 'Arpan',
  /** one sticker per emotion level, -3 … +3 */
  moods: { [-3]: furious, [-2]: frustrated, [-1]: annoyed, 0: neutral, 1: pleased, 2: happy, 3: delighted } as Record<number, string>,
  extras: { bye, hi, standing, shush, useThis, weNeedToTalk, stopSign, icedCoffee },
  /** sticker shown beside the overall experience grade */
  grades: { A: aPlus, 'A+': tenTen, B: goodJob, C: itIsWhatItIs, D: yellowCard, F: yellowCard } as Record<string, string>,
}
