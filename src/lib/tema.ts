/* Tema claro/oscuro: clave donde se guarda la elección del visitante y script que
   corre antes de pintar la página (en el <head> de layout.tsx y de preview/index.html),
   para que no se vea un parpadeo del tema equivocado. Sin elección guardada, sigue al dispositivo. */
export const TEMA_CLAVE = 'tema'

export const TEMA_SCRIPT = `(function(){var t;try{t=localStorage.getItem('${TEMA_CLAVE}')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t})()`
