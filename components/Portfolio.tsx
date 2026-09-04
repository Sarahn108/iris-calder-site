'use client'

import { useEffect, useRef, useState } from 'react'

/* ================================================================== */
/* 1. Home View                                                       */
/* ================================================================== */
export function Home({ go }: { go: (p: string) => void }) {
  const words = ['Photography', 'Drawing', 'Sculpture', 'Film']
  return (
    <section className="ic-hero">
      <div className="ic-hero-copy">
        <p className="ic-hero-eyebrow ic-mono">
          {words.map((w, i) => (
            <span key={w}>
              {w}
              {i < words.length - 1 && <span style={{ margin: '0 0.55em', opacity: 0.5 }}>·</span>}
            </span>
          ))}
        </p>

        <h1 className="ic-hero-h1">How fleeting moments of light and shadow briefly transform the everyday</h1>

        <blockquote className="ic-hero-quote">
          <p>&ldquo;All the diversity, all the charm, and all the beauty of life are made up of light and shade.&rdquo;</p>
          <footer className="ic-mono">Leo Tolstoy</footer>
        </blockquote>

        <div className="ic-hero-foot">
          <button type="button" className="ic-mono ic-hero-cta" onClick={() => go('projects')}>
            View projects →
          </button>
        </div>
      </div>

      <div className="ic-hero-media">
        <div className="piece-photo" style={{ width: '100%' }}>
          <img src="/images/spellbind-scroll-1.jpg" alt="Light tracing across train tracks at night" loading="lazy" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/* 2. Media pieces — photo / drawing / film                           */
/* ================================================================== */
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
          ...(fill ? { width: '100%', height: '100%', objectFit: 'cover' as const, display: 'block' } : {}),
          ...(media.color ? { filter: 'none' } : {}),
        }}
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

type RailItem = { media: MediaItem; w: string; idx: string; cap: string }

type Section =
  | { kind: 'single'; media: MediaItem; w: string; align: Align; idx: string; cap: string }
  | { kind: 'full'; media: MediaItem; idx: string; cap: string }
  | { kind: 'space'; w: string; align: Align; idx: string; cap: string }
  | { kind: 'rail'; label: string; items: RailItem[]; caption?: string; tightBottom?: boolean }
  | { kind: 'filmSlot'; label?: string; w?: string; src?: string; poster?: string }
  | { kind: 'mosaic'; items: MediaItem[] }
  | { kind: 'grid'; columns: number; items: MediaItem[]; label?: string }
  | { kind: 'bookSpread'; left: MediaItem; right: MediaItem }
  | { kind: 'contactSheet'; items: MediaItem[] }
  | { kind: 'pdfBook'; cover: string; title: string; href: string }
  | { kind: 'embed3d'; url: string; label?: string; w?: string }
  | { kind: 'text'; paragraphs: string[] }

// Deterministic pseudo-random offset per index, so scattered layouts are stable across renders
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

