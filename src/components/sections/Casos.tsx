'use client'

import { useState, type CSSProperties } from 'react'
import { CONFIG } from '@/lib/config'
import { Kicker, Title, type Level } from './Heading'
import Orbitas from '../Orbitas'

const CATS = ['Todos', ...Array.from(new Set(CONFIG.casos.map((c) => c.cat)))]

/* Casos aprobados (docs/HHA_BUSINESS_MODEL.md). Foto y resultado solo si son reales. */
export default function Casos({ as = 'h2' }: { as?: Level }) {
  const [cat, setCat] = useState('Todos')
  const casos = CONFIG.casos.filter((c) => cat === 'Todos' || c.cat === cat)

  return (
    <section className="alt con-deco">
      <Orbitas lado="derecha" />
      <div className="wrap sec">
        <div className="head-row" data-reveal>
          <div>
            <Kicker>CASOS</Kicker>
            <Title as={as}>Trabajo real, clientes reales</Title>
          </div>
          {CONFIG.casos.length > 3 && (
            <div className="chips" role="group" aria-label="Filtrar casos">
              {CATS.map((c) => (
                <button key={c} type="button" className="chip" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
          )}
        </div>
        <div className="grid">
          {casos.map((c, i) => (
            <article className="case card" key={c.nombre} data-reveal style={{ '--d': `${i * 0.1}s` } as CSSProperties}>
              {c.foto && (
                // eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML
                <div className="ph"><img src={c.foto} alt={c.nombre} loading="lazy" /></div>
              )}
              <span className="mono" style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--redtx)' }}>{c.tag}</span>
              <span className="card-t">{c.nombre}</span>
              <span className="muted">{c.resumen}</span>
              <ul>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
              {c.resultado && <div className="result">RESULTADO: {c.resultado}</div>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
