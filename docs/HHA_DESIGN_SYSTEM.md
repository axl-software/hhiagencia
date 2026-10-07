# HHA Design System V1.2

## Brand colors
- Midnight Navy: `#0B1020`
- Deep Black: `#05070A`
- White: `#F8FAFC`
- Signal Red: `#D7263D`
- UI Gray Dark: `#64748B` (secondary text on light backgrounds)
- UI Gray Light: `#94A3B8` (secondary text on dark backgrounds only)

Do not introduce violet, orange or green as brand colors.

## Functional UI states
Functional colors are allowed only when they communicate interface state.

Suggested semantic roles:
- Success: green
- Warning: amber/yellow
- Error: red
- Info: blue

These are **functional UI colors only**, not HHA brand colors.

## Typography
- **Archivo Black**: impact headlines
- **Space Grotesk**: primary headings
- **Inter**: body text and UI
- **JetBrains Mono**: technical labels and metadata

## Hierarchy
- Hero / Impact: Archivo Black
- H1 / H2: Space Grotesk
- Body: Inter
- Labels / technical metadata: JetBrains Mono

## Light mode (cream) — SUPERSEDED 2026-10-05 by the bluish light tone per page
The light/dark toggle was removed (see HHA_CHANGELOG.md). Pages are fixed to a tone (`src/lib/tema.ts`): Servicios, Prueba gratis, Contacto and legal pages use a bluish light (`#E6EDF7` / `#D9E3F1`); the others stay dark. The notes below describe the earlier cream values and remain as history for the surface roles.

Approved by the founders earlier: pure white was too bright, so light mode used a warm cream.
- Background: Cream `#F1ECE2`
- Sections / elevated surfaces: Sand `#E9E2D5`
- Primary text: `#05070A`
- Secondary text: Midnight Navy at 65 % over cream, `#5C5D64` (5.1–5.6:1)
- Lines and borders: Midnight Navy with transparency
- Brand emphasis: `#0B1020`
- Accent: `#D7263D` (large text, buttons, lines and icons only; small red text fails on cream, ~4.2:1)
- Small red highlight text (e.g. AUTOMATIZA in the hero hook): deeper Signal Red `#B3192F` (5.8:1 on cream)

`#64748B` is no longer used for text in light mode: on cream it drops to ~4.0:1.

## Dark mode
- Background: `#05070A`
- Elevated surfaces: `#0B1020`
- Primary text: `#F8FAFC`
- Secondary text: `#94A3B8`
- Accent: `#D7263D`
- Small red highlight text: lighter Signal Red `#EB4B5F` (5.5:1 on `#05070A`)

## Theme behavior (website)
- The site follows the visitor's device setting (light or dark) by default.
- Visitors can switch theme with a button in the header; the choice is remembered on that device.
- Light-mode surfaces: every section background on every page is Cream `#F1ECE2` (founders, 2026-10-01: no alternating Sand bands in light mode; dark mode keeps alternating black and navy). Sand `#E9E2D5` is for cards and tiles on the cream, and for the footer; lines and soft shadows add separation.
- Closing call-to-action band: Signal Red in dark mode; Midnight Navy `#0B1020` in light mode (founders asked to change the red band in light mode; navy keeps it inside the palette, white text ~18:1).
- Footer: Deep Black in dark mode; Sand `#E9E2D5` in light mode, with the navy logo.
- Closing bands: each page has its own small kicker (Inicio “¿EMPEZAMOS?”, Servicios “¿TODAVÍA CON DUDAS?”, Proyectos “¿Y TU NEGOCIO?”, Cómo trabajamos “¿TE HACE SENTIDO?”) instead of repeating “¿HABLAMOS?”.
- Contact page: same page background as the rest of the site (cream in light mode), with orbit lines and a soft red glow. The form card is Midnight Navy in both themes (contrasts on black and on cream), with a slowly moving red glow and a red top line; its send button is the animated red main button. Contact details show one icon each.
- Cards with life (founders asked for less static, less “robotic” sections): a soft red corner glow that shifts on hover, lift on hover, icons that react; the recommended plan has a slowly rotating red border; steps show a large outlined number and a red line that draws in when they appear. Project cards have a Midnight Navy cover with a moving red glow, a dot pattern, a light beam that crosses it and the project's category icon until real photos replace it (no orbits: founders asked to move away from repeating the orbit motif there). All motion stops with “reduce motion”.
- Text on Signal Red is always `#F8FAFC`, in both themes.
- The logo switches automatically: white version on dark backgrounds, navy version on light backgrounds.

## Accessibility
Do not use Signal Red for small body text on dark backgrounds when contrast is insufficient.
When a founder asks for a small word in red, use the contrast-safe shades of Signal Red (`#EB4B5F` dark, `#B3192F` light, token `--rojo-txt`); they are tones of the same brand red, not new colors.
Home main button: Signal Red with a slowly moving gradient to a deeper shade (`#9E1528`, token `--rojo-hondo`) and a soft passing shine; the deeper shade is also its bottom edge, so it reads as a 3D button that lifts on hover. Text stays `#F8FAFC`. With “reduce motion” it is static.
Prefer white text on Signal Red buttons when contrast passes.
Validate contrast for all interactive and text states.

