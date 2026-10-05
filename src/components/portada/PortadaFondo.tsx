'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react'
import { leerTema, suscribirTema } from '@/lib/tema'
import s from './Portada.module.css'

/* Fondo de la portada, a todo el ancho: el video del teclado (6 s en bucle, sin audio) en pantallas
   grandes, y su primer cuadro como imagen fija mientras carga, si falla, en tablet/celular o con
   "reducir movimiento". Es una sola capa: el video aparece encima de la imagen (idéntica a su primer
   cuadro) y la cubre por completo.
   Hay una versión para cada tema (oscura, y clara en tonos crema). La imagen fija la elige el CSS según
   el tema, así se descarga solo la que corresponde; el video lo elige este componente.
   El video se pide recién cuando la página terminó de cargar, para no retrasar el texto ni los botones,
   y se pausa cuando la portada sale de la pantalla. Tratamiento en Portada.module.css. */

const IMAGENES = {
  '--fondo-oscuro': 'url("/img/hero/fondo.webp")',
  '--fondo-oscuro-chico': 'url("/img/hero/fondo-960.webp")',
  '--fondo-claro': 'url("/img/hero/fondo-claro.webp")',
  '--fondo-claro-chico': 'url("/img/hero/fondo-claro-960.webp")',
} as CSSProperties
const VIDEO = { dark: '/img/hero/fondo.mp4', light: '/img/hero/fondo-claro.mp4' }

const CON_VIDEO = '(min-width: 1025px) and (prefers-reduced-motion: no-preference)'
const ahorroDeDatos = () => (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true
const suscribir = (aviso: () => void) => {
  const mq = window.matchMedia(CON_VIDEO)
  mq.addEventListener('change', aviso)
  return () => mq.removeEventListener('change', aviso)
}
const quiereVideo = () => window.matchMedia(CON_VIDEO).matches && !ahorroDeDatos()

export default function PortadaFondo() {
  const permitido = useSyncExternalStore(suscribir, quiereVideo, () => false)
  const tema = useSyncExternalStore(suscribirTema, leerTema, () => null)
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
  const mostrar = permitido && cargada && tema !== null
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
  }, [mostrar, tema])

  return (
    <div className={s.fondo} aria-hidden="true" style={IMAGENES}>
      <div className={`${s.fondoMedio} ${s.fondoFoto}`} />
      {mostrar && (
        <video
          key={tema}
          ref={video}
          className={`${s.fondoMedio} ${s.fondoVideo}`}
          src={VIDEO[tema]}
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
