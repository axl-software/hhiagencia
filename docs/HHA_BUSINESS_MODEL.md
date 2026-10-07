# HHA Business Model V1.2

## Revenue model
Primary model: **implementation fee + recurring monthly revenue**.

Potential revenue:
- web implementation,
- maintenance,
- automation setup,
- automation management,
- digital marketing retainers,
- consulting,
- training,
- future SaaS subscriptions.

## Current priority
Generate initial capital through web development.

## Sales approach
Founder-led. Herberth primarily handles outreach, meetings, proposals and closing.

Do not over-automate sales before enough real sales conversations exist.

## Customer profile
Initial horizontal target:
- SMEs,
- service companies,
- local businesses,
- brands,
- selected creators.

## Client references
Approved for public use as HHA references (they are also HH Studio Creativo clients):
- **Aaron (aaronig12)**: streamer on Kick.
- **Bar de Blas** (@bardeblas): bar.

Removed permanently: **L@s MALPORTAD@S** must not appear on HHA materials.

Not a client case: **Primera Semana Creativa** (HH Studio Creativo's own content) must not be shown as an HHA case.

Results, metrics and testimonials for these clients may only be published with real data and the client's permission. Never fill them with estimates.

On the website each project opens a gallery: one image or short clip per slide, with a short text of what was done and which HHA service it used. Material provided by the founders (2026-10-01) is in `public/img/proyectos/` (Aaron: event clip, stream episode, guests, stage; Bar de Blas: product photo, reel clip, bar detail, setting, behind the scenes). The slide texts are REFERENCE descriptions of what each image shows; the founders will correct them.

Services confirmed by the founders for these references (2026-10-01):
- Aaron: automation of formats and scripts (pautas) for each stream, plus content and event production. Card cover: the guests photo (founders' choice); the event clip goes last in the gallery.
- Bar de Blas: automation for editing reels and generating carousel ideas, plus content and marketing.

## Offer strategy
Web plans (4 levels; supersedes the 3-plan Web Start / Business / Pro offer, 2026-10-06): **Web Presentation, Web Starter, Web Business, Web Pro**. Web Business is the recommended plan and should be positioned as the strongest value-to-price option.

HHA Systems plans: **System Starter, System Business (recommended), System Pro**.

Web plans and HHA Systems are subscriptions (monthly, or annual with 20% off the launch price) plus a one-time implementation cost that is charged separately. This supersedes the model “initial payment for the development only + monthly maintenance with a minimum term” (2026-10-02). The free demo (7 days) is kept for web and HHA Systems; marketing is not tested.

## Public pricing (approved by the founders, 2026-10-06)
Single source in the code: `src/lib/precios.ts`. CLP, always shown **+ IVA** (founders, 2026-10-06: a small “+ IVA” next to every price). Supersedes “Do not display public package prices until costs, margins and delivery scope are approved”.

Web / HHA Systems (monthly): regular price → launch price. Presentation 14.990 → 9.990; Starter 39.990 → 29.990; Business 64.990 → 49.990; Pro 89.990 → 69.990. System Starter 39.990 → 29.990; System Business 64.990 → 49.990; System Pro 89.990 → 69.990.
Annual: 12 months of the launch price with 20% off, shown rounded to the hundred (e.g. Business 479.900/year, ≈ 39.990/month, saves 119.980). Paid in full in advance. Labels: “Precio regular”, “Precio lanzamiento”, “Ahorras X al año” (do not use “antes” or “precio anterior”).
Domains: Presentation HHA subdomain paying monthly and own domain included paying annual (founders, 2026-10-07; supersedes “own domain is an add-on”); Starter 1 year; Business 1 year monthly / 2 years annual; Pro at least 2 years. Premium domains may carry an extra cost.
Implementation (one-time payment), approved 2026-10-06: Web Presentation $29,990 · Web Starter $129,990 · Web Business $390,000 · Web Pro $590,000 · System Starter $49,990 · System Business $69,990 · System Pro $99,990 (CLP, + IVA). Shown inside “Ver todo lo incluido” → “Valores y condiciones” (renamed from “Cómo se paga”, 2026-10-07) and in the order page /pedido, never on the main card (the card keeps “+ costo de implementación (pago único)”). Stored in `implementacionMonto` in `src/lib/precios.ts`. Other services with implementation (Captación, packs) still say the exact amount is given in the quote.
Monthly change rounds (minor changes, not accumulated): Starter 2, Business 3, Pro 4; Presentation only technical maintenance and minimal adjustments.
SEO is moderate and never promises rankings. Analytics and Search Console: initial setup only.

Marketing digital: Starter 119.990/mes; Business 199.990/mes (recommended); Pro 299.990/mes. Content: Start 89.990/mes; Business 149.990/mes (recommended); Pro from 249.990/mes. Captación de clientes from 49.990/mes (+ implementation). Email marketing from 39.990/mes. Automatización from 99.990/proyecto; Integraciones from 79.990/proyecto; Procesos digitales from 99.990/proyecto. Consultoría IA from 49.990/sesión; Capacitación de equipos from 149.990; Acompañamiento digital from 79.990/mes. Ad spend is never included.
Packs: Crecimiento 229.990/mes (separate 299.970, saves 69.980/month, 839.760/year; Marketing Business + Web Business + Captación); Presencia 159.990/mes (separate 199.980, saves 39.990/month, 479.880/year; Web Business + Content Business); Eficiencia 199.990 one-time (separate 249.970, saves 49.980; Automatización + Procesos + 1 Consultoría IA session); Conexión from 59.990/mes (acompañamiento normally 79.990, saves 20.000/month, 240.000/year; Integraciones + Automatización + Acompañamiento). Crecimiento and Presencia savings use the launch price of Web Business: recalculate if the launch ends.
HHA Systems plans: “Elegir plan” goes to /prueba-gratis?plan=… (choose the business type, then name and contact); the plan travels with the request. The Home shows “Desde” the lowest annual-equivalent price of HHA Systems (System Starter).
The pack “Negocio online” (HHA Systems + marketing + content) has no public price (quoted by the System plan chosen).

Use:
- **Solicita cotización**
- **Haz tu diagnóstico** / **Solicita un diagnóstico**
- (“Agenda una reunión” replaced on the website on 2026-10-01; see HHA_SERVICES.md.)

## First milestone
Close the first web-development client with implementation fee, recurring monthly component, clear scope and repeatable delivery process.

## Long term
Move toward recurring revenue, reusable components, productized services, automation and SaaS.

Order flow (founders, 2026-10-07): “Elegir plan” / “Elegir pack” on /servicios adds the item to the order (cart, saved in the browser) and opens `/pedido`, where the visitor sees the exact value (monthly or annual, implementation when defined, + IVA), can switch plan of the same line or the period, and chooses how to pay: **bank transfer** (HHA emails the transfer details) or **HHA contacts them by email** to facilitate payment. No online payment gateway and nothing is charged on confirmation. The order is sent through the existing requests flow (`/api/solicitudes` → Supabase → n8n webhook with `tipo: 'pedido'`). The transfer bank details are not stored in the repository.
