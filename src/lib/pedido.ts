import { useSyncExternalStore } from 'react'
import { CONFIG } from '@/lib/config'
import { PACKS_PRECIO, anualDe, implementacionDe, precioDe } from '@/lib/precios'

/* Pedido (carrito) de la web: lo que la persona eligió en Servicios, para revisarlo, ajustar el plan y el período,
   y confirmarlo en /pedido. No hay pagos en línea ni cuenta: se guarda en el navegador (localStorage) y, al confirmar,
   viaja por el mismo flujo de solicitudes (/api/solicitudes → Supabase → aviso al flujo de n8n).
   Los montos salen siempre de src/lib/precios.ts. Los valores publicados no incluyen IVA. */

export type Periodo = 'mensual' | 'anual'
export type Pedido = { items: string[]; periodo: Periodo; rubro: string }

/** Los packs se guardan como "pack:<id>"; los planes y servicios, con su id de src/lib/config.ts. */
export const PACK = 'pack:'
export const IVA = 0.19

const LLAVE = 'hha-pedido'
const VACIO: Pedido = { items: [], periodo: 'mensual', rubro: '' }
let estado: Pedido = VACIO
let cargado = false
const oyentes = new Set<() => void>()

const idValido = (id: string) => (id.startsWith(PACK) ? CONFIG.packs.some((p) => p.id === id.slice(PACK.length)) : CONFIG.servicios.some((s) => s.id === id))

function cargar() {
  if (cargado || typeof window === 'undefined') return
  cargado = true
  try {
    const j = JSON.parse(window.localStorage.getItem(LLAVE) ?? 'null') as Partial<Pedido> | null
    if (j && Array.isArray(j.items)) {
      estado = {
        items: j.items.filter((x): x is string => typeof x === 'string' && idValido(x)),
        periodo: j.periodo === 'anual' ? 'anual' : 'mensual',
        rubro: typeof j.rubro === 'string' ? j.rubro : '',
      }
    }
  } catch {
    /* sin almacenamiento: el pedido vive solo mientras la página está abierta */
  }
}

function fijar(sig: Pedido) {
  estado = sig
  try {
    window.localStorage.setItem(LLAVE, JSON.stringify(sig))
  } catch {
    /* ignorar */
  }
  oyentes.forEach((f) => f())
}

const suscribir = (f: () => void) => {
  oyentes.add(f)
  return () => void oyentes.delete(f)
}

/** El pedido actual. Se actualiza solo cuando algo cambia (también entre pestañas no: es por pestaña). */
export function usePedido(): Pedido {
  return useSyncExternalStore(suscribir, () => { cargar(); return estado }, () => VACIO)
}

/* La línea (web, marketing…) a la que pertenece un plan: al elegir otro plan de la misma línea, reemplaza al anterior. */
const hermanos = (id: string) => CONFIG.servicios.find((s) => s.planes?.includes(id))?.planes ?? []

export function agregar(id: string) {
  cargar()
  if (!idValido(id) || estado.items.includes(id)) return
  const incluidos = id.startsWith(PACK) ? CONFIG.packs.find((p) => p.id === id.slice(PACK.length))?.servicios ?? [] : []
  const sin = estado.items.filter((x) => !hermanos(id).includes(x) && !incluidos.includes(x))
  fijar({ ...estado, items: [...sin, id] })
}
export function quitar(id: string) {
  cargar()
  fijar({ ...estado, items: estado.items.filter((x) => x !== id) })
}
export function alternar(id: string) {
  cargar()
  if (estado.items.includes(id)) quitar(id)
  else agregar(id)
}
/** Cambia un plan por otro de su misma línea (por ejemplo Web Starter → Web Business). */
export function cambiarPlan(viejo: string, nuevo: string) {
  cargar()
  if (!idValido(nuevo)) return
  const items = estado.items.map((x) => (x === viejo ? nuevo : x)).filter((x, i, a) => a.indexOf(x) === i)
  fijar({ ...estado, items })
}
export const fijarPeriodo = (periodo: Periodo) => { cargar(); fijar({ ...estado, periodo }) }
export const fijarRubro = (rubro: string) => { cargar(); fijar({ ...estado, rubro }) }
export const vaciar = () => { cargar(); fijar(VACIO) }

/* ---------- Valores ---------- */

