import type { ReactNode } from 'react'
import { Kicker } from './Heading'

/* Plantilla de las páginas legales (privacidad, términos, seguridad).
   Los textos son BORRADORES basados en cómo funciona hoy el sitio: deben revisarse con un abogado
   antes de publicar, y actualizarse si cambia algo (por ejemplo, si el formulario empieza a guardar datos). */
export const ACTUALIZADO = '1 de octubre de 2026'

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
