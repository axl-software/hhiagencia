'use client'

import NumberFlow from '@number-flow/react'

/* Precio en pesos chilenos que cambia con animación (NumberFlow). Mismo formato que clp(): "$49.990". */
export function Pesos({ valor }: { valor: number }) {
  return <NumberFlow value={Math.round(valor)} locales="es-CL" format={{ style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }} trend={0} />
}