export type Linea = {
  id: string
  tipo: 'plan' | 'servicio' | 'pack'
  nombre: string
  /** Otros planes de la misma línea, para cambiar de plan sin salir del pedido. */
  hermanos: { id: string; nombre: string; precio: string }[]
  /** Lo que se paga hoy por el primer período (neto), si el monto es exacto. */
  hoy: number | null
  /** Lo que se paga cada período después (neto): mensual o, en anual, se renueva cada 12 meses. */
  recurrente: number | null
  unidadRecurrente: string
  /** Implementación (pago único, neto) cuando el monto está definido. */
  implementacion: number | null
  /** La implementación existe pero su monto se informa en la cotización. */
  implementacionPorCotizar: boolean
  /** Valor mínimo: el monto final se confirma en la cotización. */
  desde: boolean
  /** Monto "desde" (neto), si corresponde. */
  montoDesde: number | null
  /** Texto corto del período: "mensual", "anual", "por proyecto"… */
  periodoTexto: string
  ahorroAnual: number | null
  esAnual: boolean
  /** Packs: los servicios que incluye (nombres) y cuáles de ellos también están sueltos en el pedido. */
  incluye: string[]
  repetidos: string[]
}

const clp0 = (n: number) => '$' + Math.round(n).toLocaleString('es-CL')

/** Valores de una línea del pedido con el período elegido. */
export function lineaDe(id: string, periodo: Periodo, items: string[] = []): Linea | null {
  if (id.startsWith(PACK)) {
    const pk = CONFIG.packs.find((p) => p.id === id.slice(PACK.length))
    const pp = PACKS_PRECIO[id.slice(PACK.length)]
    if (!pk) return null
    const base: Linea = {
      id, tipo: 'pack', nombre: `Pack ${pk.nombre}`, hermanos: [], hoy: null, recurrente: null, unidadRecurrente: '',
      implementacion: null, implementacionPorCotizar: Boolean(pp?.implementacion), desde: false, montoDesde: null, periodoTexto: '', ahorroAnual: null, esAnual: false,
      incluye: pk.servicios.map((x) => CONFIG.servicios.find((y) => y.id === x)?.nombre ?? x),
      repetidos: pk.servicios.filter((x) => items.includes(x)).map((x) => CONFIG.servicios.find((y) => y.id === x)?.nombre ?? x),
    }
    if (!pp) return { ...base, desde: true, periodoTexto: 'se cotiza según tu plan' }
    const unico = pp.unidad === 'pago único'
    return {
      ...base,
      hoy: pp.desde ? null : pp.precio,
      recurrente: unico || pp.desde ? null : pp.precio,
      unidadRecurrente: unico ? '' : 'mes',
      desde: Boolean(pp.desde),
      montoDesde: pp.desde ? pp.precio : null,
      periodoTexto: unico ? 'pago único' : 'mensual',
    }
  }
  const s = CONFIG.servicios.find((x) => x.id === id)
  const p = precioDe(id)
  if (!s) return null
  /* Servicio sin precio publicado (ej. Producción Audiovisual): se cotiza según el proyecto */
  if (!p) {
    return {
      id, tipo: 'servicio', nombre: s.nombre, hermanos: [], hoy: null, recurrente: null, unidadRecurrente: '', implementacion: null,
      implementacionPorCotizar: false, desde: true, montoDesde: null, periodoTexto: 'cotización según proyecto', ahorroAnual: null, esAnual: false, incluye: [], repetidos: [],
    }
  }
  const sibs = s.grupo === 'plan' ? hermanos(id) : []
  const hermanosLista = sibs
    .map((h) => {
      const hp = precioDe(h)
      const hs = CONFIG.servicios.find((x) => x.id === h)
      if (!hp || !hs) return null
      const monto = hp.lanzamiento ?? hp.monto ?? 0
      return { id: h, nombre: hs.nombre, precio: `${hp.desde ? 'Desde ' : ''}${clp0(monto)}` }
    })
    .filter((x): x is { id: string; nombre: string; precio: string } => x !== null)
  const impl = implementacionDe(id) ?? null
  const base = {
    id, tipo: (s.grupo === 'plan' ? 'plan' : 'servicio') as 'plan' | 'servicio', nombre: s.nombre, hermanos: hermanosLista,
    implementacion: impl, implementacionPorCotizar: Boolean(p.implementacion) && impl === null, incluye: [] as string[], repetidos: [] as string[],
  }
  // Plan web / HHA Systems: precio lanzamiento mensual o anual con 20% menos
  if (p.lanzamiento) {
    const a = anualDe(p)
    if (periodo === 'anual' && p.anual && a) {
      return { ...base, hoy: a.total, recurrente: a.total, unidadRecurrente: 'año', desde: false, montoDesde: null, periodoTexto: 'anual (12 meses por adelantado)', ahorroAnual: a.ahorro, esAnual: true }
    }
    return { ...base, hoy: p.lanzamiento, recurrente: p.lanzamiento, unidadRecurrente: 'mes', desde: false, montoDesde: null, periodoTexto: 'mensual', ahorroAnual: null, esAnual: false }
  }
  const monto = p.monto ?? 0
  const unidad = p.unidad === 'pago único' ? '' : p.unidad
  if (p.desde) {
    return { ...base, hoy: null, recurrente: null, unidadRecurrente: unidad, desde: true, montoDesde: monto, periodoTexto: unidad ? (unidad === 'mes' ? 'mensual' : `por ${unidad}`) : 'pago único', ahorroAnual: null, esAnual: false }
  }
  return { ...base, hoy: monto, recurrente: unidad === 'mes' ? monto : null, unidadRecurrente: unidad, desde: false, montoDesde: null, periodoTexto: unidad === 'mes' ? 'mensual' : 'pago único', ahorroAnual: null, esAnual: false }
}

