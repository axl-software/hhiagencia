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
- Light-mode surfaces: Cream `#F1ECE2` for the page and Sand `#E9E2D5` for alternate sections, tiles and cards; lines and soft shadows add separation.
- Closing call-to-action band: Signal Red in dark mode; Midnight Navy `#0B1020` in light mode (founders asked to change the red band in light mode; navy keeps it inside the palette, white text ~18:1).
- Footer: Deep Black in dark mode; Sand `#E9E2D5` in light mode, with the navy logo.
- Text on Signal Red is always `#F8FAFC`, in both themes.
- The logo switches automatically: white version on dark backgrounds, navy version on light backgrounds.

## Accessibility
Do not use Signal Red for small body text on dark backgrounds when contrast is insufficient.
When a founder asks for a small word in red, use the contrast-safe shades of Signal Red (`#EB4B5F` dark, `#B3192F` light, token `--rojo-txt`); they are tones of the same brand red, not new colors.
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
