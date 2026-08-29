'use client'

import { useEffect, useRef, useState } from 'react'

/* ================================================================== */
/* 1. Home View                                                       */
/* ================================================================== */
export function Home({ go }: { go: (p: string) => void }) {
  const words = ['Photography', 'Drawing', 'Sculpture', 'Film']
  return (
    <section className="ic-hero" style={{ padding: '6rem 2rem', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '3rem', alignItems: 'center', minHeight: '85vh' }}>
      <div className="ic-hero-copy" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <p className="ic-hero-eyebrow ic-mono" style={{ fontSize: '0.78rem', letterSpacing: '0.08em', opacity: 0.65 }}>
          {words.map((w, i) => (
            <span key={w}>
              {w}
              {i < words.length - 1 && <span style={{ margin: '0 0.55em', opacity: 0.5 }}>·</span>}
            </span>
          ))}
        </p>

        <h1 style={{ fontSize: 'clamp(2.1rem, 3.4vw, 2.8rem)', fontWeight: 300, lineHeight: 1.25, fontFamily: 'serif', fontStyle: 'italic', margin: 0 }}>
          How fleeting moments of light and shadow briefly transform the everyday
        </h1>

        <blockquote style={{ margin: 0, paddingLeft: '1rem', borderLeft: '1px solid #D2CBBB' }}>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.75, margin: 0, fontStyle: 'italic' }}>
            &ldquo;All the diversity, all the charm, and all the beauty of life are made up of light and shade.&rdquo;
          </p>
          <footer className="ic-mono" style={{ marginTop: '0.5rem', fontSize: '0.7rem', opacity: 0.55, fontStyle: 'normal' }}>Leo Tolstoy</footer>
        </blockquote>

        <div className="ic-hero-foot" style={{ marginTop: '1rem' }}>
          <button
            type="button"
            className="ic-mono"
            onClick={() => go('projects')}
            style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, fontSize: '0.75rem', letterSpacing: '0.04em', borderBottom: '1px solid currentColor' }}
          >
            View projects →
          </button>
        </div>
      </div>

      <div className="ic-hero-media" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div className="piece-photo" style={{ width: '100%', maxWidth: '640px' }}>
          <img src="/images/home-hero.jpg" alt="Light tracing across train tracks at night" loading="lazy" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/* 2. Media pieces — photo / drawing / film                           */
/* ================================================================== */
type MediaItem =
  | { type: 'photo'; src: string; alt: string }
  | { type: 'drawing'; variant: 'window' | 'stair' | 'figure' | 'curtain' }
  | { type: 'film'; bx: string; by: string }

function Photo({ media, fill = false }: { media: Extract<MediaItem, { type: 'photo' }>; fill?: boolean }) {
  return (
    <div className="piece-photo" style={fill ? { width: '100%', height: '100%' } : undefined}>
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        style={fill ? { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } : undefined}
      />
    </div>
  )
}

const DRAWINGS: Record<Extract<MediaItem, { type: 'drawing' }>['variant'], JSX.Element> = {
  window: (
    <svg viewBox="0 0 400 300" fill="none">
      <path d="M40 40 H360 V270 H40 Z" stroke="#262622" strokeWidth={1.1} />
      <path d="M200 40 V270 M40 150 H360" stroke="#262622" strokeWidth={0.8} />
      <path d="M60 260 C 120 150, 160 140, 230 90 C 270 60, 320 70, 350 50" stroke="#9C7C4F" strokeWidth={1} opacity={0.7} />
      <path d="M90 220 C 140 190, 180 200, 220 170" stroke="#262622" strokeWidth={0.7} opacity={0.5} />
    </svg>
  ),
  stair: (
    <svg viewBox="0 0 300 380" fill="none">
      <path d="M20 360 H90 V310 H160 V260 H230 V210 H280" stroke="#262622" strokeWidth={1.1} />
      <path d="M20 360 L20 40" stroke="#262622" strokeWidth={0.7} opacity={0.6} />
      <path d="M40 60 C 90 30, 150 20, 200 10" stroke="#9C7C4F" strokeWidth={1} opacity={0.6} />
      <path d="M110 340 C 130 300, 160 280, 210 250" stroke="#262622" strokeWidth={0.5} opacity={0.35} />
    </svg>
  ),
  figure: (
    <svg viewBox="0 0 260 380" fill="none">
      <path d="M130 30 C 150 30, 160 55, 155 75 C 150 95, 140 100, 130 100 C 120 100, 110 95, 105 75 C 100 55, 110 30, 130 30 Z" stroke="#262622" strokeWidth={1} />
      <path d="M130 100 C 110 140, 100 200, 105 260 C 108 300, 118 330, 130 360" stroke="#262622" strokeWidth={1} />
      <path d="M130 100 C 150 140, 158 200, 150 260 C 146 300, 138 330, 130 360" stroke="#262622" strokeWidth={0.7} opacity={0.7} />
      <path d="M60 340 H200" stroke="#9C7C4F" strokeWidth={0.8} opacity={0.6} />
    </svg>
  ),
  curtain: (
    <svg viewBox="0 0 320 260" fill="none">
      <path d="M20 20 C 40 90, 15 150, 35 240" stroke="#262622" strokeWidth={1} />
      <path d="M60 15 C 80 90, 55 160, 75 245" stroke="#262622" strokeWidth={0.8} opacity={0.8} />
      <path d="M100 10 C 120 95, 92 170, 112 250" stroke="#262622" strokeWidth={0.6} opacity={0.55} />
      <path d="M150 20 C 220 40, 260 60, 300 40" stroke="#9C7C4F" strokeWidth={1} opacity={0.65} />
    </svg>
  ),
}

