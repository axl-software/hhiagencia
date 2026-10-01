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

/** Devuelve el campo que falta y el aviso, o null si está todo bien. */
export function validar(d: Pick<DatosContacto, 'nombre' | 'email' | 'telefono'>): { campo: string; texto: string } | null {
  if (!d.nombre) return { campo: 'nombre', texto: 'Escribe tu nombre o el de tu proyecto para continuar.' }
  if (!d.email && !d.telefono) return { campo: 'email', texto: 'Déjanos tu correo o tu teléfono para poder responderte.' }
  if (d.email && !EMAIL_OK.test(d.email)) return { campo: 'email', texto: 'Revisa tu correo: parece que le falta algo.' }
  return null
}

export function armarMensaje(d: DatosContacto) {
  const lineas = [`Hola HHiAgencia, soy ${d.nombre}.`]
  if (d.negocio) lineas.push(`Mi negocio o proyecto: ${d.negocio}`)
  if (d.diagnostico?.length) {
    lineas.push('Hice el diagnóstico en la web:')
    for (const r of d.diagnostico) lineas.push(`- ${r.pregunta} ${r.respuesta}`)
  }
  lineas.push(`Me interesa: ${d.servicios.join(', ') || 'Por definir'}`)
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
