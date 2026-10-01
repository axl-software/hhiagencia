'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/* Aparición suave al bajar: los elementos con data-reveal que todavía no se ven quedan
   "pendientes" (globals.css → .reveal-pending) y aparecen al entrar en pantalla.
   Lo que ya está a la vista no se toca, así no parpadea; sin JavaScript todo se ve normal.
   Con "reducir movimiento" no hace nada. Se vuelve a ejecutar al cambiar de página. */
export default function Revelar() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue
          e.target.classList.remove('reveal-pending')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return
      el.classList.add('reveal-pending')
      io.observe(el)
    })
    return () => io.disconnect()
  }, [pathname])

  return null
}
