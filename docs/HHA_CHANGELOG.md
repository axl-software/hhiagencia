# HHA Changelog

Newest entries first. Never rewrite past entries: add a new dated entry that states what changed and what it replaces.

## 2026-10-07 — Order page (cart), domain of Web Presentation and “Valores y condiciones” (branch `precios-y-legal`)
- **Order flow (new)**: “Elegir plan” and “Elegir pack” now add the item to the order and open `/pedido` (new page + cart icon in the header). The page shows the exact value (+ IVA, implementation amount for the 7 plans), lets the visitor change plan or period, and offers two ways to pay: bank transfer (details sent by email) or “que HHA me contacte por correo”. No online payment; nothing is charged on confirmation. Sent through `/api/solicitudes` (Supabase + n8n webhook, field `tipo: 'pedido'` and `pedido`). Supersedes the “Elegir plan → Solicita cotización” two-step on plan and pack cards; single services (“desde”) still use “+ Agregar” and the “Tu pedido” bar.
- **Web Presentation domain** (founders): subdomain HHA paying monthly, own domain included paying annual. Supersedes “own domain is an add-on”. FAQ updated.
- **Rename**: “Cómo se paga” → “Valores y condiciones” inside “Ver todo lo incluido” (it holds subscription, implementation and free demo).
- Terms: new paragraph on the order and the payment methods. FAQ: “¿Cómo pago mi pedido?”.

## 2026-10-06 — Implementation amounts for the 7 Web and HHA Systems plans (branch `precios-y-legal`)
- Founders defined the one-time implementation fee: Web Presentation $29,990, Starter $129,990, Business $390,000, Pro $590,000; System Starter $49,990, Business $69,990, Pro $99,990. Supersedes “implementation amounts are never published” for these 7 plans only. Shown inside “Ver todo lo incluido” (Cómo se paga) as “Implementación: $X (pago único)” + IVA, with a secondary description; main cards unchanged. Stored in `implementacionMonto` (`src/lib/precios.ts`). No other price, discount, launch price or scope changed. Terms §4 updated.

## 2026-10-06 — Public pricing, packs, legal pages and nationwide coverage (branch `precios-y-legal`, pending founders' review)
- **Pricing is public** (founders, 2026-10-06; supersedes “Do not display public package prices until costs, margins and delivery scope are approved”). One source: `src/lib/precios.ts`. Web has 4 plans (Presentation, Starter, Business, Pro; supersedes Web Start/Business/Pro), HHA Systems has 3 (Starter, Business, Pro). Web and Systems show regular price (struck) + launch price, with a Mensual | Anual -20% selector; annual = 12 months of launch price with 20% off, rounded to the hundred. Marketing digital and Creación de contenido have 3 plans each; Captación, Email marketing, Automatización, Integraciones, Procesos, Consultoría IA, Capacitación de equipos and Acompañamiento show “Desde …”. Packs show price, value apart and saving; “Negocio online” stays without price.
- **Implementation**: only the note “+ costo de implementación (pago único)”; no amount is published or stored in the code (supersedes the model “initial payment for development + separate monthly maintenance”).
- **Add-ons and FAQ** added to Servicios (SEO limits, domains, change rounds, ad spend, implementation, nationwide coverage). Home shows “Desde …” per category.
- **Legal**: terms and privacy rewritten for HHA Digital Solutions SpA (real company, based in Casablanca, Región de Valparaíso, working in all of Chile); privacy now describes the n8n + Gmail confirmation emails. Pending before relying on them: RUT and full address of the company, and a lawyer's review.
- **“Trabajamos en todo Chile”** is highlighted in the Home hero, footer, contact page, terms, FAQ and structured data (legal name, address, area served).
- **Response times unified** with the confirmation emails: quotes “dentro de las próximas 24 horas”, free trial “en menos de 48 horas”.
- **Spam notice** in the confirmation window when the person left an email.
- **Follow-up (same day)**: “+ IVA” next to every price (founders). Home: HHA Systems shows “Desde $23.990/mes + IVA · pagando anual” and each business-type card repeats it; the “Ver qué incluye” texts of barbería, estética, tatuajes, óptica/dentista and wellness were rewritten around System Starter in a closer tone (the shop and dashboard moved to the Business plan, emails and promotions to Pro). “Elegir plan” on a System plan now leads to /prueba-gratis?plan=… (choose business type → name and contact). New photos: Web Presentation example (architect), Email marketing, Proceso → Métricas background. Capacitación de equipos still uses an icon.

