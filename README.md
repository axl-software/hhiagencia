# HHiAgencia — Web (hhiagencia.cl)

Sitio de HHA Digital Solutions: web, automatización y marketing. Antes de cambiar marca, servicios o diseño, lee `CLAUDE.md` y `docs/`.

Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript + Lucide.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Portada "órbita", postura, método (4 tomas), nosotros, CTA |
| `/servicios` | Cotizador de servicios y precios, método, CTA |
| `/casos-y-resenas` | Casos con filtro, reseñas, CTA |
| `/contacto` | Formulario de diagnóstico → WhatsApp (o email) |

El cotizador de `/servicios` envía la selección a `/contacto?servicios=redes,eventos`, y el formulario la deja marcada.

## Estructura

```
src/
├── app/
│   ├── layout.tsx            Header + Footer + metadatos (título por página)
│   ├── page.tsx              inicio
│   ├── servicios/page.tsx
│   ├── casos-y-resenas/page.tsx
│   ├── contacto/page.tsx
│   ├── not-found.tsx         404 en español
│   └── globals.css           marca, tipografías, estilos de secciones
├── components/
│   ├── Header.tsx (+ .module.css)   nav, link activo, menú móvil
│   ├── Footer.tsx
│   ├── WhatsAppFlotante.tsx         botón "Hablemos"
│   ├── HeroOrbita.tsx (+ .module.css) portada del inicio
│   └── sections/
│       ├── Heading.tsx       kicker + título (h1 si abre la página)
│       ├── Postura.tsx  Metodo.tsx  Nosotros.tsx  CtaBanda.tsx   (servidor)
│       └── Servicios.tsx  Casos.tsx  Resenas.tsx  Contacto.tsx   (cliente)
└── lib/
    ├── config.ts             DATOS EDITABLES: WhatsApp, email, Instagram, precios, casos, reseñas
    └── nav.ts                páginas del menú
public/img/                   fotos
preview/                      vista previa en un solo HTML (router por hash)
```

## Editar contenido
- `src/lib/config.ts`: WhatsApp, email, Instagram, precios (`null` = "[TU PRECIO]"), casos y reseñas.
- Fotos: en `public/img/` y `foto: '/img/archivo.jpg'` en `src/lib/config.ts`.
- Agregar una página: crea `src/app/<ruta>/page.tsx` y súmala a `src/lib/nav.ts`.

## Marca
Ver `docs/HHA_DESIGN_SYSTEM.md`: paleta `#0B1020` · `#05070A` · `#F8FAFC` · `#D7263D` · grises `#64748B` / `#94A3B8` · Archivo Black (impacto) · Space Grotesk (títulos) · Inter (texto) · JetBrains Mono (etiquetas).

## Local
```
npm install
npm run dev        # http://localhost:3000
npm run build
```

## Vista previa en un solo HTML
```
npm run preview:html   # preview-html/index.html, con las 4 páginas navegables
```

## Publicar
Vercel detecta Next.js solo. Conectar el repo y apuntar el dominio hhiagencia.cl.
