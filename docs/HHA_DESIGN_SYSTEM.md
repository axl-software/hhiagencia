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

## Light mode (cream)
Approved by the founders: pure white was too bright, so light mode uses a warm cream.
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
