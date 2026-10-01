import { Kicker, Title, type Level } from './Heading'

export default function Nosotros({ as = 'h2' }: { as?: Level }) {
  return (
    <section className="alt">
      <div className="wrap sec" style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
        <Kicker style={{ margin: 0 }}>NOSOTROS</Kicker>
        <Title as={as}>Negocio y tecnología en el mismo equipo</Title>
        <p className="lead">
          HHA Digital Solutions nace de dos perfiles que se complementan: estrategia, marketing y ventas por un lado; desarrollo, automatización y ciberseguridad por el otro. Por eso cada proyecto parte por el negocio y termina en algo que funciona y se puede mantener.
        </p>
        <p className="lead">
          Trabajamos con pymes, empresas de servicios, negocios locales, marcas y creadores, desde Casablanca, Valparaíso y Viña del Mar.
        </p>
        <div className="chips">
          {['Estrategia', 'Marketing', 'Desarrollo web', 'Automatización', 'IA aplicada'].map((t) => (
            <span key={t} className="chip" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'default' }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
