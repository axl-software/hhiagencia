/* Tono de cada página. Ya no hay botón de claro/oscuro: cada página tiene su tono (decisión de los fundadores,
   2026-10-05). Inicio, Marketing y Cómo trabajamos van en oscuro; Servicios, Prueba gratis, Contacto y las
   páginas legales van en un tono claro azulado. Para cambiar el tono de una página, editar esta lista.
   El script de abajo corre antes de pintar la página (en el <head> de layout.tsx y de preview/index.html),
   para que no se vea un parpadeo del tono equivocado; TemaRuta lo vuelve a aplicar al cambiar de página. */
export const RUTAS_CLARAS = ['/servicios', '/prueba-gratis', '/pedido', '/contacto', '/privacidad', '/terminos', '/seguridad']

export type Tema = 'light' | 'dark'

export const temaDeRuta = (ruta: string): Tema => {
  const r = ruta.replace(/\/+$/, '') || '/'
  return RUTAS_CLARAS.includes(r) ? 'light' : 'dark'
}

/* Para componentes de cliente: tono actual y aviso cuando cambia (PortadaFondo) */
export const leerTema = (): Tema => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
export const suscribirTema = (aviso: () => void) => {
  const mo = new MutationObserver(aviso)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => mo.disconnect()
}

export const TEMA_SCRIPT = `(function(){var r=(location.pathname.replace(/[/]+$/,'')||'/'),c=${JSON.stringify(RUTAS_CLARAS)};document.documentElement.dataset.theme=c.indexOf(r)>-1?'light':'dark'})()`
