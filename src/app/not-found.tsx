import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="wrap sec" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
      <div className="kicker" style={{ margin: 0 }}>ERROR 404</div>
      <h1 className="display h2">Esta página no existe.</h1>
      <p className="lead">La página que buscas se movió o ya no está disponible.</p>
      <div>
        <span className="btn-giro-wrap">
          <Link className="btn-giro btn-giro-lg" href="/"><span>Volver al inicio</span></Link>
        </span>
      </div>
    </section>
  )
}