export type Resumen = {
  lineas: Linea[]
  /** Total neto a pagar hoy con montos exactos: primer período + implementaciones definidas. */
  hoyNeto: number
  iva: number
  hoyConIva: number
  /** Lo que se sigue pagando cada mes (neto), sin contar anuales. */
  cadaMes: number
  /** Algo del pedido se confirma en la cotización (desde, implementación sin monto). */
  hayPorCotizar: boolean
  hayAnualDisponible: boolean
}

export function resumir(items: string[], periodo: Periodo): Resumen {
  const lineas = items.map((i) => lineaDe(i, periodo, items)).filter((x): x is Linea => x !== null)
  let hoyNeto = 0
  let cadaMes = 0
  let hayPorCotizar = false
  for (const l of lineas) {
    if (l.hoy !== null) hoyNeto += l.hoy
    if (l.implementacion !== null) hoyNeto += l.implementacion
    if (l.recurrente !== null && l.unidadRecurrente === 'mes') cadaMes += l.recurrente
    if (l.desde || l.implementacionPorCotizar) hayPorCotizar = true
  }
  const iva = Math.round(hoyNeto * IVA)
  const hayAnualDisponible = items.some((i) => precioDe(i)?.anual)
  return { lineas, hoyNeto, iva, hoyConIva: hoyNeto + iva, cadaMes, hayPorCotizar, hayAnualDisponible }
}

export const dinero = clp0

export type MetodoPago = 'transferencia' | 'contacto'
export const METODOS: Record<MetodoPago, { titulo: string; texto: string }> = {
  transferencia: {
    titulo: 'Pagar por transferencia',
    texto: 'Te enviamos por correo los datos de la transferencia. Cuando pagas, confirmamos tu pedido.',
  },
  contacto: {
    titulo: 'Que HHA me contacte por correo',
    texto: 'Te escribimos para resolver tus dudas y facilitarte el pago de la forma que más te acomode.',
  },
}

/** Líneas de texto del pedido, para guardar en la solicitud y mostrar al equipo. Máximo 80 caracteres cada una. */
export function textoPedido(res: Resumen, metodo: MetodoPago, rubro: string): string[] {
  const cut = (t: string) => t.slice(0, 80)
  const out = res.lineas.map((l) => {
    const valor = l.hoy !== null ? `${dinero(l.hoy)}+IVA ${l.periodoTexto}` : l.montoDesde !== null ? `desde ${dinero(l.montoDesde)}+IVA` : 'a cotizar'
    const impl = l.implementacion !== null ? ` +impl ${dinero(l.implementacion)}` : l.implementacionPorCotizar ? ' +impl a cotizar' : ''
    return cut(`${l.nombre}: ${valor}${impl}`)
  })
  out.push(cut(`Pago: ${metodo === 'transferencia' ? 'transferencia' : 'contactar por correo'}`))
  out.push(cut(`Total hoy (neto): ${dinero(res.hoyNeto)}+IVA${res.hayPorCotizar ? ' (+ por cotizar)' : ''}`))
  if (rubro) out.push(cut(`Tipo de negocio: ${rubro}`))
  return out
}
