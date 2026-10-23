import type { ReactNode } from 'react'
import { CONFIG } from '@/lib/config'
import { Kicker } from './Heading'
import s from './Legal.module.css'

/* Textos legales de HHA Digital Solutions SpA. Antes de publicar: agregar RUT y dirección de la sociedad y que un abogado
   los revise (ver comentarios PENDIENTE en terminos y privacidad). */
export const ACTUALIZADO = '6 de octubre de 2026'

/* Plantilla única de las páginas legales (privacidad, términos, seguridad): encabezado, texto e
   índice interno. Cada página pasa sus secciones (el id del <h2> y cómo se llama en el índice);
   los <h2> llevan ese id y tabIndex={-1}, así el ancla deja el foco en el encabezado. */
export type Seccion = { id: string; label: string }

export default function Legal({
  titulo,
  kicker = 'LEGAL',
  secciones,
  consulta,
  children,
}: {
  titulo: string
  kicker?: string
  secciones: Seccion[]
  consulta?: { titulo: string; texto: string }
  children: ReactNode
}) {
  const tituloId = 'legal-titulo'
  return (
    <section className={`wrap sec ${s.layout}`} aria-labelledby={tituloId}>
      <header className={s.header}>
        <Kicker style={{ margin: 0 }}>{kicker}</Kicker>
        <h1 id={tituloId} tabIndex={-1}>{titulo}</h1>
        <p className={s.updated}>Última actualización: {ACTUALIZADO}</p>
      </header>

      <article className={s.article}>{children}</article>

      <aside className={s.sidebar}>
        <nav aria-label={`Índice de ${titulo.toLowerCase()}`}>
          <p className={s.indiceTitulo}>EN ESTA PÁGINA</p>
          <ul className={s.index}>
            <li><a href={`#${tituloId}`}>{titulo}</a></li>
            {secciones.map((sec) => (
              <li key={sec.id}><a href={`#${sec.id}`}>{sec.label}</a></li>
            ))}
          </ul>
        </nav>
        {consulta && (
          <div className={s.contact}>
            <p className={s.contactTitulo}>{consulta.titulo}</p>
            <p>{consulta.texto}</p>
            <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
          </div>
        )}
      </aside>
    </section>
  )
}
