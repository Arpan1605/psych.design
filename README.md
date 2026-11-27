# Arpan Sheth: UX case studies

Animated, comic-style case studies with a feeling curve (empathy graph) that tracks how the user feels on every screen.

Built with React 18, Vite, TypeScript, Framer Motion and React Router.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/, upload anywhere
```

## How a case study works

Everything lives in `src/data/caseStudies.ts`. A case study is a list of **slides**. Each slide is one screen and one point on the curve:

```ts
{
  id: 'login',
  label: 'Sign in again',      // label under the point on the curve
  emotion: -2,                 // -3 furious … 0 neutral … +3 delighted
  screen: LoginScreen,         // React component shown in the phone frame
  beats: [                     // revealed one at a time with → / tap
    { kind: 'narration', text: '…' },
    { kind: 'thought',   text: '…' },   // dashed thought bubble
    { kind: 'speech',    text: '…' },   // speech bubble
    { kind: 'principle', title: 'Hick’s law', text: '…', source: { label, url } },
    { kind: 'fix',       text: '…' },   // "How we’d fix it"
  ],
}
```

Screens get the current `beat` index as a prop, so a screen can highlight the part of the UI the story is talking about (see `src/screens/booking/screens.tsx`). To use real screenshots instead, make a screen component that returns an `<img>`.

## Files

| Path | What it is |
|---|---|
| `src/components/EmpathyGraph.tsx` | The feeling curve, with the face that rides it |
| `src/components/Face.tsx` | Face whose mouth and brows change with emotion |
| `src/components/BeatView.tsx` | Narration, bubbles, principle and fix callouts |
| `src/pages/CaseStudy.tsx` | The player: keyboard arrows, tap to advance, progress |
| `src/pages/Home.tsx` | Hero and case study list (each row has its own mini curve) |
| `src/styles/global.css` | Design tokens and all styles |

## Hosting

Uses `HashRouter`, so links like `/#/case-studies/booking-a-follow-up` work on any static host (Hostinger, Netlify, GitHub Pages) without server rewrites.
