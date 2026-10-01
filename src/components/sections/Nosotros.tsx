import { Kicker, Title, type Level } from './Heading'

export default function Nosotros({ as = 'h2' }: { as?: Level }) {
  return (
    <section className="alt">
      <div className="wrap sec split" style={{ alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Kicker style={{ margin: 0 }}>NOSOTROS</Kicker>
          <Title as={as}>Detrás de cámara y del escenario</Title>
          <p className="lead">
            HH Studio Creativo es el proyecto de Herberth Garay, director creativo. Estudia Ingeniería en Negocios Internacionales en la Universidad de Valparaíso: por eso cada idea parte por el negocio y no por la cámara.
          </p>
          <div className="chips">
            {['Ideas', 'Guiones', 'Decisiones visuales', 'Coordinación', 'Producción'].map((t) => (
              <span key={t} className="chip" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'default' }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="ph" style={{ aspectRatio: '4 / 5', maxWidth: 460 }}>[FOTO: retrato de Herberth]</div>
      </div>
    </section>
  )
}
