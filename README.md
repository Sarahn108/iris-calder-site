# Iris Calder — Portfolio

Minimal Next.js 14 (App Router) scaffold.

## Structure

- `app/layout.tsx` — root layout, loads `globals.css` and fonts
- `app/page.tsx` — home route, holds simple nav state and renders `Home` / `Projects`
- `app/globals.css` — font imports and shared tokens (`--paper`, `--ink`, etc.) used by inline styles
- `components/Portfolio.tsx` — your provided `Home`, `Projects`, and `projects` data

## Navigation

`app/page.tsx` holds a `view` state (`home | projects | about | contact`). The wordmark
("Iris Calder") is the only way back to Home — there's deliberately no separate "Home"
button in the nav, since a logo-as-home-link is the standard convention and a redundant
button just adds clutter. `Projects`, `About`, and `Contact` are plain nav buttons; Projects
leads to the page with the project dropdown described below.

The hero on Home now shows an actual (placeholder-sourced, desaturated) main photo instead
of a gray box — swap the `src` in `Home`'s `piece-photo` block for a real image whenever
you have one.

## Projects page structure

`Projects()` now renders a dropdown (`ProjectDropdown`) that switches between the
project entries in the `projects` array (currently 4: *Rooms After*, *Thresholds*,
*Traces of Light*, *Contact Sheets*), each with its own `sections` array and its own
layout. A `Section` is one of:

- `single` — one piece at a variable width/alignment, same as the original asymmetric flow
- `full` — a full-bleed feature piece
- `space` — deliberate empty space with just a caption (used in *Thresholds*)
- `rail` — a horizontal-scroll strip; each item inside can have its own width, so a rail
  can mix a wide film with a narrow drawing with a square photo

Add or reorder entries in a project's `sections` array to reshape that project's layout;
each project is independent, so they don't have to share a template.

`Piece` now renders real (if placeholder-sourced) media instead of gray boxes:
photos come from picsum.photos (seeded, desaturated to a silver-gelatin look), drawings
are hand-drawn inline SVGs with a matted paper texture, and films are CSS/SVG-built
silent loops (drifting light beam, grain, scanlines, vignette) — no actual video files,
so nothing to host or license. Swap `Photo`'s `src` for real images whenever you have
them; the rest of the styling will carry over.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Push to a Git repo and import it in Vercel, or run `vercel` from this folder.
