import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, X } from 'lucide-react'
import { Kicker, Title } from '@/components/sections/Heading'
import CtaBanda from '@/components/sections/CtaBanda'
import { CONFIG } from '@/lib/config'
import { PRECIOS, clp } from '@/lib/precios'
import { RUBROS } from '@/components/portada/rubros'
import s from './agendahh.module.css'

const URL_PAGINA = 'https://www.hhiagencia.cl/agendahh'
const solo = CONFIG.servicios.find((x) => x.id === 'system-agenda-solo')
const PLANES = ['system-agenda-solo', 'system-starter', 'system-business', 'system-pro']
  .map((id) => CONFIG.servicios.find((x) => x.id === id))
  .filter((x): x is NonNullable<typeof x> => Boolean(x))

const precioMes = (id: string) => PRECIOS[id].lanzamiento ?? PRECIOS[id].monto ?? 0

export const metadata: Metadata = {
  title: 'agendAHH: agenda online para negocios de servicios',
  description: `Agenda online, clientes y panel de gestión para barberías, peluquerías, estética, tatuajes, ópticas y centros wellness. Desde ${clp(PRECIOS['system-agenda-solo'].monto ?? 0)}/mes + IVA. Pruébalo gratis ${CONFIG.demoPlazo}.`,
  alternates: { canonical: '/agendahh' },
  openGraph: {
    title: 'agendAHH: agenda online para negocios de servicios | HHA Systems',
    description: 'Agenda, clientes y gestión para negocios de servicios. Un producto de HHA Systems.',
    url: URL_PAGINA,
    type: 'website',
    locale: 'es_CL',
    siteName: 'HHiAgencia',
  },
}

/* Preguntas frecuentes: respuestas basadas solo en lo aprobado (src/lib/config.ts y precios.ts). */
const PREGUNTAS = [
  {
    q: '¿Qué es agendAHH?',
    a: 'agendAHH es el primer producto de HHA Systems, la familia de soluciones digitales desarrolladas por HHA para automatizar y gestionar negocios. Es una agenda online con clientes y panel de gestión para negocios de servicios.',
  },
  {
    q: '¿Cuánto cuesta agendAHH?',
    a: `Desde ${clp(PRECIOS['system-agenda-solo'].monto ?? 0)} al mes más IVA (agendAHH Solo). Starter y Business, para negocios con equipo, tienen precio de lanzamiento desde ${clp(precioMes('system-starter'))} y ${clp(precioMes('system-business'))} al mes más IVA, con la opción de pagar anual con 20% de descuento. Además hay una implementación inicial, de pago único, desde ${clp(PRECIOS['system-agenda-solo'].implementacionMonto ?? 0)} más IVA según el plan.`,
  },
  {
    q: '¿Puedo probarlo antes de contratar?',
    a: `Sí. Pides tu prueba gratis, la preparamos con el nombre y el tipo de tu negocio y la usas durante ${CONFIG.demoPlazo}. Primero lo pruebas; si te sirve, te quedas.`,
  },
  {
    q: '¿Qué plan me corresponde?',
    a: 'Solo es para quien trabaja solo: 1 profesional. Starter es para negocios que trabajan con un equipo: hasta 10 profesionales. Business es para negocios que además quieren vender productos y fidelizar clientes: hasta 15 profesionales, tienda y sistema de fidelización.',
  },
  {
    q: '¿HHA cobra comisión por mis reservas o ventas?',
    a: 'No. HHA cobra 0% de comisión: no cobramos un porcentaje por cada reserva o venta que hagas con agendAHH. Pagas tu plan y la implementación inicial.',
  },
  {
    q: '¿Para qué tipo de negocio sirve?',
    a: 'Para negocios de servicios con reserva de hora: barberías y peluquerías, estudios de estética y de tatuajes, ópticas y clínicas dentales, y centros wellness.',
  },
  {
    q: '¿Trabajan solo en la Región de Valparaíso?',
    a: 'No. Nuestra base está en Casablanca, Región de Valparaíso, y trabajamos en todo Chile de forma remota.',
  },
]

