'use client'

/* =========================================================
   PORTADA "ÓRBITA" (inicio) — base: plantilla Marketeam (titular con
   máquina de escribir, órbitas animadas, cinta inferior). El header es
   el compartido del sitio (components/Header.tsx).
   Estética y enfoque: HH, agencia de IA y marketing.
   ========================================================= */

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  ArrowRight, Bot, CalendarDays, Camera, Clapperboard, Megaphone,
  MousePointer2, PenTool, Radio, Sparkles, Workflow, type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import s from './HeroOrbita.module.css'

/* ---------- textos ---------- */
const KICKER = 'AGENCIA DE IA Y MARKETING'
const H_WHITE = 'Marketing, contenido y automatizaciones con IA. '
const H_RED = 'Con dirección.'
const LEAD =
  'Para negocios, artistas y creadores de Casablanca, Valparaíso y Viña del Mar. Partimos con un diagnóstico de 12 preguntas y producimos en 4 tomas.'
const CTA = 'Agenda tu reunión'
const CURSOR_NAME = 'Herberth'

const TICKER = [
  'Automatizaciones con IA',
  'Contenido para redes',
  'Producción audiovisual',
  'Dirección creativa',
  'Eventos',
  'Apoyo a creadores',
  'Propuestas para marcas',
]

/* ---------- nodos de las órbitas: servicios y herramientas ---------- */
type NodeDef = {
  icon: LucideIcon
  label?: string
  a: number // ángulo en grados
  size: number
  radius: string // '50%' redondo o '20px' cuadrado
  glow: string
  red?: boolean
  delay: number
}
const GLOW_RED = 'rgba(254, 0, 0, 0.35)'
const GLOW_SOFT = 'rgba(169, 180, 200, 0.16)'
const GLOW_BLUE = 'rgba(46, 84, 128, 0.55)'

const ORBITS: { cls: string; counter: string; r: number; red?: boolean; nodes: NodeDef[] }[] = [
  { cls: s.o1, counter: s.cR30, r: 177, nodes: [
    { icon: Sparkles, label: 'IA', a: 270, size: 64, radius: '20px', glow: GLOW_RED, red: true, delay: 0.6 },
  ] },
  { cls: s.o2, counter: s.cL40, r: 251, red: true, nodes: [
    { icon: Camera, a: 60, size: 58, radius: '50%', glow: GLOW_SOFT, delay: 0.85 },
    { icon: Workflow, label: 'Flujos', a: 180, size: 78, radius: '50%', glow: GLOW_BLUE, delay: 1.1 },
    { icon: PenTool, a: 300, size: 58, radius: '20px', glow: GLOW_SOFT, delay: 1.3 },
  ] },
  { cls: s.o3, counter: s.cL50, r: 325, nodes: [
    { icon: Bot, label: 'Agentes', a: 130, size: 88, radius: '50%', glow: GLOW_RED, delay: 1.5 },
  ] },
  { cls: s.o4, counter: s.cR60, r: 399, nodes: [
    { icon: Megaphone, a: 30, size: 58, radius: '50%', glow: GLOW_SOFT, delay: 1.7 },
    { icon: Clapperboard, label: 'Reels', a: 95, size: 88, radius: '24px', glow: GLOW_BLUE, delay: 1.9 },
    { icon: CalendarDays, label: 'Calendario', a: 220, size: 88, radius: '24px', glow: GLOW_RED, delay: 2.1 },
    { icon: Radio, a: 320, size: 58, radius: '50%', glow: GLOW_SOFT, delay: 2.3 },
  ] },
]

/* ---------- hooks ---------- */
const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useTypewriter(text: string, speed = 35, startDelay = 400) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (reduced()) {
      const t = setTimeout(() => setN(text.length), 0)
      return () => clearTimeout(t)
    }
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      i += 1
      setN(i)
      if (i < text.length) timer = setTimeout(tick, speed)
    }
    timer = setTimeout(tick, startDelay)
    return () => clearTimeout(timer)
  }, [text, speed, startDelay])
  return n
}

function useCountUp(to: number, duration = 2000, delay = 1200) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (reduced()) {
      const t = setTimeout(() => setV(to), 0)
      return () => clearTimeout(t)
    }
    let raf = 0
    const t0 = setTimeout(() => {
      const start = performance.now()
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / duration)
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, delay)
    return () => {
      clearTimeout(t0)
      cancelAnimationFrame(raf)
    }
  }, [to, duration, delay])
  return v
}

