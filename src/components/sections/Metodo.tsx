import type { CSSProperties } from 'react'
import { Kicker, Title, type Level } from './Heading'

const pad = (n: number) => String(n).padStart(2, '0')

const PASOS = [
  ['Conversamos', 'Nos cuentas de tu negocio, qué te quita tiempo y qué te gustaría lograr. Sin tecnicismos.'],
  ['Te proponemos', 'Te mostramos qué conviene hacer primero y qué se puede automatizar, con un alcance claro.'],
  ['Lo construimos', 'Desarrollamos tu web, automatización o estrategia y te mostramos avances, para que nada te sorprenda.'],
  ['Te acompañamos', 'Seguimos contigo: mantenimiento, mejoras y, de a poco, automatizamos lo que ya funciona.'],
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
    </div>
  )
  return alt ? <section className="alt">{body}</section> : <section>{body}</section>
}
