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
  lineas.push(d.servicios.length ? `Me interesa: ${d.servicios.join(', ')}` : 'Me gustaría agendar una reunión para conversar de mi negocio.')
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
