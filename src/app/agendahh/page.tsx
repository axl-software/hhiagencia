import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Eye, Leaf, PenTool, Scissors, Sparkles } from 'lucide-react'
import CtaBanda from '@/components/sections/CtaBanda'
import { CONFIG } from '@/lib/config'
import { PRECIOS, clp } from '@/lib/precios'
import s from './agendahh.module.css'
import { Pesos } from '@/components/ui/precio-animado'

const URL_PAGINA = 'https://www.hhiagencia.cl/agendahh'
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
    a: 'No. Nuestra oficina está en Viña del Mar, Región de Valparaíso, y trabajamos en todo Chile de forma remota.',
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

const RUBROS_PAGINA = [
  { id: 'barberia', nombre: 'Barbería y peluquería', Icono: Scissors },
  { id: 'estetica', nombre: 'Estética', Icono: Sparkles },
  { id: 'tatuajes', nombre: 'Estudios de tatuajes', Icono: PenTool },
  { id: 'optica', nombre: 'Óptica y dentista', Icono: Eye },
  { id: 'wellness', nombre: 'Wellness', Icono: Leaf },
]

/* Para quién es cada plan (la lógica comercial: Solo trabaja solo, Starter tiene equipo, Business vende y fideliza) */
const ETIQUETA_PLAN: Record<string, string> = {
  'system-agenda-solo': '01 / TRABAJAS SOLO',
  'system-starter': '02 / TIENES EQUIPO',
  'system-business': '03 / VENDES Y FIDELIZAS',
  'system-pro': '04 / EN DEFINICIÓN',
}

