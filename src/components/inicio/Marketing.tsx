import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import s from './Secciones.module.css'

/* Marketing: resumen con salida a la página de marketing. La inversión en anuncios nunca va incluida (docs/HHA_BUSINESS_MODEL.md). */
export default function MarketingBloque() {
  return (
    <section className="alt" id="marketing" aria-labelledby="mk-t">
      <div className={`wrap sec ${s.dos}`}>
        <div data-reveal>
          <p className="kicker">MARKETING</p>
          <h2 id="mk-t" className="display h2" style={{ marginBottom: 16 }}>Para que más personas te encuentren y te escriban.</h2>
          <p className="lead">Estrategia y contenido constantes, y campañas para generar consultas. La inversión en anuncios se paga directamente a cada plataforma.</p>
          <ul className={s.checks}>
            <li>Planificación mensual y contenido para tus redes</li>
            <li>Campañas de captación en Instagram y Facebook</li>
            <li>Email marketing y seguimiento de resultados</li>
          </ul>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <Link className="btn-plan" href="/contacto?servicios=marketing">Solicitar cotización <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" /></Link>
            <Link className="btn btn-out" href="/marketing">Ver marketing</Link>
          </div>
        </div>
        <div data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
          {/* eslint-disable-next-line @next/next/no-img-element -- foto de ejemplo; next/image rompe la vista previa en HTML */}
          <img src="/img/ejemplos/marketing.webp" alt="Celular sobre un trípode con aro de luz, preparado para grabar contenido" width={1000} height={667} loading="lazy" />
        </div>
      </div>
    </section>
  )
}
