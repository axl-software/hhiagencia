# HHiAgencia — Web (hhiagencia.cl)

Sitio de HHA Digital Solutions: web, automatización y marketing. Antes de cambiar marca, servicios o diseño, lee `CLAUDE.md` y `docs/`.

Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript + Lucide.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Portada ("Digitaliza. Automatiza. Escala."), por qué HHA, método, nosotros, equipo, CTA |
| `/servicios` | Planes Web Start / Business / Pro y otras líneas, sin precios; la selección va a /contacto |
| `/casos-y-resenas` | Casos aprobados; reseñas solo si hay reales |
| `/contacto` | Formulario de diagnóstico → WhatsApp, email o (mientras faltan) chat de Instagram |

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
    ├── config.ts             DATOS EDITABLES: WhatsApp, email, Instagram, servicios, casos, reseñas, equipo
    └── nav.ts                páginas del menú
public/img/                   fotos
preview/                      vista previa en un solo HTML (router por hash)
```

## Editar contenido
- `src/lib/config.ts`: WhatsApp, email, Instagram, servicios, casos, reseñas y equipo. Lo que esté vacío no se muestra (sin textos de relleno). No se publican precios hasta que estén aprobados.
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

### Después de bajar cambios (git pull)
Si alguien agregó o cambió paquetes (por ejemplo, las fuentes), hay que instalarlos y borrar la caché:
```
npm install
npm run limpiar    # borra .next (la caché de compilación)
npm run dev
```
Error típico si se salta este paso: `Can't resolve '@fontsource/...'` en `globals.css`.
La caché puede seguir mostrando el error aunque el paquete ya esté instalado: por eso `npm run limpiar`.

## Supabase (solicitudes de los formularios)
Cada envío del formulario de contacto y del diagnóstico se guarda en la tabla `solicitudes_cotizacion`
(además de abrir WhatsApp o el correo). Lo hace `src/app/api/solicitudes/route.ts`.

1. Copiar `.env.example` como `.env.local` y completar la URL y la clave **publishable** del proyecto
   (Supabase → Project Settings → API). Nunca usar la *secret key* ni la *service_role*.
2. En Supabase → SQL Editor, pegar y ejecutar `supabase/solicitudes_cotizacion.sql` (crea o completa la tabla
   y la protege: desde la web solo se puede agregar; nadie puede leer).
3. En Vercel → Settings → Environment Variables, agregar las mismas dos variables.
4. Ver las solicitudes: Supabase → Table Editor → `solicitudes_cotizacion`.

Después de enviar, la página muestra un mensaje de gracias: "Nuestro asesor comercial te contactará por
WhatsApp al … / por correo a … en la próxima hora" (plazo en `src/lib/config.ts` → `tiempoRespuesta`).
Ya no abre WhatsApp. Si no se puede guardar (sin variables, sin conexión o en la vista previa), ofrece
enviar la solicitud por WhatsApp o correo con un clic, para que no se pierda.

### Respuesta automática (n8n u otro)
Si se define `SOLICITUDES_WEBHOOK_URL` (en `.env.local` y en Vercel, sin `NEXT_PUBLIC_`), cada solicitud
guardada se envía a esa URL con un POST en JSON:
```json
{ "evento": "nueva_solicitud", "fecha": "2026-10-01T15:00:00.000Z",
  "nombre": "…", "negocio": "…", "email": "…", "telefono": "…",
  "servicios": ["Web Business"], "diagnostico": [{ "pregunta": "Prioridad:", "respuesta": "…" }],
  "origen": "formulario | diagnostico", "canal": "whatsapp | email", "contactar_por": "whatsapp | email",
  "pagina": "/contacto" }
```
Con `SOLICITUDES_WEBHOOK_SECRETO`, la petición lleva el encabezado `x-hha-secreto` para que el flujo
verifique que viene de la web. El flujo elige el mensaje base según `servicios`/`origen` y responde por
`contactar_por`.

## Vista previa en un solo HTML
```
npm run preview:html   # preview-html/index.html, con las 4 páginas navegables
```

## Publicar
Vercel detecta Next.js solo. Conectar el repo y apuntar el dominio hhiagencia.cl.
