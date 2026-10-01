import { CONFIG } from '@/lib/config'
import { Kicker, Title, type Level } from './Heading'

/* Equipo presentado como los créditos de una película. Datos en src/lib/config.ts → equipo. */
export default function Equipo({ as = 'h2' }: { as?: Level }) {
  return (
    <section className="wrap sec">
      <div className="head-row">
        <div>
          <Kicker>CRÉDITOS · EQUIPO</Kicker>
          <Title as={as}>Quién está detrás de cada toma</Title>
        </div>
        <p className="muted" style={{ maxWidth: 420, margin: 0 }}>
          [TEXTO: una frase sobre cómo trabaja el equipo en cada proyecto.]
        </p>
      </div>

      <div className="team">
        {CONFIG.equipo.map((p, i) => (
          <article className="team-card" key={i}>
            <div className="ph team-ph">
              {/* eslint-disable-next-line @next/next/no-img-element -- fotos pendientes; pasar a next/image cuando existan */}
              {p.foto ? <img src={p.foto} alt={p.nombre} loading="lazy" /> : `[FOTO: ${p.nombre}]`}
              <span className="team-slate" aria-hidden="true">CÁM. {String.fromCharCode(65 + i)}</span>
            </div>
            <div className="team-credit">{p.credito}</div>
            <h3 className="card-t">{p.nombre}</h3>
            <p className="muted" style={{ margin: 0 }}>{p.bio}</p>
            <div className="team-tags">
              {p.tags.map((t, j) => <span key={j}>{t}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
