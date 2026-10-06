'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import GuiaPlan from '../GuiaPlan'
import PortadaFondo from './PortadaFondo'
import { CONFIG } from '@/lib/config'
import { RUBROS } from './rubros'
import s from './Portada.module.css'

/* =========================================================
   PORTADA (inicio). El video del teclado ocupa todo el ancho; encima, el texto.
   El titular cambia de palabra según el tipo de negocio ("Tu barbería, digital y en automático.") y los
   botones de rubro permiten elegir uno. Rota sola hasta que la persona toca un botón; con "reducir
   movimiento" no rota. Todas las variantes del titular y del texto ocupan el mismo lugar (cuadrícula
   apilada), así la altura no cambia al rotar y nada se mueve. Hook de marca: docs/HHA_BRAND_FOUNDATION.md.
   ========================================================= */

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

const CADA_MS = 4200

export default function Portada() {
  const [i, setI] = useState(0)
  const [manual, setManual] = useState(false)

  /* rota sola, salvo que la persona haya elegido un rubro o prefiera menos movimiento */
  useEffect(() => {
    if (manual) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % RUBROS.length)
    }, CADA_MS)
    return () => window.clearInterval(t)
  }, [manual])

  const elegir = (n: number) => {
    setManual(true)
    setI(n)
  }
  const activo = RUBROS[i]
  const general = activo.id === 'negocio'

  return (
    <section className={s.hero} aria-label="Portada">
      <PortadaFondo />

      <div className={s.main}>
        <div className={s.contenido}>
          <div className={s.fila}>
          <p className={s.pastilla}>
            <span className={s.punto} aria-hidden="true" />
            Digitaliza <span aria-hidden="true">·</span> <span className={s.pastillaRoja}>Automatiza</span> <span aria-hidden="true">·</span> Escala
          </p>
            {/* Cobertura: se trabaja en todo Chile, de forma remota (base en Casablanca, Región de Valparaíso) */}
            <p className={s.cobertura}>
              <MapPin size={15} strokeWidth={2.25} aria-hidden="true" />
              <strong>Trabajamos en todo Chile</strong>
              <span className="sr-only">. Base en Casablanca, Región de Valparaíso.</span>
            </p>
          </div>

          <h1 className={s.h1}>
            <span className="sr-only">HHA Digital Solutions: desarrollo web, automatizaciones y marketing para llegar a más clientes.</span>
            <span className={s.pila} aria-hidden="true">
              {RUBROS.map((r, n) => (
                <span key={r.id} className={`${s.variante} ${n === i ? s.on : ''}`}>
                  Tu <em>{r.palabra}</em>,<br />digital y en automático.
                </span>
              ))}
            </span>
          </h1>

          <div className={s.rubros} role="group" aria-label="Elige tu tipo de negocio">
            {RUBROS.map((r, n) => {
              const Icono = r.icono
              return (
                <button
                  key={r.id}
                  type="button"
                  className={s.rubro}
                  aria-pressed={n === i}
                  onClick={() => elegir(n)}
                >
                  <Icono size={16} strokeWidth={2} aria-hidden="true" />
                  {r.chip}
                </button>
              )
            })}
          </div>

          <div className={`${s.pila} ${s.lead}`} aria-live={manual ? 'polite' : 'off'}>
            {RUBROS.map((r, n) => (
              <p key={r.id} className={`${s.variante} ${n === i ? s.on : ''}`} aria-hidden={n === i ? undefined : true}>{r.lead}</p>
            ))}
          </div>

          <div className={s.ctas}>
            {/* Botón principal: abre las 3 preguntas del diagnóstico */}
            <GuiaPlan etiqueta="Te orientamos en 3 preguntas" className="btn-vivo" giro={false} />
            {general
              ? <Link className="btn btn-out" href="/servicios">Ver servicios</Link>
              : <Link className="btn btn-out" href={`/prueba-gratis?rubro=${activo.id}`}>Probar gratis {CONFIG.demoPlazo}</Link>}
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