export default function AgendahhPage() {
  return (
    <>
      {DATOS.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, '\\u003c') }} />
      ))}

      <section className={s.hero} aria-labelledby="agendahh-titulo">
        <div className={`wrap ${s.heroGrid}`}>
          <div>
            <p className="kicker" style={{ margin: 0 }}>HHA SYSTEMS · AGENDAHH</p>
            <h1 id="agendahh-titulo">Tus reservas en orden. <em>Tu marca al frente.</em></h1>
            <p className={s.lead}>
              agendAHH es una agenda online con la identidad de tu negocio y un panel para organizar citas, clientes y métricas. Pensada para servicios que se atienden con hora. HHA cobra 0% de comisión por tus reservas y ventas.
            </p>
            <div className={s.acciones}>
              <Link className="btn-vivo" href="/prueba-gratis">
                Probar agendAHH gratis <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
              </Link>
              <Link className="btn btn-out" href="#planes">Ver planes</Link>
            </div>
            <p className={s.prueba}><span className={s.chispa} aria-hidden="true" />Pruébalo gratis {CONFIG.demoPlazo}. Desde <Pesos valor={PRECIOS['system-agenda-solo'].monto ?? 0} />/mes + IVA.</p>
          </div>

          <div className={s.escena} role="group" aria-label="Vistas de ejemplo de dos barberías con agendAHH">
            <div className={`${s.cel} ${s.celUno}`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- imagen de ejemplo; next/image rompe la vista previa en HTML */}
              <img src="/img/agendahh/turno-uno.webp" alt="Ejemplo de reservas para la barbería ficticia Turno Uno" width={390} height={760} loading="eager" />
            </div>
            <div className={`${s.cel} ${s.celDos}`} role="img" aria-label="Vista ilustrativa de Tamburrini Barber Studio con una fotografía real del local">
              <div className={s.tbHead}><span className={s.tbLogo}>TAMBURRINI<small>BARBER STUDIO</small></span><span className={s.tbMenu} aria-hidden="true">☰</span></div>
              <div className={s.tbFoto}>
                {/* eslint-disable-next-line @next/next/no-img-element -- imagen de ejemplo; next/image rompe la vista previa en HTML */}
                <img src="/img/agendahh/tamburrini-local.webp" alt="" width={1254} height={1254} loading="eager" />
              </div>
              <div className={s.tbTexto}><span className={s.tbKicker}>TAMBURRINI · BARBER STUDIO</span><strong>Tu próxima hora<br />empieza aquí.</strong><p>Barbería profesional en un ambiente único.</p><span className={s.tbBoton}>RESERVAR TU HORA&nbsp;→</span></div>
            </div>
            <p className={s.etiqueta}>Turno Uno / Tamburrini<br />Dos identidades, un sistema de reservas</p>
          </div>
        </div>
      </section>

      <div className={s.barra}>
        <div className={`wrap ${s.barraGrid}`}>
          <div><strong>Reserva desde tu página</strong><span>El cliente elige el servicio y una hora disponible.</span></div>
          <div><strong>Organiza el día</strong><span>Consulta reservas, agenda y clientes desde tu panel.</span></div>
          <div><strong>Se ve como tu marca</strong><span>La experiencia cambia según cada negocio.</span></div>
        </div>
      </div>

      <section className="wrap sec" aria-labelledby="beneficios-titulo">
        <div className={s.cabeza}>
          <p className="kicker">QUÉ RESUELVE</p>
          <h2 id="beneficios-titulo">Menos vueltas para reservar. Más claridad para atender.</h2>
          <p>Una reserva sencilla para tus clientes y un lugar de trabajo ordenado para ti y tu equipo.</p>
        </div>
        <div className={s.beneficios}>
          <article className={s.beneficio}><span className={s.numero}>01 / CLIENTES</span><h3>Una reserva clara desde el celular.</h3><p>Tus clientes eligen servicio, profesional, fecha y horario disponible desde una página con la cara de tu negocio.</p></article>
          <article className={s.beneficio}><span className={s.numero}>02 / OPERACIÓN</span><h3>La agenda en un solo lugar.</h3><p>El panel reúne tus próximas citas, tus clientes y tus métricas para que tengas el día de trabajo a mano.</p></article>
          <article className={s.beneficio}><span className={s.numero}>03 / IDENTIDAD</span><h3>Tu negocio sigue siendo protagonista.</h3><p>Tus fotos, tus colores y tu estilo: dos negocios pueden usar agendAHH y verse completamente distintos.</p></article>
        </div>
      </section>

      <section className="alt" aria-labelledby="funciona-titulo">
        <div className={`wrap sec ${s.flujo}`}>
          <div className={s.cabeza}>
            <p className="kicker">CÓMO FUNCIONA</p>
            <h2 id="funciona-titulo">Del servicio a la reserva, en tres pasos.</h2>
            <p>El recorrido es directo y se adapta a los servicios y profesionales de cada negocio.</p>
          </div>
          <ol className={s.pasos}>
            <li><span>01</span><div><strong>Elige qué necesita</strong><p>Selecciona un servicio y, si corresponde, al profesional que la atenderá.</p></div></li>
            <li><span>02</span><div><strong>Escoge una hora disponible</strong><p>Ve las fechas y horarios libres antes de completar sus datos.</p></div></li>
            <li><span>03</span><div><strong>Confirma su reserva</strong><p>La reserva queda registrada y el negocio la ve en su panel.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="wrap sec" aria-labelledby="rubros-titulo">
        <div className={s.cabeza}>
          <p className="kicker">PARA QUIÉN</p>
          <h2 id="rubros-titulo">Para negocios que atienden con cita.</h2>
          <p>Elige tu rubro y pruébalo con el nombre y el estilo de tu negocio.</p>
        </div>
        <ul className={s.rubros}>
          {RUBROS_PAGINA.map(({ id, nombre, Icono }) => (
            <li key={id}>
              <Link href={`/prueba-gratis?rubro=${id}`}>
                <Icono size={22} strokeWidth={1.75} aria-hidden="true" />
                <strong>{nombre}</strong>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="alt" id="planes" aria-labelledby="planes-titulo">
        <div className="wrap sec">
          <div className={s.cabeza}>
            <p className="kicker">PLANES AGENDAHH</p>
            <h2 id="planes-titulo">Elige el plan que le corresponde a tu negocio.</h2>
            <p>Solo es para quien trabaja solo. Starter, para negocios con equipo. Business, para gestionar tu equipo, vender productos y fidelizar clientes. Cada plan suma funciones sobre el anterior.</p>
          </div>
          <div className={s.planes}>
            {PLANES.map((p) => {
              const precio = PRECIOS[p.id]
              const corto = p.nombre.replace('agendAHH ', '')
              return (
                <article key={p.id} className={`${s.plan}${p.destacado ? ` ${s.top}` : ''}`}>
                  {p.destacado && <span className={s.insignia}>RECOMENDADO</span>}
                  <span className={s.planKicker}>{ETIQUETA_PLAN[p.id]}</span>
                  <h3>{corto}</h3>
                  <p className={s.planIntro}>{p.desc}</p>
                  <p className={s.precio}>
                    <strong><Pesos valor={precioMes(p.id)} /></strong> <span>/ mes + IVA</span>
                  </p>
                  {precio.regular && <p className={s.planNota}>Precio lanzamiento. Precio regular <Pesos valor={precio.regular} />.</p>}
                  <p className={s.planNota}>+ implementación inicial <Pesos valor={precio.implementacionMonto ?? 0} /> + IVA (pago único)</p>
                  <span className={s.incluye}>Funciones incluidas</span>
                  <ul className={s.lista}>
                    {p.beneficios?.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <Link className={s.planBtn} href={`/prueba-gratis?plan=${p.id}`}>
                    Probar {corto} gratis <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
                  </Link>
                </article>
              )
            })}
          </div>
          <p className={s.planesNota}>Valores en pesos chilenos. Pago mensual o anual con 20% de descuento (Starter, Business y Pro). HHA cobra 0% de comisión.</p>
        </div>
      </section>

      <section className="wrap sec" aria-labelledby="faq-titulo">
        <div className={s.cabeza}>
          <p className="kicker">PREGUNTAS FRECUENTES</p>
          <h2 id="faq-titulo">Lo que más nos preguntan sobre agendAHH</h2>
        </div>
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
