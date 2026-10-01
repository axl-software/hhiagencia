@AGENTS.md

# Contexto del proyecto: web de HH Studio Creativo (hhiagencia.cl)

## Quién y qué
- Cliente y dueño: Herberth Garay, director creativo de **HH Studio Creativo**, agencia de marketing y dirección creativa (Casablanca · Valparaíso · Viña del Mar, Chile). Trabaja con emprendimientos, negocios, artistas y creadores (ej. un streamer en Kick).
- Este repo es el sitio web de la agencia. Dominio: **hhiagencia.cl** (comprado en NIC Chile). Publicación prevista en **Vercel**.
- Repo en GitHub: `axl-software/hhiagencia` (privado, lo administra el desarrollador).

## Cómo se trabaja
- Responde y escribe todo en **español de Chile**.
- Si Herberth pide una decisión: da **una sola recomendación**, no varias opciones.
- Datos concretos antes que adjetivos. Cero lenguaje de anuncio en los textos del sitio.
- No inventes métricas, reseñas ni resultados de clientes: deja el marcador `[DATO REAL: …]` hasta que Herberth entregue el dato.

## Historia
1. El repo partió como plantilla vacía de `create-next-app`.
2. El diseño se hizo en **Claude Design** + plantilla externa (React 18 + Vite + Tailwind 3) y se migró a Next.js 16, React 19, Tailwind 4, TypeScript.
3. Herberth probó plantillas de portada. Regla: usar la plantilla como BASE de estructura y aplicarle SIEMPRE la estética HH y el enfoque de agencia de IA y marketing; nunca copiarla tal cual (una portada "vision" copiada literal fue descartada).
4. Quedó la portada "órbita" (plantilla Marketeam llevada a HH) y el sitio se separó en páginas dentro de `src/`. Las portadas anteriores y `hls.js`/`framer-motion` se eliminaron.

## Estructura (src/)
- Páginas: `/` (portada órbita, postura, método, nosotros/quiénes somos, equipo, CTA) · `/servicios` (cotizador, método, CTA) · `/casos-y-resenas` (casos, reseñas, CTA) · `/contacto` (formulario). La ruta es `casos-y-resenas` sin ñ a propósito (URLs limpias).
- `src/app/layout.tsx` → Header + `<main>` + Footer; metadatos con plantilla de título `'%s · HH Studio Creativo'`. Cada `page.tsx` exporta su `metadata`. `src/app/not-found.tsx` → 404 en español.
- `src/components/Header.tsx` (+ `.module.css`) → sticky, link activo con `usePathname`, menú móvil a pantalla completa (renderizado FUERA del `<header>` porque su backdrop-filter recorta elementos fixed).
- `src/components/Footer.tsx` + `WhatsAppFlotante.tsx` (botón "Hablemos").
- `src/components/HeroOrbita.tsx` (+ `.module.css`) → portada del inicio: titular con máquina de escribir, visor de cámara con REC + timecode, 4 órbitas con íconos de servicios/IA, contador "06 servicios creativos", cursor "Herberth", cinta de servicios. CSS puro.
- `src/components/sections/` → una sección por archivo. `Heading.tsx` da Kicker + Title (prop `as="h1"` cuando la sección abre la página). Postura, Metodo, Nosotros, Equipo, CtaBanda son de servidor; Servicios, Casos, Resenas, Contacto son de cliente.
- Cotizador → `/contacto?servicios=id1,id2`; `Contacto.tsx` lo lee con `useSearchParams` (por eso la página lo envuelve en `<Suspense>`).
- `src/lib/config.ts` → **todos los datos editables** + `waUrl()`. `src/lib/nav.ts` → páginas del menú (Header y Footer).
- `src/app/globals.css` → tokens de marca, estilos de secciones y el botón `.btn-giro` / `.btn-giro-wrap` (borde giratorio rojo, `@property --border-angle`).
- Vista previa: `npm run preview:html` → `preview-html/index.html` con todas las páginas. Vite reemplaza `next/link` y `next/navigation` por `preview/shims/` (router por hash: `#servicios`, `#contacto?servicios=…`). Si agregas una página, súmala también a `PAGES` en `preview/main.tsx`.

## Marca (no cambiar sin pedirlo)
- Colores: azul noche `#061323` (fondo), rojo REC `#FE0000` (acento), negro `#000000`, blanco `#FFFFFF`. Tailwind: `bg-hh-noche`, `text-hh-rojo`, etc.
- Tipografías (Fontsource, autoalojadas): **League Gothic** (títulos, mayúsculas), **Montserrat** (texto), **Anonymous Pro** (etiquetas/kickers).
- Concepto visual: rodaje/cámara — punto rojo "REC", "tomas" en vez de pasos.
- Instagram: `@hh.condireccion` (confirmar grafía).

## Notas técnicas
- Los estilos propios en `globals.css` están en `@layer base` / `@layer components` para que las clases de Tailwind puedan sobrescribirlos. No los saques de las capas.
- `@source "../components"` y `"../app"` en `globals.css` son necesarios para la vista previa en HTML.
- `LayoutProps` lo genera Next al compilar: `tsc` falla antes del primer `next build`/`next dev`, es normal.

## Pendiente (lo entrega Herberth)
- Sección Equipo (`sections/Equipo.tsx`, datos en `config.equipo`): presentada como créditos de película (rol en mono, "CÁM. A/B/C"). Faltan bio de Herberth, integrantes reales, fotos y la frase de la cabecera (marcador `[TEXTO: …]` en el componente).
- Número de WhatsApp y email en `src/lib/config.ts` (sin ellos el formulario no envía).
- Precios de los 6 servicios (hoy `null` → "[TU PRECIO]").
- Fotos: casos (Aaron, Bar de Blas, L@s MALPORTAD@S, Primera Semana Creativa) y retrato de Herberth → `public/img/`.
- Reseñas reales y resultados reales de cada caso.
- Favicon y logo de HH (hoy favicon por defecto de Next).
- Conectar repo a Vercel y apuntar hhiagencia.cl.
