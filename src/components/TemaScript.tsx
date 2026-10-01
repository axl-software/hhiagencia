'use client'

import { TEMA_SCRIPT } from '@/lib/tema'

/* Script del tema claro/oscuro. Tiene que correr una sola vez, desde el HTML que manda el servidor,
   antes de que se pinte la página (así no parpadea el tema equivocado).
   Si React tiene que volver a crear este elemento en el navegador (por ejemplo, cuando una extensión
   altera el HTML y React reconstruye la página), igual no lo ejecutaría y en desarrollo avisa con
   "Encountered a script tag while rendering React component". Por eso en el navegador se marca
   como "text/plain": React lo trata como dato y no avisa. El servidor lo envía sin tipo (JavaScript). */
export default function TemaScript() {
  return (
    <script
      suppressHydrationWarning
      type={typeof window === 'undefined' ? undefined : 'text/plain'}
      dangerouslySetInnerHTML={{ __html: TEMA_SCRIPT }}
    />
  )
}
