'use client'

import { useState } from 'react'
import { Home, Projects, About, Contact } from '@/components/Portfolio'

type View = 'home' | 'projects' | 'about' | 'contact'

export default function Page() {
  const [view, setView] = useState<View>('home')

  const navBtn = (id: View, label: string) => (
    <button
      onClick={() => setView(id)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'inherit',
        opacity: view === id ? 1 : 0.5,
        fontSize: '0.75rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: 0,
      }}
    >
      {label}
    </button>
  )

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
        <button
          onClick={() => setView('home')}
          aria-label="Iris Calder — Home"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'inherit',
            fontFamily: 'serif',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            padding: 0,
          }}
        >
          Iris Calder
        </button>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {navBtn('projects', 'Projects')}
          {navBtn('about', 'About')}
          {navBtn('contact', 'Contact')}
        </div>
      </nav>

      {view === 'home' && <Home go={(p) => setView(p as View)} />}
      {view === 'projects' && <Projects />}
      {view === 'about' && <About />}
      {view === 'contact' && <Contact />}
    </main>
  )
}
