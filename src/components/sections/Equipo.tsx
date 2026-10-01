import type { CSSProperties } from 'react'
import { siInstagram } from 'simple-icons'
import { CONFIG } from '@/lib/config'
import { Kicker, Title, type Level } from './Heading'

/* Fundadores. Datos en src/lib/config.ts → equipo. Sin foto, la tarjeta sale solo con texto. */
export default function Equipo({ as = 'h2' }: { as?: Level }) {
  return (
    <section className="wrap sec">
      <div className="head-row" data-reveal>
        <div>
          <Kicker>FUNDADORES</Kicker>
          <Title as={as}>Equipo</Title>
        </div>
      </div>

      <div className="team">
        {CONFIG.equipo.map((p, i) => (
          <article className="team-card" key={p.nombre} data-reveal style={{ '--d': `${i * 0.1}s` } as CSSProperties}>
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
              {p.instagram && (
                <a className="team-ig" href={`https://instagram.com/${p.instagram}`} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor"><path d={siInstagram.path} /></svg>
                  @{p.instagram}
                </a>
              )}
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
