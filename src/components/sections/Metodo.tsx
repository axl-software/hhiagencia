import { Kicker, Title, type Level } from './Heading'

const pad = (n: number) => String(n).padStart(2, '0')

const PASOS = [
  ['Diagnóstico', 'Entendemos tu negocio, tu objetivo y qué tiene que pasar cuando alguien te encuentra.'],
  ['Propuesta', 'Te mostramos qué conviene construir primero, qué se puede automatizar y el alcance de cada etapa.'],
  ['Implementación', 'Desarrollamos tu web, automatización o estrategia, con revisiones antes de publicar.'],
  ['Acompañamiento', 'Mantenimiento mensual, mejoras y automatización progresiva de lo que ya funciona.'],
]

export default function Metodo({ as = 'h2', alt = false }: { as?: Level; alt?: boolean }) {
  const body = (
    <div className="wrap sec">
      <Kicker>MÉTODO</Kicker>
      <Title as={as} style={{ marginBottom: 44 }}>Cómo trabajamos</Title>
      <div className="steps">
        {PASOS.map(([t, d], i) => (
          <div className="step" key={t}>
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
