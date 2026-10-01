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
}

export type Config = {
  whatsapp: string
  instagram: string
  email: string
  servicios: Servicio[]
  casos: Caso[]
  resenas: Resena[]
  equipo: Integrante[]
}

export const CONFIG: Config = {
  whatsapp: '56939253239', // +56 9 3925 3239 (sin + ni espacios)
  instagram: 'hhiagencia.cl', // cuenta propia de HHA (docs/HHA_BRAND_FOUNDATION.md)
  email: 'hhadigitalsolutions@gmail.com',

  // Precios: no se publican hasta aprobar costos y márgenes (docs/HHA_BUSINESS_MODEL.md).
  servicios: [
    { id: 'web-start', grupo: 'web', nombre: 'Web Start', desc: 'Para partir: una presencia web profesional y simple, lista para recibir contactos.' },
    { id: 'web-business', grupo: 'web', destacado: true, nombre: 'Web Business', desc: 'La opción recomendada: un sitio completo para mostrar tus servicios y convertir visitas en clientes.' },
    { id: 'web-pro', grupo: 'web', nombre: 'Web Pro', desc: 'Para proyectos más grandes: más secciones, funciones o una tienda online básica.' },
    { id: 'automatizacion', grupo: 'linea', nombre: 'Automatización', desc: 'Captación de clientes, formularios, CRM, email marketing y tareas internas que hoy te quitan tiempo.' },
    { id: 'marketing', grupo: 'linea', nombre: 'Marketing digital', desc: 'Estrategia, contenido, email marketing y embudos para generar clientes.' },
    { id: 'ia', grupo: 'linea', nombre: 'Consultoría y capacitación en IA', desc: 'Te mostramos qué se puede automatizar y qué impacto puede tener, y capacitamos a tu equipo.' },
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
    },
    {
      rol: 'Estrategia de desarrollo y automatización', nombre: 'Alexander Bello', foto: '',
      bio: 'Desarrolla las webs y automatizaciones de HHA, y se asegura de que sean seguras y fáciles de mantener.',
      tags: ['Estrategia', 'Desarrollo web', 'Automatización', 'Ciberseguridad'],
    },
  ],
}

/** Enlace de WhatsApp (con mensaje opcional) o null si falta el número. */
export const waUrl = (texto?: string) =>
  CONFIG.whatsapp
    ? `https://wa.me/${CONFIG.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`
    : null

/** Mensaje directo de Instagram: canal de respaldo si faltan WhatsApp y email. */
export const igDmUrl = () => `https://ig.me/m/${CONFIG.instagram}`

/** Número para mostrar: "56939253239" → "+56 9 3925 3239". */
export const telVisible = () => {
  const n = CONFIG.whatsapp
  return /^569\d{8}$/.test(n) ? `+56 9 ${n.slice(3, 7)} ${n.slice(7)}` : `+${n}`
}
