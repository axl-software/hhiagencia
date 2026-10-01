import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="wrap sec" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
      <div className="kicker" style={{ margin: 0 }}>● REC · ERROR 404</div>
      <h1 className="display h2">Esta toma no existe.</h1>
      <p className="lead">La página que buscas se movió o nunca se grabó.</p>
      <div>
        <span className="btn-giro-wrap">
          <Link className="btn-giro btn-giro-lg" href="/"><span>Volver al inicio</span></Link>
        </span>
      </div>
    </section>
  )
}
