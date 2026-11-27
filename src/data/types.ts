import type { ComponentType } from 'react'
import type { PoseName } from './narrator'

/** -3 (very frustrated) … 0 (neutral) … +3 (delighted) */
export type Emotion = -3 | -2 | -1 | 0 | 1 | 2 | 3

export type Beat =
  | { kind: 'narration'; text: string; pose?: PoseName }
  | { kind: 'thought'; text: string; pose?: PoseName }
  | { kind: 'speech'; text: string; pose?: PoseName }
  | { kind: 'principle'; title: string; text: string; source?: { label: string; url: string }; pose?: PoseName }
  | { kind: 'fix'; text: string; pose?: PoseName }

export interface Slide {
  id: string
  /** Short label shown under the point on the feeling curve */
  label: string
  emotion: Emotion
  /** Psych level after this screen, 0–100 (motivation left to finish the task) */
  psych: number
  /** One-line look back at this screen, said by the persona on the journey summary */
  recap?: string
  /** Index into CaseStudy.goals that this screen works toward */
  goal: number
  /** 'card' shows a partial screenshot large, without the phone frame */
  frame?: 'phone' | 'card'
  /** Screen component rendered inside the phone frame */
  screen: ComponentType<{ beat: number }>
  beats: Beat[]
}

export type GoalIcon = 'bell' | 'key' | 'search' | 'calendar' | 'check' | 'card'

export interface Goal {
  title: string
  icon: GoalIcon
}

export interface CaseStudy {
  slug: string
  title: string
  summary: string
  persona: { name: string; role: string }
  readingTime: string
  /** small pill label on the cover, e.g. 'Healthcare UX' */
  category: string
  /** italic line under the title on the cover */
  tagline: string
  /** closing thought shown on the goodbye screen */
  takeaway?: string
  /** sticker for the goodbye screen (defaults to 'bye') */
  farewell?: PoseName
  tags: string[]
  /** What the user is trying to get done, in order. Shown as the goal tracker. */
  goals: Goal[]
  /** Starting psych level before the first screen, 0–100 */
  startPsych: number
  /** Set when the content is placeholder so it isn't mistaken for real work */
  sample?: boolean
  slides: Slide[]
}
