'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { PRECIOS, clp } from '@/lib/precios'
import { Animado } from '@/components/ui/precio-animado'
import s from './HeroPortatil.module.css'

/* =========================================================
   HERO DE SERVICIOS: un portátil en 3D que se abre al hacer scroll y muestra en su pantalla cada servicio de HHA
   (agendAHH, páginas web, cartAHH, marketing y automatización con IA). La cámara da una espiral alrededor del portátil y se
   acerca a la pantalla en cada paso; al lado, una tarjeta con el paso (número, título, texto, precio, avance y enlace).
   Adaptado de la secuencia "MacBook Neo" (21st.dev), sin fotogramas: el portátil es un modelo hecho con formas (portatil.ts).
   Mejora progresiva: sin WebGL, sin JavaScript o con "reducir movimiento" se ve una lista con los mismos cinco servicios.
   Precios: salen de src/lib/precios.ts (agendAHH Solo y Web Presentation + IVA; cartAHH con IVA incluido).
   ========================================================= */
const PASOS = [
  { color: '#D7263D', icono: '▦', etiqueta: 'agendAHH', titulo: 'Tus clientes reservan solos.', texto: 'Agenda online con tu marca, tus clientes y tus métricas en un panel propio. Prueba gratis 7 días.', precio: `Desde ${clp(PRECIOS['system-agenda-solo'].monto ?? 0)}/mes + IVA`, href: '/agendahh', link: 'Ver agendAHH' },
  { color: '#2b5bd7', icono: '◫', etiqueta: 'Páginas web', titulo: 'Una web que presenta tu negocio.', texto: 'Presentation, Starter, Business y Pro, con dominio y mantenimiento según el plan.', precio: `Desde ${clp(PRECIOS['web-presentation'].lanzamiento ?? 0)}/mes + IVA`, href: '#cat-web', link: 'Ver planes web' },
  { color: '#1f95e8', icono: '❖', etiqueta: 'cartAHH', titulo: 'Tu carta, vista como merece.', texto: 'Carta digital con QR: fotografías, precios y categorías. Con carrito y pedidos por WhatsApp si lo necesitas.', precio: `Desde ${clp(PRECIOS['cart-visual'].monto ?? 0)}/mes, IVA incluido`, href: '/cartahh', link: 'Conocer cartAHH' },
  { color: '#8f5bff', icono: '↗', etiqueta: 'Marketing', titulo: 'Más gente que te conoce.', texto: 'Contenido, captación y redes sociales para que tu negocio llegue a más clientes.', precio: 'Cotización según tu caso', href: '/marketing', link: 'Ver marketing' },
  { color: '#e8742a', icono: '⌁', etiqueta: 'Automatización e IA', titulo: 'Menos trabajo repetido.', texto: 'Integraciones y flujos que avisan, ordenan y conectan tus herramientas.', precio: 'Cotización según tu caso', href: '#cat-automatizacion', link: 'Ver automatización' },
]
const N = PASOS.length
const T0 = 0.2
const TRAMO = (1 - T0) / N
const pad = (n: number) => String(n).padStart(2, '0')
const clamp = (x: number) => Math.max(0, Math.min(1, x))

type Inst = { pintar: (p: number) => void; ajustar: () => void; destroy: () => void }

