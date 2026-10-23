import { track } from '@vercel/analytics'

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

/* Eventos de Vercel Web Analytics (sin cookies, anónimo). Solo registran datos cuando el sitio
   corre en Vercel; en local y en la vista previa no hacen nada.
   Eventos: guia_inicio, guia_fin, servicio_agregado, formulario_enviado, proyecto_visto. */
export type Evento = 'guia_inicio' | 'guia_fin' | 'servicio_agregado' | 'formulario_enviado' | 'proyecto_visto'

export function medir(evento: Evento, datos?: Record<string, string>) {
  try {
    track(evento, datos)
    /* Si Google Analytics está activo, el mismo evento también va a GA4 */
    window.gtag?.('event', evento, datos)
  } catch {
    /* la medición nunca debe romper la página */
  }
}
