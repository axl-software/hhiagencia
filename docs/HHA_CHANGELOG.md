# HHA Changelog

Newest entries first. Never rewrite past entries: add a new dated entry that states what changed and what it replaces.

## 2026-10-01 — Domain and publishing flow
- hhiagencia.cl is registered at NIC Chile; Herberth holds the main access and shared it with Alexander.
- Publishing flow: working branch → pull request approved by the founders → `main` → Vercel.

## 2026-10-01 — Herberth bio approved
- Website bio for Herberth Garay: “Primero pregunta qué tiene que vender tu negocio. Recién después diseña, escribe o automatiza.”

## 2026-10-01 — Logo, channels and client references

### Brand
- Official logo identified: “HH” with red dot and sound-wave arcs. Source files and web-safe variants documented in Brand Foundation.
- HHA Instagram: @hhiagencia.cl. @hh.condireccion is Herberth's personal brand, not an HHA channel.
- WhatsApp and email: pending definition; must not be invented.

### Clients
- Aaron (aaronig12, Kick) and Bar de Blas approved as public HHA client references.
- L@s MALPORTAD@S removed permanently.
- Primera Semana Creativa (HH Studio own content) removed from HHA cases.

### Team
- Website roles approved: Herberth Garay (Estrategia, marketing y ventas) and Alexander Bello (Desarrollo y automatización). Alexander's bio approved; Herberth's bio pending a hook-style rewrite.

### Website plan
- Founders approved the implementation order (tokens → naming/metadata → content → hero → contact → remove root `app/` → light mode → local SEO).
- While WhatsApp/email are pending, contact CTAs may point to an Instagram DM to @hhiagencia.cl.

## 2026-10-01 — Memory V1.2 (integrity fix)

### Restored
Rules that disappeared in V1.1 without being marked as superseded are restored, because the memory protocol requires preserving valid information and logging every replacement:
- Brand Foundation: brand essence, voice principles (prefer/avoid), differentiation, humor and jargon guidance.
- Design System: typographic hierarchy and motion rule.
- Services: Web Development scope (landing pages, corporate websites, basic e-commerce, maintenance, domain/hosting, reusable templates) and the **Future** list that must not be presented as mature offers (proprietary SaaS, custom AI agents, vertical systems, advanced dashboards, client portals).
- Business Model: potential revenue lines, “do not over-automate sales”, customer profile, long-term direction.
- Tech Stack: API status (no production API integration approved as a proven capability).
- Implementation Guide: memory audit prompt, pre-feature checklist, Git recommendation, “persist only explicit approvals”.
- This changelog: the original 2026-09-30 entry is restored verbatim below.

### Fixed
- `#94A3B8` stays in the palette as **UI Gray Light**, restricted to secondary text on dark backgrounds. V1.1 removed it from the brand list while dark mode still used it.
- Founder name unified as **Herberth Garay** (V1.1 used “Herbert”; the website code, personal-brand folder and working tools use “Herberth”). Founders: revert if the legal spelling differs.
- Design System: reference contrast ratios added.

## 2026-10-01 — Memory V1.1

### Brand
- Website visible name: HHiAgencia.
- SEO title: HHA Digital Solutions | Web, Automatización y Marketing.
- Footer name: HHA Digital Solutions.

### Founders
- Second founder's full name recorded: Alexander Bello.

### Visual identity
- **Replaces** light-mode secondary text `#94A3B8` with `#64748B` (the old value failed contrast on `#F8FAFC`, ~2.5:1).
- Functional success/warning/error/info colors are allowed only as UI semantics, not as brand colors.
- Accessibility rules added: no small Signal Red text on dark backgrounds; white text on red buttons; validate contrast.

### Commercial
- Public prices remain hidden until costs, margins and delivery scope are approved.
- Approved CTAs: “Solicita cotización” and “Agenda una reunión”.

## 2026-09-30 — Memory V1

### Brand
- Tentative legal name: HHA Digital Solutions SpA.
- Mother brand: HHA Digital Solutions.
- Preferred commercial name: HHiAgencia.
- Ideal trademark: HHA or HHA Digital Solutions.
- Current logo retained.

### Visual identity
Approved palette:
- `#0B1020`
- `#05070A`
- `#F8FAFC`
- `#D7263D`
- `#94A3B8`

Approved fonts:
- Archivo Black
- Space Grotesk
- Inter
- JetBrains Mono

### Positioning
“Ayudamos a marcas, creadores y empresas con contenido, estrategias, automatizaciones y soluciones digitales.”

Hook:
“Digitaliza. Automatiza. Escala.”

### Business
- HHA begins horizontally.
- Web development is the initial commercial priority.
- Web packages: Start, Business, Pro.
- Website minimum initial period: 3 months.
- Complex personalized services may use 6-month minimums.

### Strategy
“Build first what is necessary to sell. Automate only what already works.”

### AI behavior
AI assistants must prioritize truth over agreement and correct wrong assumptions instead of validating them.