Reference contrast ratios (WCAG AA requires 4.5:1 for normal text, 3:1 for large text):
- `#64748B` on `#F8FAFC`: ~4.5:1. Passes for text, with no margin; do not place it on gray or tinted surfaces.
- `#5C5D64` on `#F1ECE2` / `#E9E2D5`: ~5.6 / 5.1:1. Passes (light-mode secondary text).
- `#D7263D` on `#F1ECE2`: ~4.2:1. Large text, icons and buttons only.
- `#94A3B8` on `#05070A`: ~7.8:1. Passes.
- `#94A3B8` on `#F8FAFC`: ~2.5:1. Fails; never use it for text in light mode.
- `#D7263D` on `#05070A`: ~4.1:1. Large text, icons and buttons only.
- `#F8FAFC` on `#D7263D`: ~4.7:1. Passes (white text on red buttons).

## UI style
Clean grids, generous spacing, strong hierarchy, restrained motion, high contrast, simple iconography and clear CTAs.

## Motion
Use motion only when it clarifies hierarchy or improves perceived quality. Avoid decorative motion that delays conversion.

## Hero background (home)
- The right side of the hero has a background layer behind the orbital system: a 6-second looping video of hands working on a laptop that shows the HHA site (`public/img/hero/fondo.mp4`), and its first frame as a still image (`fondo.webp`, `fondo-960.webp`). It is one layer: the image shows while the video loads, if it fails, on tablets and phones, and with reduced motion; the video fades in on top only once it plays (desktop, 1025 px and up).
- Order, back to front: page background → video/image → orbits, nodes and center logo. The text column (H1, lead, buttons) always sits above and the layer never enters it.
- The layer fades into the page on the left, top and bottom. The overlay uses the page colors (`--bg`, `--bg2`): Deep Black and Midnight Navy in dark mode, Cream and Sand in light mode, so it follows the theme on its own. Dark: dark, low contrast (55 % opacity).
- Light mode uses its own files (2026-10-02, supersedes the filtered dark video, which looked like a dark stain): the same scene in two warm tones (sand to warm white) with the brand red only on the laptop screen, at 85 % opacity.
- The laptop screen reads “Digitaliza. / Automatiza. / Escala.” (Escala in red). The “Escena generada con IA” note was removed on 2026-10-05 (founders' decision).
- The laptop screen sits beside the center logo, not under it. Do not add other content on the laptop screen.
- The video's top-left corner (where the generator places its mark) is outside the frame and under a shadow.

## Primary buttons
- `.btn-vivo`: Signal Red with a moving gradient, a passing shine and a darker bottom edge (3D); it jumps up on hover. Used for the main action of a view: hero (“Te orientamos en 3 preguntas”), header and mobile menu (“Haz tu diagnóstico”, compact `.btn-vivo-sm` in the header), contact form, recommended plan.
- `.btn-plan`: solid button in the text color (white on dark, near-black on light) with the same 3D edge; turns red on hover. Used for the non-recommended plans.

## Animated scenes (Cómo trabajamos)
- Each of the 8 process steps and each of the 4 metrics has a small animated scene (`src/components/Ilustraciones.tsx`) in the same visual language as the plan drawings: windows, blocks and Signal Red. Step scenes: message and reply, video call taking turns, proposal written and approved, checklist completing, site built in stages with a progress bar, tested on computer and phone and published, monthly calendar with a rising line, improvement cycle. Metrics: line chart, incoming contacts, funnel, clock and gear.
- Motion has soft bounces and pauses between cycles (not mechanical loops), starts when the card appears and stops with reduced motion (each piece rests in its final state). No numbers: nothing that looks like real results.

## Projects background
- The Proyectos section no longer uses the orbits: it has a tilted content-editing interface at the top right (video preview with REC, an automation flow and a timeline with clips, audio and markers, with the red playhead moving). It alludes to the real work behind the projects; faded and behind the cards.

## Plan cards (Services → Desarrollo web)
- Midnight Navy gradient cards (not black) in dark mode; ivory cards with a warm shadow in light mode.
- Each card shows a small drawing of the site the plan builds, which grows from Start (one page) to Business (several sections and a new lead arriving) to Pro (store connected to other tools); the plan name with a 1–3 bar level; who it is for; a full-width main button (“Elegir plan”); and “Ver qué incluye”.
- Web Business (recommended): red glow, rotating red border, “RECOMENDADO” badge and the red `.btn-vivo` button.
- “Elegir plan” / “Elegir pack” adds the item to the order and opens `/pedido` (2026-10-07; supersedes “Solicita cotización →”). If the item is already in the order the button reads “Ver mi pedido” plus “Quitar”.