## 2026-10-05 — Third round: service photos, marketing without trial, small fixes (branch `rediseno-estructura`)
- **Servicios**: every service row now has its own photo (marketing, captación, contenido, automatización, integraciones, procesos, IA, acompañamiento); HHA Systems keeps its per-business previews. The “Agregar” button next to HHA Systems was removed (it did nothing useful there).
- **Marketing has no free trial** (founders, 2026-10-05; supersedes the “Prueba gratis” pill on that page): marketing is not tested; a meeting is scheduled to talk about the service and it starts right away. The Marketing closing band says “Hablemos de tu marketing…” with “Agenda una reunión”. The trial applies to HHA Systems (and the web demo on quoting), not to marketing.
- **Óptica / Dentista** now rotates two photos (glasses and dentist) with a fade.
- **Home**: the chat avatar in “Te acompañamos en cada paso” is the real HH logo; “Nosotros” gained a small Business + Technology diagram with the HH logo.
- **Prueba gratis**: layout mirrored (preview on the left, options and form on the right); the preview text now sits in a card overlapping the preview and the three steps run horizontally.

## 2026-10-05 — Second round: free trial page, tone per page, richer previews (branch `rediseno-estructura`, pending founders' approval)
- **Light/dark toggle removed** (supersedes “Light mode (cream)” in the Design System and the toggle in the header). Each page has its own tone, set in `src/lib/tema.ts`: Inicio, Marketing and Proceso are dark; Servicios, Prueba gratis, Contacto and the legal pages are a **bluish light** (`#E6EDF7` page, `#D9E3F1` sections) instead of cream. Interpretation of the founders' voice note; to be confirmed.
- **New page `/prueba-gratis`** (HHA Systems free trial, 7 days via `demoPlazo`): form on the left (business type, business name, your name, email, WhatsApp) and, on the right, a live example preview of the system that changes with the business type and shows the business name typed. It saves like any other request (Supabase) and shows a thank-you window; it does not quote. Every HHA Systems call to action (home, Servicios, diagnostic result, modals, closing band) now leads here, and “Prueba gratis” is in the menu.
- **HHA Systems cards**: photos now fill the top of each card and are fully visible (new, clearer photos for barbería, tatuajes and óptica); “Óptica” is now “Óptica / Dentista”; cards lift and tilt in 3D on hover/focus; a small example notification appears on each photo.
- **Servicios**: each web plan shows an animated example page with a photo (examples, not client sites); HHA Systems shows a preview miniature per business type; the marketing button became an animated banner with a marketing photo; new pack “Negocio online” (HHA Systems + Marketing + Contenido); plans and packs rise on hover and when chosen; a “Prueba gratis 7 días” pill sits at the top.
- **Closing red bands**: texts rewritten with no “reunión” calls to action (home and Servicios → create the free trial; Marketing has its own text → “Cuéntanos de tu marca”; Proceso → “Solicita cotización”); buttons are 3D; the HH logo now shows large and more visible, in a different place on each page.
- **Cómo trabajamos**: the step and metric drawings are now light and simple instead of dark; the metric clock was replaced by an animated hourglass.
- **Bug fixed**: heading text could render black on the navy band in the light tone (a style outside the layers overrode the band color). The rule now sits in the base layer.

