'use client'

import { useState } from 'react'
import { Home, Projects, About, Contact, projects } from '@/components/Portfolio'

type View = 'home' | 'projects' | 'about' | 'contact'

export default function Page() {
  const [view, setView] = useState<View>('home')
  const [projectId, setProjectId] = useState<string>('traces-of-light')
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <main>
      <nav className="site-nav ic-mono">
        <button onClick={() => { setView('home'); setMobileNavOpen(false) }} aria-label="Sarah Nicholl — Home" className="site-word">
          Sarah Nicholl
        </button>

        <button className="nav-burger" aria-label="Toggle menu" onClick={() => setMobileNavOpen((o) => !o)}>
          {mobileNavOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-links ${mobileNavOpen ? 'open' : ''}`}>
          <div className={`nav-dd ${projectsOpen ? 'open' : ''}`}>
            <button onClick={() => setProjectsOpen((o) => !o)} className={`nav-btn ${view === 'projects' ? 'active' : ''}`}>
              Projects
              <span className="chev">▾</span>
            </button>
            {projectsOpen && (
              <>
                <div onClick={() => setProjectsOpen(false)} className="nav-dd-backdrop" />
                <div className="nav-dd-panel">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setProjectId(p.id)
                        setView('projects')
                        setProjectsOpen(false)
                        setMobileNavOpen(false)
                      }}
                      className={`nav-dd-opt ${p.id === projectId && view === 'projects' ? 'active' : ''}`}
                    >
                      <span className="no">{p.no}</span>
                      <span className="t">{p.title}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button onClick={() => { setView('about'); setMobileNavOpen(false) }} className={`nav-btn ${view === 'about' ? 'active' : ''}`}>
            About
          </button>
          <button onClick={() => { setView('contact'); setMobileNavOpen(false) }} className={`nav-btn ${view === 'contact' ? 'active' : ''}`}>
            Contact
          </button>
        </div>
      </nav>

      {view === 'home' && <Home go={(p) => setView(p as View)} />}
      {view === 'projects' && <Projects projectId={projectId} />}
      {view === 'about' && <About />}
      {view === 'contact' && <Contact />}
    </main>
  )
}
