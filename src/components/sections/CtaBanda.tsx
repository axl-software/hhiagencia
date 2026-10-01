import Link from 'next/link'

/* Banda roja de cierre que lleva a /contacto. */
export default function CtaBanda({ titulo = '¿Tienes una idea? Le ponemos dirección.' }: { titulo?: string }) {
  return (
    <section className="cta">
      <div className="wrap">
        <h2 className="display">{titulo}</h2>
        <Link className="btn btn-white" href="/contacto" style={{ minHeight: 60, fontSize: 16 }}>
          Agenda tu reunión de prueba →
        </Link>
      </div>
    </section>
  )
}
