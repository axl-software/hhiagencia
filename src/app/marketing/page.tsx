import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import HeroVisible from '@/components/marketing/HeroVisible'
import s from './marketing.module.css'

export const metadata: Metadata = {
  title: 'Marketing | Haz visible tu marca',
  alternates: { canonical: '/marketing' },
  description: 'Marketing y web trabajando juntos para que tu negocio se vea, se encuentre y se recuerde. Planes Visibility Starter y Visibility Business.',
}

/* Marketing (fundadores, 2026-11-10): la página anterior se borró por completo. Por ahora solo tiene el hero "Haz visible tu marca" y los
   dos planes, que combinan marketing y web: Visibility Starter y Visibility Business. Precios e información por definir: no se publica
   nada que no esté aprobado. */
const PLANES = [
  { id: 'starter', nombre: 'Visibility Starter', para: 'Marketing + Web' },
  { id: 'business', nombre: 'Visibility Business', para: 'Marketing + Web' },
]

export default function MarketingPage() {
  return (
    <>
      <HeroVisible />
      <section className={`wrap ${s.planes}`} aria-labelledby="planes">
        <div className={s.cabeza} data-reveal>
          <p className="kicker">PLANES</p>
          <h2 id="planes" tabIndex={-1} className={`display h2 ${s.h2}`}>Visibility, marketing y web juntos.</h2>
          <p className="lead">Dos planes que combinan marketing y web. Estamos definiendo el detalle y los valores; cuéntanos tu caso y te escribimos con la información.</p>
        </div>
        <ul className={s.grid}>
          {PLANES.map((p, n) => (
            <li key={p.id} data-reveal style={{ '--d': `${n * 0.1}s` } as React.CSSProperties}>
              <article className={s.plan}>
                <span className={s.para}>{p.para}</span>
                <h3 className={s.nombre}>{p.nombre}</h3>
                <p className={s.precio}>Precio por definir</p>
                <p className={s.detalle}>Información en definición.</p>
                <Link className="btn-plan" href="/contacto">Solicitar información <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" /></Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
