/* =========================================================
   PORTADA (inicio) — hook y posicionamiento aprobados en
   docs/HHA_BRAND_FOUNDATION.md. Texto y botones visibles desde el
   primer momento; la única animación es el giro lento de las órbitas,
   que se detiene con "reducir movimiento".
   ========================================================= */

import type { CSSProperties } from 'react'
import {
  Globe, LayoutTemplate, Mail, Megaphone, ShoppingCart,
  TrendingUp, Users, Workflow, type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import GuiaPlan from './GuiaPlan'
import HeroFondo from './HeroFondo'
import s from './HeroOrbita.module.css'

/* ---------- textos ---------- */
/* El titular grande usa lo que la gente busca en Google; el hook de marca va arriba, en chico, como
   carrusel ovalado y con AUTOMATIZA destacada en rojo. Debajo, un solo texto que une el posicionamiento y el alcance
   (docs/HHA_BRAND_FOUNDATION.md). */
const KICKER = ['DIGITALIZA', 'AUTOMATIZA', 'ESCALA']
const KICKER_ROJO = 'AUTOMATIZA'
const GIRO_SEG = 7.5 // una vuelta completa del carrusel (HeroOrbita.module.css → .giroPalabra)
const HOOK = ['Desarrollo web.', 'Automatizaciones.', 'Llega a más clientes.']
const LEAD =
  'Creamos sistemas digitales que ayudan a marcas, creadores y empresas de todo Chile a vender y operar mejor, con estrategia, contenido y tecnología.'

/* Lo que hacemos, en la franja inferior (docs/HHA_SERVICES.md) */
const FRANJA = [
  'Landing pages',
  'Sitios corporativos',
  'Tienda online básica',
  'Automatización de procesos',
  'Email marketing',
  'Marketing digital',
  'Consultoría en IA',
]

/* ---------- nodos de las órbitas: solo servicios reales ---------- */
type NodeDef = { icon: LucideIcon; label?: string; a: number; size: number; radius: string; red?: boolean }

const ORBITS: { cls: string; counter: string; r: number; red?: boolean; nodes: NodeDef[] }[] = [
  { cls: s.o1, counter: s.cR1, r: 177, nodes: [
    { icon: Globe, label: 'Web', a: 270, size: 72, radius: '20px', red: true },
  ] },
  { cls: s.o2, counter: s.cL2, r: 251, red: true, nodes: [
    { icon: LayoutTemplate, a: 60, size: 56, radius: '50%' },
    { icon: Workflow, label: 'Automatización', a: 180, size: 84, radius: '50%' },
    { icon: Mail, a: 300, size: 56, radius: '20px' },
  ] },
  { cls: s.o3, counter: s.cL3, r: 325, nodes: [
    { icon: Megaphone, label: 'Marketing', a: 130, size: 84, radius: '50%' },
  ] },
  { cls: s.o4, counter: s.cR4, r: 399, nodes: [
    { icon: ShoppingCart, a: 30, size: 56, radius: '50%' },
    { icon: TrendingUp, label: 'Leads', a: 95, size: 76, radius: '24px' },
    { icon: Users, label: 'CRM', a: 220, size: 76, radius: '24px' },
  ] },
]

/* ---------- componente ---------- */
export default function HeroOrbita() {
  return (
    <section className={s.hero} aria-label="Portada">
      <div className={s.main}>
        <div className={s.heroLeft}>
          {/* Carrusel ovalado: cada palabra arranca en otro punto de la órbita (un tercio de vuelta) */}
          <div className={s.kicker}>
            <span className="sr-only">Digitaliza, automatiza, escala</span>
            <div className={s.giro} aria-hidden="true">
              <div className={s.giroPista}>
                {KICKER.map((w, i) => (
                  <span
                    key={w}
                    className={`${s.giroPalabra}${w === KICKER_ROJO ? ` ${s.kickerRojo}` : ''}`}
                    style={{ animationDelay: `${-(((KICKER.length - i) % KICKER.length) * GIRO_SEG) / KICKER.length}s` }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h1 className={s.h1}>
            {HOOK.map((w, i) => (
              <span key={w} className={i === HOOK.length - 1 ? s.h1Red : undefined}>{w}</span>
            ))}
          </h1>

          <p className={s.lead}>{LEAD}</p>

          <div className={s.ctas}>
            {/* Botón principal: abre las 3 preguntas del diagnóstico; rojo vivo y con salto al pasar el mouse */}
            <GuiaPlan etiqueta="Te orientamos en 3 preguntas" className="btn-vivo" giro={false} />
            <Link className="btn btn-out" href="/servicios">Ver servicios</Link>
          </div>
        </div>

        <div className={s.heroRight} aria-hidden="true">
          {/* video del notebook (o su imagen fija) debajo de las órbitas */}
          <HeroFondo />
          <div className={s.stage}>
            {ORBITS.map((o, oi) => (
              <div key={oi} className={`${s.orbit} ${o.cls} ${o.red ? s.orbitRed : ''}`}>
                {oi === 0 && (
                  <div className={s.center}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML */}
                    <img className={`${s.centerLogo} solo-oscuro`} src="/brand/hh-logo-blanco.png" alt="" width={480} height={299} />
                    {/* eslint-disable-next-line @next/next/no-img-element -- versión azul para el modo claro */}
                    <img className={`${s.centerLogo} solo-claro`} src="/brand/hh-logo-azul.png" alt="" width={480} height={299} />
                  </div>
                )}
                {o.nodes.map((nd) => {
                  const Icon = nd.icon
                  const pos = { '--a': `${nd.a}deg`, '--r': `${o.r}px` } as CSSProperties
                  const tile = { '--s': `${nd.size}px`, '--br': nd.radius } as CSSProperties
                  return (
                    <div key={nd.a} className={s.node} style={pos}>
                      <div className={o.counter}>
                        <div className={`${s.tile} ${nd.red ? s.tileRed : ''}`} style={tile}>
                          <Icon size={Math.round(nd.size * 0.34)} strokeWidth={1.75} />
                          {nd.label && <span className={s.tileLabel}>{nd.label}</span>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FRANJA INFERIOR: estática, sin movimiento */}
      <ul className={s.strip} aria-label="Lo que hacemos">
        {FRANJA.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </section>
  )
}
