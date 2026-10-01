'use client'

import { useState } from 'react'
import { CONFIG } from '@/lib/config'
import { Kicker, Title, type Level } from './Heading'

const CATS = ['Todos', ...Array.from(new Set(CONFIG.casos.map((c) => c.cat)))]

export default function Casos({ as = 'h2' }: { as?: Level }) {
  const [cat, setCat] = useState('Todos')
  const casos = CONFIG.casos.filter((c) => cat === 'Todos' || c.cat === cat)

  return (
    <section className="alt">
      <div className="wrap sec">
        <div className="head-row">
          <div>
            <Kicker>CASOS</Kicker>
            <Title as={as}>Trabajo real, clientes reales</Title>
          </div>
          <div className="chips" role="group" aria-label="Filtrar casos">
            {CATS.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div className="grid">
          {casos.map((c) => (
            <article className="case" key={c.nombre}>
              {/* eslint-disable-next-line @next/next/no-img-element -- fotos pendientes; pasar a next/image cuando existan */}
              <div className="ph">{c.foto ? <img src={c.foto} alt={c.nombre} loading="lazy" /> : c.fotoTxt}</div>
              <span className="mono" style={{ fontSize: 13, letterSpacing: 1, color: 'var(--redtx)' }}>{c.tag}</span>
              <span className="card-t">{c.nombre}</span>
              <span className="muted">{c.resumen}</span>
              <ul>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
              <div className="result">RESULTADO: {c.resultado}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