function Drawing({ media }: { media: Extract<MediaItem, { type: 'drawing' }> }) {
  return <div className="piece-drawing">{DRAWINGS[media.variant]}</div>
}

function Film({ media }: { media: Extract<MediaItem, { type: 'film' }> }) {
  return (
    <div className="piece-film" style={{ ['--bx' as any]: media.bx, ['--by' as any]: media.by }}>
      <div className="beam" />
      <div className="grain" />
      <div className="scan" />
      <div className="vig" />
    </div>
  )
}

function Piece({ media, fill }: { media: MediaItem; fill?: boolean }) {
  if (media.type === 'photo') return <Photo media={media} fill={fill} />
  if (media.type === 'drawing') return <Drawing media={media} />
  return <Film media={media} />
}

/* ================================================================== */
/* 3. Reveal-on-scroll hook                                           */
/* ================================================================== */
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
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView] as const
}

/* ================================================================== */
/* 4. Section types                                                    */
/* ================================================================== */
type Align = 'left' | 'right' | 'center'

type Section =
  | { kind: 'single'; media: MediaItem; w: string; align: Align; idx: string; cap: string }
  | { kind: 'full'; media: MediaItem; idx: string; cap: string }
  | { kind: 'space'; w: string; align: Align; idx: string; cap: string }
  | { kind: 'rail'; label: string; items: { media: MediaItem; w: string; idx: string; cap: string }[] }
  | { kind: 'filmSlot'; label?: string }
  | { kind: 'mosaic'; items: MediaItem[] }
  | { kind: 'bookSpread'; left: MediaItem; right: MediaItem }
  | { kind: 'contactSheet'; items: MediaItem[] }

