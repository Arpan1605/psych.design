import { narrator } from '../data/narrator'

export function About() {
  return (
    <section className="page">
      <img src={narrator.extras.icedCoffee} alt="Arpan sipping an iced coffee" width={200} height={200} className="sticker" />
      <h1>About</h1>
      <p>
        I’m Arpan Sheth, a Senior User Experience Designer at Tata Consultancy Services, designing
        enterprise healthcare workflows for GE HealthCare. I work across design systems, AI-augmented
        workflows and hands-on frontend development.
      </p>
      <p>
        Each case study here is told as a short comic. A psych level meter tracks how the user
        feels on every screen, and the story ends with the full journey, so you can see where a
        flow loses people and what fixes it.
      </p>
      <p>
        <a href="https://arpansheth.digital" target="_blank" rel="noreferrer">See my full portfolio</a>
        {' '}or{' '}
        <a href="https://linkedin.com/in/arpan-sheth-939171171" target="_blank" rel="noreferrer">connect on LinkedIn</a>.
      </p>
    </section>
  )
}
