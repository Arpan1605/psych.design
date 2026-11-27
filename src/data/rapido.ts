import type { CaseStudy } from './types'
import { shot } from '../screens/Shot'
import welcome from '../assets/rapido/welcome.webp'
import home from '../assets/rapido/home.webp'
import rideOptions from '../assets/rapido/ride-options.webp'
import offers from '../assets/rapido/offers.webp'
import matching from '../assets/rapido/matching-sheet.webp'
import captain from '../assets/rapido/captain-sheet.webp'
import rewards from '../assets/rapido/rewards.webp'

/**
 * Rapido: booking an auto to work. Built on Arpan's LinkedIn post about two
 * screens that turn waiting into trust. Real screenshots, personal details blurred.
 * Highlight boxes are in % of each screenshot.
 */
export const rapido: CaseStudy = {
  slug: 'rapido-trust-while-you-wait',
  title: 'Rapido: two small screens, two big lessons in trust',
  summary: 'Booking an auto to work, screen by screen, and the moment the app chose to show the wait instead of hiding it.',
  category: 'Mobility UX',
  tagline: '…why showing the invisible process builds trust.',
  persona: { name: 'Arpan', role: 'Daily commuter' },
  readingTime: '4 min',
  tags: ['Mobility', 'Trust', 'Waiting states'],
  startPsych: 50,
  farewell: 'bonVoyage',
  takeaway:
    'Neither feature adds a new capability. Both reveal information that was already there, and turn uncertainty into confidence. Good UX isn’t always about adding more. Sometimes it’s about deciding which invisible process deserves to be seen.',
  goals: [
    { title: 'Sign in', icon: 'key' },
    { title: 'Choose a ride', icon: 'search' },
    { title: 'Get matched with a captain', icon: 'bell' },
    { title: 'Get picked up', icon: 'check' },
  ],
  slides: [
    {
      id: 'welcome',
      label: 'Welcome back',
      emotion: 1,
      psych: 58,
      goal: 0,
      recap: 'One tap to sign in. Great start.',
      screen: shot(welcome, {
        alt: 'Rapido welcome screen with a saved account button',
        highlights: [null, { x: 3, y: 66.5, w: 94, h: 8.4 }, { x: 3, y: 66.5, w: 94, h: 8.4 }],
      }),
      beats: [
        { kind: 'narration', text: 'Monday morning. I need an auto to work, so I open Rapido.', pose: 'sleepyCoffee' },
        { kind: 'thought', text: 'Oh nice, it remembers me. One tap and I’m in.' },
        {
          kind: 'principle',
          title: 'Recognition over recall',
          text: 'Showing the saved account turns sign-in into a single tap. People recognise their own name faster than they can recall and type a number.',
        },
      ],
    },
    {
      id: 'home',
      label: 'Home',
      emotion: 1,
      psych: 62,
      goal: 1,
      recap: 'My usual places, one tap away.',
      screen: shot(home, {
        alt: 'Rapido home screen with search, recent places (blurred) and service cards',
        highlights: [{ x: 5, y: 17.8, w: 90, h: 6.2 }, { x: 1, y: 25.4, w: 98, h: 23.2 }, { x: 1, y: 25.4, w: 98, h: 23.2 }, { x: 2, y: 86.5, w: 96, h: 13.5 }],
      }),
      beats: [
        { kind: 'narration', text: 'The home screen leads with the one question that matters.' },
        { kind: 'thought', text: 'My usual places are right there. No typing needed.' },
        {
          kind: 'principle',
          title: 'Smart defaults',
          text: 'Recent destinations turn a typed search into one tap for the trips people repeat most.',
        },
        {
          kind: 'fix',
          pose: 'sippingTea',
          text: 'The floating tab bar sits on top of the Explore row, so its labels peek out from behind it. A little more bottom padding would keep content clear of the bar.',
        },
      ],
    },
    {
      id: 'ride-options',
      label: '8 ride types',
      emotion: -1,
      psych: 50,
      goal: 1,
      recap: 'Eight choices made me stop and compare.',
      screen: shot(rideOptions, {
        alt: 'List of eight ride types with prices, Auto selected',
        highlights: [{ x: 2, y: 17.5, w: 96, h: 63 }, { x: 2, y: 32.6, w: 96, h: 10.4 }, { x: 2, y: 17.5, w: 96, h: 63 }, { x: 2, y: 32.6, w: 96, h: 10.4 }],
      }),
      beats: [
        { kind: 'narration', text: 'I enter my destination, and eight ride types appear at once.' },
        { kind: 'thought', text: 'Bike Lite says fastest and it’s cheaper… but Auto is already selected?', pose: 'yTho' },
        {
          kind: 'principle',
          title: 'Hick’s law',
          text: 'Decision time grows with the number of similar options. Eight rows with different prices invite comparing instead of booking.',
        },
        {
          kind: 'fix',
          pose: 'yellowCard',
          text: 'Group rides by vehicle (bike, auto, cab) and expand on tap. If a default is picked for me, say why, like “Your usual”.',
        },
      ],
    },
    {
      id: 'offers',
      label: 'No offers',
      emotion: -2,
      psych: 36,
      goal: 1,
      recap: 'The offers page told me what I didn’t have.',
      screen: shot(offers, {
        alt: 'Offers sheet showing a zero coin balance in red and no coupons available',
        highlights: [null, { x: 4, y: 15, w: 92, h: 6.2 }, { x: 15, y: 49, w: 70, h: 26 }, { x: 15, y: 49, w: 70, h: 26 }],
      }),
      beats: [
        { kind: 'narration', text: 'Before booking, I tap Offers to look for a discount.', pose: 'puppyEyes' },
        { kind: 'speech', text: 'Zero coins, in red. Thanks for the reminder.' },
        {
          kind: 'principle',
          pose: 'itIsWhatItIs',
          title: 'Loss aversion',
          text: 'Red text about what I don’t have reads as a loss, right when I hoped to save. Then the page ends in “No coupon codes available”.',
        },
        {
          kind: 'fix',
          text: 'Turn the empty state into a next step: show how many coins this ride will earn, or when the next offer unlocks.',
        },
      ],
    },
    {
      id: 'matching',
      label: 'Finding a captain',
      frame: 'card',
      emotion: 1,
      psych: 58,
      goal: 2,
      recap: 'Seeing the matching made the wait feel honest.',
      screen: shot(matching, {
        alt: 'Matching sheet reading “5 of 33 captains didn’t accept your ride” with a progress bar',
        highlights: [null, { x: 2, y: 24, w: 85, h: 23 }, { x: 2, y: 55, w: 96, h: 32 }, { x: 2, y: 22, w: 96, h: 67 }],
      }),
      beats: [
        { kind: 'narration', text: 'I book the auto. This is usually where the anxious wait begins.', pose: 'waiting' },
        { kind: 'thought', text: '“5 of 33 captains didn’t accept your ride.” Okay… but at least I can see it’s working.', pose: 'thinking' },
        {
          kind: 'principle',
          pose: 'clap',
          title: 'Operational transparency',
          text: 'Instead of hiding the friction behind a silent spinner, the app shows the matching happening in real time. An anxious wait becomes an informed one.',
        },
        { kind: 'thought', text: 'No “is this app broken?” moment. I can watch it try.' },
      ],
    },
    {
      id: 'captain',
      label: 'Never Cancels',
      frame: 'card',
      emotion: 2,
      psych: 80,
      goal: 3,
      recap: '“Never Cancels” turned doubt into confidence.',
      screen: shot(captain, {
        alt: 'Captain assigned, pickup in 6 minutes, with a Never Cancels badge on the captain’s profile',
        highlights: [{ x: 3, y: 15.5, w: 94, h: 21 }, { x: 55, y: 52.5, w: 34, h: 10 }, { x: 55, y: 52.5, w: 34, h: 10 }],
      }),
      beats: [
        { kind: 'narration', text: 'A captain accepts. And right when I start to wonder if he’ll actually show up…' },
        { kind: 'speech', text: '“Never Cancels.” Good, this ride is happening.' },
        {
          kind: 'principle',
          pose: 'clap',
          title: 'Reputation at the moment of doubt',
          text: 'One earned badge, shown exactly when users worry most. It compresses reputation into two words, with no need to dig through ratings or reviews.',
        },
      ],
    },
    {
      id: 'rewards',
      label: 'Mystery rewards',
      emotion: 1,
      psych: 76,
      goal: 3,
      recap: 'Mystery rewards kept me curious.',
      screen: shot(rewards, {
        alt: 'My Rewards page with coin and voucher counts and a grid of identical scratch cards',
        highlights: [null, { x: 3, y: 36.5, w: 94, h: 60 }, { x: 3, y: 23, w: 94, h: 11 }],
      }),
      beats: [
        { kind: 'narration', text: 'Later, My Rewards shows a grid of mystery cards.' },
        { kind: 'thought', text: 'Which ones are my two vouchers? I’ll have to scratch to find out.', pose: 'thinking' },
        {
          kind: 'principle',
          title: 'Variable rewards',
          text: 'Unknown rewards spark curiosity and bring people back. Identical cards keep the mystery, but they also hide which ones hold real value.',
        },
      ],
    },
  ],
}
