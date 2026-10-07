import { CONFIG, waUrl } from '@/lib/config'
import { medir } from '@/lib/medir'

/* Arma y envía el mensaje de contacto. Lo usan el formulario (/contacto) y el diagnóstico de la portada.
   No hay servidor: el mensaje se abre en WhatsApp o en el correo del visitante, que lo envía. */

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type DatosContacto = {
  nombre: string
  negocio?: string
  servicios: string[] // nombres
  email: string
  telefono: string
  /** Respuestas del diagnóstico, si lo hizo (texto de cada opción). */
  diagnostico?: { pregunta: string; respuesta: string }[]
}

/** Dato obligatorio que falta: campos a marcar, aviso amable y texto del botón que lleva a completarlo. */
export type Falta = { campos: string[]; texto: string; accion: string }

/* Obligatorio en todos los formularios del sitio: el nombre, y el correo o el WhatsApp (con uno basta).
   Devuelve lo que falta o null si está todo bien. */
export function validar(d: Pick<DatosContacto, 'nombre' | 'email' | 'telefono'>): Falta | null {
  if (!d.nombre) {
    return { campos: ['nombre'], texto: 'Parece que te faltó tu nombre (o el de tu proyecto). Lo necesitamos para saber con quién hablamos.', accion: 'Escribir mi nombre' }
  }
  if (!d.email && !d.telefono) {
    return { campos: ['email', 'telefono'], texto: 'Parece que te faltó cómo contactarte: déjanos tu correo o tu WhatsApp (con uno basta).', accion: 'Agregar correo o WhatsApp' }
  }
  if (d.email && !EMAIL_OK.test(d.email)) {
    return { campos: ['email'], texto: 'Revisa tu correo: parece que le falta algo, por ejemplo la @.', accion: 'Corregir mi correo' }
  }
  return null
}

/** true si el visitante ya escribió en uno de los campos que faltaban (para quitar el aviso). */
export const completaFalta = (falta: Falta, campo: HTMLInputElement) => falta.campos.includes(campo.name) && campo.value.trim() !== ''

export function armarMensaje(d: DatosContacto) {
  const lineas = [`Hola HHiAgencia, soy ${d.nombre}.`]
  if (d.negocio) lineas.push(`Mi negocio o proyecto: ${d.negocio}`)
  if (d.diagnostico?.length) {
    lineas.push('Hice el diagnóstico en la web:')
    for (const r of d.diagnostico) lineas.push(`- ${r.pregunta} ${r.respuesta}`)
  }
  lineas.push(d.servicios.length ? `Me interesa: ${d.servicios.join(', ')}` : 'Me gustaría conversar de mi negocio.')
  lineas.push(`Correo: ${d.email || '-'}`)
  lineas.push(`Teléfono: ${d.telefono || '-'}`)
  return lineas.join('\n')
}

/** Abre WhatsApp (o el correo) con el mensaje. Devuelve el texto para mostrar al visitante. */
export async function enviar(texto: string, via: 'whatsapp' | 'email', origen: 'formulario' | 'diagnostico') {
  const wa = waUrl(texto)
  if (wa && via === 'whatsapp') {
    medir('formulario_enviado', { canal: 'whatsapp', origen })
    window.open(wa, '_blank', 'noopener')
    return 'Abrimos WhatsApp con tu mensaje listo: solo falta enviarlo.'
  }
  if (CONFIG.email) {
    medir('formulario_enviado', { canal: 'email', origen })
    /* El enlace de correo depende de que el visitante tenga una app de correo configurada:
       por si no se abre, el mensaje queda copiado y se muestra la dirección. */
    try {
      await navigator.clipboard.writeText(texto)
    } catch {
      /* sin portapapeles: igual se intenta abrir el correo */
    }
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Solicitud · HHiAgencia')}&body=${encodeURIComponent(texto)}`
    return `Abrimos tu correo con el mensaje listo. Si no se abrió, escríbenos a ${CONFIG.email}: tu mensaje ya está copiado, solo pégalo.`
  }
  return ''
}

/** Datos que se guardan en Supabase (src/app/api/solicitudes/route.ts). */
export type Solicitud = DatosContacto & {
  origen: 'formulario' | 'diagnostico'
  /** Por dónde lo contactamos: WhatsApp si dejó teléfono; si no, correo. */
  canal: 'whatsapp' | 'email'
  /** Campo trampa invisible: si viene con algo, lo llenó un bot. */
  sitio: string
  /** Momento en que la persona empezó a escribir (Date.now()), o null si no se sabe. */
  inicio: number | null
  /** Pedido hecho en /pedido (src/lib/pedido.ts): cómo quiere pagar y el resumen. */
  pedido?: { metodo: 'transferencia' | 'contacto'; periodo: 'mensual' | 'anual'; totalNeto: number; porCotizar: boolean; lineas: string[] }
}

/** Cómo contactamos a la persona: WhatsApp si dejó teléfono; si no, el correo. */
export const contactarPor = (d: Pick<DatosContacto, 'telefono'>): Solicitud['canal'] => (d.telefono ? 'whatsapp' : 'email')

/* Envía la solicitud al servidor (que la guarda en Supabase y avisa al flujo de respuesta automática)
   y espera la respuesta. Devuelve true si quedó guardada. Si falla (sin conexión, o sin servidor como
   en la vista previa), el formulario ofrece enviarla por WhatsApp o correo para que no se pierda. */
export async function enviarSolicitud({ inicio, ...s }: Solicitud): Promise<boolean> {
  /* Vista previa en un solo HTML (preview/main.tsx): no hay servidor; se muestra el mensaje de gracias
     como demostración y no se guarda nada. */
  if ((window as Window & { __VISTA_PREVIA__?: boolean }).__VISTA_PREVIA__) return true
  try {
    const ms = inicio === null ? -1 : Date.now() - inicio // tiempo que tomó completar el formulario
    const r = await fetch('/api/solicitudes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...s, ms, pagina: window.location.pathname }),
      signal: AbortSignal.timeout(15000),
    })
    const j = (await r.json().catch(() => null)) as { ok?: boolean } | null
    const ok = r.ok && j?.ok === true
    medir('formulario_enviado', { canal: s.canal, origen: s.origen, resultado: ok ? 'guardado' : 'error' })
    return ok
  } catch {
    medir('formulario_enviado', { canal: s.canal, origen: s.origen, resultado: 'error' })
    return false
  }
}
