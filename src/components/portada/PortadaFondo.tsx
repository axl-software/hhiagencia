'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react'
import { Pause, Play } from 'lucide-react'
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
  /* Lo que ve el botón (sigue al video) y lo que pidió la persona. Van separados porque el video también
     se pausa solo al salir de la pantalla: eso no es una decisión suya y no debe quedar como "detenido". */
  const [pausado, setPausado] = useState(false)
  const detenidoAMano = useRef(false)

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

  /* Reproduce solo mientras la portada está a la vista, y nunca si la persona lo detuvo: así volver a subir
     el scroll (o cambiar de tema, que rehace el video) no se lo reanuda. */
  const mostrar = permitido && cargada && tema !== null
  useEffect(() => {
    const v = video.current
    if (!mostrar || !v) return
    v.muted = true
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !detenidoAMano.current) v.play().catch(() => {})
      else v.pause()
    })
    io.observe(v)
    return () => io.disconnect()
  }, [mostrar, tema])

  const alternar = () => {
    const v = video.current
    if (!v) return
    detenidoAMano.current = !v.paused
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  return (
    <>
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
          onPlay={() => setPausado(false)}
          onPause={() => setPausado(true)}
        />
      )}
    </div>
    {/* Pausar o reanudar el video de fondo (WCAG 2.2.2). Va fuera del bloque aria-hidden para que lo
        alcancen el teclado y los lectores de pantalla. Solo existe cuando hay video: en celular, con
        "reducir movimiento" o con ahorro de datos queda la imagen fija y no hace falta. */}
    {mostrar && (
      <button
        type="button"
        className={s.pausa}
        onClick={alternar}
        aria-label={pausado ? 'Reproducir el video de fondo' : 'Pausar el video de fondo'}
      >
        {pausado
          ? <Play size={15} strokeWidth={2.25} aria-hidden="true" />
          : <Pause size={15} strokeWidth={2.25} aria-hidden="true" />}
      </button>
    )}
    </>
  )
}
