import type { CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowRight, Bot, Globe, Megaphone, Workflow, type LucideIcon } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { Kicker, Title } from '../sections/Heading'
import s from './Soluciones.module.css'

/* "Elige lo que necesitas": las categorías de Servicios (src/lib/config.ts → categorias), cada una con sus
   servicios y un enlace a SU parte de /servicios (marketing va a su propia página). HHA Systems no tiene
   tarjeta propia: aparece dentro de Desarrollo web, porque también es web (aplicaciones web), y su
   categoría completa está en /servicios. Textos cortos para la tarjeta; el detalle está en /servicios. */
const ICONOS: Record<string, LucideIcon> = { web: Globe, marketing: Megaphone, automatizacion: Workflow, ia: Bot }
const CORTO: Record<string, string> = {
  web: 'Páginas web con desarrollo, y aplicaciones web con tu propio sistema de reservas y ventas.',
  marketing: 'Para que más personas te encuentren, confíen en ti y te escriban.',
  automatizacion: 'Para ahorrar tiempo en tareas repetitivas y que tus herramientas trabajen juntas.',
  ia: 'Para entender qué puedes mejorar con IA y aplicarlo con acompañamiento.',
}
/* A dónde lleva cada tarjeta: su categoría en /servicios, o la página propia de Marketing */
const DESTINO: Record<string, string> = {
  web: '/servicios#cat-web',
  marketing: '/marketing',
  automatizacion: '/servicios#cat-automatizacion',
  ia: '/servicios#cat-ia',
}

export default function Soluciones() {
  const categorias = CONFIG.categorias.filter((c) => c.id !== 'sistemas')
  return (
    <section className="wrap sec" aria-labelledby="soluciones-titulo">
      <div data-reveal>
        <Kicker>SERVICIOS</Kicker>
        <Title style={{ marginBottom: 14 }}>
          <span id="soluciones-titulo">Elige lo que necesitas</span>
        </Title>
        <p className="lead" style={{ maxWidth: 640, marginBottom: 44 }}>
          Partimos por lo que tu negocio necesita para vender. Tres niveles de web para empezar y servicios para crecer.
        </p>
      </div>

      <div className={s.rejilla}>
        {categorias.map((c, i) => {
          const Icono = ICONOS[c.id] ?? Globe
          const nombres = c.servicios
            .map((id) => CONFIG.servicios.find((x) => x.id === id)?.nombre)
            .filter((n): n is string => Boolean(n))
          return (
            <article
              key={c.id}
              className={s.tarjeta}
              data-reveal
              style={{ '--d': `${i * 0.08}s` } as CSSProperties}
            >
              <span className={s.icono}><Icono size={22} strokeWidth={1.75} aria-hidden="true" /></span>
              <h3 className={s.nombre}>
                {/* el enlace cubre toda la tarjeta (::after); los enlaces de adentro quedan por encima */}
                <Link href={DESTINO[c.id] ?? '/servicios'} className={s.enlace}>{c.nombre}</Link>
              </h3>
              <p className={s.texto}>{CORTO[c.id] ?? c.necesidad}</p>
              <ul className={s.tags}>
                {nombres.map((n) => <li key={n}>{n}</li>)}
                {c.id === 'web' && (
                  <li className={s.tagSistema}><Link href="/servicios#cat-sistemas">HHA Systems</Link></li>
                )}
              </ul>
              <span className={s.ver} aria-hidden="true">{c.id === 'marketing' ? 'Ver marketing' : 'Ver servicios'} <ArrowRight size={16} strokeWidth={2.25} /></span>
            </article>
          )
        })}
      </div>
    </section>
  )
}
