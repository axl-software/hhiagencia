# HHA Claude Code Implementation Guide

## Where these files go
They must live inside the **same Git repository as the actual HHA website**.

If the website is on GitHub and Claude Code is connected to that GitHub project, add:
- `CLAUDE.md` to the repository root
- `/docs` to the repository root

Example:

```text
HHA-WEBSITE/
├── CLAUDE.md
├── docs/
├── src/
├── public/
├── package.json
└── ...
```

Do not leave the memory ZIP in a separate local folder and expect Claude to audit the website from there.

## First prompt after installation

```text
Read CLAUDE.md and all files inside /docs.

Treat them as the current source of truth for HHA.

Do not modify the website yet.

Inspect this repository and:
1. identify conflicts between the current website and HHA memory,
2. list files/components that should change,
3. propose an implementation order,
4. identify anything that could break functionality,
5. wait for my approval before editing.
```

## Apply the brand

```text
Approved.

Adapt the current website to the approved HHA system.

Follow CLAUDE.md and /docs.
Preserve working functionality.
Do not redesign the approved logo.
Do not invent colors, fonts, pricing, testimonials or services.
Use HHiAgencia as the visible website name.
Use “HHA Digital Solutions | Web, Automatización y Marketing” as the SEO title.
Use HHA Digital Solutions in the footer.
Use “Solicita cotización” and/or “Agenda una reunión” while public prices remain undefined.
Implement progressively and verify after each major step.
```

## Memory update syntax

Approved:
```text
Esto queda aprobado. Guárdalo en la memoria de HHA y actualiza el documento correcto.
```

Replacement:
```text
Esto reemplaza la decisión anterior. Actualiza la memoria, elimina la regla obsoleta y regístralo en HHA_CHANGELOG.md.
```

Test only:
```text
Esto es solo una prueba. No lo guardes como decisión permanente.
```

## Recommended workflow
**Idea → Test → Approval → Memory → Implementation**
