import type { CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowRight, Bot, Globe, Megaphone, Workflow, type LucideIcon } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { PRECIOS, clp } from '@/lib/precios'
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
/* Qué ofrece cada categoría (etiquetas de la tarjeta): las líneas, no cada plan */
const ETIQUETAS: Record<string, string[]> = {
  web: ['Web Presentation', 'Web Starter', 'Web Business', 'Web Pro'],
  marketing: ['Marketing digital', 'Creación de contenido', 'Captación de clientes', 'Email marketing'],
  automatizacion: ['Automatización', 'Integraciones', 'Procesos digitales'],
  ia: ['Consultoría IA', 'Capacitación de equipos', 'Acompañamiento digital'],
}
/* Desde cuánto parte cada categoría: el valor más bajo de sus servicios (src/lib/precios.ts) */
const PARTE: Record<string, { ids: string[]; unidad: string }> = {
  web: { ids: ['web-presentation'], unidad: 'mes' },
  marketing: { ids: ['email-marketing', 'captacion-start', 'content-start', 'marketing-starter'], unidad: 'mes' },
  automatizacion: { ids: ['integraciones', 'automatizacion', 'procesos'], unidad: 'proyecto' },
  ia: { ids: ['ia', 'acompanamiento', 'capacitacion'], unidad: 'sesión' },
}
const desdeDe = (cat: string) => {
  const p = PARTE[cat]
  if (!p) return null
  const montos = p.ids.map((id) => PRECIOS[id]).filter(Boolean).map((x) => x.lanzamiento ?? x.monto ?? Infinity)
  return montos.length ? `Desde ${clp(Math.min(...montos))}/${p.unidad} + IVA` : null
}

/* A dónde lleva cada tarjeta: su categoría en /servicios, o la página propia de Marketing */
const DESTINO: Record<string, string> = {
  web: '/servicios#cat-web',
  marketing: '/marketing',
  automatizacion: '/servicios#cat-automatizacion',
  ia: '/servicios#cat-ia',
}

/* foto de cada categoría (licencias en docs/HHA_TECH_STACK.md) */
const FOTO: Record<string, string> = {
  web: '/img/ejemplos/web-business.webp',
  marketing: '/img/servicios/marketing.webp',
  automatizacion: '/img/servicios/automatizacion.webp',
  ia: '/img/servicios/ia.webp',
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
          const nombres = ETIQUETAS[c.id] ?? []
          const desde = desdeDe(c.id)
          return (
            <article
              key={c.id}
              className={s.tarjeta}
              data-reveal
              style={{ '--d': `${i * 0.08}s` } as CSSProperties}
            >
              <div className={s.foto}>
                <div className={s.recorte}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- foto decorativa; next/image rompe la vista previa en HTML */}
                  <img src={FOTO[c.id]} alt="" width={800} height={500} loading="lazy" />
                </div>
                <span className={s.icono}><Icono size={22} strokeWidth={1.75} aria-hidden="true" /></span>
              </div>
              <h3 className={s.nombre}>
                {/* el enlace cubre toda la tarjeta (::after); los enlaces de adentro quedan por encima */}
                <Link href={DESTINO[c.id] ?? '/servicios'} className={s.enlace}>{c.nombre}</Link>
              </h3>
              <p className={s.texto}>{CORTO[c.id] ?? c.necesidad}</p>
              {desde && <p className={s.desde}>{desde}</p>}
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
