import type { ReactNode } from 'react'
import { Kicker } from './Heading'

/* Textos legales de HHA Digital Solutions SpA. Antes de publicar: agregar RUT y dirección de la sociedad y que un abogado
   los revise (ver comentarios PENDIENTE en terminos y privacidad). */
export const ACTUALIZADO = '6 de octubre de 2026'

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
