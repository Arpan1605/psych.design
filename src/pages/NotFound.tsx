import { Link } from 'react-router-dom'
import { narrator } from '../data/narrator'

export function NotFound() {
  return (
    <section className="page">
      <img src={narrator.extras.stopSign} alt="Arpan holding a stop sign" width={220} height={220} className="sticker" />
      <h1>This page doesn’t exist.</h1>
      <p>The link may be old, or the case study was renamed.</p>
      <Link className="btn" to="/">See all case studies</Link>
    </section>
  )
}