/* Datos estructurados para Google (schema.org): producto de software con sus precios reales y las preguntas frecuentes. */
const DATOS = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'agendAHH',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Agenda online, clientes y gestión para negocios de servicios. Un producto de HHA Systems.',
    url: URL_PAGINA,
    inLanguage: 'es-CL',
    publisher: { '@type': 'Organization', name: 'HHA Digital Solutions', url: 'https://www.hhiagencia.cl' },
    offers: PLANES.map((p) => ({
      '@type': 'Offer',
      name: p.nombre,
      price: String(precioMes(p.id)),
      priceCurrency: 'CLP',
      url: URL_PAGINA,
      priceSpecification: { '@type': 'UnitPriceSpecification', price: String(precioMes(p.id)), priceCurrency: 'CLP', unitCode: 'MON', unitText: 'mes' },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PREGUNTAS.map((p) => ({ '@type': 'Question', name: p.q, acceptedAnswer: { '@type': 'Answer', text: p.a } })),
  },
]

export default function AgendahhPage() {
  return (
    <>
      {DATOS.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, '\\u003c') }} />
      ))}

      <section className="wrap sec">
        <Kicker>HHA SYSTEMS</Kicker>
        <h1 className="display h2" style={{ marginTop: 12 }}>agendAHH: agenda online para negocios de servicios</h1>
        <p className={s.lead}>
          Agenda, clientes y gestión para tu negocio. Tus clientes reservan online con tu marca y tú ves tu día, tus clientes y tus métricas desde un panel propio. HHA cobra 0% de comisión por tus reservas y ventas.
        </p>
        <div className={s.acciones}>
          <Link className="btn-vivo" href="/prueba-gratis">
            Probar agendAHH gratis <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
          </Link>
          <Link className="btn btn-out" href="#planes">Ver planes</Link>
        </div>
        <p className={s.nota}>HHA Systems es la familia de soluciones digitales desarrolladas por HHA para automatizar y gestionar negocios. agendAHH es su primer producto.</p>
      </section>

      <section className="alt">
        <div className="wrap sec">
          <Kicker>QUÉ INCLUYE</Kicker>
          <Title as="h2">agendAHH Solo: lo esencial para agendar y gestionar</Title>
          <div className={s.dos}>
            <div>
              <p className={s.precio}>
                <strong>{clp(PRECIOS['system-agenda-solo'].monto ?? 0)}</strong> <span>/ mes + IVA</span>
              </p>
              <p className={s.nota}>Implementación inicial desde {clp(PRECIOS['system-agenda-solo'].implementacionMonto ?? 0)} + IVA, según plan.</p>
              <ul className="incluye" aria-label="Incluye">
                {solo?.incluye?.map((x) => (
                  <li key={x}><Check size={18} strokeWidth={2.25} aria-hidden="true" />{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className={s.sub}>Para más, mira Starter y Business</p>
              <ul className="incluye" aria-label="No incluye">
                {solo?.noIncluye?.map((x) => (
                  <li key={x}><X size={18} strokeWidth={2.25} aria-hidden="true" style={{ color: 'var(--mut)' }} />{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <Kicker>PARA QUIÉN</Kicker>
        <Title as="h2">Para negocios de servicios con reserva de hora</Title>
        <ul className={s.rubros}>
          {RUBROS.filter((r) => r.id !== 'negocio').map((r) => {
            const Icono = r.icono
            return (
              <li key={r.id}>
                <Icono size={20} strokeWidth={1.75} aria-hidden="true" />
                <Link href={`/prueba-gratis?rubro=${r.id}`}>{r.chip}</Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="alt">
        <div className="wrap sec">
          <Kicker>PLANES</Kicker>
          <Title as="h2"><span id="planes">Elige el plan de agendAHH</span></Title>
          <p className={s.sub}>Solo, para quien trabaja solo. Starter, para negocios con equipo. Business, para gestionar tu equipo, vender productos y fidelizar clientes.</p>
          <div className={s.planes}>
            {PLANES.map((p) => {
              const precio = PRECIOS[p.id]
              return (
                <article key={p.id} className={`${s.plan}${p.destacado ? ` ${s.top}` : ''}`}>
                  {p.destacado && <span className={s.badge}>RECOMENDADO</span>}
                  <h3>{p.nombre}</h3>
                  <p className={s.sub}>{p.desc}</p>
                  <p className={s.precio}>
                    <strong>{clp(precioMes(p.id))}</strong> <span>/ mes + IVA</span>
                  </p>
                  {precio.regular && <p className={s.nota}>Precio lanzamiento. Precio regular {clp(precio.regular)}.</p>}
                  <p className={s.nota}>+ implementación inicial {clp(precio.implementacionMonto ?? 0)} + IVA (pago único)</p>
                  <ul className={s.lista}>
                    {p.beneficios?.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </article>
              )
            })}
          </div>
          <p className={s.nota}>Valores en pesos chilenos. Pago mensual o anual con 20% de descuento (Starter, Business y Pro).</p>
        </div>
      </section>

      <section className="wrap sec">
        <Kicker>PREGUNTAS FRECUENTES</Kicker>
        <Title as="h2">Lo que más nos preguntan sobre agendAHH</Title>
        <div className={s.faq}>
          {PREGUNTAS.map((p) => (
            <details key={p.q}>
              <summary>{p.q}</summary>
              <p>{p.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBanda cierre={CONFIG.hooks.servicios} logo="centro" />
    </>
  )
}
