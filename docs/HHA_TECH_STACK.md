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

## Media (hero video)
- `public/img/hero/fondo.mp4`: H.264 (High), 1920×1080, 30 fps, 6 s, no audio, `faststart`, ~1.1 MB. Built from the founders' 5 s clip as a smooth back-and-forth camera move (it eases to a stop at each end and starts and ends on the same frame), so the loop has no visible cut. The original clip was HEVC, which many browsers do not play.
- Still image: `fondo.webp` (1672 px, ~32 KB) and `fondo-960.webp` (~15 KB), from the founders' image, which matches the video's first frame.
- Screen text replaced in every frame and in the still image: “Digitaliza. / Automatiza. / Escala.” (Archivo Black, Escala in red), tracking the screen and the content that the AI drifts inside it, so it moves with the rest of the page drawn on the screen.
- Light mode has its own files: `fondo-claro.mp4` (~0.7 MB), `fondo-claro.webp`, `fondo-claro-960.webp`: the same scene in two warm tones (sand to warm white) with the brand red only on the screen. The still image is chosen by CSS from the theme (only the right one downloads) and the video by HeroFondo.tsx.
- AI provenance: made with CapCut (Dreamina Seedance 2.5, Edit Pilot beta) on a free plan. Dreamina's terms (updated 2026-01-22) say the user owns the outputs and do not mention watermarks; CapCut sells watermark-free export as part of its paid plan and recommends disclosing realistic AI footage. Since 2026-10-05 the site no longer shows an AI note and the generator's “Ai” mark was removed from the video frames (founders' decision). Founders to confirm commercial use with a paid plan.
- Loading: the image is in the page from the start (no layout shift; the layer is positioned absolutely). The video is requested only after the page finishes loading, only on screens 1025 px and wider, without reduced motion and without data saver; it pauses when the hero is off screen. No extra libraries.

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

## Photos of the HHA Systems cards (2026-10-05)
Unsplash photos (Unsplash License: free for commercial use, attribution not required but appreciated), saved as WebP in `public/img/sistemas/`. barberia: Antonio Reynoso (id 1Ig9rw7aC5g); estetica: Ionela Mat (16mHHrY3PUk); tatuajes: Bradley Andrews (iM9e8a-aYfI); optica / dentista: Harold Hisona (Bg81yWKZlMg); wellness: engin akyurt (ZbzYDboN7fg). Examples of web pages in Servicios (`public/img/ejemplos/`): web-start: Ruben Ramirez (xhKG01FN2uk); web-business: Campaign Creators (gMsnXqILjp4); web-pro: Alyssa DeGarde (S8E-uqwyNF4); marketing banner: Markus Winkler (vEPvRTyxKzs). Óptica rotates two photos: optica-ojos: Scott Van Daalen (UsALNdok2m4) and optica-dentista: Harold Hisona (Bg81yWKZlMg). Service photos (`public/img/servicios/`): marketing: Walls.io (WJRIxCK4Tsk); captacion: Christin Hume (mfB1B1s4sMc); contenido: Jakob Owens (kbd1oAf-9Ms); automatizacion: Jakub Żerdzicki (WD7S-Lz12Es); integraciones: Scott Rodgerson (PSpf_XgOM5w); procesos: Alvaro Reyes (qWwpHwip31M); ia: Timur Shakerzianov (yCs7YTwEw2w); acompanamiento: Vitaly Gariev (YuO3d4XS6yw). Before adding a person-centred photo to a different use, check the license page of that photo.
