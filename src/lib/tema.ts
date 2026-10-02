/* Tema claro/oscuro: clave donde se guarda la elección del visitante y script que
   corre antes de pintar la página (en el <head> de layout.tsx y de preview/index.html),
   para que no se vea un parpadeo del tema equivocado. Sin elección guardada, sigue al dispositivo. */
export const TEMA_CLAVE = 'tema'

export type Tema = 'light' | 'dark'

/* Para componentes de cliente: tema actual y aviso cuando cambia (TemaToggle, HeroFondo) */
export const leerTema = (): Tema => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
export const suscribirTema = (aviso: () => void) => {
  const mo = new MutationObserver(aviso)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => mo.disconnect()
}

export const TEMA_SCRIPT = `(function(){var t;try{t=localStorage.getItem('${TEMA_CLAVE}')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t})()`
