import type { CSSProperties } from 'react'
import { Kicker, Title, type Level } from './Heading'
import Orbitas from '../Orbitas'
import s from './Nosotros.module.css'

/* Nosotros: texto a la izquierda y, a la derecha, un esquema pequeño de las dos mitades del equipo (negocio y
   tecnología) que se juntan en HHA. Las listas salen del texto aprobado de los fundadores
   (docs/HHA_MASTER_CONTEXT.md → Website team copy). Es decorativo: el texto ya dice lo mismo. */
export default function Nosotros({ as = 'h2' }: { as?: Level }) {
  return (
    <section className="alt con-deco">
      <Orbitas lado="izquierda" />
      <div className={`wrap sec ${s.caja}`}>
        <div className={s.texto} data-reveal>
          <Kicker style={{ margin: 0 }}>NOSOTROS</Kicker>
          <Title as={as}>Negocio y tecnología en el mismo equipo</Title>
          <p className="lead">
            HHA Digital Solutions nace de dos perfiles que se complementan: estrategia, marketing y ventas por un lado; desarrollo, automatización y ciberseguridad por el otro. Por eso cada proyecto parte por el negocio y termina en algo que funciona y se puede mantener.
          </p>
          <p className="lead">
            Trabajamos con pymes, empresas de servicios o productos, negocios locales, marcas y creadores, desde la Región de Valparaíso para todo Chile.
          </p>
          <div className="chips">
            {['Estrategia', 'Marketing', 'Desarrollo web', 'Automatización', 'IA aplicada'].map((t) => (
              <span key={t} className="chip" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'default' }}>{t}</span>
            ))}
          </div>
        </div>

        <div className={s.esquema} aria-hidden="true" data-reveal style={{ '--d': '0.15s' } as CSSProperties}>
          <div className={`${s.mitad} ${s.negocio}`}>
            <b>Negocio</b>
            <span>Estrategia</span>
            <span>Marketing</span>
            <span>Ventas</span>
          </div>
          <div className={`${s.mitad} ${s.tecno}`}>
            <b>Tecnología</b>
            <span>Desarrollo</span>
            <span>Automatización</span>
            <span>Ciberseguridad</span>
          </div>
          <div className={s.centro}>
            {/* eslint-disable-next-line @next/next/no-img-element -- logo chico; next/image rompe la vista previa en HTML */}
            <img src="/brand/hh-logo-blanco.png" alt="" width={480} height={299} />
          </div>
        </div>
      </div>
    </section>
  )
}
