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
  /** Planes web: la necesidad que cubre, en la tarjeta. La explicación (desc) va en "Ver qué incluye". */
  necesidad?: string
  /** Planes web: plazo del mantenimiento mensual, que se paga aparte del desarrollo (docs/HHA_SERVICES.md). */
  mantencion?: string
}

/** Categoría visual de Servicios: agrupa servicios sin cambiar el catálogo. */
export type Categoria = { id: string; nombre: string; necesidad: string; servicios: string[] }

/** Un paso de la galería de un proyecto: imagen, qué se hizo y con qué servicio. */
export type PasoProyecto = {
  titulo: string
  texto: string
  /** id de un servicio de la lista de abajo (ej: "contenido") */
  servicio: string
  /** Ruta dentro de /public (ej: "/img/proyectos/aaron/escenario.jpg"). Vacío = recuadro "Imagen pendiente".
      Si hay video, es su portada (el cuadro que se ve antes de que cargue). */
  imagen: string
  /** Clip corto sin sonido (mp4) que se reproduce en bucle en la galería. */
  video?: string
  /** Punto de la foto que debe verse en la portada de la tarjeta (recorte horizontal), ej: "50% 70%". */
  foco?: string
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

/** Problema del cliente → servicios que lo resuelven (Servicios → "¿Qué problema quieres resolver?").
    nombre: una palabra que resume el pack (se ve arriba, en chico: "PACK CRECIMIENTO"). */
export type Pack = { id: string; nombre: string; problema: string; detalle: string; servicios: string[] }

/** Banda de cierre de cada página: frase chica de arriba, frase grande, texto del botón y destino. */
export type Cierre = { kicker: string; titulo: string; boton: string; href: string }
export type Hooks = { inicio: Cierre; servicios: Cierre; proyectos: Cierre; proceso: Cierre }

export type Config = {
  /** Plazo que se promete en el mensaje de gracias después de enviar un formulario. */
  tiempoRespuesta: string
  /** Cuánto dura la demo gratuita de los planes web (ej. '7 días'). Vacío = se acuerda al cotizar. */
  demoPlazo: string
  whatsapp: string
  instagram: string
  facebook: string
  tiktok: string
  email: string
  servicios: Servicio[]
  categorias: Categoria[]
  packs: Pack[]
  casos: Caso[]
  resenas: Resena[]
  equipo: Integrante[]
  hooks: Hooks
}

export const CONFIG: Config = {
  tiempoRespuesta: 'en la próxima hora', // "Nuestro asesor comercial te contactará por WhatsApp al … en la próxima hora"
  whatsapp: '56939253239', // +56 9 3925 3239 (sin + ni espacios)
  instagram: 'hhiagencia.cl', // cuenta propia de HHA (docs/HHA_BRAND_FOUNDATION.md)
  facebook: '', // enlace completo, ej: "https://facebook.com/..." (vacío = no se muestra)
  tiktok: '', // enlace completo, ej: "https://tiktok.com/@..." (vacío = no se muestra)
  email: 'hhadigitalsolutions@gmail.com',

  // Demo gratuita de los planes web (fundadores, 2026-10-02): al cotizar, una demo para probar la web antes de decidir.
  // demoPlazo: cuánto dura la prueba (ej. '7 días'). Vacío = "durante un plazo que acordamos al cotizar".
  demoPlazo: '',

  // Precios: no se publican hasta aprobar costos y márgenes (docs/HHA_BUSINESS_MODEL.md).
  // "incluye": BORRADOR para que los fundadores lo ajusten (docs/HHA_SERVICES.md aún no define el alcance de cada plan).
  // Planes web: el pago inicial cubre solo el desarrollo; el mantenimiento mensual se paga aparte, con plazo
  // mínimo por plan ("mantencion"). Por eso el mantenimiento no va en "incluye" (fundadores, 2026-10-02).
  servicios: [
    {
      id: 'web-start', grupo: 'web', nombre: 'Web Start',
      necesidad: 'Para comenzar con una presencia digital profesional.',
      mantencion: 'mínimo 3 meses',
      desc: 'Para partir: una presencia web profesional y simple, lista para recibir contactos.',
      incluye: [
        'Landing page de una sola página',
        'Diseño adaptado a celular',
        'Botón de WhatsApp y formulario de contacto',
        'Configuración de dominio y hosting',
      ],
    },
    {
      id: 'web-business', grupo: 'web', destacado: true, nombre: 'Web Business',
      necesidad: 'Recomendado para negocios que quieren usar su web para captar clientes y crecer.',
      mantencion: 'a 3, 6 o 12 meses',
      desc: 'La opción recomendada: un sitio completo para mostrar tus servicios y convertir visitas en clientes.',
      incluye: [
        'Todo lo de Web Start',
        'Sitio con varias secciones: inicio, servicios, nosotros y contacto',
        'Textos y estructura pensados para convertir visitas en clientes',
        'Optimización básica para aparecer en Google',
      ],
    },
    {
      id: 'web-pro', grupo: 'web', nombre: 'Web Pro',
      necesidad: 'Para negocios que necesitan vender online, integrar herramientas o desarrollar funciones más avanzadas.',
      mantencion: 'mínimo 6 meses',
      desc: 'Para proyectos más grandes: más secciones, funciones o una tienda online básica.',
      incluye: [
        'Todo lo de Web Business',
        'Tienda online básica o funciones a medida',
        'Integraciones con formularios, email marketing o CRM',
        'Automatizaciones iniciales',
      ],
    },
    { id: 'automatizacion', grupo: 'linea', nombre: 'Automatización', desc: 'Captación de clientes, formularios, CRM, email marketing y tareas internas que hoy te quitan tiempo.' },
    // Integraciones: conectar herramientas que el cliente ya usa; sin desarrollo de APIs a medida (docs/HHA_TECH_STACK.md → API status)
    { id: 'integraciones', grupo: 'linea', nombre: 'Integraciones', desc: 'Conectamos las herramientas que ya usas (web, formularios, email marketing o CRM) para que la información pase sola de una a otra.' },
    { id: 'procesos', grupo: 'linea', nombre: 'Procesos digitales', desc: 'Ordenamos y pasamos a digital cómo trabaja tu negocio: formularios, registros y flujos claros, sin papeles ni planillas sueltas.' },
    { id: 'marketing', grupo: 'linea', nombre: 'Marketing digital', desc: 'Estrategia, contenido, email marketing y embudos para generar clientes.' },
    { id: 'captacion', grupo: 'linea', nombre: 'Captación de clientes', desc: 'Formularios, páginas de captura y seguimiento automático para que ningún interesado se pierda.' },
    { id: 'contenido', grupo: 'linea', nombre: 'Creación de contenido', desc: 'Publicaciones, carruseles, reels y piezas para tus redes, alineadas a tu estrategia.' },
    { id: 'ia', grupo: 'linea', nombre: 'Consultoría y capacitación en IA', desc: 'Te mostramos qué se puede automatizar y qué impacto puede tener, y capacitamos a tu equipo.' },
    { id: 'acompanamiento', grupo: 'linea', nombre: 'Acompañamiento digital', desc: 'Te ayudamos a implementar herramientas, plantillas y procesos digitales en tu negocio.' },
  ],

  // Los packs se arman con ids de "servicios". El pack completo es el recomendado.
  // Sin precios públicos: cuando estén definidos, aquí se puede agregar el ahorro del pack.
  // Servicios agrupados por categoría (jerarquía visual en /servicios; el catálogo no cambia)
  categorias: [
    { id: 'web', nombre: 'Desarrollo web', necesidad: 'Pagas una vez el desarrollo de tu web. El mantenimiento mensual va aparte, con un plazo mínimo según el plan.', servicios: ['web-start', 'web-business', 'web-pro'] },
    { id: 'marketing', nombre: 'Marketing y captación', necesidad: 'Para que más personas te encuentren, confíen en ti y te escriban.', servicios: ['marketing', 'captacion', 'contenido'] },
    { id: 'automatizacion', nombre: 'Automatización', necesidad: 'Para ahorrar tiempo en tareas repetitivas y que tus herramientas trabajen juntas.', servicios: ['automatizacion', 'integraciones', 'procesos'] },
    { id: 'ia', nombre: 'IA y consultoría', necesidad: 'Para entender qué puedes mejorar con IA y aplicarlo en tu negocio con acompañamiento.', servicios: ['ia', 'acompanamiento'] },
  ],
  packs: [
    {
      id: 'clientes', nombre: 'Crecimiento', problema: '¿Necesitas conseguir más clientes?',
      detalle: 'Hacemos que más personas te encuentren, confíen en ti y te escriban.',
      servicios: ['marketing', 'web-business', 'captacion'],
    },
    {
      id: 'tiempo', nombre: 'Eficiencia', problema: '¿Pierdes tiempo en tareas manuales?',
      detalle: 'Automatizamos lo repetitivo, ordenamos tus procesos y te enseñamos a usar IA en tu día a día.',
      servicios: ['automatizacion', 'procesos', 'ia'],
    },
    {
      id: 'imagen', nombre: 'Presencia', problema: '¿Tu negocio no transmite profesionalismo online?',
      detalle: 'Una web y contenido que muestren lo que vales.',
      servicios: ['web-business', 'contenido'],
    },
    {
      id: 'herramientas', nombre: 'Conexión', problema: '¿Tienes herramientas, pero ninguna trabaja junta?',
      detalle: 'Conectamos tus herramientas, automatizamos lo que se repite y te acompañamos en la implementación.',
      servicios: ['integraciones', 'automatizacion', 'acompanamiento'],
    },
  ],

  casos: [
    {
      cat: 'Streaming', tag: 'STREAMING · KICK', nombre: 'Aaron / aaronig12', foto: '',
      resumen: 'Dirección creativa y producción de streams y eventos en su canal de Kick.',
      items: ['Automatización de formatos y pautas para cada stream', 'Invitados y actividades en vivo', 'Gestión de patrocinadores', 'Clips para redes'],
      resultado: '',
      // Textos de REFERENCIA según lo que muestra cada imagen; los fundadores los corrigen después.
      // Material en /public/img/proyectos/aaron/ (el clip es un corte de 4,5 s del video del evento).
      galeria: [
        // La primera foto es la portada de la tarjeta (pedido de los fundadores); el clip va al final.
        { titulo: 'Formato y pauta de cada stream', texto: 'Cada transmisión tiene su formato y su pauta: invitados, dinámicas y orden de cada bloque. Automatizamos cómo se arman para repetirlos sin partir de cero.', servicio: 'automatizacion', imagen: '/img/proyectos/aaron/invitados.jpg', foco: '50% 50%' },
        { titulo: 'Aaron en escenario', texto: 'Presentación en vivo durante uno de los eventos.', servicio: 'contenido', imagen: '/img/proyectos/aaron/escenario.jpg' },
        { titulo: 'Cierre con los invitados', texto: 'Aaron junto a los invitados de la transmisión.', servicio: 'contenido', imagen: '/img/proyectos/aaron/invitados-grupo.jpg' },
        { titulo: 'Bajo las luces', texto: 'Aaron de espaldas al público, bajo las luces del escenario.', servicio: 'contenido', imagen: '/img/proyectos/aaron/escenario-luces.jpg' },
        { titulo: 'Show en vivo', texto: 'Aaron frente al público; registramos el evento para convertirlo en contenido.', servicio: 'contenido', imagen: '/img/proyectos/aaron/evento.jpg', video: '/img/proyectos/aaron/evento.mp4' },
      ],
    },
    {
      cat: 'Gastronomía', tag: 'GASTRONOMÍA · BAR', nombre: 'Bar de Blas', foto: '',
      resumen: 'Contenido, marketing y automatización para @bardeblas.',
      items: ['Análisis del perfil de Instagram', 'Pauta de contenido', 'Sesión de fotografía', 'Automatización para editar reels y generar ideas para carruseles'],
      resultado: '',
      // Textos de REFERENCIA según lo que muestra cada imagen; los fundadores los corrigen después.
      // Material en /public/img/proyectos/bardeblas/ (el clip es un corte de 5 s del reel).
      galeria: [
        { titulo: 'Fotografía de producto', texto: 'Cóctel embotellado de Bar de Blas, fotografiado con luz natural.', servicio: 'contenido', imagen: '/img/proyectos/bardeblas/botella.jpg', foco: '50% 74%' },
        { titulo: 'Reels con edición automatizada', texto: 'Preparación de un cóctel para reel. Implementamos automatización para editar reels y generar ideas para carruseles.', servicio: 'automatizacion', imagen: '/img/proyectos/bardeblas/reel-coctel.jpg', video: '/img/proyectos/bardeblas/reel-coctel.mp4' },
        { titulo: 'Detalle de la barra', texto: 'La estación de trabajo vista desde arriba: naranja deshidratada para decorar y la carta del bar.', servicio: 'contenido', imagen: '/img/proyectos/bardeblas/barra.jpg' },
        { titulo: 'Ambientación al atardecer', texto: 'El espacio exterior preparado para la sesión de contenido.', servicio: 'contenido', imagen: '/img/proyectos/bardeblas/terraza.jpg' },
        { titulo: 'Detrás de cámara', texto: 'Grabación de una conversación para las redes del bar.', servicio: 'contenido', imagen: '/img/proyectos/bardeblas/detras-de-camara.jpg' },
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

  // Banda de cierre de cada página, según lo que el visitante quiere en ese punto (docs/HHA_SERVICES.md → botones por intención)
  hooks: {
    inicio: { kicker: '¿EMPEZAMOS?', titulo: 'Conversemos de tu negocio y te decimos por dónde partir.', boton: 'Agenda una reunión', href: '/contacto' },
    servicios: { kicker: '¿TODAVÍA CON DUDAS?', titulo: 'Lo vemos juntos y elegimos lo que de verdad necesitas.', boton: 'Agenda una reunión', href: '/contacto' },
    proyectos: { kicker: '¿TE IMAGINAS EL TUYO?', titulo: 'Entendemos tu negocio y te proponemos la solución que de verdad necesita.', boton: 'Agenda una reunión', href: '/contacto' },
    proceso: { kicker: '¿TE HACE SENTIDO?', titulo: 'El primer paso es una conversación sobre tu negocio.', boton: 'Agenda una reunión', href: '/contacto' },
  },
}

/** Categoría a la que pertenece un servicio (para enlazar a /servicios#cat-…). */
export const categoriaDe = (id: string) => CONFIG.categorias.find((c) => c.servicios.includes(id))

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
