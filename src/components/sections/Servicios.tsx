'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CONFIG } from '@/lib/config'
import { Kicker, Title, type Level } from './Heading'

const fmt = (n: number) => '$' + n.toLocaleString('es-CL')
const pad = (n: number) => String(n).padStart(2, '0')

/* Cotizador: marca servicios, elige modalidad y envía la selección a /contacto. */
export default function Servicios({ as = 'h2' }: { as?: Level }) {
  const [mode, setMode] = useState<'puntual' | 'mensual'>('puntual')
  const [picked, setPicked] = useState<Set<string>>(() => new Set())
  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const sel = CONFIG.servicios.filter((s) => picked.has(s.id))
  const total = useMemo(() => {
    if (!sel.length) return '—'
    if (sel.some((s) => s[mode] == null)) return 'A cotizar'
    return fmt(sel.reduce((a, s) => a + (s[mode] ?? 0), 0)) + (mode === 'mensual' ? '/mes' : '')
  }, [sel, mode])

  const href = sel.length ? `/contacto?servicios=${sel.map((s) => s.id).join(',')}` : '/contacto'

  return (
    <section className="alt">
      <div className="wrap sec">
        <div className="head-row">
          <div>
            <Kicker>SERVICIOS Y PRECIOS</Kicker>
            <Title as={as}>Arma tu proyecto</Title>
          </div>
          <p className="muted" style={{ maxWidth: 420, margin: 0 }}>
            Marca los servicios que te interesan y envía tu selección. Los precios finales se ajustan después del diagnóstico.
          </p>
        </div>

        <div className="toggle" role="group" aria-label="Modalidad">
          {([['puntual', 'Proyecto puntual'], ['mensual', 'Plan mensual']] as const).map(([m, l]) => (
            <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>{l}</button>
          ))}
        </div>

        <div className="price-list">
          {CONFIG.servicios.map((s, i) => {
            const v = s[mode]
            const on = picked.has(s.id)
            return (
              <div className="price-row" key={s.id}>
                <span className="n">{pad(i + 1)}</span>
                <div>
                  <div className="t">{s.nombre}</div>
                  <div className="d">{s.desc}</div>
                </div>
                <span className="p">{v == null ? '[TU PRECIO]' : `Desde ${fmt(v)}${mode === 'mensual' ? ' /mes' : ''}`}</span>
                <button type="button" className="add" aria-pressed={on} aria-label={`${on ? 'Quitar' : 'Agregar'} ${s.nombre}`} onClick={() => toggle(s.id)}>
                  {on ? '✓ Agregado' : '+ Agregar'}
                </button>
              </div>
            )
          })}
        </div>

        <div className="quote" aria-live="polite">
          <div>
            <div className="mono" style={{ fontSize: 13, letterSpacing: 2, color: 'var(--mut)' }}>TU SELECCIÓN</div>
            <div style={{ fontSize: 15, marginTop: 6, color: 'var(--tx2)' }}>
              {sel.length ? sel.map((s) => s.nombre).join(' · ') : 'Aún no eliges servicios.'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div className="mono" style={{ fontSize: 13, color: 'var(--mut)' }}>ESTIMADO DESDE</div>
              <div className="total">{total}</div>
            </div>
            <Link className="btn btn-red" href={href}>Cotizar esta selección →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
