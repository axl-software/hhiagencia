'use client'

import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUp } from 'lucide-react'
import { CONFIG, telHref, telVisible } from '@/lib/config'
import { LEGAL, NAV } from '@/lib/nav'
import Redes from './Redes'
import s from './Footer.module.css'

/* =========================================================
   PIE DE PÁGINA CINEMATOGRÁFICO (adaptado de "Motion Footer", 21st.dev). Efecto cortina: el pie queda fijo al fondo de la pantalla y
   el contenido de la página, al terminar, se corre como una cortina y lo deja ver. Adentro: una cinta diagonal con lo que somos, el
   cierre "¿Listo para empezar?" con los tres llamados principales (Probar agendAHH gratis, Tu página web y Solicitar cotización),
   los enlaces del sitio, los datos de contacto y los enlaces legales. Botones magnéticos que siguen un poco al mouse.
   Cambios para HHA: sin GSAP (el efecto de scroll es una variable CSS), sin Tailwind, y datos reales de src/lib/config.ts.
   En pantallas bajas o angostas el pie es normal (sin cortina) para que nada quede cortado. Sin JavaScript o con "reducir
   movimiento" todo se ve de entrada.
   ========================================================= */

/* Botón que se inclina y sigue un poco al mouse (solo con mouse; con "reducir movimiento" no se mueve) */
function Magnetico({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const mover = (e: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) rotateX(${-y * 0.12}deg) rotateY(${x * 0.12}deg) scale(1.04)`
  }
  const soltar = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
    el.style.transform = ''
  }
  return (
    <span ref={ref} className={s.mag} onPointerMove={mover} onPointerLeave={soltar}>
      {children}
    </span>
  )
}

const CINTA = ['Digitaliza', 'Automatiza', 'Escala', '0 % de comisión', 'Trabajamos en todo Chile', 'Oficina en Viña del Mar', 'agendAHH', 'Páginas web', 'Marketing']
const BloqueCinta = () => (
  <div className={s.cintaBloque}>
    {CINTA.map((t) => (
      <span key={t}>{t}<i aria-hidden="true">✦</i></span>
    ))}
  </div>
)

export default function Footer() {
  const cortina = useRef<HTMLDivElement>(null)

  /* Progreso de la cortina (0 a 1) como variable CSS: el gigante "HHA" sube y el contenido aparece. Solo se activa con JavaScript
     y sin "reducir movimiento"; si no, el pie se ve completo desde el principio. */
  useEffect(() => {
    const el = cortina.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.classList.add(s.anima)
    let raf = 0
    const calcular = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / Math.max(1, r.height)))
      el.style.setProperty('--p', p.toFixed(3))
    }
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(calcular)
    }
    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir)
    calcular()
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
      el.classList.remove(s.anima)
    }
  }, [])

  return (
    <div ref={cortina} className={s.cortina}>
      <footer className={s.pie} aria-label="Pie de página">
        <div className={s.aurora} aria-hidden="true" />
        <div className={s.rejilla} aria-hidden="true" />
        <div className={s.gigante} aria-hidden="true">HHA</div>

        <div className={s.cinta} aria-hidden="true">
          <div className={s.cintaPista}><BloqueCinta /><BloqueCinta /></div>
        </div>

        <div className={s.centro}>
          <div className={s.reveal}>
            <h2 className={s.titulo}>¿Listo para empezar?</h2>
            <p className={s.sub}>Pruébalo tú primero, gratis, o cuéntanos qué necesitas y te respondemos {CONFIG.tiempoRespuesta}.</p>
          </div>
          <div className={`${s.ctas} ${s.reveal}`}>
            <Magnetico>
              <Link className="btn-vivo" href="/prueba-gratis">
                Probar agendAHH gratis <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </Magnetico>
            <Magnetico><Link className={s.pill} href="/servicios#cat-web">Tu página web</Link></Magnetico>
            <Magnetico><Link className={s.pill} href="/contacto">Solicitar cotización</Link></Magnetico>
          </div>
          <nav aria-label="Enlaces del sitio" className={`${s.links} ${s.reveal}`}>
            {NAV.map((l) => (
              <Magnetico key={l.href}><Link className={`${s.pill} ${s.chico}`} href={l.href}>{l.label}</Link></Magnetico>
            ))}
          </nav>
        </div>

        <div className={s.base}>
          <div className={s.datos}>
            <span>© {new Date().getFullYear()} HHA Digital Solutions SpA · RUT 78.527.191-2</span>
            <span>Oficina: 13 Norte 853, depto 803, Viña del Mar · Trabajamos en todo Chile</span>
          </div>
          <div className={s.contacto}>
            {CONFIG.whatsapp && <a href={telHref()}>{telVisible()}</a>}
            {CONFIG.email && <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>}
            <Redes usuario="lado" />
          </div>
          <div className={s.legal}>
            <nav aria-label="Legal">
              {LEGAL.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            </nav>
            <button type="button" className={s.subir} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Volver arriba">
              <ArrowUp size={18} strokeWidth={2.25} aria-hidden="true" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
