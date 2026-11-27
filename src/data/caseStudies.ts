import type { CaseStudy } from './types'
import { rapido } from './rapido'
import { HomeScreen, LoginScreen, DoctorScreen, SlotScreen, FormScreen, DoneScreen } from '../screens/booking/screens'

/**
 * Add a case study by appending to this array.
 * Each slide = one screen + one point on the feeling curve.
 * Beats reveal one at a time with the arrow keys.
 */
/** Placeholder study from the first build. Not listed on the site; kept as a reference. */
export const sampleBooking: CaseStudy = {
    slug: 'booking-a-follow-up',
    title: 'Booking a follow-up shouldn’t feel like a second diagnosis',
    summary: 'A patient app turns a two-minute task into an obstacle course. We follow one patient, screen by screen.',
    persona: { name: 'Arpan', role: 'Patient' },
    readingTime: '3 min',
    category: 'Healthcare UX',
    tagline: '…why every extra screen costs trust.',
    tags: ['Healthcare', 'Mobile', 'Booking flow'],
    startPsych: 50,
    goals: [
      { title: 'Open the reminder', icon: 'bell' },
      { title: 'Sign in', icon: 'key' },
      { title: 'Pick a doctor and time', icon: 'calendar' },
      { title: 'Confirm the booking', icon: 'check' },
    ],
    sample: true,
    slides: [
      {
        id: 'home',
        recap: 'The reminder came at the perfect moment. I was ready to book.',
        psych: 55,
        goal: 0,
        label: 'Reminder',
        emotion: 0,
        screen: HomeScreen,
        beats: [
          { kind: 'narration', text: 'Arpan opens his clinic app on a busy Monday morning.' },
          { kind: 'thought', text: 'Oh right, the follow-up. Let me get this done before work.' },
          { kind: 'principle', title: 'Self-initiated trigger', text: 'The reminder arrives in context, with one clear action. Motivation is high, so this is the moment to make the path short.' },
        ],
      },
      {
        id: 'login',
        recap: 'Getting signed out killed my momentum straight away.',
        psych: 35,
        goal: 1,
        label: 'Sign in again',
        emotion: -2,
        screen: LoginScreen,
        beats: [
          { kind: 'narration', text: 'One tap later, he’s signed out.' },
          { kind: 'thought', text: 'I was literally just in the app…' },
          { kind: 'speech', text: 'And now I have to change my password too?' },
          { kind: 'fix', text: 'Keep the session for low-risk actions like booking. Ask for re-authentication only before viewing records.' },
        ],
      },
      {
        id: 'doctor',
        recap: 'Forty-two doctors, when the app already knew mine.',
        psych: 27,
        goal: 2,
        label: 'Pick a doctor',
        emotion: -1,
        screen: DoctorScreen,
        beats: [
          { kind: 'narration', text: 'Signed in, he’s dropped into a list of every doctor in the network.' },
          { kind: 'thought', text: 'Forty-two? I just want Dr. Shah. He asked for this visit.' },
          { kind: 'principle', title: 'Hick’s law', text: 'Decision time grows with the number of choices. The app already knows which doctor sent the reminder.' },
        ],
      },
      {
        id: 'slot',
        recap: 'Seeing the earliest slot first won me back.',
        psych: 45,
        goal: 2,
        label: 'Earliest slot',
        emotion: 1,
        screen: SlotScreen,
        beats: [
          { kind: 'narration', text: 'Finally, something goes right.' },
          { kind: 'thought', text: 'Tuesday at 10:30, perfect. One tap.' },
          { kind: 'principle', title: 'Smart defaults', text: 'Leading with the earliest slot answers the question most patients have, while other times stay one glance away.' },
        ],
      },
      {
        id: 'form',
        recap: 'Typing my insurance again nearly made me quit.',
        psych: 15,
        goal: 3,
        label: 'Insurance form',
        emotion: -3,
        screen: FormScreen,
        beats: [
          { kind: 'narration', text: 'Then the app asks for his insurance. Again.' },
          { kind: 'speech', text: 'You’ve had my policy for six years!' },
          { kind: 'thought', text: 'Where is my card even… I’ll do this later.' },
          { kind: 'fix', text: 'Prefill known details and ask him to confirm with one tap. Most drop-off in this flow happens here.' },
        ],
      },
      {
        id: 'done',
        recap: 'A calm confirmation made the whole thing feel okay.',
        psych: 62,
        goal: 3,
        label: 'Booked',
        emotion: 2,
        screen: DoneScreen,
        beats: [
          { kind: 'narration', text: 'Twenty minutes and one dug-out insurance card later, he’s booked.' },
          { kind: 'thought', text: 'That was easy. Adding it to my calendar now.' },
          { kind: 'principle', title: 'Peak–end rule', text: 'People judge an experience by its most intense moment and its ending. A clear, calm confirmation is what they remember.' },
        ],
      },
    ],
}

/** Case studies shown on the site, in order. */
export const caseStudies: CaseStudy[] = [rapido]


export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug)
