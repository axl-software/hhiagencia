/* Diagnóstico de 3 preguntas (portada y Servicios). Recomienda un plan web (Start, Business o Pro)
   o cualquier otra línea de servicio, priorizando la web cuando el negocio no tiene una que le sirva.
   Las respuestas viajan a /contacto como ?prioridad=&web=&etapa= para incluirlas en el mensaje. */

export type Clave = 'prioridad' | 'web' | 'etapa'

export const PREGUNTAS: { clave: Clave; titulo: string; corta: string; opciones: [string, string][] }[] = [
  {
    clave: 'prioridad',
    titulo: '¿Qué es lo más importante para tu negocio hoy?',
    corta: 'Prioridad:',
    opciones: [
      ['web', 'Tener una web o mejorar la que tengo'],
      ['automatizacion', 'Ahorrar tiempo automatizando tareas'],
      ['marketing', 'Conseguir más clientes'],
      ['contenido', 'Tener contenido para mis redes'],
      ['ia', 'Aprender a usar IA en mi negocio'],
      ['acompanamiento', 'Ayuda para implementar herramientas digitales'],
    ],
  },
  {
    clave: 'web',
    titulo: '¿Tu negocio tiene sitio web?',
    corta: 'Sitio web:',
    opciones: [
      ['no', 'No, todavía no'],
      ['mala', 'Sí, pero no me trae clientes'],
      ['ok', 'Sí, y funciona bien'],
    ],
  },
  {
    clave: 'etapa',
    titulo: '¿En qué etapa está tu negocio?',
    corta: 'Etapa:',
    opciones: [
      ['empezando', 'Estoy empezando'],
      ['creciendo', 'Ya vendo y quiero crecer'],
      ['online', 'Quiero vender online o necesito algo a medida'],
    ],
  },
]

const PLAN_POR_ETAPA: Record<string, string> = { empezando: 'web-start', creciendo: 'web-business', online: 'web-pro' }

/** Ids de servicio recomendados, el principal primero. */
export function recomendar([prioridad, web, etapa]: string[]): string[] {
  const plan = PLAN_POR_ETAPA[etapa] ?? 'web-business'
  if (prioridad === 'web') return [plan]
  return web === 'ok' ? [prioridad] : [prioridad, plan]
}

/** Respuestas en texto legible, para el mensaje de contacto. Ignora valores desconocidos. */
export function respuestasLegibles(valores: Partial<Record<Clave, string>>) {
  return PREGUNTAS.flatMap((p) => {
    const op = p.opciones.find(([v]) => v === valores[p.clave])
    return op ? [{ pregunta: p.corta, respuesta: op[1] }] : []
  })
}
