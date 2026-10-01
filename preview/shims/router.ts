/* Router por hash para la vista previa en un solo HTML.
   /servicios  ↔  #servicios      /contacto?servicios=a,b  ↔  #contacto?servicios=a,b      /  ↔  #inicio
   /servicios#soluciones  ↔  #servicios#soluciones (la segunda parte es la sección a la que se baja) */
import { useSyncExternalStore } from 'react'

export const toHash = (href: string) => {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href
  const clean = href.replace(/^\//, '')
  return '#' + (clean === '' ? 'inicio' : clean)
}

const read = () => {
  const [h, ancla = ''] = decodeURIComponent(window.location.hash.slice(1)).split('#')
  const [path, query = ''] = h.split('?')
  return { path: !path || path === 'inicio' ? '/' : '/' + path, query, ancla }
}

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

export const usePath = () => useSyncExternalStore(subscribe, () => read().path, () => '/')
export const useQuery = () => useSyncExternalStore(subscribe, () => read().query, () => '')
export const useAncla = () => useSyncExternalStore(subscribe, () => read().ancla, () => '')
