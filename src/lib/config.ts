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

/** Un paso de la galería de un proyecto: imagen, qué se hizo y con qué servicio. */
export type PasoProyecto = {
  titulo: string
  texto: string
  /** id de un servicio de la lista de abajo (ej: "contenido") */
  servicio: string
  /** Ruta dentro de /public (ej: "/img/proyectos/aaron-1.jpg"). Vacío = recuadro "Imagen pendiente". */
  imagen: string
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
  /** Galería que se abre al tocar el proyecto (Proyectos). */
  galeria: PasoProyecto[]
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

/** Problema del cliente → servicios que lo resuelven (Servicios → "¿Qué problema quieres resolver?"). */
export type Pack = { id: string; problema: string; detalle: string; servicios: string[] }

/** Banda de cierre de cada página: frase, texto del botón y destino. */
export type Cierre = { titulo: string; boton: string; href: string }
export type Hooks = { inicio: Cierre; servicios: Cierre; proyectos: Cierre }

export type Config = {
  whatsapp: string
  instagram: string
  facebook: string
  tiktok: string
  email: string
  servicios: Servicio[]
  packs: Pack[]
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
    { id: 'captacion', grupo: 'linea', nombre: 'Captación de clientes', desc: 'Formularios, páginas de captura y seguimiento automático para que ningún interesado se pierda.' },
    { id: 'contenido', grupo: 'linea', nombre: 'Creación de contenido', desc: 'Publicaciones, carruseles, reels y piezas para tus redes, alineadas a tu estrategia.' },
    { id: 'ia', grupo: 'linea', nombre: 'Consultoría y capacitación en IA', desc: 'Te mostramos qué se puede automatizar y qué impacto puede tener, y capacitamos a tu equipo.' },
    { id: 'acompanamiento', grupo: 'linea', nombre: 'Acompañamiento digital', desc: 'Te ayudamos a implementar herramientas, plantillas y procesos digitales en tu negocio.' },
  ],

  // Los packs se arman con ids de "servicios". El pack completo es el recomendado.
  // Sin precios públicos: cuando estén definidos, aquí se puede agregar el ahorro del pack.
  packs: [
    {
      id: 'clientes', problema: '¿Necesitas conseguir más clientes?',
      detalle: 'Hacemos que más personas te encuentren, confíen en ti y te escriban.',
      servicios: ['marketing', 'web-business', 'captacion'],
    },
    {
      id: 'tiempo', problema: '¿Pierdes tiempo en tareas manuales?',
      detalle: 'Automatizamos lo repetitivo y te enseñamos a usar IA en tu día a día.',
      servicios: ['automatizacion', 'ia'],
    },
    {
      id: 'imagen', problema: '¿Tu negocio no transmite profesionalismo online?',
      detalle: 'Una web y contenido que muestren lo que vales.',
      servicios: ['web-business', 'contenido'],
    },
    {
      // "Integraciones" no va como servicio aparte: docs/HHA_TECH_STACK.md → API status
      id: 'herramientas', problema: '¿Tienes herramientas, pero ninguna trabaja junta?',
      detalle: 'Ordenamos tus herramientas, las conectamos con automatización y te acompañamos en la implementación.',
      servicios: ['automatizacion', 'acompanamiento'],
    },
  ],

  casos: [
    {
      cat: 'Streaming', tag: 'STREAMING · KICK', nombre: 'Aaron / aaronig12', foto: '',
      resumen: 'Dirección creativa y producción de streams y eventos en su canal de Kick.',
      items: ['Formatos y pautas de cada stream', 'Invitados y actividades en vivo', 'Gestión de patrocinadores', 'Clips para redes'],
      resultado: '',
      // BORRADOR: textos y servicios por confirmar con los fundadores; imágenes por subir a /public/img/proyectos/
      galeria: [
        { titulo: 'Formato y pauta de cada stream', texto: 'Definimos el formato de cada transmisión y armamos su pauta.', servicio: 'contenido', imagen: '' },
        { titulo: 'Invitados y actividades en vivo', texto: 'Coordinamos invitados y actividades para los streams y eventos del canal.', servicio: 'contenido', imagen: '' },
        { titulo: 'Gestión de patrocinadores', texto: 'Gestionamos los patrocinadores del canal.', servicio: 'marketing', imagen: '' },
        { titulo: 'Clips para redes', texto: 'Convertimos momentos de los streams en clips para redes sociales.', servicio: 'contenido', imagen: '' },
      ],
    },
    {
      cat: 'Gastronomía', tag: 'GASTRONOMÍA · BAR', nombre: 'Bar de Blas', foto: '',
      resumen: 'Apoyo de contenido y marketing para @bardeblas.',
      items: ['Análisis del perfil de Instagram', 'Pauta de contenido', 'Sesión de fotografía'],
      resultado: '',
      // BORRADOR: textos y servicios por confirmar con los fundadores; imágenes por subir a /public/img/proyectos/
      galeria: [
        { titulo: 'Análisis del perfil de Instagram', texto: 'Revisamos el perfil de @bardeblas para detectar qué mejorar.', servicio: 'marketing', imagen: '' },
        { titulo: 'Pauta de contenido', texto: 'Armamos una pauta de publicaciones para sus redes.', servicio: 'contenido', imagen: '' },
        { titulo: 'Sesión de fotografía', texto: 'Hicimos una sesión de fotos del bar para su contenido.', servicio: 'contenido', imagen: '' },
      ],
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

  // Banda de cierre de cada página: tres llamados distintos.
  hooks: {
    inicio: { titulo: 'Cuéntanos qué necesitas y te enviamos una propuesta.', boton: 'Solicita un diagnóstico', href: '/contacto' },
    servicios: { titulo: '¿Ya elegiste? Te enviamos una propuesta.', boton: 'Solicita cotización', href: '/contacto' },
    proyectos: { titulo: '¿El próximo caso es el tuyo?', boton: 'Explora soluciones', href: '/servicios#soluciones' },
  },
}

/** Enlace de WhatsApp (con mensaje opcional) o null si falta el número. */
export const waUrl = (texto?: string) =>
  CONFIG.whatsapp
    ? `https://wa.me/${CONFIG.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`
    : null

/** Enlace para llamar o guardar el número (no abre WhatsApp: evita spam y bots). */
export const telHref = () => `tel:+${CONFIG.whatsapp}`

/** Número para mostrar: "56939253239" → "+56 9 3925 3239". */
export const telVisible = () => {
  const n = CONFIG.whatsapp
  return /^569\d{8}$/.test(n) ? `+56 9 ${n.slice(3, 7)} ${n.slice(7)}` : `+${n}`
}
