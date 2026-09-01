'use client'

import { useEffect, useRef, useState } from 'react'

export const About = () => (
  <section style={{ maxWidth: '42ch', margin: '4rem auto 0 auto', padding: '0 1rem' }}>
    <h2 className="ic-mono" style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>About</h2>
    <p style={{ fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 300, opacity: 0.85 }}>Sarah Nicholl is a photographer whose work explores the ephemeral interactions of cast illumination and physical boundaries inside active installations.</p>
  </section>
)

export const Contact = () => (
  <section style={{ maxWidth: '42ch', margin: '4rem auto 0 auto', padding: '0 1rem' }}>
    <h2 className="ic-mono" style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Contact</h2>
    <p style={{ fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 300, opacity: 0.85 }}>For custom prints, documentation inquiries, or gallery placement portfolios, contact directly via: <a href="mailto:info@light-work.co.uk" style={{ borderBottom: '1px solid var(--ink)' }}>info@light-work.co.uk</a></p>
  </section>
)

export const projects = [
  { id: 'traces-of-light', no: '01', title: 'Traces of Light' },
  { id: 'spellbind', no: '02', title: 'Spellbind' },
  { id: 'rooms-after', no: '03', title: 'Rooms After' }
]

export function Home({ go }: { go: (p: string) => void }) {
  const words = ['Photography', 'Drawing', 'Sculpture', 'Film']
  return (
    <section className="ic-hero" style={{ padding: '0 1rem' }}>
      <div className="ic-hero-copy">
        <p className="ic-mono" style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
          {words.map((w, i) => (
            <span key={w}>
              {w}
              {i < words.length - 1 && <span style={{ margin: '0 0.55em', opacity: 0.5 }}>·</span>}
            </span>
          ))}
        </p>
        <h1 className="ic-hero-h1" style={{ fontSize: 'calc(1.8rem + 1.5vw)', lineHeight: 1.15, fontWeight: 300, letterSpacing: '-0.02em', marginBottom: '3rem', maxWidth: '24ch' }}>
          How fleeting moments of light and shadow briefly transform the everyday
        </h1>
        <blockquote style={{ borderLeft: '1px solid var(--ink)', paddingLeft: '1.5rem', margin: '0 0 3.5rem 0', opacity: 0.85 }}>
          <p style={{ fontStyle: 'italic', marginBottom: '0.5rem', fontSize: '1.05rem' }}>&ldquo;All the diversity, all the charm, and all the beauty of life are made up of light and shade.&rdquo;</p>
          <footer className="ic-mono" style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>— Leo Tolstoy</footer>
        </blockquote>
        <div className="ic-hero-foot">
          <button type="button" className="ic-mono" style={{ background: 'none', border: 'none', borderBottom: '1px solid var(--ink)', padding: '0 0 0.25rem 0', cursor: 'pointer', fontSize: '0.9rem' }} onClick={() => go('projects')}>
            View projects →
          </button>
        </div>
      </div>
      <div className="ic-hero-media" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
        <div className="piece-photo" style={{ width: '100%', maxHeight: '70vh', overflow: 'hidden' }}>
          <img src="/images/image_I8iUdA.png" alt="Light tracing shadow lines artwork" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}

type MediaItem =
  | { type: 'photo'; src: string; alt: string; color?: boolean }

  | { type: 'drawing'; variant: 'window' | 'stair' | 'figure' | 'curtain' }
  | { type: 'film'; bx: string; by: string }

function Photo({ media, fill = false }: { media: Extract<MediaItem, { type: 'photo' }>; fill?: boolean }) {
  return (
    <div className="piece-photo" style={fill ? { width: '100%', height: '100%' } : undefined}>
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        style={{
          width: '100%',
          display: 'block',
          ...(fill ? { height: '100%', objectFit: 'cover' as const } : { height: 'auto' }),
          ...(media.color ? { filter: 'none' } : { filter: 'grayscale(100%)' }),
        }}
      />
    </div>
  )
}

const DRAWINGS: Record<Extract<MediaItem, { type: 'drawing' }>['variant'], JSX.Element> = {
  window: (
    <svg viewBox="0 0 400 300" fill="none" style={{ width: '100%', height: 'auto', background: 'var(--paper-matted)' }}>
      <path d="M40 40 H360 V270 H40 Z" stroke="#262622" strokeWidth={1.1} />
      <path d="M200 40 V270 M40 150 H360" stroke="#262622" strokeWidth={0.8} />
      <path d="M60 260 C 120 150, 160 140, 230 90 C 270 60, 320 70, 350 50" stroke="#9C7C4F" strokeWidth={1} opacity={0.7} />
      <path d="M90 220 C 140 190, 180 200, 220 170" stroke="#262622" strokeWidth={0.7} opacity={0.5} />
    </svg>
  ),
  stair: (
    <svg viewBox="0 0 300 380" fill="none" style={{ width: '100%', height: 'auto', background: 'var(--paper-matted)' }}>
      <path d="M20 360 H90 V310 H160 V260 H230 V210 H280" stroke="#262622" strokeWidth={1.1} />
      <path d="M20 360 L20 40" stroke="#262622" strokeWidth={0.7} opacity={0.6} />
      <path d="M40 60 C 90 30, 150 20, 200 10" stroke="#9C7C4F" strokeWidth={1} opacity={0.65} />
      <path d="M110 340 C 130 300, 160 280, 210 250" stroke="#262622" strokeWidth={0.5} opacity={0.35} />
    </svg>
  ),
  figure: (
    <svg viewBox="0 0 260 380" fill="none" style={{ width: '100%', height: 'auto', background: 'var(--paper-matted)' }}>
      <path d="M130 30 C 150 30, 160 55, 155 75 C 150 95, 140 100, 130 100 C 120 100, 110 95, 105 75 C 100 55, 110 30, 130 30 Z" stroke="#262622" strokeWidth={1} />
      <path d="M130 100 C 110 140, 100 200, 105 260 C 108 300, 118 330, 130 360" stroke="#262622" strokeWidth={1} />
      <path d="M130 100 C 150 140, 158 200, 150 260 C 146 300, 138 330, 130 360" stroke="#262622" strokeWidth={0.7} opacity={0.7} />
      <path d="M60 340 H200" stroke="#9C7C4F" strokeWidth={0.8} opacity={0.6} />
    </svg>
  ),
  curtain: (
    <svg viewBox="0 0 320 260" fill="none" style={{ width: '100%', height: 'auto', background: 'var(--paper-matted)' }}>
      <path d="M20 20 C 40 90, 15 150, 35 240" stroke="#262622" strokeWidth={1} />
      <path d="M60 15 C 80 90, 55 160, 75 245" stroke="#262622" strokeWidth={0.8} opacity={0.8} />
      <path d="M100 10 C 120 95, 92 170, 112 250" stroke="#262622" strokeWidth={0.6} opacity={0.55} />
      <path d="M150 20 C 220 40, 260 60, 300 40" stroke="#9C7C4F" strokeWidth={1} opacity={0.65} />
    </svg>
  ),
}

function Drawing({ media }: { media: Extract<MediaItem, { type: 'drawing' }> }) {
  return <div className="piece-drawing" style={{ width: '100%', border: '1px solid rgba(0,0,0,0.06)' }}>{DRAWINGS[media.variant]}</div>
}

function Film({ media }: { media: Extract<MediaItem, { type: 'film' }> }) {
  return (
    <div className="piece-film" style={{ ['--bx' as any]: media.bx, ['--by' as any]: media.by, width: '100%', aspectRatio: '16/9', position: 'relative', overflow: 'hidden', background: '#0a0a09' }}>
      <div className="beam" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at var(--bx) var(--by50))', pointerEvents: 'none' }} />
      <div className="grain" style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://w3.org\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', pointerEvents: 'none' }} />
      <div className="scan" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)', backgroundSize: '100% 4px', zIndex: 2, pointerEvents: 'none', opacity: 0.3 }} />
      <div className="vig" style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 80px rgba(0,0,0,0.8)', pointerEvents: 'none' }} />
    </div>
  )
}

function Piece({ media, fill }: { media: MediaItem; fill?: boolean }) {
  if (media.type === 'photo') return <Photo media={media} fill={fill} />
  if (media.type === 'drawing') return <Drawing media={media} />
  return <Film media={media} />
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView] as const
}

type Align = 'left' | 'right' | 'center'
type RailItem = { media: MediaItem; w: string; idx: string; cap: string }

type Section =
  | { kind: 'single'; media: MediaItem; w: string; align: Align; idx: string; cap: string }
  | { kind: 'full'; media: MediaItem; idx: string; cap: string }
  | { kind: 'space'; w: string; align: Align; idx: string; cap: string }
  | { kind: 'rail'; label: string; items: RailItem[]; caption?: string; tightBottom?: boolean }
  | { kind: 'grid'; columns: number; items: MediaItem[]; label?: string }
  | { kind: 'text'; paragraphs: string[] }

function SectionBlock({ section }: { section: Section }) {
  const [ref, inView] = useReveal<HTMLDivElement>()

  if (section.kind === 'single') {
    return (

