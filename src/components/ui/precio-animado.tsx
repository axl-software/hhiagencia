'use client'

import NumberFlow from '@number-flow/react'
import { useEnVista } from './en-vista'

const TIEMPO = { duration: 1100, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }

/* Precio en pesos chilenos que sube desde 0 al aparecer y se anima al cambiar (NumberFlow). Formato: "$49.990". Hereda tamaño y color. */
export function Pesos({ valor }: { valor: number }) {
  const [ref, visto] = useEnVista<HTMLSpanElement>()
  return (
    <span ref={ref} style={{ display: 'inline-block', font: 'inherit', color: 'inherit', letterSpacing: 'inherit' }}>
      <NumberFlow value={visto ? Math.round(valor) : 0} locales="es-CL" format={{ style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }} trend={0} transformTiming={TIEMPO} spinTiming={TIEMPO} />
    </span>
  )
}

/* Texto con precios adentro ("$14.990 / mes + IVA"): los montos se animan, el resto queda igual. */
export function Animado({ t }: { t: string }) {
  const partes = t.split(/(\$\d{1,3}(?:\.\d{3})*)/g)
  return (
    <>
      {partes.map((p, i) => (/^\$\d/.test(p) ? <Pesos key={i} valor={Number(p.replace(/[$.]/g, ''))} /> : p))}
    </>
  )
}
