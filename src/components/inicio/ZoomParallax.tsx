'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import s from './Scroll.module.css'

/* Zoom con parallax al hacer scroll (adaptado de "Zoom Parallax", 21st.dev): hasta 7 imágenes, cada una crece a su ritmo mientras la
   escena queda fija; la del centro termina llenando la pantalla. Cambios para HHA: CSS modules con tokens de marca y, con
   "reducir movimiento", las imágenes se muestran en una rejilla sin animación. */
/* Con `marca`, la imagen se dibuja como una página web de ejemplo (barra de navegador, marca, titular y botón); sin `marca`, es una foto. */
export type ImagenZoom = { src: string; alt?: string; marca?: string; titulo?: string; boton?: string; url?: string }

function Pieza({ img }: { img: ImagenZoom }) {
  if (!img.marca) {
    // eslint-disable-next-line @next/next/no-img-element -- imágenes de ejemplo; next/image rompe la vista previa en HTML
    return <img src={img.src} alt={img.alt ?? ''} aria-hidden={img.alt ? undefined : true} draggable={false} />
  }
  return (
    <div className={s.web} role="img" aria-label={img.alt ?? `Ejemplo de página web: ${img.marca}`}>
      <div className={s.webBarra} aria-hidden="true"><i /><i /><i /><span>{img.url}</span></div>
      <div className={s.webVista} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- imágenes de ejemplo; next/image rompe la vista previa en HTML */}
        <img src={img.src} alt="" draggable={false} />
        <div className={s.webTxt}><small>{img.marca}</small><b>{img.titulo}</b><span>{img.boton}</span></div>
      </div>
    </div>
  )
}

/* Cuánto crece cada pieza en total (k). La del centro llega a ~78 % del ancho: la imagen de origen mide 1000 px, y estirarla más la
   volvería a ver borrosa. Las de los bordes crecen más porque salen de la pantalla. */
const K = [3.1, 4, 4.6, 4, 4.6, 5.6, 6.4]

function Capa({ img, i, progreso }: { img: ImagenZoom; i: number; progreso: MotionValue<number> }) {
  const k = K[i % K.length]
  const escala = useTransform(progreso, [0, 1], [1 / k, 1])
  return (
    <motion.div style={{ scale: escala, ['--k' as string]: k }} className={`${s.capa} ${s[`p${i}`] ?? ''}`}>
      <div className={s.pic}>
        <Pieza img={img} />
      </div>
    </motion.div>
  )
}

export function ZoomParallax({ imagenes }: { imagenes: ImagenZoom[] }) {
  const contenedor = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: contenedor, offset: ['start start', 'end end'] })

  if (reduce) {
    return (
      <div className={s.estatico}>
        {imagenes.map((img, i) => (
          <div key={i} className={s.estaticoItem}><Pieza img={img} /></div>
        ))}
      </div>
    )
  }

  return (
    <div ref={contenedor} className={s.zoom}>
      <div className={s.zoomPin}>
        {imagenes.slice(0, 7).map((img, i) => (
          <Capa key={i} img={img} i={i} progreso={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}
