'use client'

import { useEffect, useRef, useState } from 'react'

/* ================================================================== */
/* 1. Home View                                                       */
/* ================================================================== */
export function Home({ go }: { go: (p: string) => void }) {
  return (
    <section className="ic-hero" style={{ padding: '8rem 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', minHeight: '80vh' }}>
      <div className="ic-hero-copy" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <p className="ic-hero-eyebrow ic-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', opacity: 0.6 }}>Photographs — Drawings — Film fragments</p>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 300, lineHeight: 1.1, fontFamily: 'serif' }}>
          Light leaves a mark
          <br />
          before it leaves.
        </h1>
        <p style={{ fontSize: '1rem', opacity: 0.8, maxWidth: '400px', lineHeight: 1.6 }}>
          A study of overlooked moments — the way afternoon sun sits on a stairwell, a curtain
          half-drawn, a room just after someone has left it.
        </p>
        <div className="ic-hero-foot" style={{ display: 'flex', gap: '2rem', marginTop: '4rem', fontSize: '0.75rem' }}>
          <button
            type="button"
            className="ic-mono"
            onClick={() => go('projects')}
            style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', padding: 0, fontWeight: 'bold', borderBottom: '1px solid currentColor' }}
          >
            View projects →
          </button>
          <span className="ic-mono" style={{ opacity: 0.5 }}>Est. — ongoing</span>
          <span className="ic-mono" style={{ opacity: 0.5 }}>Based in a north-facing room</span>
        </div>
      </div>
      <div className="ic-hero-media" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div className="piece-photo" style={{ width: '100%', maxWidth: '500px' }}>
          <img
            src="https://picsum.photos/seed/iris-hero/900/700"
            alt="Afternoon light falling across an empty room"
            loading="lazy"
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/* 2. Media pieces — photo / drawing / film                           */
/* ================================================================== */
type MediaItem =
  | { type: 'photo'; seed: string; alt: string; w?: number; h?: number }
  | { type: 'drawing'; variant: 'window' | 'stair' | 'figure' | 'curtain' }
  | { type: 'film'; bx: string; by: string }

function Photo({ media }: { media: Extract<MediaItem, { type: 'photo' }> }) {
  const w = media.w ?? 900
  const h = media.h ?? 1100
  return (
    <div className="piece-photo">
      <img src={`https://picsum.photos/seed/${media.seed}/${w}/${h}`} alt={media.alt} loading="lazy" />
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

function Piece({ media }: { media: MediaItem }) {
  if (media.type === 'photo') return <Photo media={media} />
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
      { threshold: 0.14 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView] as const
}

/* ================================================================== */
/* 4. Section types — each project composes these differently          */
/* ================================================================== */
type Align = 'left' | 'right' | 'center'

type Section =
  | { kind: 'single'; media: MediaItem; w: string; align: Align; idx: string; cap: string }
  | { kind: 'full'; media: MediaItem; idx: string; cap: string }
  | { kind: 'space'; w: string; align: Align; idx: string; cap: string }
  | { kind: 'rail'; label: string; items: { media: MediaItem; w: string; idx: string; cap: string }[] }

function SectionBlock({ section }: { section: Section }) {
  const [ref, inView] = useReveal<HTMLDivElement>()

  if (section.kind === 'single') {
    return (
      <div
        ref={ref}
        className={`sec ${inView ? 'in' : ''}`}
        style={{ width: section.align === 'center' ? section.w : section.w, alignSelf: section.align === 'left' ? 'flex-start' : section.align === 'right' ? 'flex-end' : 'center' }}
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

  // rail — horizontal scroll section, items can each be a different width
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
            <div className="cap">
              {it.idx} — {it.cap}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ================================================================== */
/* 5. Project data — each project has its own section sequence         */
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

export const projects: Project[] = [
  {
    id: 'rooms-after',
    no: 'P.01',
    title: 'Rooms After',
    year: '2023 – 2025',
    medium: 'Silver gelatin, graphite, 16mm',
    blurb: 'The largest of the three bodies of work — a restless survey of the same handful of interiors, watched across two years. It moves quickly, the way a room fills and empties.',
    sections: [
      {
        kind: 'rail',
        label: '01 — Contact strip',
        items: [
          { media: { type: 'photo', seed: 'iris-02a', alt: 'Stairwell in late light', w: 700, h: 900 }, w: '46vw', idx: 'No. 01', cap: 'Stairwell, 4pm' },
          { media: { type: 'film', bx: '65%', by: '35%' }, w: '58vw', idx: 'No. 02', cap: '16mm loop — traces of light' },
          { media: { type: 'drawing', variant: 'curtain' }, w: '36vw', idx: 'No. 03', cap: 'Ink wash — threshold' },
          { media: { type: 'photo', seed: 'iris-02b', alt: 'Kitchen in late afternoon light', w: 800, h: 700 }, w: '42vw', idx: 'No. 04', cap: 'Kitchen, late afternoon' },
        ],
      },
      { kind: 'single', media: { type: 'photo', seed: 'iris-01', alt: 'Window light falling across a plaster wall', w: 1000, h: 700 }, w: '68%', align: 'left', idx: 'No. 05', cap: 'Silver gelatin study — window light' },
      { kind: 'single', media: { type: 'drawing', variant: 'window' }, w: '26%', align: 'right', idx: 'No. 06', cap: 'Graphite on paper — untitled' },
      { kind: 'full', media: { type: 'photo', seed: 'iris-07', alt: 'Long hallway with dust in a beam of light', w: 1600, h: 800 }, idx: 'No. 07', cap: 'Silver gelatin — hallway, dust' },
      { kind: 'single', media: { type: 'film', bx: '25%', by: '60%' }, w: '38%', align: 'center', idx: 'No. 08', cap: 'Super 8, loop — the room after' },
      { kind: 'single', media: { type: 'drawing', variant: 'figure' }, w: '22%', align: 'left', idx: 'No. 09', cap: 'Charcoal — figure, seated' },
    ],
  },
  {
    id: 'thresholds',
    no: 'P.02',
    title: 'Thresholds',
    year: '2024',
    medium: 'Contact prints, ink wash',
    blurb: 'A quiet counterpoint — only a few pieces, held far apart, with deliberate empty space between them. Made to be walked through slowly.',
    sections: [
      {
        kind: 'rail',
        label: '01 — Details',
        items: [
          { media: { type: 'photo', seed: 'iris-th-02', alt: 'Detail of a door frame', w: 900, h: 900 }, w: '40vw', idx: 'No. 01', cap: 'Door frame, detail' },
          { media: { type: 'photo', seed: 'iris-th-03', alt: 'Detail of a window latch', w: 900, h: 1100 }, w: '30vw', idx: 'No. 02', cap: 'Latch, morning' },
        ],
      },
      { kind: 'full', media: { type: 'photo', seed: 'iris-th-01', alt: 'Sheer curtain half drawn across a window', w: 1400, h: 850 }, idx: 'No. 03', cap: 'Contact print — curtain, half drawn' },
      { kind: 'space', w: '32%', align: 'right', idx: 'No. 04', cap: 'Space left intentionally' },
      { kind: 'single', media: { type: 'drawing', variant: 'curtain' }, w: '36%', align: 'center', idx: 'No. 05', cap: 'Ink wash — threshold' },
    ],
  },
  {
    id: 'traces-of-light',
    no: 'P.03',
    title: 'Traces of Light',
    year: '2021 – 2022',
    medium: '16mm, Super 8, charcoal',
    blurb: 'The earliest work, and the most film-led. Loops of light drifting across surfaces, paired with charcoal studies made while watching them.',
    sections: [
      {
        kind: 'rail',
        label: '01 — Loops & studies',
        items: [
          { media: { type: 'film', bx: '60%', by: '55%' }, w: '50vw', idx: 'No. 01', cap: 'Super 8, loop — drift' },
          { media: { type: 'drawing', variant: 'figure' }, w: '26vw', idx: 'No. 02', cap: 'Charcoal — figure, seated' },
          { media: { type: 'film', bx: '20%', by: '70%' }, w: '44vw', idx: 'No. 03', cap: '16mm, loop — second pass' },
          { media: { type: 'drawing', variant: 'stair' }, w: '30vw', idx: 'No. 04', cap: 'Graphite — study of the stair' },
        ],
      },
      { kind: 'full', media: { type: 'film', bx: '35%', by: '30%' }, idx: 'No. 05', cap: '16mm, loop — first light' },
      { kind: 'single', media: { type: 'photo', seed: 'iris-tl-01', alt: 'Empty hallway with dust in a beam of light', w: 900, h: 1150 }, w: '40%', align: 'left', idx: 'No. 06', cap: 'Silver gelatin — hallway, dust' },
    ],
  },
  {
    id: 'contact-sheets',
    no: 'P.04',
    title: 'Contact Sheets',
    year: '2021',
    medium: 'Unedited 35mm contact prints',
    blurb: 'Full rolls, unedited and unsequenced — the near-misses and the frame before the frame, left exactly as they came off the reel.',
    sections: [
      {
        kind: 'rail',
        label: '01 — Full roll, unedited',
        items: [
          { media: { type: 'photo', seed: 'iris-cs-01', alt: 'Contact print frame 1', w: 700, h: 700 }, w: '22vw', idx: '01', cap: 'Frame 01' },
          { media: { type: 'photo', seed: 'iris-cs-02', alt: 'Contact print frame 2', w: 700, h: 700 }, w: '22vw', idx: '02', cap: 'Frame 02' },
          { media: { type: 'photo', seed: 'iris-cs-03', alt: 'Contact print frame 3', w: 700, h: 700 }, w: '22vw', idx: '03', cap: 'Frame 03' },
          { media: { type: 'photo', seed: 'iris-cs-04', alt: 'Contact print frame 4', w: 700, h: 700 }, w: '22vw', idx: '04', cap: 'Frame 04' },
          { media: { type: 'photo', seed: 'iris-cs-05', alt: 'Contact print frame 5', w: 700, h: 700 }, w: '22vw', idx: '05', cap: 'Frame 05' },
          { media: { type: 'photo', seed: 'iris-cs-06', alt: 'Contact print frame 6', w: 700, h: 700 }, w: '22vw', idx: '06', cap: 'Frame 06' },
        ],
      },
      { kind: 'full', media: { type: 'photo', seed: 'iris-cs-07', alt: 'The chosen frame, printed large', w: 1500, h: 760 }, idx: 'No. 07', cap: 'The one frame that was printed' },
      { kind: 'single', media: { type: 'drawing', variant: 'window' }, w: '24%', align: 'right', idx: 'No. 08', cap: 'Graphite — from the contact sheet' },
    ],
  },
]

/* ================================================================== */
/* 6. Dropdown selector                                                */
/* ================================================================== */
function ProjectDropdown({
  active,
  onSelect,
}: {
  active: Project
  onSelect: (p: Project) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="dd">
      <button type="button" className={`dd-trigger ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)}>
        <span>
          {active.no} — {active.title}
        </span>
        <span className="chev">▾</span>
      </button>
      {open && (
        <>
          <div className="dd-backdrop" onClick={() => setOpen(false)} />
          <div className="dd-panel">
            {projects.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`dd-opt ${p.id === active.id ? 'active' : ''}`}
                onClick={() => {
                  onSelect(p)
                  setOpen(false)
                }}
              >
                <span className="no ic-mono">
                  {p.no} — {p.year}
                </span>
                <span className="t">{p.title}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ================================================================== */
/* 7. Projects page — dropdown switches between full project layouts   */
/* ================================================================== */
export function Projects() {
  const [active, setActive] = useState<Project>(projects[0])

  return (
    <section style={{ padding: '4rem 2rem 8rem' }}>
      <div className="ic-section-head" style={{ marginBottom: '3rem' }}>
        <span className="ic-mono" style={{ opacity: 0.5 }}>01 — Selected work</span>
        <h2 style={{ fontSize: '2rem', fontFamily: 'serif', fontWeight: 300, margin: '0.5rem 0 0' }}>Projects</h2>

        <ProjectDropdown active={active} onSelect={setActive} />

        <div style={{ maxWidth: '640px', marginTop: '2rem' }}>
          <p className="ic-mono" style={{ fontSize: '0.78rem', opacity: 0.55, marginBottom: '0.9rem' }}>
            {active.year} — {active.medium}
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, opacity: 0.85, margin: 0 }}>{active.blurb}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5rem' }}>
        {active.sections.map((section, i) => (
          <SectionBlock key={`${active.id}-${i}`} section={section} />
        ))}
      </div>
    </section>
  )
}

/* ================================================================== */
/* 8. About                                                            */
/* ================================================================== */
export function About() {
  const exhibitions = [
    { show: 'Traces — group show, Camberwell', year: '2025' },
    { show: 'Rooms After — solo, Deptford', year: '2023' },
    { show: 'Contact Sheets — group, Margate', year: '2021' },
  ]
  return (
    <section style={{ padding: '6rem 2rem 10rem', display: 'flex', gap: '5rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 280px' }}>
        <span className="ic-mono" style={{ opacity: 0.5, fontSize: '0.75rem' }}>02 — About</span>
        <h2 style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', margin: '0.8rem 0 0', maxWidth: '10em' }}>
          Working quietly, in available light.
        </h2>
      </div>

      <div style={{ flex: '1.3 1 380px', maxWidth: '34em', opacity: 0.85 }}>
        <p style={{ margin: '0 0 1.4rem', lineHeight: 1.7 }}>
          Iris Calder works across <strong style={{ color: '#262622', fontWeight: 500 }}>photography, drawing, and 16mm and Super 8 film</strong>,
          returning to the same handful of rooms and streets to watch how light moves through them
          across a day, a season, a year.
        </p>
        <p style={{ margin: '0 0 1.4rem', lineHeight: 1.7 }}>
          The work is not about the subject so much as what the subject leaves behind — a shadow on
          a wall after the object that cast it has moved, the shape a body leaves in a chair, the
          soft burn of a window across old wallpaper.
        </p>
        <p style={{ margin: '0 0 1.4rem', lineHeight: 1.7 }}>
          Trained first as a printmaker, Calder still works entirely with available light and
          unedited contact prints, treating the darkroom and the drawing table as the same kind of
          quiet room.
        </p>

        <div style={{ marginTop: '2.4rem', borderTop: '1px solid #d2cbbb', paddingTop: '1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem 0', borderBottom: '1px solid #d2cbbb', fontSize: '0.85rem' }}>
            <span>Selected exhibitions</span>
            <span className="ic-mono" style={{ fontSize: '0.68rem', opacity: 0.55 }}>2021 – 2025</span>
          </div>
          {exhibitions.map((e) => (
            <div key={e.show} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem 0', borderBottom: '1px solid #d2cbbb', fontSize: '0.85rem' }}>
              <span>{e.show}</span>
              <span className="ic-mono" style={{ fontSize: '0.68rem', opacity: 0.55 }}>{e.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/* 9. Contact                                                          */
/* ================================================================== */
export function Contact() {
  const meta = [
    { label: 'Prints', value: 'Available on request' },
    { label: 'Representation', value: 'Unrepresented, direct inquiries' },
    { label: 'Studio', value: 'By appointment only' },
  ]
  return (
    <section style={{ padding: '10rem 2rem 14rem', minHeight: '55vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <span className="ic-mono" style={{ opacity: 0.5, fontSize: '0.75rem' }}>03 — Contact</span>
      <h2 style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3.2rem)', margin: '1rem 0 2rem', maxWidth: '14em' }}>
        Inquiries and studio visits welcome, by appointment.
      </h2>
      <a href="mailto:studio@iriscalder.work" className="contact-link" style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: 'clamp(1.3rem, 2.6vw, 1.6rem)', borderBottom: '1px solid #d2cbbb', paddingBottom: '0.3rem', display: 'inline-block', width: 'fit-content', textDecoration: 'none', color: 'inherit' }}>
        studio@iriscalder.work
      </a>
      <div style={{ marginTop: '3rem', display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
        {meta.map((m) => (
          <div key={m.label}>
            <span className="ic-mono" style={{ display: 'block', fontSize: '0.66rem', opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
              {m.label}
            </span>
            <span style={{ fontSize: '0.9rem' }}>{m.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