export default function HeroPortatil() {
  const raiz = useRef<HTMLElement>(null)
  const escena = useRef<HTMLDivElement>(null)
  const lienzo = useRef<HTMLCanvasElement>(null)
  const barra = useRef<HTMLSpanElement>(null)
  const [activo, setActivo] = useState(false) // el 3D funciona: se usa la secuencia con scroll
  const [idx, setIdx] = useState(-1)
  const [local, setLocal] = useState(0)
  const [subOculto, setSubOculto] = useState(false)
  const [titOculto, setTitOculto] = useState(false)

  useEffect(() => {
    const el = raiz.current
    const marco = escena.current
    const canvas = lienzo.current
    if (!el || !marco || !canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let vivo = true
    let inst: Inst | null = null
    let raf = 0
    let objetivo = 0
    let actual = 0
    const alRaf = () => {
      raf = 0
      actual += (objetivo - actual) * 0.12
      if (Math.abs(objetivo - actual) < 0.0004) actual = objetivo
      pintar(actual)
      if (actual !== objetivo) raf = requestAnimationFrame(alRaf)
    }
    const pintar = (p: number) => {
      inst?.pintar(p)
      if (barra.current) barra.current.style.width = `${p * 100}%`
      let i = -1
      let l = 0
      if (p >= T0) { i = Math.min(N - 1, Math.floor((p - T0) / TRAMO)); l = clamp((p - T0 - i * TRAMO) / TRAMO) }
      setIdx((a) => (a === i ? a : i))
      setLocal(Math.round(l * 100) / 100)
      setTitOculto(p > 0.07)
    }
    const alScroll = () => {
      const r = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      objetivo = clamp(-r.top / Math.max(1, total))
      setSubOculto(window.scrollY > 8)
      if (!raf) raf = requestAnimationFrame(alRaf)
    }
    const alRedimensionar = () => { inst?.ajustar(); alScroll() }

    import('./portatil')
      .then((m) => {
        if (!vivo) return
        const i = m.crearPortatil(canvas, marco)
        if (!i) return
        inst = i
        setActivo(true)
        window.addEventListener('scroll', alScroll, { passive: true })
        window.addEventListener('resize', alRedimensionar)
        requestAnimationFrame(() => { inst?.ajustar(); alScroll(); pintar(objetivo) })
      })
      .catch(() => {})
    return () => {
      vivo = false
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', alScroll)
      window.removeEventListener('resize', alRedimensionar)
      inst?.destroy()
    }
  }, [])

  return (
    <section ref={raiz} className={`${s.hero} ${activo ? s.activo : ''}`} aria-labelledby="serv-hero-t">
      <div ref={escena} className={s.stage}>
        <canvas ref={lienzo} className={s.lienzo} aria-hidden="true" />
        <div className={s.copy}>
          <h1 id="serv-hero-t" className={s.titulo} style={{ opacity: activo && titOculto ? 0 : 1 }}>Servicios <span className={s.arco}>HHA</span></h1>
          <p className={s.sub} style={{ opacity: subOculto ? 0 : 1 }} aria-hidden={subOculto}>Desliza para explorar</p>
        </div>

        {/* con el 3D activo: una tarjeta por paso, al lado del portátil */}
        <div className={s.cards}>
          {PASOS.map((p, i) => (
            <article key={p.etiqueta} className={`${s.card} ${i === idx ? s.on : ''} ${idx >= 0 && i < idx ? s.antes : ''}`} style={{ '--c': p.color } as CSSProperties} aria-hidden={i !== idx}>
              <div className={s.dentro}>
                <span className={s.glow} aria-hidden="true" />
                <div className={s.cab}><span><strong>{pad(i + 1)}</strong> / {pad(N)}</span><span className={s.ico} aria-hidden="true">{p.icono}</span></div>
                <h2 className={s.h2}>{p.titulo}</h2>
                <p className={s.texto}>{p.texto}</p>
                <div className={s.precio}><Animado t={p.precio} /></div>
                <div className={s.ticks} aria-hidden="true">
                  {PASOS.map((_, j) => <i key={j}><span style={{ transform: `scaleX(${j < idx ? 1 : j === idx ? local : 0})` }} /></i>)}
                </div>
                <div className={s.pie}><span className={s.etiqueta}>{p.etiqueta}</span><Link href={p.href} tabIndex={i === idx ? 0 : -1}>{p.link}</Link></div>
              </div>
            </article>
          ))}
        </div>
        <div className={s.progreso} aria-hidden="true"><span ref={barra} /></div>
      </div>

      {/* sin 3D (sin WebGL, sin JavaScript o "reducir movimiento"): los mismos servicios en una lista */}
      <ul className={s.lista}>
        {PASOS.map((p) => (
          <li key={p.etiqueta} style={{ '--c': p.color } as CSSProperties}>
            <span className={s.etiqueta}>{p.etiqueta}</span>
            <b>{p.titulo}</b>
            <span>{p.texto}</span>
            <em><Animado t={p.precio} /></em>
            <Link href={p.href}>{p.link}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
