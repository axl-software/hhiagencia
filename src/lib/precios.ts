/* =========================================================
   PRECIOS DE HHA: ÚNICA FUENTE DE VERDAD (aprobados por los fundadores, 2026-10-06).
   Ningún otro archivo escribe montos: todo el sitio los lee de aquí, y los cálculos (anual, ahorros,
   valor de los packs) salen de estas cifras. Si cambias un precio, el ahorro de los planes y de los
   packs se recalcula solo.

   Reglas comerciales (docs/HHA_BUSINESS_MODEL.md):
   - Planes web y HHA Systems: precio regular y precio lanzamiento, mensual o anual (-20% sobre el precio lanzamiento).
   - El costo de implementación (pago único) se cobra aparte. Los 7 planes web y HHA Systems tienen monto definido, y agendAHH Solo también
     (`implementacionMonto`), que se muestra SOLO dentro de "Ver todo lo incluido", nunca en la tarjeta. Los demás
     servicios con implementación siguen diciendo que el monto se informa en la cotización.
   - La inversión publicitaria (Meta, Google, TikTok…) nunca va incluida: se paga aparte, en cada plataforma.
   - Valores en pesos chilenos (CLP).
   ========================================================= */

export type Unidad = 'mes' | 'proyecto' | 'sesión' | 'pago único'

export type Precio = {
  /** Precio regular mensual (solo planes con precio de lanzamiento). */
  regular?: number
  /** Precio lanzamiento mensual: el que se muestra destacado. */
  lanzamiento?: number
  /** Precio fijo o "desde" (servicios sin precio de lanzamiento). */
  monto?: number
  unidad: Unidad
  /** El monto es un mínimo ("desde"): el valor final depende del alcance. */
  desde?: boolean
  /** Tiene opción anual con -20% (planes web y HHA Systems). */
  anual?: boolean
  /** Lleva costo de implementación (pago único). Si no trae `implementacionMonto`, solo se menciona, sin monto. */
  implementacion?: boolean
  /** Monto de implementación (pago único) ya definido: solo se muestra dentro de "Ver todo lo incluido". */
  implementacionMonto?: number
}

export const DESCUENTO_ANUAL = 0.2

export const PRECIOS: Record<string, Precio> = {
  // Web
  'web-presentation': { regular: 14990, lanzamiento: 9990, unidad: 'mes', anual: true, implementacion: true, implementacionMonto: 29990 },
  'web-starter': { regular: 39990, lanzamiento: 29990, unidad: 'mes', anual: true, implementacion: true, implementacionMonto: 129990 },
  'web-business': { regular: 64990, lanzamiento: 49990, unidad: 'mes', anual: true, implementacion: true, implementacionMonto: 390000 },
  'web-pro': { regular: 89990, lanzamiento: 69990, unidad: 'mes', anual: true, implementacion: true, implementacionMonto: 590000 },
  // HHA Systems · agendAHH (agendAHH Solo: $14.990/mes, instalación $24.990, sin precio lanzamiento ni opción anual)
  'system-agenda-solo': { monto: 14990, unidad: 'mes', implementacion: true, implementacionMonto: 24990 },
  'system-starter': { regular: 39990, lanzamiento: 29990, unidad: 'mes', anual: true, implementacion: true, implementacionMonto: 49990 },
  'system-business': { regular: 64990, lanzamiento: 49990, unidad: 'mes', anual: true, implementacion: true, implementacionMonto: 69990 },
  'system-pro': { regular: 89990, lanzamiento: 69990, unidad: 'mes', anual: true, implementacion: true, implementacionMonto: 99990 },
  // Marketing digital
  'marketing-starter': { monto: 119990, unidad: 'mes' },
  'marketing-business': { monto: 199990, unidad: 'mes' },
  'marketing-pro': { monto: 299990, unidad: 'mes' },
  // Creación de contenido
  'content-start': { monto: 89990, unidad: 'mes' },
  'content-business': { monto: 149990, unidad: 'mes' },
  'content-pro': { monto: 249990, unidad: 'mes', desde: true },
  // Otras líneas
  // Captación: solo existen Start y Business (no hay Captación Pro)
  'captacion-start': { monto: 49990, unidad: 'mes' },
  'captacion-business': { monto: 79990, unidad: 'mes' },
  'email-marketing': { monto: 39990, unidad: 'mes', desde: true },
  automatizacion: { monto: 99990, unidad: 'proyecto', desde: true },
  integraciones: { monto: 79990, unidad: 'proyecto', desde: true },
  procesos: { monto: 99990, unidad: 'proyecto', desde: true },
  ia: { monto: 49990, unidad: 'sesión', desde: true },
  capacitacion: { monto: 149990, unidad: 'pago único', desde: true },
  acompanamiento: { monto: 79990, unidad: 'mes', desde: true },
}

