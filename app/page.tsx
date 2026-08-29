'use client'

import { useState } from 'react'
import { Home, Projects, About, Contact, projects } from '@/components/Portfolio'

type View = 'home' | 'projects' | 'about' | 'contact'

export default function Page() {
  const [view, setView] = useState<View>('home')
  const [projectId, setProjectId] = useState<string>(projects[0].id)
  const [projectsOpen, setProjectsOpen] = useState(false)

  const navBtnStyle = (active: boolean) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'inherit',
    opacity: active ? 1 : 0.5,
    fontSize: '0.75rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    padding: 0,
  })

  return (
    <main>
      <nav
        className="ic-mono"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 2rem',
          borderBottom: '1px solid #d2cbbb',
          position: 'sticky',
          top: 0,
          background: 'var(--paper)',
          zIndex: 20,
        }}
      >
        {/* Wordmark doubles as the Home link — no separate "Home" nav item */}
        <button onClick={() => setView('home')} aria-label="Sarah Nicholl — Home" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontFamily: 'serif', fontStyle: 'italic', fontSize: '1.1rem', padding: 0 }}>
          Sarah Nicholl
        </button>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {/* Projects — dropdown lives on the nav button itself */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setProjectsOpen((o) => !o)} style={{ ...navBtnStyle(view === 'projects'), display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              Projects
              <span style={{ fontSize: '0.6rem', transition: 'transform 0.2s ease', transform: projectsOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
            </button>
            {projectsOpen && (
              <>
                <div onClick={() => setProjectsOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 25 }} />
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.6rem)',
                    left: 0,
                    minWidth: '230px',
                    background: 'var(--paper)',
                    border: '1px solid #d2cbbb',
                    zIndex: 30,
                    boxShadow: '0 14px 34px rgba(38,38,34,0.1)',
                  }}
                >
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setProjectId(p.id)
                        setView('projects')
                        setProjectsOpen(false)
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        background: p.id === projectId && view === 'projects' ? 'var(--mat)' : 'none',
                        border: 'none',
                        borderBottom: '1px solid #d2cbbb',
                        padding: '0.85rem 1.05rem',
                        cursor: 'pointer',
                        color: 'inherit',
                      }}
                    >
                      <span style={{ display: 'block', fontSize: '0.62rem', opacity: 0.5, marginBottom: '0.25rem' }}>{p.no}</span>
                      <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '1rem', textTransform: 'none', letterSpacing: 0 }}>{p.title}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button onClick={() => setView('about')} style={navBtnStyle(view === 'about')}>
            About
          </button>
          <button onClick={() => setView('contact')} style={navBtnStyle(view === 'contact')}>
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
