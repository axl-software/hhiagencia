'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { clp, PRECIOS } from '@/lib/precios'
import { RUBROS } from '../portada/rubros'
import s from './Hero.module.css'
import { Animado } from '@/components/ui/precio-animado'

/* =========================================================
   HERO del inicio (tono claro). Titular "Tu ___, digital y en automático." con la palabra del rubro elegido; los botones de
   rubro cambian el texto, la palabra y la imagen del celular. Rota sola hasta que la persona toca un botón; con "reducir
   movimiento" no rota. Todas las variantes del titular y del texto ocupan el mismo lugar (cuadrícula apilada) para que la
   altura no cambie al rotar. Los tres llamados principales: Probar agendAHH gratis, Ver planes y Solicitar cotización.
   ========================================================= */

const IMAGEN: Record<string, { src: string; badge: string }> = {
  negocio: { src: '/img/agendahh/tamburrini-local.webp', badge: 'Una agenda, dos barberías' },
  barberia: { src: '/img/sistemas/barberia.webp', badge: 'Tu barbería, con su propia cara' },
  estetica: { src: '/img/sistemas/estetica.webp', badge: 'Tu estudio, con su propia cara' },
  tatuajes: { src: '/img/sistemas/tatuajes.webp', badge: 'Tu estudio, con su propia cara' },
  optica: { src: '/img/sistemas/optica-ojos.webp', badge: 'Tu consulta, con su propia cara' },
  wellness: { src: '/img/sistemas/wellness.webp', badge: 'Tu centro, con su propia cara' },
}

const CADA_MS = 4200
const SOLO = clp(PRECIOS['system-agenda-solo'].monto ?? 0)

export default function Hero() {
  const [i, setI] = useState(0)
  const [manual, setManual] = useState(false)

  useEffect(() => {
    if (manual) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % RUBROS.length)
    }, CADA_MS)
    return () => window.clearInterval(t)
  }, [manual])

  const activo = RUBROS[i]
  const elegir = (n: number) => {
    setManual(true)
    setI(n)
  }

  return (
    <section className={s.hero} aria-label="Inicio">
      <div className={`wrap ${s.grid}`}>
        <div>
          <div className={s.fila}>
            <p className={s.pastilla}>
              <i aria-hidden="true" />Digitaliza <span aria-hidden="true">·</span> <b>Automatiza</b> <span aria-hidden="true">·</span> Escala
            </p>
            <p className={s.cobertura}>
              <MapPin size={15} strokeWidth={2.25} aria-hidden="true" />
              <strong>Trabajamos en todo Chile</strong>
              <span className="sr-only">. Oficina en Viña del Mar, Región de Valparaíso.</span>
            </p>
          </div>

          <h1 id="inicio-titulo" className={s.h1}>
            <span className="sr-only">HHA Digital Solutions: página web, agenda de reservas y marketing para negocios de todo Chile.</span>
            <span className={s.pila} aria-hidden="true">
              {RUBROS.map((r, n) => (
                <span key={r.id} className={`${s.variante} ${n === i ? s.on : ''}`}>
                  Tu <em>{r.palabra}</em>,<br />digital y en automático.
                </span>
              ))}
            </span>
          </h1>

          <p className={s.chipsT} id="hero-rubro">Elige tu tipo de negocio</p>
          <div className={s.chips} role="group" aria-labelledby="hero-rubro">
            {RUBROS.map((r, n) => {
              const Icono = r.icono
              return (
                <button key={r.id} type="button" className="chip" aria-pressed={n === i} onClick={() => elegir(n)}>
                  <Icono size={15} strokeWidth={2} aria-hidden="true" style={{ marginRight: 8, verticalAlign: '-2px' }} />
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

          <div className={s.acciones}>
            <Link className="btn-vivo" href={activo.id === 'negocio' ? '/prueba-gratis' : `/prueba-gratis?rubro=${activo.id}`}>
              Probar agendAHH gratis <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </Link>
            <Link className="btn btn-out" href="/servicios">Ver planes</Link>
            <Link className="btn btn-out" href="/contacto">Solicitar cotización</Link>
          </div>
          <ul className={s.notas}>
            <li><b>0 %</b> de comisión por tus reservas y ventas</li>
            <li>Prueba de <b>7 días</b> sin pagar · desde <b><Animado t={SOLO} /></b>/mes + IVA</li>
          </ul>
        </div>

        <div className={s.escena} role="group" aria-label="Ejemplos de una página web y de la agenda de reservas">
          <div className={s.anillos} aria-hidden="true" />
          <div className={s.navegador}>
            <div className={s.barra} aria-hidden="true"><i /><i /><i /></div>
            {/* eslint-disable-next-line @next/next/no-img-element -- imagen de ejemplo; next/image rompe la vista previa en HTML */}
            <img src="/img/ejemplos/web-business.webp" alt="Ejemplo de página web de un negocio" width={1000} height={666} />
          </div>
          <div className={s.celular2}>
            {/* eslint-disable-next-line @next/next/no-img-element -- imagen de ejemplo */}
            <img key={activo.id} src={IMAGEN[activo.id].src} alt="Vista de ejemplo de la agenda con la identidad de un negocio" width={700} height={700} />
          </div>
          <div className={s.celular1}>
            {/* eslint-disable-next-line @next/next/no-img-element -- imagen de ejemplo */}
            <img src="/img/agendahh/turno-uno.webp" alt="Ejemplo de reserva en la barbería ficticia Turno Uno" width={390} height={760} />
          </div>
          <div className={s.insignia}><b>{IMAGEN[activo.id].badge}</b><small>Vista de ejemplo</small></div>
        </div>
      </div>
    </section>
  )
}
