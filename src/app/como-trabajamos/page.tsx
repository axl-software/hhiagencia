import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import { Kicker, Title } from '@/components/sections/Heading'
import CtaBanda from '@/components/sections/CtaBanda'
import Orbitas from '@/components/Orbitas'
import { MetricaIlustracion, PasoIlustracion } from '@/components/Ilustraciones'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Cómo trabajamos',
  description:
    'Nuestro proceso en cinco pasos: conversamos, propuesta por escrito, construcción con avances, entrega y acompañamiento mensual con revisión de métricas.',
  alternates: { canonical: '/como-trabajamos' },
}

/* Proceso completo. BORRADOR aprobado para publicar y ajustar con la práctica (los fundadores
   pidieron detallarlo aunque haya que corregirlo después). Sin plazos fijos: se definen en la propuesta.
   Cada paso y cada métrica tiene una escena animada (src/components/Ilustraciones.tsx). */
const PASOS = [
  {
    titulo: 'Conversamos',
    texto: 'Nos escribes o haces el diagnóstico, y conversamos para entender tu negocio y dónde se pierden ventas o tiempo.',
    tu: 'Contarnos qué necesitas, en una conversación corta.',
    escena: 1,
  },
  {
    titulo: 'Propuesta por escrito',
    texto: 'Te enviamos qué haremos, qué incluye, los plazos y el valor. Nada empieza sin que esté claro y aprobado.',
    tu: 'Revisarla y resolver tus dudas con nosotros.',
    escena: 2,
  },
  {
    titulo: 'Construimos contigo',
    texto: 'Reunimos lo necesario (accesos, textos, fotos, logo) y desarrollamos tu solución mostrándote avances para ajustar a tiempo.',
    tu: 'Entregar los materiales y revisar los avances.',
    escena: 4,
  },
  {
    titulo: 'Entrega y publicación',
    texto: 'Probamos todo en celular y computador, publicamos y te enseñamos a usar lo que construimos.',
    tu: 'Aprobar la entrega.',
    escena: 5,
  },
  {
    titulo: 'Acompañamiento y mejora',
    texto: 'Mantenimiento, seguridad y ajustes cada mes. Revisamos las métricas contigo y mejoramos lo que funciona.',
    tu: 'Contarnos qué notas con tus clientes y decidir el siguiente paso.',
    escena: 6,
  },
]

const METRICAS = [
  ['visitas', 'Visitas', 'Cuántas personas llegan a tu web y desde dónde.'],
  ['contactos', 'Contactos', 'Cuántas de esas visitas te escriben o piden una cotización.'],
  ['conversion', 'Conversión', 'Qué porcentaje de las visitas termina en contacto.'],
  ['tiempo', 'Tiempo ahorrado', 'Cuántas tareas dejaron de hacerse a mano gracias a una automatización.'],
]

export default function ComoTrabajamosPage() {
  return (
    <>
      <section className="con-deco">
        <Orbitas lado="derecha" />
        <div className="wrap sec">
          <div data-reveal style={{ maxWidth: 760 }}>
            <Kicker>PROCESO</Kicker>
            <Title as="h1">Cómo trabajamos, en cinco pasos</Title>
            <p className="lead" style={{ marginTop: 18 }}>
              Así es trabajar con HHA, desde el primer mensaje hasta el acompañamiento mensual. Sin letra chica y con una persona del equipo
              contigo en cada etapa.
            </p>
          </div>

          <ol className="proceso">
            {PASOS.map(({ titulo, texto, tu, escena }, i) => (
              <li key={titulo} className="proceso-paso brillo" data-reveal style={{ '--d': `${(i % 4) * 0.06}s` } as CSSProperties}>
                <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <PasoIlustracion n={escena} />
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

      {/* Métricas: una foto de gráficos de fondo (Unsplash; autor en docs/HHA_TECH_STACK.md), con un velo para que el texto se lea */}
      <section className="alt fondo-metricas">
        <div className="wrap sec">
          <div data-reveal>
            <Kicker>MÉTRICAS</Kicker>
            <Title>Qué medimos contigo</Title>
            <p className="lead" style={{ marginTop: 18, maxWidth: 680 }}>
              Cada mes revisamos números simples, explicados en simple. Así decidimos juntos qué mejorar, con datos y no con intuición.
            </p>
          </div>
          <div className="metricas">
            {METRICAS.map(([id, t, d], i) => (
              <div key={id} className="metrica brillo" data-reveal style={{ '--d': `${i * 0.06}s` } as CSSProperties}>
                <MetricaIlustracion id={id} />
                <span className="card-t">{t}</span>
                <span className="muted">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanda cierre={CONFIG.hooks.proceso} logo="arriba" />
    </>
  )
}