## 2026-10-05 — Home redesign (branch `rediseno-estructura`, pending founders' approval by pull request)
- **Home structure** (replaces: orbit hero, Postura, Método and the 3-question tiles): full-width video hero with a headline that changes by business type; “Elige lo que necesitas” (4 category cards, each linking to its own part of /servicios; marketing goes to /marketing; Desarrollo web also points to HHA Systems); **HHA Systems** section; “Por qué HHA” band with the HH monogram; “Te acompañamos en cada paso” (4 stages + example chat, replaces the 3-question tiles); Equipo, then Nosotros (“negocio y tecnología”) under it; closing band.
- **HHA Systems** (draft in HHA_SYSTEMS_PRODUCT.md): shown as “HHA Systems by HHA Digital Solutions SpA”, five example windows with a photo each (barbería/peluquería together, estética, tatuajes, óptica, wellness), each with “Ver qué incluye”; the CTA goes to /contacto with HHA Systems preselected. Not labelled “en desarrollo” (founders' decision); no usage figures, clients or real screenshots. Example windows are labelled “Ejemplo”.
- **Servicios** (replaces the 4-category order): 01 Desarrollo web (Web Start/Business/Pro), 02 HHA Systems (new service `hha-systems`), 03 Marketing, 04 Automatización, 05 IA y consultoría; then packs, Método and the closing band.
- **Proyectos page removed** (supersedes “/proyectos” in Master Context): permanent redirect /proyectos → /marketing; Aaron and Bar de Blas now open the Marketing page, followed by marketing services only (no orbit background). Removed from menu and sitemap.
- **Diagnóstico** (3 questions) now can recommend HHA Systems; first question adds “Que mis clientes reserven y compren online”.
- **Demo gratuita: 7 días** (founders, 2026-10-05; `demoPlazo`). Used in the new accompaniment section. The plan cards/maintenance notes removed by Alexander are NOT restored.
- **Cómo trabajamos**: 8 steps reduced to 5 (Conversamos, Propuesta, Construimos contigo, Entrega y publicación, Acompañamiento y mejora). Metric clock now ticks like a real clock.
- **Motion**: reveals on scroll are stronger (rise, scale, de-blur, staggered); scroll-linked depth in the hero, the Systems photos and the HH monogram; reduced-motion respected.
- (The open decision about the light/dark toggle was resolved in the entry above of the same day.)

## 2026-10-05 — Hero video without the generator mark and without the AI note
- **Supersedes** the small “Escena generada con IA” note under the hero background (2026-10-02): founders asked to remove it. The note is gone from the code and styles.
- The generator's “Ai” mark in the top-left corner of both hero videos (dark and light) and their poster images was removed, so the full frame can be shown. No other logo remains in the frame.
- Founders decided not to buy the paid CapCut plan for now. The open question about commercial use of free-plan output (HHA_TECH_STACK.md → Media) stays with the founders.

## 2026-10-02 — Alexander Bello's team photo approved
- **Supersedes** “Alexander Bello — Photo: pending” in Master Context → Website team copy: the photo exists, is approved and is already used in the Equipo section (`public/img/equipo/alexander-bello.jpg`, referenced from `src/lib/config.ts`). Approved by the founders.
- The rule “never publish a placeholder photo box; if a photo is missing, render the card without a photo” is unchanged.

## 2026-10-02 — Web plans: maintenance paid separately, minimum terms, free demo
- **Supersedes** “Cada plan incluye la implementación y un servicio mensual de mantenimiento” and the maintenance items inside each plan's “Ver qué incluye”: the initial payment covers only the development; monthly maintenance is separate, with minimum terms (Web Start 3 months; Web Business 3, 6 or 12 months; Web Pro 6 months).
- New: free demo when quoting, to try the website before deciding (period to be defined by the founders: `demoPlazo`).
- Website: line on each plan card, category intro, demo note and “Cómo se paga” in “Ver qué incluye”. No prices shown.

## 2026-10-02 — Hero: screen text, light-mode version, AI note; animated process and metrics
- The laptop screen in the hero video and still image now reads “Digitaliza. / Automatiza. / Escala.” (Escala in red), replacing “Desarrollo web. / Automatizaciones. / Llega a más clientes.” (which the AI had also misspelled).
- **Supersedes** the light-mode treatment of the hero background (dark video washed with filters looked like a dark stain): light mode now uses its own files (`fondo-claro.*`), the same scene in warm cream tones with the brand red only on the screen.
- Small “Escena generada con IA” note under the hero background (transparency; see Tech Stack → Media).
- Cómo trabajamos: each of the 8 steps and each of the 4 metrics has its own animated scene (Ilustraciones.tsx), replacing the static icons.
- **Supersedes** the orbits behind Proyectos: a content-editing interface (preview, automation flow, timeline with a moving playhead).

## 2026-10-02 — Hero video background, header button, new plan cards
- Hero: the founders' laptop video (6 s loop, ~1.1 MB) is now a background layer on the right side, behind the orbits; its first frame is the still image for loading, tablets, phones and reduced motion. Copy, buttons, layout, strip, orbits, nodes and logo unchanged. See Design System → Hero background.
- **Supersedes** the header “Haz tu diagnóstico” outline button with rotating border: it now uses the hero's red 3D button (`.btn-vivo`, compact). Same in the mobile menu.
- **Supersedes** the plan cards (dark square with icon, “+ Agregar”): Midnight Navy/ivory cards with a drawing of the site each plan builds, level bars, full-width “Elegir plan” button (red for Web Business) that becomes “Solicita cotización →”. The “Ver qué incluye” window button reads “Elegir este plan”.
- Decorated sections use `overflow: clip`, so the side orbits can never be scrolled into view by focus or links.

## 2026-10-01 — Thank-you window instead of WhatsApp, automatic reply hook, Aaron gallery
- **Supersedes** “the form opens WhatsApp or email”: forms save the request and show a thank-you window promising contact by the visitor's channel “en la próxima hora”; WhatsApp/email only as a backup if saving fails. Applies to the contact form and the diagnostic.
- Automatic reply hook: optional `SOLICITUDES_WEBHOOK_URL` (+ `SOLICITUDES_WEBHOOK_SECRETO`) receives every saved request, for n8n base replies per project.
- Aaron gallery: cover is the guests photo; the repeated “#01” photo was removed; a new stage photo was added; the event clip moved to the end.

## 2026-10-01 — Supabase connected for form submissions
- Contact and diagnostic forms save each submission in Supabase (`solicitudes_cotizacion`), in addition to opening WhatsApp or email.
- Insert-only access with the publishable key through a server route; honeypot and minimum fill time against bots.
- **Supersedes** “the form does not store data on servers” in Privacidad and Seguridad: both pages now explain the data is stored in Supabase (servers in the United States) and protected. A short notice under the send buttons links to Privacidad.
- Region stays us-east-1 (founders' question answered; see Tech Stack → Database).

## 2026-10-01 — Required form data, named packs, cream backgrounds in light mode
- **Supersedes** the Proyectos closing band: “¿TE IMAGINAS EL TUYO?” / “Entendemos tu negocio y te proponemos la solución que de verdad necesita.” / “Agenda una reunión”.
- Forms (contact and diagnostic): name, and email or WhatsApp, are required and labeled “Obligatorio”; a friendly notice with a button takes the visitor to the missing field.
- **Supersedes** pack buttons: “Elegir pack” (adds all services); “Elegir un servicio” removed. Each pack has a short name: Crecimiento, Eficiencia, Presencia, Conexión.
- Project covers without orbits: dot pattern and a passing light beam.
- **Supersedes** light-mode Sand section bands: all section backgrounds are Cream; cards in those sections become Sand.
- Real project material: photos and short clips (4.5 s from Aaron's event video, 5 s from Bar de Blas' reel) in the galleries, with reference texts. Automation added to both references (Aaron: stream formats and scripts; Bar de Blas: reels editing and carousel ideas).

## 2026-10-01 — Animated hook, closing-band kickers, contact redesign, livelier cards
- Hero hook “DIGITALIZA · AUTOMATIZA · ESCALA” becomes an oval carousel inside a capsule (it looked asymmetric on mobile).
- **Supersedes** “¿HABLAMOS?” on every closing band: one kicker per page; Proyectos band now reads “¿Y TU NEGOCIO?” / “Descubre qué soluciones le pueden servir a tu negocio.” (replaces “¿El próximo caso es el tuyo?”). New band for Cómo trabajamos.
- Contact page redesign: site background kept, Midnight Navy form card with red glow in both themes, icons on contact details, animated red send button.
- Services, process and projects: livelier cards (corner glow, hover lift, reacting icons, rotating border on the recommended plan, large step numbers, project covers with moving glow and orbits).

## 2026-10-01 — Service categories, need-based plans, buttons by intent
- Web plan cards state the need they cover; the explanation moves to “Ver qué incluye”.
- **Supersedes** the Servicios layout: categories (Desarrollo web, Marketing y captación, Automatización, IA y consultoría), then packs, then “Tu selección”. “Ver todos los servicios” removed (every service is visible in its category). “Elegir un servicio” opens a window with the pack's services.
- **Supersedes** “Integraciones not offered”: now a service under Automatización, limited to connecting existing tools. New line: Procesos digitales.
- Packs updated: “tareas manuales” adds Procesos digitales; “herramientas” adds Integraciones.
- Home method: new approved texts; step 3 renamed “Lo construimos contigo”; link “Ver cómo trabajamos →”.
- **Supersedes** the CTA list: buttons by visitor intent (see HHA_SERVICES.md). “Agenda una reunión” returns for visitors who want to talk (closing bands of Inicio and Servicios, contact button with no services selected). “Solicita un diagnóstico” removed. Project gallery button: “Explora soluciones similares”.
- Home main button: “Te orientamos en 3 preguntas”, animated solid red with a 3D lift on hover.

## 2026-10-01 — Contact promise: diagnostic conversation first
- **Supersedes** “we arrive at the meeting with a proposal, not questions”: contact text is now “Cuéntanos qué necesitas y agendamos una conversación de diagnóstico. Primero entendemos tu negocio; después te enviamos una propuesta por escrito.” Same idea in the contact page description and in the diagnostic window. Aligned with “Cómo trabajamos” (diagnostic meeting → written proposal).

## 2026-10-01 — Hero text, packs sold complete, project gallery
- **Supersedes** the hero pre-title and the hero variant: a single text under the headline, “Creamos sistemas digitales que ayudan a marcas, creadores y empresas de todo Chile a vender y operar mejor, con estrategia, contenido y tecnología.” Nothing above the hook.
- Hero hook: AUTOMATIZA in red, using contrast-safe shades of Signal Red for small text (`#EB4B5F` dark, `#B3192F` light).
- **Supersedes** “Agenda una reunión”: header button “Haz tu diagnóstico” (opens the diagnostic); contact title “Te contactamos”, text about a scheduled meeting with a proposal, not questions.
- @hhiagencia.cl written next to the Instagram icon (footer) and under it (contact).
- **Supersedes** “pick one, two or the full pack”: packs are sold complete; “Elegir un servicio” opens the full list with that pack's services first and highlighted. “Ver todos los servicios” now lists all services, web plans included.
- Projects: each card opens a gallery (image, what was done, service). Texts are drafts and images are pending.

## 2026-10-01 — Advisor review applied
- Analytics: Vercel Web Analytics with custom events (instead of Plausible/Umami).
- Diagnostic: answers now travel to the contact message; the result window asks for name and phone/email and sends without leaving the page.
- **Supersedes** the hero headline: big “Desarrollo web. / Automatizaciones. / Llega a más clientes.”; the brand hook moves to small caps above; new pre-title “Creamos sistemas digitales…”.
- Delivery times: defined in the meeting (shown in each plan's detail).
- New page “Cómo trabajamos” (/como-trabajamos, menu “Proceso”): detailed 8-step process and metrics. DRAFT, to be corrected with practice.
- “Casos” becomes “Proyectos” (/proyectos) until each case has a real metric.
- Contact: 4 data rows instead of 6 (no duplicated Instagram); form first on mobile.
- Closing buttons: home “Solicita un diagnóstico”, services “Solicita cotización”, projects “Explora soluciones” (goes to the solutions section).
- Servicios: problem → solution packs (1, 2 or full pack, full pack recommended) and “Ver todos los servicios”; empty selection offers “Hacer diagnóstico”. New line “Captación de clientes”. “Integraciones” not offered as a separate service (API capability not proven).

## 2026-10-01 — Light-mode band and footer, legal pages, guide name
- **Supersedes** “footer navy in both themes”: in light mode the closing band is Midnight Navy and the footer is Sand; dark mode unchanged.
- Hero guide renamed from “¿Qué plan necesito?” to “Descubre qué necesita tu negocio” (help understand the need, not sell a plan).
- Header: Instagram link removed. Herberth's card links to his personal-brand Instagram (handle to confirm).
- Alexander's photo added.
- Footer: “Base en Valparaíso · Trabajamos en todo Chile” and legal links. Draft pages: Privacidad, Términos, Seguridad (factual drafts; legal review required before publishing).

## 2026-10-01 — Contact without direct WhatsApp, plan guide
- **Supersedes** the floating “Hablemos” WhatsApp button: removed for spam/bot protection. Phone shown as text with a call link in contact and footer.
- Footer: contact column with phone, email and social icons (Instagram; Facebook and TikTok once their URLs are provided).
- Hero main button becomes “¿Qué plan necesito?”: a 3-question guide that recommends Web Start/Business/Pro or another service line and pre-selects it for the quote.
- Contact form: clear error message above the button; the email option copies the message in case the visitor has no mail app.

## 2026-10-01 — Hero line, extra services, plan details
- Hero line ends with “en todo Chile” instead of “Desde la Región de Valparaíso para todo Chile”.
- Website adds “Creación de contenido” and “Acompañamiento digital” (both already in Complementary services).
- Each web plan gets a “Ver qué incluye” window. Its contents are a DRAFT pending founder definition of each plan's scope.

## 2026-10-01 — Cream light mode
- **Supersedes** the light-mode background `#F8FAFC`: founders found it too bright. New light mode: Cream `#F1ECE2`, Sand `#E9E2D5`, secondary text `#5C5D64` (Midnight Navy at 65 %). `#64748B` and small red text are not used on cream (insufficient contrast).
- TEST (pending founder confirmation, not yet a rule): location wording “Desde la Región de Valparaíso para todo Chile” replaces “Quinta Región y alrededores” on the website.

## 2026-10-01 — Channels, geography, team roles and theme
- **Supersedes** the pending contact channels: WhatsApp +56 9 3925 3239 and email hhadigitalsolutions@gmail.com.
- **Supersedes** the initial geography (Casablanca, Valparaíso, Viña del Mar): now “Quinta Región y alrededores” (official: Región de Valparaíso), to expand later.
- Customer profile: “service companies” becomes “service or product companies”.
- Team roles: Herberth “Automatización, estrategia, marketing y ventas”; Alexander “Estrategia de desarrollo y automatización”.
- Website: light and dark themes; follows the device by default with a visitor toggle.
- Contact form reduced to: name (person or project), what the business is about, services needed, email and/or phone.

## 2026-10-01 — Domain and publishing flow
- hhiagencia.cl is registered at NIC Chile; Herberth holds the main access and shared it with Alexander.
- Publishing flow: working branch → pull request approved by the founders → `main` → Vercel.
- HHA already has an active **Vercel Pro** plan.

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