function SectionBlock({ section, onImageClick }: { section: Section; onImageClick?: (src: string) => void }) {
  const [ref, inView] = useReveal<HTMLDivElement>()

  if (section.kind === 'single') {
    return (
      <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ ['--w' as any]: section.w, alignSelf: section.align === 'left' ? 'flex-start' : section.align === 'right' ? 'flex-end' : 'center' }}>
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
        {(section.idx || section.cap) && (
          <div className="sec-cap" style={{ justifyContent: 'center' }}>
            <span className="idx">{section.idx}</span>
            <span className="txt">{section.cap}</span>
          </div>
        )}
      </div>
    )
  }

  if (section.kind === 'space') {
    return (
      <div ref={ref} className={`sec sec-space ${inView ? 'in' : ''}`} style={{ ['--w' as any]: section.w, alignSelf: section.align === 'left' ? 'flex-start' : section.align === 'right' ? 'flex-end' : 'center' }}>
        <div className="sec-cap">
          <span className="idx">{section.idx}</span>
          <span className="txt">{section.cap}</span>
        </div>
      </div>
    )
  }

  if (section.kind === 'rail') {
    return (
      <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '100%', alignSelf: 'center', marginBottom: section.tightBottom ? '1.4rem' : undefined }}>
        <div className="rail-hint">
          <span>{section.label}</span>
          <span className="rline" />
          <span>scroll →</span>
        </div>
        <div className="rail">
          {section.items.map((it, i) => (
            <div key={i} className="rail-item" style={{ ['--iw' as any]: it.w }}>
              <div className="rail-item-frame">
                <Piece media={it.media} fill />
              </div>
              {it.cap && (
                <div className="cap">
                  {it.idx} — {it.cap}
                </div>
              )}
            </div>
          ))}
        </div>
        {section.caption && <div className="rail-caption ic-mono">{section.caption}</div>}
      </div>
    )
  }

  if (section.kind === 'filmSlot') {
    if (section.src) {
      return (
        <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '100%', alignSelf: 'center', display: 'flex', justifyContent: 'center' }}>
          <div className="film-real" style={{ ['--fw' as any]: section.w ?? '100%' }}>
            <video controls preload="metadata" poster={section.poster} playsInline>
              <source src={section.src} type="video/mp4" />
            </video>
            {section.label && <div className="rail-caption ic-mono">{section.label}</div>}
          </div>
        </div>
      )
    }
    return (
      <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '100%', alignSelf: 'center', display: 'flex', justifyContent: 'center' }}>
        <div className="film-slot" style={{ ['--fw' as any]: section.w ?? '100%' }}>
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
            const size = 96 + seeded(i, 3) * 64
            return (
              <div key={i} className="mosaic-item" style={{ width: `${size}px`, height: `${size}px`, transform: `rotate(${rot.toFixed(2)}deg) translateY(${dy.toFixed(1)}px)` }}>
                <Piece media={m} fill />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (section.kind === 'grid') {
    return (
      <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '82%', alignSelf: 'center' }}>
        {section.label && (
          <div className="rail-hint">
            <span>{section.label}</span>
            <span className="rline" />
          </div>
        )}
        <div className="clean-grid" style={{ ['--cols' as any]: section.columns }}>
          {section.items.map((m, i) => (
            <div
              key={i}
              className="clean-grid-item"
              style={m.type === 'photo' ? { cursor: 'pointer' } : undefined}
              onClick={m.type === 'photo' ? () => onImageClick?.(m.src) : undefined}
            >
              <Piece media={m} fill />
            </div>
          ))}
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
  if (section.kind === 'contactSheet') {
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

  if (section.kind === 'text') {
    return (
      <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '640px', maxWidth: '100%', alignSelf: 'center' }}>
        {section.paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: '1.02rem', lineHeight: 1.65, opacity: 0.85, margin: '0 0 1rem' }}>
            {p}
          </p>
        ))}
      </div>
    )
  }

  if (section.kind === 'pdfBook') {
    return (
      <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '420px', maxWidth: '100%', alignSelf: 'center' }}>
        <a href={section.href} target="_blank" rel="noopener noreferrer" className="pdf-book-tile">
          <img src={section.cover} alt={`Cover of ${section.title}`} loading="lazy" />
          <div className="pdf-book-caption">
            <span className="ic-mono">{section.title}</span>
            <span className="pdf-book-link ic-mono">View the book (PDF) →</span>
          </div>
        </a>
      </div>
    )
  }

  // embed3d
  return (
    <div ref={ref} className={`sec ${inView ? 'in' : ''}`} style={{ width: '100%', alignSelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="embed-3d-wrap" style={{ ['--ew' as any]: section.w ?? '100%' }}>
        <iframe
          src={section.url}
          className="embed-3d"
          allow="fullscreen; xr-spatial-tracking"
          title={section.label ?? '3D capture'}
        />
        <div className="embed-3d-cover" />
      </div>
      {section.label && <div className="rail-caption ic-mono" style={{ textAlign: 'center' }}>{section.label}</div>}
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
  meta?: string
  blurb: string
  sections: Section[]
}

const railOf = (prefix: string, count: number, w: string): RailItem[] =>
  Array.from({ length: count }, (_, i) => ({
    media: { type: 'photo' as const, src: `/images/${prefix}-${i + 1}.jpg`, alt: `${prefix} ${i + 1}` },
    w,
    idx: `${i + 1}`,
    cap: '',
  }))

const spellbindGrid: MediaItem[] = [
  ...Array.from({ length: 15 }, (_, i) => ({
    type: 'photo' as const,
    src: `/images/spellbind-grid-${i + 1}.jpg`,
    alt: `Spellbind — study ${i + 1}`,
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    type: 'photo' as const,
    src: `/images/spellbind-grid-new${i + 1}.jpg`,
    alt: `Spellbind — study`,
  })),
]

// Scroll: original items 3–12, then the two moved-to-end items (1 & 2), with a new photo leading the whole rail
const spellbindScroll: RailItem[] = [
  { media: { type: 'photo', src: '/images/spellbind-scroll-new1.jpg', alt: 'Spellbind — scroll' }, w: '44vw', idx: '1', cap: '' },
  ...Array.from({ length: 10 }, (_, i) => ({
    media: { type: 'photo' as const, src: `/images/spellbind-scroll-${i + 3}.jpg`, alt: `Spellbind — scroll ${i + 3}` },
    w: '44vw',
    idx: `${i + 2}`,
    cap: '',
  })),
  { media: { type: 'photo', src: '/images/spellbind-scroll-1.jpg', alt: 'Spellbind — scroll 1' }, w: '44vw', idx: '12', cap: '' },
  { media: { type: 'photo', src: '/images/spellbind-scroll-2.jpg', alt: 'Spellbind — scroll 2' }, w: '44vw', idx: '13', cap: '' },
]

const spellbindStudies: RailItem[] = Array.from({ length: 6 }, (_, i) => ({
  media: { type: 'photo' as const, src: `/images/spellbind-studies-${i + 1}.jpg`, alt: `Spellbind — study ${i + 1}`, color: true },
  w: '26vw',
  idx: `${i + 1}`,
  cap: '',
}))

const spellbindGrid2: MediaItem[] = Array.from({ length: 4 }, (_, i) => ({
  type: 'photo' as const,
  src: `/images/spellbind-grid2-${i + 1}.jpg`,
  alt: `Spellbind — study ${i + 1}`,
  color: i === 1, // the red-lit window frame is a genuine colour shot
}))

const kingsCrossScroll: RailItem[] = Array.from({ length: 6 }, (_, i) => ({
  media: { type: 'photo' as const, src: `/images/kings-cross-scroll-${i + 1}.jpg`, alt: `King's Cross Storeys — study ${i + 1}`, color: true },
  w: '42vw',
  idx: `${i + 1}`,
  cap: '',
}))

export const projects: Project[] = [
  {
    id: 'spellbind',
    no: 'P.01',
    title: 'Spellbind',
    meta: 'Public exhibition · Ambika P3, University of Westminster · 2026',
    blurb:
      'Spellbind was presented as part of the group show The Passage, which took place at Ambika P3. The exhibition brought together a range of media, including photography, film, sculpture, AI moving image and immersive media installation.\n\nSpellbind explores fleeting moments of light and shadow that briefly transform the everyday. Through photography, thread and moving image, ephemeral encounters unfold into material and spatial forms, inviting renewed attention to the extraordinary within the ordinary.',
    sections: [
      { kind: 'rail', label: '01 — Scroll', items: spellbindScroll },
      {
        kind: 'filmSlot',
        w: '48%',
        src: '/video/spellbind-film.mp4',
        label: 'Moving Image — Tracing Light (Transience)',
      },
      { kind: 'grid', columns: 5, items: spellbindGrid },
      {
        kind: 'embed3d',
        url: 'https://lumalabs.ai/embed/A16D3019-752A-4C91-852D-E1D3439C689D?mode=sparkles&background=%23ECE8DF&color=%23262622&showTitle=false&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&showMenu=false',
        label: '3D view of Spellbind, Ambika P3',
        w: '40%',
      },
    ],
  },
  {
    id: 'tracing-light',
    no: 'P.02',
    title: 'Tracing Light',
    blurb:
      "Tracing Light is an ongoing body of work exploring the behaviour of light and shadow in relation to space, time and transience. Through photography, print, installation and moving image, the work attends to fleeting moments of illumination within ordinary environments, where light's passage briefly transforms perception and draws attention to the temporal nature of the everyday.",
    sections: [
      // The seven Tracing Light images form the main scroll. The five images
      // that had been sitting below the maquette studies are now returned here,
      // while the maquette images remain as their own smaller scroll.
      {
        kind: 'rail',
        label: '01 — Scroll',
        items: [3, 4, 5, 6, 7, 1, 2].map((n, i) => ({
          media: { type: 'photo' as const, src: `/images/tracing-light-scroll-${n}.jpg`, alt: `Tracing Light — scroll ${n}` },
          w: '42vw',
          idx: `${i + 1}`,
          cap: '',
        })),
      },
      { kind: 'rail', label: 'Tracing Light: Studies I-VI', items: spellbindStudies },
      {
        kind: 'text',
        paragraphs: [
          'Through thread interventions, small-scale studies extend the photographic surface into space, translating light into a sculptural, material form and a metaphor for time.',
        ],
      },
      { kind: 'grid', columns: 4, items: spellbindGrid2, label: '03 — More to follow' },
    ],
  },
  {
    id: 'kings-cross-storeys',
    no: 'P.03',
    title: "King's Cross Storeys",
    blurb: '',
    sections: [
      { kind: 'rail', label: '01 — Scroll', items: kingsCrossScroll },
      { kind: 'text', paragraphs: ['Work in progress.'] },
    ],
  },
  {
    id: 'many-hands-make',
    no: 'P.04',
    title: 'Many Hands Make',
    blurb:
      'Many Hands Make documents the Hampstead Gown Factory, a volunteer-led project established during the first wave of the COVID-19 pandemic to produce surgical gowns for frontline workers at the Royal Free Hospital. Working as a volunteer in the Sewing Room, I photographed the people, their hands and the many swift, transitory processes involved in making and completing the gowns.',
    sections: [
      {
        kind: 'rail',
        label: '01 — Scroll',
        tightBottom: true,
        items: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => ({
          media: { type: 'photo' as const, src: `/images/mhm-scroll-${n}.jpg`, alt: `Many Hands Make — photo ${n}`, color: true },
          w: '38vw',
          idx: `${n}`,
          cap: '',
        })),
      },
      {
        kind: 'pdfBook',
        cover: '/images/mhm-book-cover.jpg',
        title: 'The Hampstead Gown Factory',
        href: '/pdf/hampstead-gown-factory.pdf',
      },
      {
        kind: 'text',
        paragraphs: [
          'More than 600 volunteers came together between May and August 2020, working across the Sewing, Cutting and Finishing Rooms. Over four months, the Hampstead Gown Factory produced more than 50,000 medical-grade surgical gowns. The resulting publication was designed by Adam Brown and created as a collaboration between Adam and myself, celebrating the project and some of the many volunteers involved.',
        ],
      },
      {
        kind: 'grid',
        columns: 5,
        items: [
          ...Array.from({ length: 26 }, (_, i) => ({ type: 'photo' as const, src: `/images/mhm-other-${i + 1}.jpg`, alt: `Many Hands Make — thumbnail`, color: true })),
          ...Array.from({ length: 12 }, (_, i) => ({ type: 'photo' as const, src: `/images/mhm-scroll-${i + 1}.jpg`, alt: `Many Hands Make — thumbnail`, color: true })),
        ],
      },
    ],
  },
]

/* ================================================================== */
/* 6. Projects page — project chosen via the nav dropdown              */
/* ================================================================== */
export function Projects({ projectId }: { projectId?: string }) {
  const active = projects.find((p) => p.id === projectId) ?? projects[0]
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section className="proj-page">
      <div className="ic-section-head" style={{ position: 'relative' }}>
        <div className="emblem-mini">
          <img src="/images/about-emblem-circle.jpg" alt="" />
        </div>
        <span className="ic-mono" style={{ opacity: 0.5 }}>
          {active.no} — Selected work
        </span>
        <h2 className="proj-title">{active.title}</h2>
        {active.meta && (
          <p className="ic-mono" style={{ fontSize: '0.78rem', opacity: 0.55, marginTop: '0.6rem' }}>
            {active.meta}
          </p>
        )}

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

      <div className="proj-flow">
        {active.sections.map((section, i) => (
          <SectionBlock key={`${active.id}-${i}`} section={section} onImageClick={setLightbox} />
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" />
        </div>
      )}
    </section>
  )
}

/* ================================================================== */
/* 7. About                                                             */
/* ================================================================== */
export function About() {
  const exhibitions = [
    { show: 'Spellbind, Ambika P3, London', year: '2026' },
    { show: 'Image Futures, Gallery West, University of Westminster, Harrow', year: '2025' },
    { show: 'Art in Adversity, Burgh House, London', year: '2021' },
  ]
  const publications = [
    { show: 'Tracing Light: Artist Publication', year: '2026' },
    { show: 'Hampstead Gown Factory (Royal Free Charity)', year: '2021' },
  ]

  return (
    <section className="about-page">
      <div className="about-emblem-circle">
        <img src="/images/about-emblem-circle.jpg" alt="Rainbow of light cast across a wall by a light switch" loading="lazy" />
      </div>

      <div className="about-body">
        <p>
          My practice explores the behaviour of light and shadow in relation to space, time and
          transience. Working across photography, film and sculpture, the work attends to fleeting
          moments of illumination within ordinary, everyday environments, where light&rsquo;s passage
          briefly alters perception and draws attention to the fragile temporality of experience.
        </p>
        <p>
          An enduring fascination with light underpins the practice, shaping an intuitive process of
          observation, experimentation and material enquiry. Photography provides the starting point
          for an expanded practice in which images are translated through thread, moving image,
          drawing and installation, allowing light itself to become both material and metaphor.
        </p>

        <div className="about-list">
          <h3 className="ic-mono">Selected Exhibitions</h3>
          {exhibitions.map((e) => (
            <div key={e.show} className="about-list-row">
              <span>{e.show}</span>
              <span className="ic-mono">{e.year}</span>
            </div>
          ))}
        </div>

        <div className="about-list">
          <h3 className="ic-mono">Selected Publications &amp; Features</h3>
          {publications.map((e) => (
            <div key={e.show} className="about-list-row">
              <span>{e.show}</span>
              <span className="ic-mono">{e.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/* 8. Contact                                                           */
/* ================================================================== */
export function Contact() {
  return (
    <section className="contact-page">
      <div className="about-emblem-circle" style={{ marginBottom: '1.5rem' }}>
        <img src="/images/about-emblem-circle.jpg" alt="" />
      </div>
      <span className="ic-mono" style={{ opacity: 0.5, fontSize: '0.75rem' }}>Contact</span>
      <h2 className="contact-h2">Get in touch</h2>
      <a href="mailto:light-work.co.uk@gmail.com" className="contact-link">
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