// Deterministic pseudo-random offset per index, so scattered layouts are stable across renders
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function SectionBlock({ section }: { section: Section }) {
  const [ref, inView] = useReveal<HTMLDivElement>()

  if (section.kind === 'single') {
    return (
      <div
        ref={ref}
        className={`sec ${inView ? 'in' : ''}`}
        style={{ width: section.w, alignSelf: section.align === 'left' ? 'flex-start' : section.align === 'right' ? 'flex-end' : 'center' }}
      >
        <Piece media={section.media} />
        <div className="sec-cap" style={{ justifyContent: section.align === 'right' ? 'flex-end' : section.align === 'center' ? 'center' : 'flex-start' }}>
          <span className="idx">{section.idx}</span>
          <span className="txt">{section.cap}</span>
        </div>
      </div>
    )
  }

  if (section.kind === 'full') {
    return (
      <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '100%', alignSelf: 'center' }}>
        <Piece media={section.media} />
        <div className="sec-cap" style={{ justifyContent: 'center' }}>
          <span className="idx">{section.idx}</span>
          <span className="txt">{section.cap}</span>
        </div>
      </div>
    )
  }

  if (section.kind === 'space') {
    return (
      <div
        ref={ref}
        className={`sec sec-space ${inView ? 'in' : ''}`}
        style={{ width: section.w, alignSelf: section.align === 'left' ? 'flex-start' : section.align === 'right' ? 'flex-end' : 'center' }}
      >
        <div className="sec-cap">
          <span className="idx">{section.idx}</span>
          <span className="txt">{section.cap}</span>
        </div>
      </div>
    )
  }

  if (section.kind === 'rail') {
    return (
      <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '100%', alignSelf: 'center' }}>
        <div className="rail-hint">
          <span>{section.label}</span>
          <span className="rline" />
          <span>scroll →</span>
        </div>
        <div className="rail">
          {section.items.map((it, i) => (
            <div key={i} className="rail-item" style={{ width: it.w }}>
              <Piece media={it.media} />
              {it.cap && (
                <div className="cap">
                  {it.idx} — {it.cap}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (section.kind === 'filmSlot') {
    return (
      <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '100%', alignSelf: 'center' }}>
        <div className="film-slot">
          <span className="ic-mono">{section.label ?? 'Film — to be added'}</span>
        </div>
      </div>
    )
  }

  if (section.kind === 'mosaic') {
    return (
      <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '100%', alignSelf: 'center' }}>
        <div className="mosaic">
          {section.items.map((m, i) => {
            const rot = (seeded(i, 1) - 0.5) * 6
            const dy = (seeded(i, 2) - 0.5) * 22
            const size = 96 + seeded(i, 3) * 64 // 96px - 160px
            return (
              <div
                key={i}
                className="mosaic-item"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: `rotate(${rot.toFixed(2)}deg) translateY(${dy.toFixed(1)}px)`,
                }}
              >
                <Piece media={m} fill />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (section.kind === 'bookSpread') {
    return (
      <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '92%', alignSelf: 'center' }}>
        <div className="book-spread">
          <div className="book-page book-page-left">
            <Piece media={section.left} fill />
          </div>
          <div className="book-gutter" />
          <div className="book-page book-page-right">
            <Piece media={section.right} fill />
          </div>
        </div>
      </div>
    )
  }

  // contactSheet
  return (
    <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '100%', alignSelf: 'center' }}>
      <div className="contact-sheet">
        {section.items.map((m, i) => (
          <div key={i} className="contact-sheet-item">
            <Piece media={m} fill />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ================================================================== */
/* 5. Project data                                                     */
/* ================================================================== */
export type Project = {
  id: string
  no: string
  title: string
  year: string
  medium: string
  blurb: string
  sections: Section[]
}

const tracingLightScroll = [1, 2, 3, 4, 5].map((n) => ({
  media: { type: 'photo' as const, src: `/images/tracing-light-scroll-${n}.jpg`, alt: `Tracing Light — study ${n}` },
  w: '46vw',
  idx: `${n}`,
  cap: '',
}))

const tracingLightMosaic: MediaItem[] = Array.from({ length: 16 }, (_, i) => ({
  type: 'photo' as const,
  src: `/images/tracing-light-patch-${i + 1}.jpg`,
  alt: `Tracing Light — fragment ${i + 1}`,
}))

const kingsCrossScroll = [1, 2, 3, 4, 5, 6].map((n) => ({
  media: { type: 'photo' as const, src: `/images/kings-cross-scroll-${n}.jpg`, alt: `King's Cross Storeys — study ${n}` },
  w: '42vw',
  idx: `${n}`,
  cap: '',
}))

export const projects: Project[] = [
  {
    id: 'tracing-light',
    no: 'P.01',
    title: 'Tracing Light',
    year: '',
    medium: '',
    blurb:
      "Tracing Light is an ongoing body of work exploring the behaviour of light and shadow in relation to space, time and transience. Through photography, print, installation and moving image, the work attends to fleeting moments of illumination within ordinary environments, where light's passage briefly transforms perception and draws attention to the temporal nature of the everyday.\n\nBy extending the photographic image beyond representation into material and spatial forms, the work invites slower, more attentive ways of seeing.",
    sections: [
      { kind: 'rail', label: '01 — Scroll', items: tracingLightScroll },
      { kind: 'filmSlot' },
      { kind: 'mosaic', items: tracingLightMosaic },
    ],
  },
  {
    id: 'kings-cross-storeys',
    no: 'P.02',
    title: "King's Cross Storeys",
    year: '',
    medium: '',
    blurb: '',
    sections: [
      { kind: 'rail', label: '01 — Scroll', items: kingsCrossScroll },
      { kind: 'filmSlot' },
      { kind: 'mosaic', items: [] },
    ],
  },
  {
    id: 'many-hands-make',
    no: 'P.03',
    title: 'Many Hands Make',
    year: '',
    medium: '',
    blurb: '',
    sections: [
      { kind: 'full', media: { type: 'photo', src: '/images/project3-hero.jpg', alt: 'Many Hands Make — landscape study' }, idx: '', cap: '' },
      {
        kind: 'bookSpread',
        left: { type: 'photo', src: '/images/project3-spread-left.jpg', alt: 'Many Hands Make — spread, left page' },
        right: { type: 'photo', src: '/images/project3-spread-right.jpg', alt: 'Many Hands Make — spread, right page' },
      },
      {
        kind: 'contactSheet',
        items: [1, 2, 3, 4].map((n) => ({ type: 'photo' as const, src: `/images/project3-contact-${n}.jpg`, alt: `Many Hands Make — contact sheet frame ${n}` })),
      },
    ],
  },
]

/* ================================================================== */
/* 6. Projects page — project chosen via the nav dropdown              */
/* ================================================================== */
export function Projects({ projectId }: { projectId?: string }) {
  const active = projects.find((p) => p.id === projectId) ?? projects[0]

  return (
    <section style={{ padding: '4rem 2rem 8rem' }}>
      <div className="ic-section-head" style={{ marginBottom: '3rem' }}>
        <span className="ic-mono" style={{ opacity: 0.5 }}>
          {active.no} — Selected work
        </span>
        <h2 style={{ fontSize: '2rem', fontFamily: 'serif', fontStyle: 'italic', fontWeight: 300, margin: '0.5rem 0 0' }}>{active.title}</h2>

        {active.blurb && (
          <div style={{ maxWidth: '640px', marginTop: '1.5rem' }}>
            {active.blurb.split('\n\n').map((p, i) => (
              <p key={i} style={{ fontSize: '1.02rem', lineHeight: 1.65, opacity: 0.85, margin: '0 0 1rem' }}>
                {p}
              </p>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4rem' }}>
        {active.sections.map((section, i) => (
          <SectionBlock key={`${active.id}-${i}`} section={section} />
        ))}
      </div>
    </section>
  )
}

/* ================================================================== */
/* 7. About                                                             */
/* ================================================================== */
export function About() {
  return (
    <section style={{ padding: '6rem 2rem 10rem', display: 'flex', gap: '5rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 260px' }}>
        <span className="ic-mono" style={{ opacity: 0.5, fontSize: '0.75rem' }}>About</span>
        <div className="piece-photo" style={{ width: '160px', marginTop: '1.5rem' }}>
          <img src="/images/about-emblem.jpg" alt="Rainbow of light cast across a wall by a light switch" loading="lazy" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>

      <div style={{ flex: '1.3 1 380px', maxWidth: '34em', opacity: 0.9 }}>
        <p style={{ margin: '0 0 1.4rem', lineHeight: 1.7 }}>
          My practice explores the behaviour of light and shadow in relation to space, time and
          transience. Working across photography, film and sculpture, the work attends to fleeting
          moments of illumination within ordinary, everyday environments, where light&rsquo;s passage
          briefly alters perception and draws attention to the fragile temporality of experience.
        </p>
        <p style={{ margin: '0 0 1.4rem', lineHeight: 1.7 }}>
          An enduring fascination with light underpins the practice, shaping an intuitive process of
          observation, experimentation and material enquiry. Photography provides the starting point
          for an expanded practice in which images are translated through thread, moving image,
          drawing and installation, allowing light itself to become both material and metaphor.
        </p>
      </div>
    </section>
  )
}

/* ================================================================== */
/* 8. Contact                                                           */
/* ================================================================== */
export function Contact() {
  return (
    <section style={{ padding: '10rem 2rem 14rem', minHeight: '55vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <span className="ic-mono" style={{ opacity: 0.5, fontSize: '0.75rem' }}>Contact</span>
      <h2 style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3.2rem)', margin: '1rem 0 2rem', maxWidth: '14em' }}>
        Get in touch
      </h2>
      <a
        href="mailto:light-work.co.uk@gmail.com"
        className="contact-link"
        style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', borderBottom: '1px solid #d2cbbb', paddingBottom: '0.3rem', display: 'inline-block', width: 'fit-content', textDecoration: 'none', color: 'inherit' }}
      >
        light-work.co.uk@gmail.com
      </a>
      <div style={{ marginTop: '3rem' }}>
        <span className="ic-mono" style={{ display: 'block', fontSize: '0.66rem', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
          Prints
        </span>
        <span style={{ fontSize: '0.9rem' }}>Available on request</span>
      </div>
    </section>
  )
}
