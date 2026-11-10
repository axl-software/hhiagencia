'use client'

import { useEffect, useId } from 'react'
import { MotionValue, motion, useSpring, useTransform, motionValue, useReducedMotion } from 'framer-motion'
import useMeasure from 'react-use-measure'
import s from './sliding-number.module.css'

/* Número que "rueda" dígito por dígito (adaptado de "Sliding Number", 21st.dev: framer-motion en vez de motion, CSS en vez de Tailwind). */
const TRANSITION = { type: 'spring' as const, stiffness: 280, damping: 18, mass: 0.3 }

function Digit({ value, place }: { value: number; place: number }) {
  const redondeado = Math.floor(value / place) % 10
  const reducir = useReducedMotion()
  const animado = useSpring(motionValue(redondeado), reducir ? { duration: 0 } : TRANSITION)
  useEffect(() => { animado.set(redondeado) }, [animado, redondeado])
  return (
    <span className={s.digito}>
      <span className={s.medida}>0</span>
      {Array.from({ length: 10 }, (_, i) => <Cifra key={i} mv={animado} numero={i} />)}
    </span>
  )
}

function Cifra({ mv, numero }: { mv: MotionValue<number>; numero: number }) {
  const id = useId()
  const [ref, b] = useMeasure()
  const y = useTransform(mv, (v) => {
    if (!b.height) return 0
    const offset = (10 + numero - (v % 10)) % 10
    let memo = offset * b.height
    if (offset > 5) memo -= 10 * b.height
    return memo
  })
  if (!b.height) return <span ref={ref} className={s.oculto}>{numero}</span>
  return <motion.span ref={ref} style={{ y }} layoutId={`${id}-${numero}`} className={s.cifra} transition={TRANSITION}>{numero}</motion.span>
}

export function SlidingNumber({ value, padStart = false }: { value: number; padStart?: boolean }) {
  const entero = Math.max(0, Math.round(Math.abs(value)))
  const txt = padStart && entero < 10 ? `0${entero}` : String(entero)
  const digitos = txt.split('')
  return (
    <span className={s.fila} aria-label={String(entero)} role="text">
      {digitos.map((_, i) => <Digit key={`p-${digitos.length - i - 1}`} value={entero} place={Math.pow(10, digitos.length - i - 1)} />)}
    </span>
  )
}
