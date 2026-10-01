'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CONFIG, type Servicio } from '@/lib/config'
import { Kicker, Title, type Level } from './Heading'

const pad = (n: number) => String(n).padStart(2, '0')

/* Planes web y líneas de servicio, sin precios públicos (docs/HHA_BUSINESS_MODEL.md).
   Marca lo que te interesa y la selección viaja a /contacto?servicios=a,b para cotizar. */
export default function Servicios({ as = 'h2' }: { as?: Level }) {
  const [picked, setPicked] = useState<Set<string>>(() => new Set())
  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const sel = CONFIG.servicios.filter((s) => picked.has(s.id))
  const planes = CONFIG.servicios.filter((s) => s.grupo === 'web')
  const lineas = CONFIG.servicios.filter((s) => s.grupo === 'linea')
  const href = sel.length ? `/contacto?servicios=${sel.map((s) => s.id).join(',')}` : '/contacto'

  const addBtn = (s: Servicio) => {
    const on = picked.has(s.id)
    return (
      <button type="button" className="add" aria-pressed={on} aria-label={`${on ? 'Quitar' : 'Agregar'} ${s.nombre}`} onClick={() => toggle(s.id)}>
        {on ? '✓ Agregado' : '+ Agregar'}
      </button>
    )
  }

  return (
    <section className="alt">
      <div className="wrap sec">
        <div className="head-row">
          <div>
            <Kicker>SERVICIOS</Kicker>
            <Title as={as}>Elige por dónde empezar</Title>
          </div>
          <p className="muted" style={{ maxWidth: 420, margin: 0 }}>
            Marca lo que te interesa y solicita tu cotización. El valor depende del alcance de tu proyecto: lo definimos contigo después del diagnóstico.
          </p>
        </div>

        <h3 className="sub">Desarrollo web</h3>
        <p className="muted" style={{ margin: 0 }}>Cada plan incluye la implementación y un servicio mensual de mantenimiento.</p>
        <div className="plans">
          {planes.map((s) => (
            <article className={`plan${s.destacado ? ' plan-top' : ''}`} key={s.id}>
              {s.destacado && <span className="plan-badge">RECOMENDADO</span>}
              <h4 className="card-t" style={{ margin: 0 }}>{s.nombre}</h4>
              <p className="muted">{s.desc}</p>
              {addBtn(s)}
            </article>
          ))}
        </div>

        <h3 className="sub">Además</h3>
        <div className="svc-list">
          {lineas.map((s, i) => (
            <div className="svc-row" key={s.id}>
              <span className="n">{pad(i + 1)}</span>
              <div>
                <div className="t">{s.nombre}</div>
                <div className="d">{s.desc}</div>
              </div>
              {addBtn(s)}
            </div>
          ))}
        </div>

        <div className="quote" aria-live="polite">
          <div>
            <div className="mono" style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--mut)' }}>TU SELECCIÓN</div>
            <div style={{ fontSize: 15, marginTop: 6, color: 'var(--tx)' }}>
              {sel.length ? sel.map((s) => s.nombre).join(' · ') : 'Aún no eliges servicios.'}
            </div>
          </div>
          <Link className="btn btn-red" href={href}>Solicita cotización →</Link>
        </div>
      </div>
    </section>
  )
}
