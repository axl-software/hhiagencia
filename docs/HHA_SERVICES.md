# HHA Services V1.2

## 1. Web Development
Current priority.

Includes:
- landing pages,
- corporate websites,
- basic e-commerce,
- maintenance,
- domain/hosting configuration,
- reusable templates where appropriate.

Packages:
- **Web Start**
- **Web Business**
- **Web Pro**

Goal: Web Business should be the natural best-value option for most clients.

On the website each plan card states the need it covers (approved by the founders); the explanation and what it includes go in “Ver qué incluye”:
- Web Start: “Para comenzar con una presencia digital profesional.”
- Web Business: “Recomendado para negocios que quieren usar su web para captar clientes y crecer.”
- Web Pro: “Para negocios que necesitan vender online, integrar herramientas o desarrollar funciones más avanzadas.”

How web plans are sold (founders, 2026-10-02; supersedes “each plan includes the implementation and a monthly maintenance service”):
- The initial payment covers only the service: developing and launching the website.
- Monthly maintenance is paid separately and is not part of “what's included”. Minimum terms: **Web Start** at least 3 months; **Web Business** 3, 6 or 12 months; **Web Pro** at least 6 months.
- Free demo: when quoting, HHA prepares a demo so the client can try the website before deciding, for a defined period (`demoPlazo` in `src/lib/config.ts`; still to be set by the founders).
- On the website this is shown discreetly: a line on each plan card (“+ Mantenimiento mensual …”), the category intro, a demo note under it, and a “Cómo se paga” section in “Ver qué incluye”. No prices.

Pricing is not public yet and must not be invented.

Approved CTA while pricing is being defined. Each button matches what the visitor wants at that point (founders, 2026-10-01; replaces the earlier list):
- Does not know what they need yet → **Haz tu diagnóstico** (header, mobile menu, Servicios with nothing selected) and **Te orientamos en 3 preguntas** (home main button). Both open the 3-question diagnostic.
- Wants to see the offer → **Ver servicios**.
- Already selected services or a pack → **Solicita cotización** (carries the selection to the contact form).
- Is looking at a project → **Explora soluciones similares** (gallery, goes to that project's service category). The Proyectos closing band no longer says “Explora soluciones”: founders felt it left visitors to figure it out alone; it now follows HHA's method (“Entendemos tu negocio y te proponemos la solución que de verdad necesita.” → **Agenda una reunión**).
- Understood the proposal and wants to talk → **Agenda una reunión** (closing bands of Inicio, Servicios, Proyectos and Cómo trabajamos; contact form button when no service is selected).
- Required data in every form (contact and diagnostic): name, and email or WhatsApp (one is enough). Fields show an “Obligatorio” label; if something is missing, a friendly notice (“Parece que te faltó…”, never “error”) appears above the button with a button that takes the visitor straight to the missing field.
- “Solicita un diagnóstico” is no longer used: it mixed the diagnostic and the contact form.
- The contact page title stays “Te contactamos”.
- Contact promise (founders, 2026-10-01): first a diagnostic conversation to understand the business, then a written proposal. The site must not promise a proposal before that conversation (matches “Cómo trabajamos”).
- After submitting a form (contact or diagnostic), the site does not redirect to WhatsApp (founders, 2026-10-01). It shows a thank-you window: “¡Gracias por contarnos tu proyecto, {nombre}! Nuestro asesor comercial te contactará por WhatsApp al … / por correo a … en la próxima hora.” The channel is WhatsApp when the visitor left a phone, otherwise email. The time promise lives in `src/lib/config.ts` → `tiempoRespuesta`; it must be achievable (automatic reply or a person on duty).

## 2. Automation
- lead capture,
- CRM workflow automation,
- email marketing automation,
- forms,
- internal process automation,
- n8n workflows,
- marketing automation.

## 3. Marketing Digital
- strategy,
- content,
- email marketing,
- funnels,
- automated marketing,
- lead generation systems.

## 4. Complementary
Shown on the website as “Creación de contenido”, “Consultoría y capacitación en IA” and “Acompañamiento digital” (implementation support + templates).
- AI consulting,
- AI training,
- content creation,
- digital implementation support,
- templates.

## Future
Not to be presented as mature offers unless approved:
- proprietary SaaS,
- custom AI agents,
- vertical systems,
- advanced dashboards,
- client portals.

## Website presentation: categories, then problem → solution
Approved by the founders (2026-10-01; replaces “web plans, then packs, then Ver todos los servicios”). The catalog does not change: services are grouped visually so visitors who know what they want find it, and visitors who don't can start from their problem without knowing technical names. Order on the Servicios page:
1. **Desarrollo web**: Web Start, Web Business, Web Pro.
2. **Marketing y captación**: Marketing digital, Captación de clientes, Creación de contenido.
3. **Automatización**: Automatización, Integraciones, Procesos digitales.
4. **IA y consultoría**: Consultoría y capacitación en IA, Acompañamiento digital.
5. **Packs** (“¿Qué problema quieres resolver?”).
6. **Tu selección**: diagnostic if nothing is selected, quote if something is.

Each category shows the need it covers in one line.

Packs (reviewed with the new services), each with a one-word name shown small above the problem:
- **Pack Crecimiento** — ¿Necesitas conseguir más clientes? → Marketing digital + Web Business + Captación de clientes.
- **Pack Eficiencia** — ¿Pierdes tiempo en tareas manuales? → Automatización + Procesos digitales + Consultoría y capacitación en IA.
- **Pack Presencia** — ¿Tu negocio no transmite profesionalismo online? → Web Business + Creación de contenido.
- **Pack Conexión** — ¿Tienes herramientas, pero ninguna trabaja junta? → Integraciones + Automatización + Acompañamiento digital.

Packs are sold complete: the button is “Elegir pack” (adds all its services at once; replaces “Elegir pack completo”, which suggested an incomplete pack was possible). There is no “Elegir un servicio” in the packs: single services are added from the categories above. Once a pack is chosen, its button becomes “Solicita cotización”. No discount is shown until prices are approved.
**Integraciones** is offered as a service under Automatización (founders, 2026-10-01; replaces “not offered as a separate service”). Scope: connecting tools the client already uses (web, forms, email marketing, CRM). Custom API development is still not a proven capability (Tech Stack → API status) and must not be promised.
**Procesos digitales** (new line, founders 2026-10-01): ordering and digitizing how the business works (forms, records, clear workflows).
“Captación de clientes” is shown as its own line; it is the lead-capture part of Automation.
Delivery times are not public: they are defined in the meeting, per project.

## Contract logic
Websites:
- implementation fee,
- recurring maintenance/service,
- preferred minimum initial period: **3 months**.

More complex personalized automation/services:
- **6 months** may be appropriate.

Trials:
- 7 or 14 days may be used when technically and commercially suitable.
