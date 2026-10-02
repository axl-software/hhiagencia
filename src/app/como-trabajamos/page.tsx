import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import { BarChart3, CalendarCheck, ClipboardList, FileText, Hammer, MessagesSquare, RefreshCw, Rocket } from 'lucide-react'
import { Kicker, Title } from '@/components/sections/Heading'
import CtaBanda from '@/components/sections/CtaBanda'
import Orbitas from '@/components/Orbitas'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Cómo trabajamos',
  description:
    'Nuestro proceso paso a paso: diagnóstico, propuesta, construcción, entrega y acompañamiento mensual con revisión de métricas.',
  alternates: { canonical: '/como-trabajamos' },
}

/* Proceso completo. BORRADOR aprobado para publicar y ajustar con la práctica (los fundadores
   pidieron detallarlo aunque haya que corregirlo después). Sin plazos fijos: se definen en la propuesta. */
const PASOS = [
  {
    icono: MessagesSquare, titulo: 'Primer contacto',
    texto: 'Nos escribes o haces el diagnóstico en la web. Te respondemos para coordinar una reunión.',
    tu: 'Contarnos en pocas palabras qué necesitas.',
  },
  {
    icono: ClipboardList, titulo: 'Reunión de diagnóstico',
    texto: 'Entendemos tu negocio, tus clientes, cómo trabajas hoy y qué herramientas usas. Buscamos dónde se pierden ventas o tiempo.',
    tu: 'Una conversación de unos 30 a 45 minutos.',
  },
  {
    icono: FileText, titulo: 'Propuesta por escrito',
    texto: 'Te enviamos qué vamos a hacer, qué incluye, qué no, plazos de entrega y valor. Nada empieza sin que esté claro y aprobado.',
    tu: 'Revisarla y resolver tus dudas con nosotros.',
  },
  {
    icono: CalendarCheck, titulo: 'Inicio del proyecto',
    texto: 'Ordenamos lo necesario para partir: accesos, textos, fotos, logo y lo que haga falta según el servicio.',
    tu: 'Entregarnos los materiales y accesos de la lista.',
  },
  {
    icono: Hammer, titulo: 'Construcción con avances',
    texto: 'Diseñamos y desarrollamos tu web, automatización o estrategia. Te mostramos avances para ajustar a tiempo, no al final.',
    tu: 'Revisar los avances y darnos tus comentarios.',
  },
  {
    icono: Rocket, titulo: 'Pruebas, entrega y capacitación',
    texto: 'Probamos todo en celular y computador, publicamos y te enseñamos a usar lo que construimos.',
    tu: 'Aprobar la entrega.',
  },
  {
    icono: BarChart3, titulo: 'Acompañamiento mensual',
    texto: 'Mantenimiento, seguridad y ajustes. Revisamos contigo las métricas para ver qué está funcionando.',
    tu: 'Contarnos qué notas en tu día a día con clientes.',
  },
  {
    icono: RefreshCw, titulo: 'Mejora continua',
    texto: 'Con los datos en la mano decidimos qué mejorar después. Automatizamos solo lo que ya funciona.',
    tu: 'Decidir con nosotros el siguiente paso.',
  },
]

const METRICAS = [
  ['Visitas', 'Cuántas personas llegan a tu web y desde dónde.'],
  ['Contactos', 'Cuántas de esas visitas te escriben o piden una cotización.'],
  ['Conversión', 'Qué porcentaje de las visitas termina en contacto.'],
  ['Tiempo ahorrado', 'Cuántas tareas dejaron de hacerse a mano gracias a una automatización.'],
]

export default function ComoTrabajamosPage() {
  return (
    <>
      <section className="con-deco">
        <Orbitas lado="derecha" />
        <div className="wrap sec">
          <div data-reveal style={{ maxWidth: 760 }}>
            <Kicker>PROCESO</Kicker>
            <Title as="h1">Cómo trabajamos, paso a paso</Title>
            <p className="lead" style={{ marginTop: 18 }}>
              Así es trabajar con HHA, desde el primer mensaje hasta el acompañamiento mensual. Sin letra chica y con una persona del equipo
              contigo en cada etapa.
            </p>
          </div>

          <ol className="proceso">
            {PASOS.map(({ icono: Icono, titulo, texto, tu }, i) => (
              <li key={titulo} className="proceso-paso brillo" data-reveal style={{ '--d': `${(i % 4) * 0.06}s` } as CSSProperties}>
                <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="proceso-ico"><Icono size={22} strokeWidth={1.75} aria-hidden="true" /></span>
                <div className="proceso-txt">
                  <span className="mono proceso-n">PASO {String(i + 1).padStart(2, '0')}</span>
                  <h2 className="card-t" style={{ margin: 0 }}>{titulo}</h2>
                  <p className="muted" style={{ margin: 0 }}>{texto}</p>
                  <p className="proceso-tu"><strong>Lo que necesitamos de ti:</strong> {tu}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="alt">
        <div className="wrap sec">
          <div data-reveal>
            <Kicker>MÉTRICAS</Kicker>
            <Title>Qué medimos contigo</Title>
            <p className="lead" style={{ marginTop: 18, maxWidth: 680 }}>
              Cada mes revisamos números simples, explicados en simple. Así decidimos juntos qué mejorar, con datos y no con intuición.
            </p>
          </div>
          <div className="metricas">
            {METRICAS.map(([t, d], i) => (
              <div key={t} className="metrica brillo" data-reveal style={{ '--d': `${i * 0.06}s` } as CSSProperties}>
                <span className="card-t">{t}</span>
                <span className="muted">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanda cierre={CONFIG.hooks.proceso} />
    </>
  )
}
