import { Kicker, Title, type Level } from './Heading'

const pad = (n: number) => String(n).padStart(2, '0')

const TOMAS = [
  ['Diagnóstico', '12 preguntas antes de proponer nada: objetivo, público, fecha, recursos, presupuesto y quién decide.'],
  ['Dirección', 'Concepto, guiones, pauta y referencias visuales aprobadas antes de producir.'],
  ['Producción', 'Rodaje, fotografía, edición y diseño. Entregables editables en Canva o PowerPoint.'],
  ['Publicación', 'Calendario, publicación y revisión de lo que funcionó para ajustar la semana siguiente.'],
]

export default function Metodo({ as = 'h2', alt = false }: { as?: Level; alt?: boolean }) {
  const body = (
    <div className="wrap sec">
      <Kicker>MÉTODO</Kicker>
      <Title as={as} style={{ marginBottom: 44 }}>Cuatro tomas, un objetivo</Title>
      <div className="steps">
        {TOMAS.map(([t, d], i) => (
          <div className="step" key={t}>
            <span className="mono" style={{ color: 'var(--redtx)', fontSize: 14 }}>TOMA {pad(i + 1)}</span>
            <span className="card-t" style={{ fontSize: 28 }}>{t}</span>
            <span className="muted">{d}</span>
          </div>
        ))}
      </div>
    </div>
  )
  return alt ? <section className="alt">{body}</section> : <section>{body}</section>
}
