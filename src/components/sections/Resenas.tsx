'use client'

import { useRef } from 'react'
import { CONFIG } from '@/lib/config'
import { Kicker, Title, type Level } from './Heading'

export default function Resenas({ as = 'h2' }: { as?: Level }) {
  const track = useRef<HTMLDivElement>(null)
  const slide = (dir: number) => {
    const card = track.current?.querySelector<HTMLElement>('.rv')
    track.current?.scrollBy({ left: dir * ((card?.offsetWidth || 400) + 16), behavior: 'smooth' })
  }

  // Solo reseñas reales y con permiso: sin ninguna, la sección no se muestra.
  if (!CONFIG.resenas.length) return null

  return (
    <section className="wrap sec reviews">
      <div className="head-row">
        <div>
          <Kicker>RESEÑAS</Kicker>
          <Title as={as}>Lo que dicen nuestros clientes</Title>
        </div>
        <div className="rv-nav">
          <button type="button" aria-label="Reseña anterior" onClick={() => slide(-1)}>←</button>
          <button type="button" aria-label="Reseña siguiente" onClick={() => slide(1)}>→</button>
        </div>
      </div>
      <div className="rv-track" ref={track} tabIndex={0} aria-label="Reseñas de clientes">
        {CONFIG.resenas.map((r) => (
          <figure className="rv" key={r.autor}>
            <span className="q" aria-hidden="true">“</span>
            <blockquote>{r.texto}</blockquote>
            <figcaption>
              <strong>{r.autor}</strong>
              <span className="mono" style={{ fontSize: 13, color: 'var(--mut)' }}>{r.rol}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
