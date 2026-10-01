import Link from 'next/link'

/* Banda roja de cierre que lleva a /contacto (CTA aprobado: Solicita cotización). */
export default function CtaBanda({ titulo = 'Cuéntanos qué necesitas y te enviamos una propuesta.' }: { titulo?: string }) {
  return (
    <section className="cta">
      <div className="wrap">
        <h2 className="display">{titulo}</h2>
        <Link className="btn btn-white" href="/contacto" style={{ minHeight: 60, fontSize: 16 }}>
          Solicita cotización →
        </Link>
      </div>
    </section>
  )
}
