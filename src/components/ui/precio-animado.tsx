'use client'

import NumberFlow from '@number-flow/react'
import { useEnVista } from './en-vista'

/* Precio en pesos chilenos que sube desde 0 al aparecer y se anima al cambiar (NumberFlow). Formato: "$49.990". */
export function Pesos({ valor }: { valor: number }) {
  const [ref, visto] = useEnVista<HTMLSpanElement>()
  return (
    <span ref={ref}>
      <NumberFlow value={visto ? Math.round(valor) : 0} locales="es-CL" format={{ style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }} trend={0} transformTiming={{ duration: 1100, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }} spinTiming={{ duration: 1100, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
    </span>
  )
}
