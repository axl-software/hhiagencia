import type { CSSProperties } from 'react'
import { Kicker, Title, type Level } from './Heading'
import Orbitas from '../Orbitas'

export default function Postura({ as = 'h2' }: { as?: Level }) {
  return (
    <section className="con-deco">
      <Orbitas lado="derecha" />
      <div className="wrap sec split">
        <div data-reveal>
          <Kicker>POR QUÉ HHA</Kicker>
          <Title as={as}>Tecnología aplicada a problemas reales del negocio.</Title>
        </div>
        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 8, '--d': '0.1s' } as CSSProperties}>
          <p className="lead" style={{ fontSize: 17 }}>
            Unimos estrategia, marketing y tecnología en un mismo equipo. Primero entendemos qué tiene que vender tu negocio; después construimos la web, el contenido o la automatización que lo hace posible.
          </p>
          <p className="lead" style={{ fontSize: 17 }}>
            No te vendemos la herramienta de moda. Partimos por lo necesario para vender y automatizamos solo lo que ya funciona. Y si algo es técnico, te lo explicamos de forma simple.
          </p>
        </div>
      </div>
    </section>
  )
}
