'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { clp, PRECIOS } from '@/lib/precios'
import s from './HeroNeon.module.css'
import { Animado } from '@/components/ui/precio-animado'

/* =========================================================
   HERO del inicio: "HHA" en neón 3D al centro (neon.ts). Al cargar queda LIMPIO: solo las letras. Al hacer scroll hacia abajo
   el anillo se achica y sube, y aparece la información importante: titular, frase y los dos llamados principales
   (Probar agendAHH gratis y Tu página web). El neón no gasta recursos mientras la bienvenida está abierta.
   Por defecto el hero es estático y muestra todo; el efecto de scroll (clase .activo) solo se activa cuando el neón ya
   funciona. Sin WebGL2, sin JavaScript o con "reducir movimiento" todo se ve de entrada.
   ========================================================= */

const FUENTE = 'Impact, Haettenschweiler, "Arial Narrow Bold", "Helvetica Neue Condensed Black", "Roboto Condensed", sans-serif'
const SOLO = clp(PRECIOS['system-agenda-solo'].monto ?? 0)

type Neon = { destroy: () => void; kick: () => void; setView: (zoom: number, dy: number) => void }

export default function HeroNeon() {
  const sec = useRef<HTMLElement>(null)
  const lienzo = useRef<HTMLCanvasElement>(null)
  const pin = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sec.current
    const canvas = lienzo.current
    const marco = pin.current
    if (!el || !canvas || !marco) return
    const html = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let vivo = true
    let inst: Neon | null = null
    let abierta = html.classList.contains('intro-on') // la bienvenida todavía está abierta
    let raf = 0

    const progreso = () => {
      raf = 0
      if (!inst || reduce) return
      const cab = document.querySelector('header')?.getBoundingClientRect().height ?? 80
      el.style.setProperty('--cab', `${cab}px`)
      const r = el.getBoundingClientRect()
      const total = r.height - marco.getBoundingClientRect().height
      const p = total > 0 ? Math.min(1, Math.max(0, (cab - r.top) / total)) : 0
      el.style.setProperty('--p', p.toFixed(3))
      /* empieza grande y centrado; al bajar se achica y sube para dejar sitio a la información (en celular, más alto y más grande) */
      const movil = window.innerWidth < 700
      inst?.setView((movil ? 1.7 : 1.32) - (movil ? 0.75 : 0.42) * p, (movil ? 0.55 : 0.24) * p)
    }
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(progreso)
    }

    const alCerrarBienvenida = () => {
      abierta = false
      inst?.kick()
    }
    document.addEventListener('hha-intro-fin', alCerrarBienvenida)

    import('./neon')
      .then(async (m) => {
        try {
          await document.fonts?.load(`900 128px ${FUENTE}`)
        } catch {}
        if (!vivo) return
        const n = m.crearNeonLoop(el, canvas, {
          text: 'HHA · ',
          font: FUENTE,
          fontWeight: 900,
          colors: ['#9fe0ff', '#5b8cff', '#8f7bff', '#ff5a6d', '#ffb0a8'],
          background: '#0b1020',
          halo: '#d7263d',
          glow: 1,
          speed: 1,
          depth: 0.2,
          slot: 0.8, // más ángulo por letra: menos letras por anillo, bien separadas
          fill: 0.5, // cada letra ocupa solo la mitad de su espacio: queda aire entre ellas
          interactive: true,
          gate: () => !abierta,
        }) as Neon | null
        if (!n) return // sin WebGL2: se queda el modo estático (letras de respaldo y todo visible)
        inst = n
        if (!reduce) el.classList.add(s.activo) // el efecto de scroll solo se activa con el neón funcionando
        pedir()
      })
      .catch(() => {})

    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir)
    pedir()
    return () => {
      vivo = false
      if (raf) cancelAnimationFrame(raf)
      document.removeEventListener('hha-intro-fin', alCerrarBienvenida)
      window.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
      inst?.destroy()
      inst = null
    }
  }, [])

  return (
    <section ref={sec} className={s.hero} aria-label="Inicio">
      <div ref={pin} className={s.pin}>
        <canvas ref={lienzo} className={s.canvas} aria-hidden="true" />
        <div className={s.respaldo} aria-hidden="true">HHA</div>
        <div className={s.velo} aria-hidden="true" />
        <p className={s.lema}>Digitaliza <span aria-hidden="true">·</span> Automatiza <span aria-hidden="true">·</span> Escala</p>
        <div className={s.info}>
          <h1 id="inicio-titulo" className={s.h1}>Tu negocio, digital <span>y en automático.</span></h1>
          <p className={s.lead}>Web, agenda de reservas y marketing para negocios de todo Chile.</p>
          <div className={s.acciones}>
            <Link className="btn-vivo" href="/prueba-gratis">
              Probar agendAHH gratis <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </Link>
            <Link className={s.web} href="/servicios#cat-web">Tu página web</Link>
          </div>
          <ul className={s.notas}>
            <li><b>0 %</b> de comisión por tus reservas y ventas</li>
            <li>Prueba de <b>7 días</b> sin pagar</li>
            <li>Desde <b><Animado t={SOLO} /></b>/mes + IVA</li>
          </ul>
        </div>
        <p className={s.pista} aria-hidden="true">Desliza <span>↓</span></p>
      </div>
    </section>
  )
}
