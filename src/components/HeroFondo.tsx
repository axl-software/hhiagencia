'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import s from './HeroOrbita.module.css'

/* Fondo del lado derecho de la portada, debajo de las órbitas: el video del notebook (6 s en bucle,
   sin audio) en pantallas grandes, y su primer cuadro como imagen fija mientras carga, si falla,
   en tablet/celular o con "reducir movimiento". Es una sola capa: el video aparece encima de la
   imagen (que es idéntica a su primer cuadro) y la cubre por completo.
   El video se pide recién cuando la página terminó de cargar, para no retrasar el texto ni los botones,
   y se pausa cuando la portada sale de la pantalla. Tratamiento claro/oscuro en HeroOrbita.module.css. */

const CON_VIDEO = '(min-width: 1025px) and (prefers-reduced-motion: no-preference)'
const ahorroDeDatos = () => (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true
const suscribir = (aviso: () => void) => {
  const mq = window.matchMedia(CON_VIDEO)
  mq.addEventListener('change', aviso)
  return () => mq.removeEventListener('change', aviso)
}
const quiereVideo = () => window.matchMedia(CON_VIDEO).matches && !ahorroDeDatos()

export default function HeroFondo() {
  const permitido = useSyncExternalStore(suscribir, quiereVideo, () => false)
  const [cargada, setCargada] = useState(false)
  const video = useRef<HTMLVideoElement>(null)

  /* espera a que la página termine de cargar (y un respiro más) antes de pedir el video */
  useEffect(() => {
    if (!permitido || cargada) return
    let t = 0
    const listo = () => { t = window.setTimeout(() => setCargada(true), 400) }
    if (document.readyState === 'complete') listo()
    else window.addEventListener('load', listo, { once: true })
    return () => {
      window.removeEventListener('load', listo)
      window.clearTimeout(t)
    }
  }, [permitido, cargada])

  /* reproduce solo mientras la portada está a la vista */
  const mostrar = permitido && cargada
  useEffect(() => {
    const v = video.current
    if (!mostrar || !v) return
    v.muted = true
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    })
    io.observe(v)
    return () => io.disconnect()
  }, [mostrar])

  return (
    <div className={s.fondo} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML */}
      <img
        className={s.fondoMedio}
        src="/img/hero/fondo.webp"
        srcSet="/img/hero/fondo-960.webp 960w, /img/hero/fondo.webp 1672w"
        sizes="(min-width: 1025px) 100vw, 60vw"
        width={1672}
        height={941}
        alt=""
        decoding="async"
        fetchPriority="high"
      />
      {mostrar && (
        <video
          ref={video}
          className={`${s.fondoMedio} ${s.fondoVideo}`}
          src="/img/hero/fondo.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          /* aparece cuando ya se está reproduciendo; si falla, queda la imagen */
          onPlaying={(e) => { e.currentTarget.dataset.listo = '' }}
        />
      )}
    </div>
  )
}
