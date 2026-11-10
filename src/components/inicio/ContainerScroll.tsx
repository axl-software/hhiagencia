'use client'

import { useRef, useState, useEffect, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import s from './Scroll.module.css'

/* Tarjeta que se endereza al hacer scroll (adaptado de "Container Scroll Animation", Aceternity UI / 21st.dev): empieza inclinada
   20° y un poco más grande, y llega recta; el título sube un poco. Cambios para HHA: estilos con tokens de marca (CSS modules en
   vez de Tailwind), un espacio `pie` bajo la tarjeta para los llamados a la acción y, con "reducir movimiento", sin animación. */
export function ContainerScroll({ titulo, pie, children }: { titulo: ReactNode; pie?: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref })
  const [movil, setMovil] = useState(false)

  useEffect(() => {
    const revisar = () => setMovil(window.innerWidth <= 768)
    revisar()
    window.addEventListener('resize', revisar)
    return () => window.removeEventListener('resize', revisar)
  }, [])

  const rotar = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [20, 0])
  const escala = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : movil ? [0.7, 0.9] : [1.05, 1])
  const subir = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -100])

  return (
    <div className={s.cs} ref={ref}>
      <div className={s.csIn}>
        <motion.div style={{ translateY: subir }} className={s.cabeza}>
          {titulo}
        </motion.div>
        <motion.div style={{ rotateX: rotar, scale: escala }} className={s.tarjeta}>
          <div className={s.pantalla}>{children}</div>
        </motion.div>
        {pie && <div className={s.pie}>{pie}</div>}
      </div>
    </div>
  )
}
