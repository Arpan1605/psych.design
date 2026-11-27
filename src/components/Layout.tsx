import { Link, NavLink, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header">
        <Link to="/" className="wordmark">Arpan Sheth</Link>
        <nav aria-label="Main">
          <NavLink to="/" end>Case studies</NavLink>
          <NavLink to="/about">About</NavLink>
          <a href="https://arpansheth.digital" target="_blank" rel="noreferrer">Portfolio</a>
        </nav>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Arpan Sheth</span>
        <a href="https://linkedin.com/in/arpan-sheth-939171171" target="_blank" rel="noreferrer">LinkedIn</a>
      </footer>
    </>
  )
}