/** Monto de implementación (pago único) de un plan, si ya está definido. */
export const implementacionDe = (id: string): number | undefined => PRECIOS[id]?.implementacionMonto

/** Precio de un plan o servicio. */
export const precioDe = (id: string): Precio | undefined => PRECIOS[id]

/** Redondea a la centena: $95.904 → $95.900 (como se muestra al público). */
const aCentena = (n: number) => Math.round(n / 100) * 100
/** Redondea a la decena: $7.991,67 → $7.990. */
const aDecena = (n: number) => Math.round(n / 10) * 10

/** Cálculo de la opción anual: 12 meses de lanzamiento con 20% de descuento, pagados por adelantado. */
export function anualDe(p: Precio) {
  if (!p.lanzamiento) return null
  const doceMeses = p.lanzamiento * 12
  const total = aCentena(doceMeses * (1 - DESCUENTO_ANUAL))
  return {
    /** Total que se paga una vez al año. */
    total,
    /** Equivalente mensual aproximado. */
    mensual: aDecena(total / 12),
    /** Lo que se ahorra frente a pagar 12 meses al precio lanzamiento. */
    ahorro: doceMeses - total,
    /** Lo que costarían 12 meses al precio lanzamiento. */
    doceMeses,
  }
}

/** Ahorro del precio lanzamiento frente al regular, por mes. */
export const ahorroLanzamiento = (p: Precio) => (p.regular && p.lanzamiento ? p.regular - p.lanzamiento : 0)

/** Monto en pesos chilenos con puntos de miles: 49990 → "$49.990". */
export const clp = (n: number) => '$' + Math.round(n).toLocaleString('es-CL')

/** Texto del precio de un servicio de una sola cifra: "Desde $39.990/mes". */
export function textoPrecio(p: Precio): string {
  const monto = p.monto ?? p.lanzamiento ?? 0
  const unidad = p.unidad === 'pago único' ? '' : `/${p.unidad}`
  return `${p.desde ? 'Desde ' : ''}${clp(monto)}${unidad}`
}

/* ---------- Packs ---------- */

export type PrecioPack = {
  /** Precio del pack. */
  precio: number
  /** Qué tan seguido se paga. */
  unidad: 'mes' | 'pago único'
  /** El precio es el mínimo ("desde"). */
  desde?: boolean
  /** Valor de los servicios por separado (calculado de los precios de arriba). */
  separado: number
  /** Ahorro (calculado). */
  ahorro: number
  /** Si el ahorro se repite cada mes, cuánto suma en un año. */
  ahorroAnual?: number
  /** Lleva costo de implementación (solo se menciona, sin monto). */
  implementacion?: boolean
  /** Aclaración sobre cómo se calculó el valor por separado. */
  nota?: string
}

const lan = (id: string) => PRECIOS[id].lanzamiento ?? 0
const mon = (id: string) => PRECIOS[id].monto ?? 0

function armarPack(precio: number, unidad: PrecioPack['unidad'], separado: number, extra: Partial<PrecioPack> = {}): PrecioPack {
  const ahorro = separado - precio
  return { precio, unidad, separado, ahorro, ahorroAnual: unidad === 'mes' ? ahorro * 12 : undefined, ...extra }
}

export const PACKS_PRECIO: Record<string, PrecioPack> = {
  // Marketing Business + Web Business + Captación Start
  clientes: armarPack(229990, 'mes', mon('marketing-business') + lan('web-business') + mon('captacion-start'), {
    implementacion: true,
    nota: 'Valor por separado calculado con el precio lanzamiento de Web Business.',
  }),
  // Web Business + Content Business
  imagen: armarPack(159990, 'mes', lan('web-business') + mon('content-business'), {
    implementacion: true,
    nota: 'Valor por separado calculado con el precio lanzamiento de Web Business.',
  }),
  // Automatización + Procesos digitales + 1 sesión de Consultoría IA (proyecto, pago único)
  tiempo: armarPack(199990, 'pago único', mon('automatizacion') + mon('procesos') + mon('ia')),
  // Integraciones + Automatización + Acompañamiento: el pack baja el acompañamiento a $59.990/mes
  herramientas: {
    precio: 59990,
    unidad: 'mes',
    desde: true,
    separado: mon('acompanamiento'),
    ahorro: mon('acompanamiento') - 59990,
    ahorroAnual: (mon('acompanamiento') - 59990) * 12,
    implementacion: true,
    nota: 'El ahorro corresponde al acompañamiento mensual, que dentro del pack baja de $79.990 a $59.990.',
  },
}
