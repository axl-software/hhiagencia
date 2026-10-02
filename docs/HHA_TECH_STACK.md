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
