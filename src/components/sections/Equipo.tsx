import { CONFIG } from '@/lib/config'
import { Kicker, Title, type Level } from './Heading'

/* Fundadores. Datos en src/lib/config.ts → equipo. Sin foto, la tarjeta sale solo con texto. */
export default function Equipo({ as = 'h2' }: { as?: Level }) {
  return (
    <section className="wrap sec">
      <div className="head-row">
        <div>
          <Kicker>EQUIPO</Kicker>
          <Title as={as}>Quiénes están detrás</Title>
        </div>
      </div>

      <div className="team">
        {CONFIG.equipo.map((p) => (
          <article className="team-card" key={p.nombre}>
            {p.foto && (
              <div className="team-ph">
                {/* eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML */}
                <img src={p.foto} alt={`Retrato de ${p.nombre}`} loading="lazy" width={640} height={800} />
              </div>
            )}
            <div className="team-body">
              <div className="team-credit">{p.rol}</div>
              <h3 className="card-t">{p.nombre}</h3>
              <p className="muted" style={{ margin: 0 }}>{p.bio}</p>
              <div className="team-tags">
                {p.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
