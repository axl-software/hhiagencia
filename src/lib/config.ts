/* =========================================================
   EDITA AQUÍ TUS DATOS. El sitio se actualiza solo.
   Fuente de verdad: CLAUDE.md y docs/. No inventes precios, clientes,
   resultados ni reseñas: lo que esté vacío simplemente no se muestra.
   ========================================================= */

export type Servicio = {
  id: string
  nombre: string
  desc: string
  /** 'web' = planes de desarrollo web; 'linea' = otras líneas de servicio */
  grupo: 'web' | 'linea'
  /** Plan recomendado (Web Business, según docs/HHA_SERVICES.md) */
  destacado?: boolean
  /** Lo que se ve en "Ver qué incluye" (solo planes web). */
  incluye?: string[]
}

export type Caso = {
  cat: string
  tag: string
  nombre: string
  /** Ruta dentro de /public (ej: "/img/aaron.jpg"). Vacío = sin foto. */
  foto: string
  resumen: string
  items: string[]
  /** Solo datos reales y con permiso del cliente. Vacío = no se muestra. */
  resultado: string
}

export type Resena = { texto: string; autor: string; rol: string }

export type Integrante = {
  rol: string
  nombre: string
  bio: string
  /** Ruta dentro de /public (ej: "/img/equipo/nombre.jpg"). Vacío = tarjeta sin foto. */
  foto: string
  tags: string[]
  /** Instagram personal (sin @). Vacío = no se muestra. */
  instagram?: string
}

/** Frase de la banda roja de cierre en cada página. */
export type Hooks = { inicio: string; servicios: string; casos: string }

export type Config = {
  whatsapp: string
  instagram: string
  facebook: string
  tiktok: string
  email: string
  servicios: Servicio[]
  casos: Caso[]
  resenas: Resena[]
  equipo: Integrante[]
  hooks: Hooks
}

