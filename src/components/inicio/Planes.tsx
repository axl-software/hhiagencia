'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { PRECIOS, anualDe, clp } from '@/lib/precios'
import { NOTA_IMPL } from '../sections/Precios'
import s from './Secciones.module.css'

/* Planes del inicio: pestañas agendAHH | Páginas web y selector Mensual | Anual -20 %. Todo sale de src/lib/config.ts (textos y
   funciones) y src/lib/precios.ts (montos): no hay cifras escritas aquí. La mensualidad es el precio principal; la implementación
   va en letra chica. Business es el único recomendado. Pro de agendAHH sigue "en definición" (sin funciones sin confirmar). */
type Vista = 'sistemas' | 'web'

const GRUPOS: Record<Vista, { ids: string[]; para: string[] }> = {
  sistemas: { ids: ['system-agenda-solo', 'system-starter', 'system-business', 'system-pro'], para: ['Trabajas solo', 'Tienes equipo', 'Vendes y fidelizas', 'En definición'] },
  web: { ids: ['web-presentation', 'web-starter', 'web-business', 'web-pro'], para: ['Presencia simple', 'Web profesional', 'Vende y capta', 'A medida'] },
}

export default function Planes() {
  const [vista, setVista] = useState<Vista>('sistemas')
  const [anual, setAnual] = useState(false)
  const grupo = GRUPOS[vista]

  return (
    <section className="wrap sec" id="planes" aria-labelledby="planes-t">
      <div className={s.head} data-reveal>
        <p className="kicker">PLANES Y PRECIOS</p>
        <h2 id="planes-t" className="display h2">Elige el plan que le corresponde a tu negocio.</h2>
        <p className="lead">Precios en pesos chilenos, más IVA. La mensualidad es lo principal; hay una implementación inicial de pago único que se informa en cada plan.</p>
      </div>

      <div className={s.barra}>
        <div className={s.tabs} role="tablist" aria-label="Tipo de plan">
          <button type="button" role="tab" id="tab-sistemas" aria-selected={vista === 'sistemas'} aria-controls="planes-panel" onClick={() => setVista('sistemas')}>agendAHH</button>
          <button type="button" role="tab" id="tab-web" aria-selected={vista === 'web'} aria-controls="planes-panel" onClick={() => setVista('web')}>Páginas web</button>
        </div>
        <div className={s.per} role="group" aria-label="Forma de pago">
          <button type="button" aria-pressed={!anual} onClick={() => setAnual(false)}>Mensual</button>
          <button type="button" aria-pressed={anual} onClick={() => setAnual(true)}>Anual <b>-20%</b></button>
        </div>
      </div>

      <ul className={s.planes} id="planes-panel" role="tabpanel" aria-labelledby={`tab-${vista}`}>
        {grupo.ids.map((id, n) => {
          const plan = CONFIG.servicios.find((x) => x.id === id)
          const p = PRECIOS[id]
          if (!plan || !p) return null
          const a = anual && p.anual ? anualDe(p) : null
          const mensual = a ? a.mensual : p.lanzamiento ?? p.monto ?? 0
          const corto = plan.nombre.replace(/^(agendAHH|Web) /, '')
          const enDefinicion = id === 'system-pro'
          const href = vista === 'sistemas' ? (enDefinicion ? '/contacto?servicios=hha-systems' : `/prueba-gratis?plan=${id}`) : `/contacto?servicios=${id}`
          const etiqueta = vista === 'sistemas' ? (enDefinicion ? 'Consultar plan Pro' : `Probar ${corto} gratis`) : 'Pedir mi demo gratis'
          const Boton = plan.destacado ? 'btn-vivo' : 'btn-plan'
          return (
            <li key={id} data-reveal style={{ '--d': `${n * 0.08}s` } as React.CSSProperties}>
              <article className={`${s.plan} ${plan.destacado ? s.rec : ''} ${enDefinicion ? s.soon : ''}`}>
                {plan.destacado && <span className={s.etiq}>RECOMENDADO</span>}
                <div className={s.cab}>
                  <h3>{corto}</h3>
                  <span className={s.nivel} aria-hidden="true">{grupo.ids.map((_, k) => <i key={k} className={k <= n ? 'on' : undefined} />)}</span>
                </div>
                <span className={s.para}>{grupo.para[n]}</span>
                <p className={s.d}>{plan.desc}</p>
                <p className={s.precio}><b>{clp(mensual)}</b><span>/ mes + IVA</span></p>
                <p className={s.sub}>
                  {a ? 'Pagando anual · 12 meses por adelantado' : p.regular ? `Precio lanzamiento · regular ${clp(p.regular)}` : p.implementacion ? NOTA_IMPL : ''}
                </p>
                {(a || p.regular) && p.implementacion && <p className={s.sub}>{NOTA_IMPL}</p>}
                <ul className={s.lista}>{plan.beneficios?.map((b) => <li key={b}>{b}</li>)}</ul>
                <div className={s.acc}>
                  <Link className={Boton} href={href}>{etiqueta} <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" /></Link>
                  <Link className={s.mas} href={vista === 'sistemas' ? '/agendahh#planes' : '/servicios#cat-web'}>Ver todo lo incluido</Link>
                </div>
              </article>
            </li>
          )
        })}
      </ul>

      <p className={s.notaPlanes}>
        {vista === 'sistemas'
          ? `Prueba gratis de ${CONFIG.demoPlazo}. En Starter, Business y Pro, el pago anual tiene 20 % de descuento y se paga completo por adelantado. HHA cobra 0 % de comisión.`
          : `Demo gratuita: antes de cerrar el proyecto preparamos una vista previa de tu futura página en un subdominio de HHA. Queda disponible ${CONFIG.demoWeb} y, si el proyecto no continúa, se desactiva.`}
      </p>
    </section>
  )
}
