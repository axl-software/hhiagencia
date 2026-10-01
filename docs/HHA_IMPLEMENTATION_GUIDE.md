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
Use “Solicita cotización” and/or “Haz tu diagnóstico” while public prices remain undefined (“Agenda una reunión” was replaced on 2026-10-01).
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

## Memory audit

```text
Audita la memoria de HHA.

Busca:
- contradicciones,
- decisiones duplicadas,
- reglas obsoletas,
- información en el documento incorrecto.

No cambies decisiones por tu cuenta.
Entrégame primero un reporte corto con las correcciones propuestas.
```

## Before major features

```text
Antes de construir esto, revisa CLAUDE.md y los documentos relevantes de /docs.

Confirma en máximo 5 puntos:
- qué reglas afectan esta tarea,
- qué archivos vas a modificar,
- qué no debes alterar.

Después ejecuta.
```

## Recommended workflow
**Idea → Test → Approval → Memory → Implementation**

## Editing memory safely
- Update the existing section; do not rewrite whole documents from scratch.
- Never delete a rule silently. If a rule is removed or replaced, add a new dated entry to `HHA_CHANGELOG.md` saying what it replaces.
- Never rewrite past changelog entries; add new ones on top.
- Do not save every conversation automatically. Persist only explicit approvals or replacements. That prevents brainstorming from corrupting the source of truth.

## Git recommendation

Initial:
```bash
git add CLAUDE.md docs/
git commit -m "docs: add HHA project memory and brand system"
```

Future updates:
```bash
git add docs/
git commit -m "docs: update HHA approved decisions"
```

This gives you version history for strategic changes.