export const CONFIG: Config = {
  whatsapp: '56939253239', // +56 9 3925 3239 (sin + ni espacios)
  instagram: 'hhiagencia.cl', // cuenta propia de HHA (docs/HHA_BRAND_FOUNDATION.md)
  facebook: '', // enlace completo, ej: "https://facebook.com/..." (vacío = no se muestra)
  tiktok: '', // enlace completo, ej: "https://tiktok.com/@..." (vacío = no se muestra)
  email: 'hhadigitalsolutions@gmail.com',

  // Precios: no se publican hasta aprobar costos y márgenes (docs/HHA_BUSINESS_MODEL.md).
  // "incluye": BORRADOR para que los fundadores lo ajusten (docs/HHA_SERVICES.md aún no define el alcance de cada plan).
  servicios: [
    {
      id: 'web-start', grupo: 'web', nombre: 'Web Start',
      desc: 'Para partir: una presencia web profesional y simple, lista para recibir contactos.',
      incluye: [
        'Landing page de una sola página',
        'Diseño adaptado a celular',
        'Botón de WhatsApp y formulario de contacto',
        'Configuración de dominio y hosting',
        'Mantenimiento mensual',
      ],
    },
    {
      id: 'web-business', grupo: 'web', destacado: true, nombre: 'Web Business',
      desc: 'La opción recomendada: un sitio completo para mostrar tus servicios y convertir visitas en clientes.',
      incluye: [
        'Todo lo de Web Start',
        'Sitio con varias secciones: inicio, servicios, nosotros y contacto',
        'Textos y estructura pensados para convertir visitas en clientes',
        'Optimización básica para aparecer en Google',
        'Mantenimiento mensual y ajustes menores',
      ],
    },
    {
      id: 'web-pro', grupo: 'web', nombre: 'Web Pro',
      desc: 'Para proyectos más grandes: más secciones, funciones o una tienda online básica.',
      incluye: [
        'Todo lo de Web Business',
        'Tienda online básica o funciones a medida',
        'Integraciones con formularios, email marketing o CRM',
        'Automatizaciones iniciales',
        'Mantenimiento mensual con mejoras continuas',
      ],
    },
    { id: 'automatizacion', grupo: 'linea', nombre: 'Automatización', desc: 'Captación de clientes, formularios, CRM, email marketing y tareas internas que hoy te quitan tiempo.' },
    { id: 'marketing', grupo: 'linea', nombre: 'Marketing digital', desc: 'Estrategia, contenido, email marketing y embudos para generar clientes.' },
    { id: 'contenido', grupo: 'linea', nombre: 'Creación de contenido', desc: 'Publicaciones, carruseles, reels y piezas para tus redes, alineadas a tu estrategia.' },
    { id: 'ia', grupo: 'linea', nombre: 'Consultoría y capacitación en IA', desc: 'Te mostramos qué se puede automatizar y qué impacto puede tener, y capacitamos a tu equipo.' },
    { id: 'acompanamiento', grupo: 'linea', nombre: 'Acompañamiento digital', desc: 'Te ayudamos a implementar herramientas, plantillas y procesos digitales en tu negocio.' },
  ],

  casos: [
    {
      cat: 'Streaming', tag: 'STREAMING · KICK', nombre: 'Aaron / aaronig12', foto: '',
      resumen: 'Dirección creativa y producción de streams y eventos en su canal de Kick.',
      items: ['Formatos y pautas de cada stream', 'Invitados y actividades en vivo', 'Gestión de patrocinadores', 'Clips para redes'],
      resultado: '',
    },
    {
      cat: 'Gastronomía', tag: 'GASTRONOMÍA · BAR', nombre: 'Bar de Blas', foto: '',
      resumen: 'Apoyo de contenido y marketing para @bardeblas.',
      items: ['Análisis del perfil de Instagram', 'Pauta de contenido', 'Sesión de fotografía'],
      resultado: '',
    },
  ],

  // Reseñas reales, textuales y con permiso del cliente. Vacío = la sección no se muestra.
  resenas: [],

  // Textos aprobados en docs/HHA_MASTER_CONTEXT.md → "Website team copy".
  equipo: [
    {
      rol: 'Automatización, estrategia, marketing y ventas', nombre: 'Herberth Garay', foto: '/img/equipo/herberth-garay.jpg',
      bio: 'Primero pregunta qué tiene que vender tu negocio. Recién después diseña, escribe o automatiza.',
      tags: ['Estrategia', 'Marketing', 'Ventas', 'Automatización'],
      instagram: 'soyherberthgaray', // marca personal: CONFIRMAR la grafía exacta
    },
    {
      rol: 'Estrategia de desarrollo y automatización', nombre: 'Alexander Bello', foto: '/img/equipo/alexander-bello.jpg',
      bio: 'Desarrolla las webs y automatizaciones de HHA, y se asegura de que sean seguras y fáciles de mantener.',
      tags: ['Estrategia', 'Desarrollo web', 'Automatización', 'Ciberseguridad'],
    },
  ],

  // Frases de la banda roja de cierre. Alternativas en docs/ o en la conversación con Claude.
  hooks: {
    inicio: 'Cuéntanos qué necesitas y te enviamos una propuesta.',
    servicios: '¿Ya elegiste? Te enviamos una propuesta.',
    casos: '¿El próximo caso es el tuyo?',
  },
}

/** Enlace de WhatsApp (con mensaje opcional) o null si falta el número. */
export const waUrl = (texto?: string) =>
  CONFIG.whatsapp
    ? `https://wa.me/${CONFIG.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`
    : null

/** Mensaje directo de Instagram: canal de respaldo si faltan WhatsApp y email. */
export const igDmUrl = () => `https://ig.me/m/${CONFIG.instagram}`

/** Enlace para llamar o guardar el número (no abre WhatsApp: evita spam y bots). */
export const telHref = () => `tel:+${CONFIG.whatsapp}`

/** Número para mostrar: "56939253239" → "+56 9 3925 3239". */
export const telVisible = () => {
  const n = CONFIG.whatsapp
  return /^569\d{8}$/.test(n) ? `+56 9 ${n.slice(3, 7)} ${n.slice(7)}` : `+${n}`
}
