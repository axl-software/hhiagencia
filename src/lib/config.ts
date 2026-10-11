/* =========================================================
   EDITA AQUÍ TUS DATOS. El sitio se actualiza solo.
   Fuente de verdad: CLAUDE.md y docs/. No inventes precios, clientes,
   resultados ni reseñas: lo que esté vacío simplemente no se muestra.
   Los MONTOS no van aquí: están todos en src/lib/precios.ts (única fuente de precios).
   ========================================================= */

export type Servicio = {
  id: string
  nombre: string
  /** Frase de valor: lo que se ve en la tarjeta o fila. */
  desc: string
  /** 'linea' = línea de servicio (puede tener planes); 'plan' = nivel de una línea. */
  grupo: 'linea' | 'plan'
  /** Producto dentro de una familia (ej. agendAHH dentro de HHA Systems): se muestra como "Familia · Producto". */
  familia?: string
  /** Líneas con niveles: ids de sus planes, de menor a mayor. */
  planes?: string[]
  /** Plan recomendado de su línea. */
  destacado?: boolean
  /** Hasta 7 beneficios principales (tarjeta). */
  beneficios?: string[]
  /** Todo lo incluido, completo (ventana "Ver todo lo incluido"). */
  incluye?: string[]
  /** Lo que no está incluido. */
  noIncluye?: string[]
  /** Aclaraciones del plan (dominio, adicionales, costos externos…). */
  notas?: string[]
  /** Ejemplo comercial de una línea, para entender el beneficio. */
  ejemplo?: string
  /** Dominio propio según cómo se paga (solo planes web). */
  dominio?: { mensual: string; anual: string; anualDestacado?: string }
  /** Demo o prueba gratis: el plan se puede probar antes de contratar. */
  prueba?: 'web' | 'sistemas'
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
    nombre: una palabra que resume el pack (se ve arriba, en chico: "PACK CRECIMIENTO").
    El precio y el ahorro de cada pack están en src/lib/precios.ts → PACKS_PRECIO (mismo id). */
export type Pack = {
  id: string
  nombre: string
  problema: string
  /** Frase de valor del pack. */
  detalle: string
  /** Ids de servicios que se agregan a la selección al elegir el pack. */
  servicios: string[]
  /** Qué trae el pack, en palabras del cliente. */
  incluye: string[]
  noIncluye?: string[]
  destacado?: boolean
}

/** Servicios adicionales (sin precio publicado): se cotizan según el alcance. */
export type Adicional = { titulo: string; items: string[] }
export type Pregunta = { q: string; a: string }

/** Banda de cierre de cada página: frase chica de arriba, frase grande, texto del botón y destino. */
export type Cierre = { kicker: string; titulo: string; boton: string; href: string }
export type Hooks = { inicio: Cierre; servicios: Cierre; marketing: Cierre; proceso: Cierre }

export type Config = {
  /** Plazo que se promete al enviar una cotización (igual que en el correo de confirmación). */
  tiempoRespuesta: string
  /** Plazo que se promete al pedir la prueba gratis (igual que en el correo de confirmación). */
  tiempoPrueba: string
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
  adicionales: Adicional[]
  faq: Pregunta[]
  casos: Caso[]
  resenas: Resena[]
  equipo: Integrante[]
  hooks: Hooks
}

/** Empresa: datos que se usan en pie de página, legales y datos estructurados. */
export const EMPRESA = {
  nombre: 'HHA Digital Solutions SpA',
  marca: 'HHA Digital Solutions',
  /** Base de operación. */
  base: 'Casablanca, Región de Valparaíso',
  /** Lo más importante: se trabaja en todo el país, de forma remota. */
  cobertura: 'Trabajamos en todo Chile',
}

/** Aviso obligatorio en los planes de Captación (debe verse siempre). */
const NOTA_PAUTA_CAPTACION = 'La inversión publicitaria no está incluida y es pagada directamente por el cliente a la plataforma correspondiente.'

export const CONFIG: Config = {
  tiempoRespuesta: 'dentro de las próximas 24 horas', // igual que el correo de confirmación de cotización
  tiempoPrueba: 'en menos de 48 horas', // igual que el correo de confirmación de la prueba gratis
  whatsapp: '56939253239', // +56 9 3925 3239 (sin + ni espacios)
  instagram: 'hhiagencia.cl', // cuenta propia de HHA (docs/HHA_BRAND_FOUNDATION.md)
  facebook: '', // enlace completo, ej: "https://facebook.com/..." (vacío = no se muestra)
  tiktok: '', // enlace completo, ej: "https://tiktok.com/@..." (vacío = no se muestra)
  email: 'hhadigitalsolutions@gmail.com',

  // Demo gratuita de los planes web (fundadores, 2026-10-02): al cotizar, una demo para probar la web antes de decidir.
  // demoPlazo: cuánto dura la prueba (ej. '7 días'). Vacío = "durante un plazo que acordamos al cotizar".
  demoPlazo: '7 días', // fundadores, 2026-10-05

  // Precios aprobados el 2026-10-06 (docs/HHA_BUSINESS_MODEL.md). Los montos están en src/lib/precios.ts.
  // La implementación se cobra aparte: los montos de los 7 planes web y HHA Systems están en precios.ts (implementacionMonto).
  servicios: [
    // ---------- Desarrollo web ----------
    {
      id: 'web', grupo: 'linea', nombre: 'Desarrollo web',
      desc: 'Sitios web profesionales con mantenimiento mensual: tu web siempre al día, con dominio y soporte según el plan.',
      planes: ['web-presentation', 'web-starter', 'web-business', 'web-pro'],
    },
    {
      id: 'web-presentation', grupo: 'plan', nombre: 'Web Presentation', prueba: 'web',
      desc: 'Todo lo esencial para tener una presencia profesional en internet.',
      beneficios: [
        'Página de una sola sección, adaptada a celular',
        'Presentación de tu negocio y tus servicios principales',
        'Contacto, WhatsApp y redes sociales',
        'Hasta 3 imágenes',
        'Adaptada a tu identidad visual',
      ],
      incluye: [
        'Página de una sola sección (one-page), adaptada a celular',
        'Presentación del profesional o negocio',
        'Servicios principales',
        'Contacto, WhatsApp y redes sociales',
        'Máximo 3 imágenes',
        'Estructura HHA optimizada',
        'Adaptación visual a la identidad del cliente',
        'Subdominio HHA pagando mensual',
        'Dominio propio incluido pagando anual',
        '1 ronda inicial de revisión',
        'Buenas prácticas técnicas mínimas',
      ],
      notas: [
        'Mantenimiento técnico y ajustes mínimos, según el alcance.',
      ],
      dominio: { mensual: 'Subdominio HHA.', anual: 'Dominio propio incluido.', anualDestacado: 'Dominio propio incluido' },
    },
    {
      id: 'web-starter', grupo: 'plan', nombre: 'Web Starter', prueba: 'web',
      desc: 'Una web profesional para presentar tu negocio y convertir visitas en oportunidades.',
      beneficios: [
        'Hasta 3 páginas',
        'Diseño responsive y personalizado',
        'Formulario de contacto',
        'Integración de redes sociales',
        'SEO técnico básico',
        'Google Analytics y Search Console configurados',
        '2 rondas mensuales de ajustes menores',
      ],
      incluye: [
        'Hasta 3 páginas',
        'Diseño responsive',
        'Diseño personalizado',
        'Formulario/contacto',
        'Integración de redes',
        'SEO técnico básico',
        'Dominio y despliegue según propuesta',
        'Configuración inicial de Google Analytics',
        'Configuración de Google Search Console',
        '2 rondas mensuales de ajustes menores',
      ],
      dominio: { mensual: 'Dominio y despliegue según propuesta.', anual: 'Dominio y despliegue según propuesta.' },
    },
    {
      id: 'web-business', grupo: 'plan', nombre: 'Web Business', destacado: true, prueba: 'web',
      desc: 'Una presencia digital diseñada para diferenciarte, convertir y crecer.',
      beneficios: [
        '4 a 6 páginas',
        'Todo lo de Web Starter',
        'Secciones comerciales más avanzadas',
        'Formularios más completos e integraciones básicas',
        'Analytics y SEO ampliado',
        'E-commerce básico',
        'Hasta 3 rondas mensuales de ajustes menores',
      ],
      incluye: [
        '4 a 6 páginas',
        'Todo lo de Web Starter',
        'Secciones comerciales más avanzadas',
        'Formularios más completos',
        'Integraciones básicas',
        'Analytics',
        'SEO ampliado',
        'Gestión de contenido cuando corresponda',
        'E-commerce básico',
        'Diseño más personalizado y UX estratégica',
        'Llamados a la acción (CTA) orientados a conversión',
        'Optimización de rendimiento',
        'Hasta 3 rondas mensuales de ajustes menores',
      ],
      noIncluye: ['Pasarela de pago disponible como adicional'],
      dominio: {
        mensual: 'Dominio propio incluido durante 1 año.',
        anual: 'Dominio propio incluido durante 2 años.',
        anualDestacado: '2 años de dominio incluidos',
      },
    },
    {
      id: 'web-pro', grupo: 'plan', nombre: 'Web Pro', prueba: 'web',
      desc: 'Una experiencia digital premium para marcas que quieren destacar de verdad.',
      beneficios: [
        '7 a 10 páginas',
        'Todo lo de Web Business',
        'Experiencia visual más avanzada',
        'Integraciones de mayor complejidad',
        'E-commerce completo con pasarela de pago incluida',
        'SEO y analítica más completos',
        'Soporte prioritario y hasta 4 rondas mensuales',
      ],
      incluye: [
        '7 a 10 páginas',
        'Todo lo de Web Business',
        'Experiencia visual más avanzada',
        'Integraciones de mayor complejidad',
        'E-commerce completo',
        'Pasarela de pago incluida',
        'SEO y analítica más completos',
        'Optimización avanzada',
        'Formularios avanzados',
        'Soporte prioritario',
        'Hasta 4 rondas mensuales de ajustes menores',
        '2 años de dominio incluidos',
      ],
      notas: [
        'Email marketing (campañas hechas por HHA) y flujos de automatización con n8n no están incluidos: se ofrecen como adicionales.',
      ],
      dominio: { mensual: '2 años de dominio incluidos.', anual: '2 años de dominio incluidos.' },
    },

    // ---------- HHA Systems ----------
    // HHA Systems es la FAMILIA de SaaS desarrollados por HHA. Cada SaaS tiene nombre propio y es una línea dentro de la
    // categoría "sistemas" (ver `categorias`): el primero es agendAHH. Para sumar otro, agrega su línea (con `familia: 'HHA Systems'`),
    // sus planes y su id en `categorias[sistemas].servicios`.
    // "agendAHH" se escribe siempre así: termina en AHH, un juego visual con HHA invertido.
    {
      id: 'hha-systems', grupo: 'linea', nombre: 'agendAHH', familia: 'HHA Systems',
      desc: 'Agenda, clientes y gestión para negocios de servicios.',
      planes: ['system-agenda-solo', 'system-starter', 'system-business', 'system-pro'],
    },
    {
      id: 'system-agenda-solo', grupo: 'plan', nombre: 'agendAHH Solo', prueba: 'sistemas',
      desc: 'Agenda online y gestión de clientes para quien trabaja por su cuenta.',
      beneficios: [
        'Agenda online y servicios',
        'Horarios y disponibilidad',
        'Panel administrativo y clientes',
        'Historial básico y métricas esenciales',
        'Experiencia de reserva personalizada',
      ],
      incluye: [
        'Agenda online',
        'Servicios',
        'Horarios y disponibilidad',
        'Panel administrativo',
        'Clientes',
        'Historial básico',
        'Métricas esenciales',
        'Experiencia de reserva personalizada',
      ],
      noIncluye: ['Recordatorios automáticos', 'Notificaciones automáticas'],
    },
    {
      id: 'system-starter', grupo: 'plan', nombre: 'agendAHH Starter', prueba: 'sistemas',
      desc: 'Digitaliza tus reservas y administra tu negocio desde un solo lugar.',
      beneficios: [
        'Experiencia adaptada a tu negocio',
        'Servicios, profesionales y selección de profesional',
        'Horarios, disponibilidad y elección de fecha y hora',
        'Reservas con confirmación',
        'Administración de agenda, reservas y clientes',
      ],
      incluye: [
        'Experiencia pública adaptada a tu negocio',
        'Servicios',
        'Staff o profesionales, y selección de profesional',
        'Horarios y disponibilidad',
        'Selección de fecha y hora',
        'Datos del cliente',
        'Reservas y confirmación',
        'Administración: agenda y gestión de reservas',
        'Clientes',
      ],
    },
    {
      id: 'system-business', grupo: 'plan', nombre: 'agendAHH Business', destacado: true, prueba: 'sistemas',
      desc: 'Gestiona reservas, clientes y ventas desde una misma experiencia.',
      ejemplo: 'Tu cliente puede reservar su servicio y agregar productos antes de finalizar.',
      beneficios: [
        'Todo lo de agendAHH Starter',
        'Mayor personalización visual',
        'Dashboard Lite para ver cómo va tu negocio',
        'Historial y gestión de clientes, cuando corresponda',
        'Commerce: tus clientes agregan productos a su reserva',
        'Retiro o pago en local, o transferencia según tu configuración',
      ],
      incluye: [
        'Todo lo de agendAHH Starter',
        'Mayor personalización visual',
        'Dashboard Lite',
        'Historial y gestión de clientes, cuando corresponda',
        'Commerce: catálogo, selección y recomendación de productos',
        'Agregar productos durante una reserva o junto a un servicio',
        'Carrito o pedido, con retiro en local',
        'Pago en local, o instrucciones de transferencia según la configuración',
        'Gestión de productos y de pedidos',
      ],
    },
    {
      id: 'system-pro', grupo: 'plan', nombre: 'agendAHH Pro', prueba: 'sistemas',
      desc: 'Convierte tu sistema en una herramienta para operar, vender y volver a conectar con tus clientes.',
      beneficios: [
        'Todo lo de agendAHH Business',
        'Mayor nivel de personalización y hero más personalizado',
        'Soporte prioritario y mayor capacidad de integración',
        'Correos de confirmación, recordatorios y comunicaciones',
        'Promociones por email',
        'Herramientas promocionales para volver a conectar con tus clientes',
      ],
      incluye: [
        'Todo lo de agendAHH Business',
        'Mayor nivel de personalización y hero más personalizado',
        'Soporte prioritario',
        'Mayor capacidad de integración',
        'Email operativo estándar: correos de confirmación, recordatorios y comunicaciones',
        'Promociones por email',
        'Módulo de promociones: conecta nuevamente con tus clientes mediante recordatorios y promociones',
      ],
      noIncluye: [
        'n8n personalizado',
        'WhatsApp API',
        'Automatizaciones completamente nuevas',
        'Integraciones externas complejas',
        'Desarrollos exclusivos',
        'Creación de contenido',
        'Campañas manuales completas hechas por HHA',
      ],
      notas: ['Todo lo que no está incluido se ofrece como adicional, cotizado según el alcance.'],
    },

    // ---------- Marketing digital ----------
    {
      id: 'marketing', grupo: 'linea', nombre: 'Marketing digital',
      desc: 'Estrategia, contenido y seguimiento mensual para que más personas te encuentren, confíen en ti y te escriban.',
      planes: ['marketing-starter', 'marketing-business', 'marketing-pro'],
    },
    {
      id: 'marketing-starter', grupo: 'plan', nombre: 'Marketing Starter',
      desc: 'Activa tu presencia digital con una estrategia clara y contenido constante.',
      beneficios: [
        'Planificación mensual y estrategia de contenido inicial',
        'Hasta 8 piezas al mes (publicaciones y carruseles)',
        'Copy para cada publicación',
        'Programación y publicación, cuando corresponda',
        'Revisión general mensual y recomendaciones de mejora',
      ],
      incluye: [
        'Planificación mensual',
        'Estrategia de contenido inicial',
        'Hasta 8 piezas mensuales',
        'Combinación de publicaciones gráficas y carruseles, según necesidad',
        'Copy para las publicaciones',
        'Programación o publicación, cuando corresponda',
        'Revisión general mensual',
        'Recomendaciones de mejora',
        'Soporte dentro del alcance contratado',
      ],
      noIncluye: [
        'Inversión publicitaria',
        'Producción audiovisual compleja',
        'Grabaciones presenciales frecuentes',
        'Campañas avanzadas',
        'Creación ilimitada de contenido',
        'Community management intensivo',
      ],
    },
    {
      id: 'marketing-business', grupo: 'plan', nombre: 'Marketing Business', destacado: true,
      desc: 'Una estrategia continua para mantener tu marca activa, medir resultados y generar oportunidades.',
      beneficios: [
        'Todo lo de Marketing Starter',
        'Hasta 12 piezas al mes y calendario de contenido',
        'Mayor trabajo estratégico, con posts, carruseles y otros formatos',
        'Programación y revisión de métricas',
        'Optimización mensual',
        'Una acción de captación simple, cuando corresponda',
      ],
      incluye: [
        'Todo lo de Marketing Starter',
        'Hasta 12 piezas mensuales',
        'Calendario de contenido',
        'Mayor trabajo estratégico',
        'Mezcla de posts, carruseles y otros formatos visuales, según el material disponible',
        'Copies y programación',
        'Revisión de métricas y optimización mensual',
        'Una acción o campaña simple de captación, cuando corresponda',
        'Coordinación con landing o formulario, si ya dispones de una infraestructura compatible',
      ],
      noIncluye: [
        'Inversión publicitaria',
        'Producción audiovisual compleja',
        'Campañas ilimitadas',
        'Grabaciones semanales presenciales',
        'Automatizaciones complejas',
      ],
    },
    {
      id: 'marketing-pro', grupo: 'plan', nombre: 'Marketing Pro',
      desc: 'Marketing más completo para negocios que quieren crecer con una estrategia sostenida.',
      beneficios: [
        'Todo lo de Marketing Business',
        'Estrategia más completa y mayor frecuencia de contenido',
        'Campañas promocionales y apoyo en captación',
        'Email marketing simple y embudos, cuando aplique',
        'Análisis mensual más profundo y optimización continua',
        'Prioridad de soporte',
      ],
      incluye: [
        'Todo lo de Marketing Business',
        'Estrategia más completa',
        'Mayor frecuencia y profundidad de contenido',
        'Campañas promocionales',
        'Apoyo en captación',
        'Email marketing simple, cuando aplique',
        'Embudos',
        'Análisis mensual más profundo y optimización continua',
        'Prioridad de soporte',
      ],
      noIncluye: [
        'Inversión publicitaria',
        'Producción audiovisual ilimitada',
        'Grandes sesiones de grabación o fotografía',
        'Campañas complejas sin límite',
        'Desarrollos especiales',
      ],
    },

    // ---------- Creación de contenido ----------
    {
      id: 'contenido', grupo: 'linea', nombre: 'Creación de contenido',
      desc: 'Publicaciones, carruseles y piezas para tus redes, alineadas a tu estrategia y a tu identidad visual.',
      planes: ['content-start', 'content-business', 'content-pro'],
    },
    {
      id: 'content-start', grupo: 'plan', nombre: 'Content Start',
      desc: 'Contenido visual constante para mantener activa tu marca.',
      beneficios: [
        'Hasta 8 piezas mensuales',
        'Carruseles y publicaciones gráficas',
        'Hasta 2 reels editados',
        'Adaptación a tu identidad visual',
        'Textos breves',
        'Calendario básico de contenido',
        'Ideas y lineamientos',
      ],
      incluye: [
        'Hasta 8 piezas mensuales',
        'Carruseles y publicaciones gráficas',
        'Hasta 2 reels editados',
        'Material principalmente proporcionado por el cliente',
        'Adaptación a identidad visual',
        'Textos breves',
        'Calendario básico de contenido',
        'Ideas y lineamientos',
      ],
      noIncluye: ['Fotografía profesional', 'Grabación presencial', 'Edición audiovisual compleja'],
    },
    {
      id: 'content-business', grupo: 'plan', nombre: 'Content Business', destacado: true,
      desc: 'Más contenido, más variedad y una presencia visual coherente durante todo el mes.',
      beneficios: [
        'Hasta 12 piezas mensuales',
        'Carruseles, publicaciones y formatos variados',
        'Hasta 4 reels editados',
        'Calendario mensual y piezas promocionales',
        'Diseño y edición más trabajados',
        '1 reunión breve mensual',
      ],
      incluye: [
        'Hasta 12 piezas mensuales',
        'Carruseles, publicaciones y formatos variados',
        'Hasta 4 reels editados',
        'Calendario mensual',
        'Piezas promocionales',
        'Diseño y edición más trabajados',
        'Recomendaciones de contenido',
        '1 reunión breve mensual',
        'Organización mensual de contenido',
      ],
      noIncluye: ['Grabación presencial', 'Fotografía profesional', 'Creación ilimitada'],
    },
    {
      id: 'content-pro', grupo: 'plan', nombre: 'Content Pro',
      desc: 'Producción de contenido para marcas que necesitan una presencia visual más exigente.',
      beneficios: [
        'Hasta 20 piezas mensuales',
        'Hasta 6 reels editados',
        'Mayor variedad de formatos',
        'Campañas creativas y piezas especiales',
        'Dirección de contenido y calendario avanzado',
        '1 reunión estratégica mensual',
        'Prioridad de producción',
      ],
      incluye: [
        'Hasta 20 piezas mensuales',
        'Hasta 6 reels editados',
        'Mayor variedad de formatos',
        'Campañas creativas y piezas especiales',
        'Dirección de contenido',
        'Calendario avanzado',
        '1 reunión estratégica mensual',
        'Prioridad de producción',
        'Coordinación de contenido por objetivos',
      ],
      noIncluye: ['Grabación presencial (se cotiza aparte en Producción Audiovisual)'],
      notas: [
        'Los detalles exactos se cotizan según volumen y formato.',
        'Fotografía, modelos, locaciones, grabaciones y producción audiovisual compleja pueden cotizarse aparte.',
      ],
    },

    // ---------- Producción audiovisual (servicio independiente, se cotiza según proyecto) ----------
    {
      id: 'produccion-audiovisual', grupo: 'linea', nombre: 'Producción Audiovisual',
      desc: 'Generamos el material visual directamente para tu negocio. Servicio presencial para crear material audiovisual real para marcas y negocios.',
      incluye: [
        'Grabación presencial',
        'Fotografía',
        'Reels grabados por HHA',
        'Videos de producto o servicio',
        'Contenido en local',
        'Sesiones de contenido',
        'Cobertura',
        'Edición audiovisual adicional',
      ],
      notas: ['Cotización según proyecto: cuéntanos qué necesitas y te preparamos una propuesta.'],
    },

    // ---------- Captación y email marketing ----------
    {
      id: 'captacion', grupo: 'linea', nombre: 'Captación de clientes',
      desc: 'Contenido y campañas orientadas a generar consultas, oportunidades y potenciales clientes.',
      planes: ['captacion-start', 'captacion-business'],
    },
    {
      id: 'captacion-start', grupo: 'plan', nombre: 'Captación Start',
      desc: 'Una campaña activa para que más personas te consulten.',
      beneficios: [
        '1 campaña activa',
        'Instagram y Facebook según configuración',
        'Hasta 4 piezas mensuales',
        'Reels y carruseles combinables',
        'Segmentación básica',
        'Reporte mensual y 1 asesoría mensual',
      ],
      incluye: [
        '1 campaña activa',
        'Instagram y Facebook según configuración',
        'Hasta 4 piezas mensuales',
        'Reels y carruseles combinables',
        'Segmentación básica',
        'Seguimiento básico de campaña',
        'Reporte mensual',
        '1 asesoría mensual',
      ],
      ejemplo: 'Tú distribuyes las 4 piezas como prefieras: 2 reels + 2 carruseles, 1 reel + 3 carruseles o 3 reels + 1 carrusel.',
      noIncluye: ['Inversión publicitaria'],
      notas: [NOTA_PAUTA_CAPTACION],
    },
    {
      id: 'captacion-business', grupo: 'plan', nombre: 'Captación Business',
      desc: 'Más piezas, más seguimiento y ajustes según el rendimiento de tu campaña.',
      beneficios: [
        '1 campaña activa',
        'Hasta 8 piezas mensuales (unas 2 por semana)',
        'Reels y carruseles combinables',
        'Segmentación y optimización de audiencia',
        'Ajustes según rendimiento',
        '2 asesorías mensuales',
        'Reporte mensual con recomendaciones',
        'Atención prioritaria por WhatsApp',
      ],
      incluye: [
        '1 campaña activa',
        'Hasta 8 piezas mensuales',
        'Reels y carruseles combinables',
        'Aproximadamente 2 piezas por semana',
        'Segmentación y optimización de audiencia',
        'Seguimiento de campaña',
        'Ajustes según rendimiento',
        '2 asesorías mensuales',
        'Reporte mensual con recomendaciones',
        'Atención prioritaria por WhatsApp para consultas y ajustes',
        'Revisión de resultados y próximos pasos en cada asesoría',
      ],
      noIncluye: ['Inversión publicitaria'],
      notas: [NOTA_PAUTA_CAPTACION],
    },
    {
      id: 'email-marketing', grupo: 'linea', nombre: 'Email marketing',
      desc: 'Campañas de email para mantener el contacto con clientes, comunicar promociones, recuperar oportunidades y generar nuevas ventas.',
      incluye: [
        'Diseño de emails',
        'Copy',
        'Programación y envío',
        'Campañas promocionales',
        'Newsletters',
        'Segmentación básica',
        'Reporte',
      ],
      noIncluye: [
        'Automatizaciones complejas',
        'Secuencias de bienvenida (adicional)',
        'Recuperación (adicional)',
        'Ecommerce (adicional)',
        'Automatizaciones por comportamiento (adicional)',
        'Gestión diaria de la bandeja de entrada',
      ],
      notas: ['Los costos de MailerLite, Resend u otra plataforma, si los hubiera, se cobran aparte cuando corresponda.'],
    },

    // ---------- Automatización ----------
    {
      id: 'automatizacion', grupo: 'linea', nombre: 'Automatización',
      desc: 'Reduce tareas manuales y conecta procesos que hoy te hacen perder tiempo.',
      incluye: [
        'Automatización de tareas repetitivas',
        'Flujos internos',
        'Conexión entre herramientas compatibles',
        'Alertas',
        'Procesamiento automático de información',
        'Automatizaciones con n8n u otras herramientas, cuando corresponda',
      ],
      notas: ['+ posibles costos externos de plataformas o APIs, según el proyecto.', 'El valor final depende del alcance: no ofrecemos un precio cerrado para cualquier automatización.'],
    },
    {
      id: 'integraciones', grupo: 'linea', nombre: 'Integraciones',
      desc: 'Haz que tus herramientas trabajen juntas.',
      incluye: [
        'Conexión entre herramientas',
        'APIs compatibles',
        'Formularios conectados con sistemas externos',
        'Sincronización simple de datos',
        'Integración con servicios existentes',
      ],
      noIncluye: ['ERP complejos', 'Integraciones empresariales grandes', 'APIs con desarrollo intensivo', 'Migraciones masivas'],
    },
    {
      id: 'procesos', grupo: 'linea', nombre: 'Procesos digitales',
      desc: 'Transforma procesos manuales en flujos digitales más simples y ordenados.',
      incluye: [
        'Revisión del proceso actual',
        'Propuesta de mejora',
        'Digitalización de pasos manuales',
        'Formularios o flujos',
        'Organización de datos',
        'Implementación según el alcance',
      ],
    },

    // ---------- IA y acompañamiento ----------
    {
      id: 'ia', grupo: 'linea', nombre: 'Consultoría IA',
      desc: 'Aprende dónde la IA puede ayudarte de verdad y cómo aplicarla de forma práctica.',
      incluye: [
        'Diagnóstico de necesidades',
        'Identificación de oportunidades de uso de IA',
        'Recomendaciones prácticas',
        'Herramientas sugeridas',
        'Orientación de implementación',
        'Próximos pasos',
      ],
      notas: ['No prometemos resultados: te mostramos qué se puede mejorar y cómo aplicarlo.'],
    },
    {
      id: 'capacitacion', grupo: 'linea', nombre: 'Capacitación de equipos',
      desc: 'Una sesión práctica para que tu equipo empiece a usar IA en su trabajo diario.',
      incluye: [
        'Sesión para tu equipo',
        'Introducción práctica',
        'Herramientas relevantes',
        'Casos de uso',
        'Buenas prácticas',
        'Ejemplos aplicados',
      ],
      notas: ['El valor final depende del alcance y del tamaño del equipo.'],
    },
    {
      id: 'acompanamiento', grupo: 'linea', nombre: 'Acompañamiento digital',
      desc: 'No estás solo después de implementar: seguimos ayudándote a mejorar.',
      incluye: [
        'Seguimiento periódico',
        'Revisión de herramientas',
        'Recomendaciones de mejora',
        'Apoyo en decisiones digitales',
        'Acompañamiento en la evolución de tus procesos',
        'Priorización de los siguientes pasos',
      ],
    },
  ],

  // Servicios agrupados por categoría (jerarquía visual en /servicios; el catálogo no cambia)
  categorias: [
    { id: 'web', nombre: 'Desarrollo web', necesidad: 'Tu página web con mantenimiento mensual incluido en el plan: pagas una suscripción y tu web se mantiene al día. Elige el nivel que necesita tu negocio.', servicios: ['web'] },
    { id: 'sistemas', nombre: 'HHA Systems', necesidad: 'Soluciones digitales desarrolladas por HHA para automatizar y gestionar negocios. Pruébalas gratis antes de decidir.', servicios: ['hha-systems'] },
    { id: 'marketing', nombre: 'Marketing y captación', necesidad: 'Para que más personas te encuentren, confíen en ti y te escriban.', servicios: ['marketing', 'contenido', 'produccion-audiovisual', 'captacion', 'email-marketing'] },
    { id: 'automatizacion', nombre: 'Automatización', necesidad: 'Para ahorrar tiempo en tareas repetitivas y que tus herramientas trabajen juntas.', servicios: ['automatizacion', 'integraciones', 'procesos'] },
    { id: 'ia', nombre: 'IA y consultoría', necesidad: 'Para entender qué puedes mejorar con IA y aplicarlo en tu negocio con acompañamiento.', servicios: ['ia', 'capacitacion', 'acompanamiento'] },
  ],

  // Los packs se arman con ids de "servicios". El precio y el ahorro salen de src/lib/precios.ts (mismo id).
  packs: [
    {
      id: 'clientes', nombre: 'Crecimiento', destacado: true, problema: '¿Necesitas conseguir más clientes?',
      detalle: 'Web, marketing y captación trabajando juntos para generar nuevas oportunidades.',
      servicios: ['marketing-business', 'web-business', 'captacion-start'],
      incluye: ['Marketing Business', 'Web Business', 'Captación Start'],
      noIncluye: ['Inversión publicitaria: se paga aparte, directamente en la plataforma'],
    },
    {
      id: 'imagen', nombre: 'Presencia', problema: '¿Tu negocio no transmite profesionalismo online?',
      detalle: 'Una web profesional y contenido constante para mantener activa tu marca.',
      servicios: ['web-business', 'content-business'],
      incluye: ['Web Business', 'Content Business'],
    },
    {
      id: 'tiempo', nombre: 'Eficiencia', problema: '¿Pierdes tiempo en tareas manuales?',
      detalle: 'Detecta pérdidas de tiempo, automatiza un proceso y empieza a trabajar con IA de forma práctica.',
      servicios: ['automatizacion', 'procesos', 'ia'],
      incluye: ['Diagnóstico inicial', 'Una automatización, dentro del alcance', 'Mejora de un proceso digital', 'Una sesión de Consultoría IA', 'Recomendaciones para la siguiente etapa'],
      noIncluye: ['Mantenimiento continuo', 'Automatizaciones ilimitadas', 'APIs premium', 'Costos externos'],
    },
    {
      id: 'herramientas', nombre: 'Conexión', problema: '¿Tienes herramientas, pero ninguna trabaja junta?',
      detalle: 'Conecta tus herramientas, automatiza tareas y recibe acompañamiento para seguir mejorando.',
      servicios: ['integraciones', 'automatizacion', 'acompanamiento'],
      incluye: ['Integraciones', 'Automatización', 'Acompañamiento digital'],
    },
    {
      // Sin precio publicado: se cotiza según el plan de HHA Systems que elijan (no está en la lista de packs aprobada con precio).
      id: 'reservas', nombre: 'Negocio online', problema: '¿Quieres que tus clientes reserven y compren online?',
      detalle: 'Un sistema propio con tu marca para reservas y ventas, más contenido y marketing para que lleguen clientes nuevos.',
      servicios: ['hha-systems', 'marketing', 'contenido'],
      incluye: ['HHA Systems · agendAHH', 'Marketing digital', 'Creación de contenido'],
    },
  ],

  // Adicionales: sin precio publicado; se cotizan según el alcance.
  adicionales: [
    { titulo: 'HHA Automation', items: ['Flujos n8n', 'Automatizaciones personalizadas', 'Procesos internos', 'Integraciones de trabajo'] },
    { titulo: 'WhatsApp', items: ['Confirmaciones', 'Recordatorios', 'Campañas', 'Sujeto a API o proveedor y a costos externos'] },
    { titulo: 'Email marketing avanzado', items: ['Secuencias de bienvenida', 'Recuperación', 'Ecommerce', 'Automatizaciones por comportamiento'] },
    { titulo: 'Contenido', items: ['Piezas gráficas y contenido para redes', 'Copy', 'Creación de contenido recurrente'] },
    { titulo: 'Pasarela de pago', items: ['Disponible como adicional en Web Business', 'Incluida en Web Pro'] },
    { titulo: 'Integraciones especiales', items: ['APIs externas', 'Integraciones a medida', 'Desarrollo particular'] },
  ],

  faq: [
    {
      q: '¿Qué es el precio lanzamiento?',
      a: 'Es el precio promocional vigente de nuestros planes web y de HHA Systems. El precio regular se muestra tachado para que veas la diferencia. Cuando la promoción termine, aplica el precio regular; el precio que quede acordado al contratar se detalla en tu cotización.',
    },
    {
      q: '¿Cómo funciona el pago anual?',
      a: 'Eliges "Anual -20%" y pagas los 12 meses por adelantado, con un 20% de descuento sobre el precio lanzamiento vigente. Verás el total y cuánto ahorras antes de contratar. En Web Business, el plan anual además incluye 2 años de dominio propio. agendAHH Solo no tiene opción anual.',
    },
    {
      q: '¿Cómo pago mi pedido?',
      a: 'Al elegir un plan o un pack llegas a tu pedido, donde ves el valor exacto. Para confirmarlo eliges entre pagar por transferencia (te enviamos los datos por correo) o que te contactemos por correo para facilitarte el pago. Por ahora no hay pago en línea y no se cobra nada al confirmar.',
    },
    {
      q: '¿Qué es el costo de implementación?',
      a: 'Es un pago único por dejar tu web o tu sistema configurado y funcionando. Es independiente de la suscripción mensual. En los planes web y de HHA Systems el monto figura en el detalle de cada plan (“Ver todo lo incluido”); en los demás servicios te lo informamos en la cotización, antes de que te comprometas.',
    },
    {
      q: '¿Cuántos cambios puedo pedir al mes en mi web?',
      a: 'Web Starter incluye hasta 2 rondas mensuales de cambios menores; Web Business, hasta 3; Web Pro, hasta 4. Web Presentation incluye mantenimiento técnico y ajustes mínimos. Son cambios menores: textos, imágenes, enlaces, teléfonos, horarios, llamados a la acción y ajustes visuales pequeños. No incluyen una página nueva, un rediseño general, nuevas funcionalidades, una tienda online nueva ni integraciones complejas. Las rondas que no uses no se acumulan para el mes siguiente.',
    },
    {
      q: '¿Qué incluye el SEO?',
      a: 'El SEO incluido corresponde a configuración técnica y optimización inicial. No incluye campañas SEO mensuales, generación continua de contenido ni garantía de posiciones en buscadores.',
    },
    {
      q: '¿Incluyen Google Analytics y Search Console?',
      a: 'Web Starter, Business y Pro incluyen la configuración inicial de Google Analytics y de Google Search Console, y su conexión técnica cuando corresponda. No es un servicio de análisis mensual: los reportes frecuentes o la consultoría analítica pueden contratarse como adicional.',
    },
    {
      q: '¿El dominio está incluido?',
      a: 'Web Presentation incluye un subdominio HHA pagando mensual y dominio propio pagando anual. En Web Starter el dominio y el despliegue se definen según la propuesta. Web Business incluye 1 año pagando mensual y 2 años pagando anual. Web Pro incluye 2 años de dominio. Si eliges un dominio premium o con un costo extraordinario, puede haber una diferencia adicional.',
    },
    {
      q: '¿La inversión en anuncios está incluida?',
      a: 'No. Si usas Meta Ads, Google Ads, TikTok Ads u otra plataforma, la inversión publicitaria no está incluida y la pagas tú directamente a la plataforma correspondiente. Nuestros planes cubren la gestión, no el presupuesto de anuncios.',
    },
    {
      q: '¿Qué pasa con WhatsApp, automatizaciones o email marketing avanzado?',
      a: 'Son servicios adicionales. Los planes no incluyen n8n personalizado, WhatsApp API ni integraciones complejas. En Email marketing, las automatizaciones (bienvenida, recuperación, ecommerce o por comportamiento) también son un adicional. Los cotizamos según el alcance; la API de WhatsApp además puede tener costos del proveedor.',
    },
    {
      q: '¿Los valores incluyen IVA?',
      a: 'No: todos los valores están en pesos chilenos (CLP) y se muestran más IVA. Tu cotización detalla el total con impuestos, la forma de pago y los plazos.',
    },
    {
      q: '¿Trabajan solo en la Región de Valparaíso?',
      a: 'No: trabajamos en todo Chile. Nuestra base está en Casablanca, Región de Valparaíso, y atendemos a clientes de todo el país de forma remota.',
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
    // La prueba gratis dura lo mismo que demoPlazo ('7 días'): si cambia, cambiar también estos textos.
    inicio: { kicker: '¿LISTO PARA PROBAR?', titulo: 'Prueba tu sistema gratis 7 días y decide después.', boton: 'Crea tu prueba gratis', href: '/prueba-gratis' },
    servicios: { kicker: '¿TODAVÍA CON DUDAS?', titulo: 'Pruébalo primero: 7 días gratis para ver cómo funciona.', boton: 'Crea tu prueba gratis', href: '/prueba-gratis' },
    // Marketing no se prueba (fundadores, 2026-10-05): se agenda una reunión para hablar del servicio y se pone en práctica enseguida.
    marketing: { kicker: '¿TU MARCA ES LA SIGUIENTE?', titulo: 'Hablemos de tu marketing y lo ponemos en práctica enseguida.', boton: 'Agenda una reunión', href: '/contacto?servicios=marketing' },
    proceso: { kicker: '¿TE HACE SENTIDO?', titulo: 'Cuéntanos qué necesitas y te preparamos una propuesta por escrito.', boton: 'Solicita cotización', href: '/contacto' },
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
