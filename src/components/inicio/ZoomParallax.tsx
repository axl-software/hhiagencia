'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
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

export function ZoomParallax({ imagenes }: { imagenes: ImagenZoom[] }) {
  const contenedor = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: contenedor, offset: ['start start', 'end end'] })

  const e4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const e5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const e6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const e8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const e9 = useTransform(scrollYProgress, [0, 1], [1, 9])
  const escalas = [e4, e5, e6, e5, e6, e8, e9]

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
          <motion.div key={i} style={{ scale: escalas[i % escalas.length] }} className={`${s.capa} ${s[`p${i}`] ?? ''}`}>
            <div className={s.pic}>
              <Pieza img={img} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
