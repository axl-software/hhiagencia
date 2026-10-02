# HHA Tech Stack V1.2

## Current stack
- Vercel
- Supabase
- Claude Code
- n8n
- MailerLite
- LinkDM

## Domain and hosting
- Domain: **hhiagencia.cl**, registered at **NIC Chile**. Herberth holds the main account access; access is shared with Alexander.
- Code: GitHub repository `axl-software/hhiagencia` (Alexander's account; Herberth is a collaborator).
- Hosting: **Vercel Pro** (active plan, suitable for commercial use). The hhiagencia project is pending connection. Changes are prepared on a working branch and reach `main` only through a pull request approved by the founders.

## Database (Supabase)
- Project: “HH6A Digital Solution's Project” in HHA's Supabase account (hhadigitalsolutions@gmail.com), region **us-east-1 (North Virginia)**, created there by default. Founders asked whether to move it to São Paulo: not needed for now (a form insert takes a fraction of a second either way, and Vercel's default server region is also on the US East Coast); moving would mean creating a new project. Compute: Nano.
- Table `solicitudes_cotizacion`: every submission of the contact form and the diagnostic (name, business, email, phone, services, diagnostic answers, origin, channel, page, status). Definition and security rules in `supabase/solicitudes_cotizacion.sql`.
- Security: the website uses only the **publishable** key, through a server route (`src/app/api/solicitudes/route.ts`). The table allows insert-only for that key (row level security + column grants); nobody can read, change or delete rows from outside. The team reads them in the Supabase dashboard. The secret key is never used by the site and must never be shared in chats.
- Anti-spam: hidden honeypot field, minimum fill time, same-site check, server-side validation and length limits in the database. Cloudflare Turnstile can be added later if spam appears.
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (`.env.local` locally, Vercel → Environment Variables in production).
- After sending, the site shows a thank-you window (no redirect to WhatsApp). If saving fails, the window offers to send the request by WhatsApp or email with one click, so no lead is lost.
- Automatic reply hook: if `SOLICITUDES_WEBHOOK_URL` is set (server-only; e.g. an n8n webhook), every saved request is posted there as JSON (`evento: nueva_solicitud`, contact data, services, diagnostic answers, `contactar_por`). Optional `SOLICITUDES_WEBHOOK_SECRETO` is sent as header `x-hha-secreto`. The founders will connect it to base replies per type of project. Payload documented in the README.
- `@supabase/ssr` and Supabase agent skills are not installed: they are for user logins and AI-assistant guidance, not needed for saving form submissions. Add `@supabase/ssr` when the client portal (logins) starts.

## Analytics
Vercel Web Analytics (included in Vercel Pro; anonymous, no cookies). Custom events: `guia_inicio`, `guia_fin`, `servicio_agregado`, `formulario_enviado` (channel and origin), `proyecto_visto`. The analytics script loads only in builds made on Vercel (`VERCEL=1`); on a local machine it is skipped, because its file only exists on Vercel and would show a 404 error in the browser. Chosen over Plausible/Umami to avoid another account and cost. The privacy page must stay consistent with it.

## Roles
### Herberth Garay
Marketing, content, lead magnets, client-facing strategy, sales and business direction.

### Alexander Bello
Development, software, Supabase, cybersecurity and technical implementation.

## Learning areas
- n8n,
- automation architecture,
- API integrations,
- web design systems,
- scalable implementation,
- reusable delivery processes.

## API status
No meaningful production API integration experience is currently approved as a proven capability.

## Technical principle
Choose the simplest architecture that solves the client's real problem, can be maintained, can be delivered profitably and can later be automated or reused.
