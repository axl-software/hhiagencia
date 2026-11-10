'use client'

import { useEffect, useRef, useState } from 'react'

/* Devuelve [ref, visto]: visto pasa a true la primera vez que el elemento entra en pantalla (para animar números desde 0).
   Respaldo: si el navegador no avisa (IntersectionObserver), se revisa la posición al hacer scroll y cada medio segundo,
   así el número real nunca se queda en 0. */
export function useEnVista<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visto, setVisto] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let listo = false
    const fin = () => {
      if (listo) return
      listo = true
      setVisto(true)
      io?.disconnect()
      clearInterval(t)
      window.removeEventListener('scroll', revisar)
    }
    const revisar = () => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) fin()
    }
    const io = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([e]) => { if (e.isIntersecting) fin() }, { threshold: 0.4 })
    io?.observe(el)
    const t = setInterval(revisar, 500)
    window.addEventListener('scroll', revisar, { passive: true })
    revisar()
    return () => { listo = true; io?.disconnect(); clearInterval(t); window.removeEventListener('scroll', revisar) }
  }, [])
  return [ref, visto] as const
}
