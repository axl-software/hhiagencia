import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Kicker, Title, type Level } from './Heading'

const pad = (n: number) => String(n).padStart(2, '0')

/* Textos aprobados por los fundadores (docs/HHA_BRAND_FOUNDATION.md → Method) */
const PASOS = [
  ['Conversamos', 'Entendemos tu negocio, qué quieres mejorar y dónde está el problema antes de ofrecerte cualquier solución.'],
  ['Te proponemos', 'Definimos qué conviene hacer primero, qué puede esperar y qué solución tiene sentido según tu realidad.'],
  ['Lo construimos contigo', 'Desarrollamos la solución y te mostramos avances durante el proceso para ajustar a tiempo.'],
  ['Te acompañamos', 'Después de implementar, podemos mantener, medir y mejorar lo construido a medida que tu negocio crece.'],
]

export default function Metodo({ as = 'h2', alt = false }: { as?: Level; alt?: boolean }) {
  const body = (
    <div className="wrap sec">
      <div data-reveal>
        <Kicker>MÉTODO</Kicker>
        <Title as={as} style={{ marginBottom: 44 }}>Así trabajamos contigo</Title>
      </div>
      <div className="steps">
        {PASOS.map(([t, d], i) => (
          <div className="step" key={t} data-reveal style={{ '--d': `${i * 0.1}s` } as CSSProperties}>
            <span className="mono" style={{ color: 'var(--redtx)', fontSize: 12, letterSpacing: 1.5 }}>PASO {pad(i + 1)}</span>
            <span className="card-t">{t}</span>
            <span className="muted">{d}</span>
          </div>
        ))}
      </div>
      <Link className="ver-mas" href="/como-trabajamos" style={{ marginTop: 28 }}>
        Ver cómo trabajamos →
      </Link>
    </div>
  )
  return alt ? <section className="alt">{body}</section> : <section>{body}</section>
}
