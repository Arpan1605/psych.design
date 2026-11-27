import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { CaseStudy } from './pages/CaseStudy'
import { About } from './pages/About'
import { AiWorkflow } from './pages/AiWorkflow'
import { NotFound } from './pages/NotFound'
import './styles/global.css'

// HashRouter keeps deep links working on any static host (GitHub Pages, Netlify, Hostinger).
// Swap to BrowserRouter if your host rewrites all paths to index.html.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <Routes>
          {/* the comic player is full-screen, outside the site header/footer */}
          <Route path="case-studies/:slug" element={<CaseStudy />} />
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="ai-workflow" element={<AiWorkflow />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </MotionConfig>
  </React.StrictMode>,
)
