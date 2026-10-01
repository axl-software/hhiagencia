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

## Light mode
- Background: `#F8FAFC`
- Primary text: `#05070A`
- Secondary text: `#64748B`
- Brand emphasis: `#0B1020`
- Accent: `#D7263D`

## Dark mode
- Background: `#05070A`
- Elevated surfaces: `#0B1020`
- Primary text: `#F8FAFC`
- Secondary text: `#94A3B8`
- Accent: `#D7263D`

## Theme behavior (website)
- The site follows the visitor's device setting (light or dark) by default.
- Visitors can switch theme with a button in the header; the choice is remembered on that device.
- Light-mode surfaces stay on `#F8FAFC` (no tinted gray panels), because `#64748B` only reaches ~4.5:1 on `#F8FAFC`. Separate sections with lines and soft shadows instead.
- The footer uses Midnight Navy `#0B1020` with dark-mode text colors in both themes (brand emphasis).
- Text on Signal Red is always `#F8FAFC`, in both themes.
- The logo switches automatically: white version on dark backgrounds, navy version on light backgrounds.

## Accessibility
Do not use Signal Red for small body text on dark backgrounds when contrast is insufficient.
Prefer white text on Signal Red buttons when contrast passes.
Validate contrast for all interactive and text states.

Reference contrast ratios (WCAG AA requires 4.5:1 for normal text, 3:1 for large text):
- `#64748B` on `#F8FAFC`: ~4.5:1. Passes for text, with no margin; do not place it on gray or tinted surfaces.
- `#94A3B8` on `#05070A`: ~7.8:1. Passes.
- `#94A3B8` on `#F8FAFC`: ~2.5:1. Fails; never use it for text in light mode.
- `#D7263D` on `#05070A`: ~4.1:1. Large text, icons and buttons only.
- `#F8FAFC` on `#D7263D`: ~4.7:1. Passes (white text on red buttons).

## UI style
Clean grids, generous spacing, strong hierarchy, restrained motion, high contrast, simple iconography and clear CTAs.

## Motion
Use motion only when it clarifies hierarchy or improves perceived quality. Avoid decorative motion that delays conversion.