/* Timecode de cámara HH:MM:SS:FF (24 fps) escrito directo en el DOM, sin re-render */
function Timecode() {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const t0 = performance.now()
    let raf = 0
    const p = (n: number) => String(n).padStart(2, '0')
    const loop = (now: number) => {
      const ms = now - t0
      const f = Math.floor((ms % 1000) / (1000 / 24))
      const sec = Math.floor(ms / 1000)
      if (ref.current) ref.current.textContent = `${p(Math.floor(sec / 3600))}:${p(Math.floor(sec / 60) % 60)}:${p(sec % 60)}:${p(f)}`
      raf = requestAnimationFrame(loop)
    }
    if (!reduced()) raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <span ref={ref}>00:00:00:00</span>
}

/* ---------- componente ---------- */
export default function HeroOrbita() {
  const full = H_WHITE + H_RED
  const n = useTypewriter(full)
  const typing = n < full.length
  const count = useCountUp(6)

  const white = full.slice(0, Math.min(n, H_WHITE.length))
  const red = n > H_WHITE.length ? full.slice(H_WHITE.length, n) : ''

  return (
    <section className={s.hero} aria-label="Portada">
      <span className={`${s.corner} ${s.tl}`} aria-hidden="true" />
      <span className={`${s.corner} ${s.tr}`} aria-hidden="true" />
      <span className={`${s.corner} ${s.bl}`} aria-hidden="true" />
      <span className={`${s.corner} ${s.br}`} aria-hidden="true" />

      {/* CUERPO */}
      <div className={s.main}>
        <div className={s.heroLeft}>
          <div className={s.kicker}>
            <span className={s.rec}>
              <span className={s.recDot} aria-hidden="true" />
              <span style={{ color: 'var(--rojo)' }}>REC</span>
              <Timecode />
              <span aria-hidden="true">·</span>
              <span>{KICKER}</span>
            </span>
          </div>

          <h1 className={s.h1} aria-label={full}>
            <span aria-hidden="true">
              <span className={s.h1White}>{white}</span>
              <span className={s.h1Red}>{red}</span>
              {typing && <span className={s.caret} />}
            </span>
          </h1>

          <p className={s.lead}>{LEAD}</p>

          <span className={`btn-giro-wrap ${s.cta}`}>
            <Link className="btn-giro btn-giro-lg" href="/contacto">
              <span>{CTA}</span>
              <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </span>

          <div className={s.cursor} aria-hidden="true">
            <MousePointer2 size={26} fill="#FE0000" color="#FE0000" strokeWidth={1.5} />
            <span className={s.cursorTag}>{CURSOR_NAME}</span>
          </div>
        </div>

        <div className={s.heroRight} aria-hidden="true">
          <div className={s.stage}>
            {ORBITS.map((o, oi) => (
              <div key={oi} className={`${s.orbit} ${o.cls} ${o.red ? s.orbitRed : ''}`}>
                {oi === 0 && (
                  <div className={s.center}>
                    <div className={s.count}>
                      <span className={s.countDot} />
                      <span>{String(count).padStart(2, '0')}</span>
                    </div>
                    <div className={s.countLabel}>Servicios<br />creativos</div>
                  </div>
                )}
                {o.nodes.map((nd) => {
                  const Icon = nd.icon
                  const pos = { '--a': `${nd.a}deg`, '--r': `${o.r}px` } as CSSProperties
                  const tile = {
                    '--s': `${nd.size}px`, '--br': nd.radius, '--glow': nd.glow, '--d': `${nd.delay}s`,
                  } as CSSProperties
                  return (
                    <div key={nd.a} className={s.node} style={pos}>
                      <div className={o.counter}>
                        <div className={`${s.tile} ${nd.red ? s.tileRed : ''}`} style={tile}>
                          <Icon size={Math.round(nd.size * 0.36)} strokeWidth={1.75} />
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

      {/* CINTA INFERIOR */}
      <div className={s.ticker} aria-label="Servicios">
        <div className={s.track}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className={s.tickItem} aria-hidden={i >= TICKER.length}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
