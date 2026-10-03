import type { ReactNode } from 'react'
import { Kicker } from './Heading'

/* Borradores para revisión: completar los pendientes de privacidad y contratación
   y verificar las prácticas reales antes de publicar. */
export const ACTUALIZADO = '2 de octubre de 2026'

export default function Legal({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="wrap sec legal">
      <Kicker>LEGAL</Kicker>
      <h1 className="display h2">{titulo}</h1>
      <p className="note">Última actualización: {ACTUALIZADO}</p>
      {children}
    </section>
  )
}
