'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Building2, Check, GraduationCap, LifeBuoy, Megaphone, PenTool,
  Rocket, ShoppingCart, Workflow, X, type LucideIcon,
} from 'lucide-react'
import { CONFIG, type Servicio } from '@/lib/config'
import { Kicker, Title, type Level } from './Heading'
import Orbitas from '../Orbitas'

const pad = (n: number) => String(n).padStart(2, '0')

/* Ícono de cada servicio (por id de src/lib/config.ts). Sin robots ni cerebros: docs/HHA_BRAND_FOUNDATION.md */
const ICONOS: Record<string, LucideIcon> = {
  'web-start': Rocket,
  'web-business': Building2,
  'web-pro': ShoppingCart,
  automatizacion: Workflow,
  marketing: Megaphone,
  contenido: PenTool,
  ia: GraduationCap,
  acompanamiento: LifeBuoy,
}

function Icono({ id, size = 22 }: { id: string; size?: number }) {
  const I = ICONOS[id]
  return I ? <I size={size} strokeWidth={1.75} aria-hidden="true" /> : null
}

/* Planes web y líneas de servicio, sin precios públicos (docs/HHA_BUSINESS_MODEL.md).
   Marca lo que te interesa y la selección viaja a /contacto?servicios=a,b para cotizar.
   Cada plan tiene "Ver qué incluye": una ventana con su detalle (config.ts → incluye). */
export default function Servicios({ as = 'h2' }: { as?: Level }) {
  const [picked, setPicked] = useState<Set<string>>(() => new Set())
  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const [detalle, setDetalle] = useState<Servicio | null>(null)
  const dialogo = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (detalle && !dialogo.current?.open) dialogo.current?.showModal()
  }, [detalle])
  const cerrar = () => dialogo.current?.close()

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
    <section className="alt con-deco">
      <Orbitas lado="derecha" />
      <div className="wrap sec">
        <div className="head-row" data-reveal>
          <div>
            <Kicker>SERVICIOS</Kicker>
            <Title as={as}>Elige por dónde empezar</Title>
          </div>
          <p className="muted" style={{ maxWidth: 420, margin: 0 }}>
            Marca lo que te interesa y solicita tu cotización. El valor depende del alcance de tu proyecto: lo definimos contigo después del diagnóstico.
          </p>
        </div>

        <h3 className="sub" data-reveal>Desarrollo web</h3>
        <p className="muted" style={{ margin: 0 }} data-reveal>Cada plan incluye la implementación y un servicio mensual de mantenimiento.</p>
        <div className="plans">
          {planes.map((s, i) => (
            <article className={`plan${s.destacado ? ' plan-top' : ''}`} key={s.id} data-reveal style={{ '--d': `${i * 0.08}s` } as CSSProperties}>
              {s.destacado && <span className="plan-badge">RECOMENDADO</span>}
              <span className="plan-ico"><Icono id={s.id} /></span>
              <h4 className="card-t" style={{ margin: 0 }}>{s.nombre}</h4>
              <p className="muted">{s.desc}</p>
              <div className="plan-acciones">
                {addBtn(s)}
                {s.incluye?.length ? (
                  <button type="button" className="ver-mas" onClick={() => setDetalle(s)}>
                    Ver qué incluye <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <h3 className="sub" data-reveal>Además</h3>
        <div className="svc-list">
          {lineas.map((s, i) => (
            <div className="svc-row" key={s.id} data-reveal style={{ '--d': `${i * 0.05}s` } as CSSProperties}>
              <span className="n">{pad(i + 1)}</span>
              <div className="svc-txt">
                <span className="svc-ico"><Icono id={s.id} size={20} /></span>
                <div>
                  <div className="t">{s.nombre}</div>
                  <div className="d">{s.desc}</div>
                </div>
              </div>
              {addBtn(s)}
            </div>
          ))}
        </div>

        <div className="quote" aria-live="polite" data-reveal>
          <div>
            <div className="mono" style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--mut)' }}>TU SELECCIÓN</div>
            <div style={{ fontSize: 15, marginTop: 6, color: 'var(--tx)' }}>
              {sel.length ? sel.map((s) => s.nombre).join(' · ') : 'Aún no eliges servicios.'}
            </div>
          </div>
          <Link className="btn btn-red" href={href}>Solicita cotización →</Link>
        </div>
      </div>

      {/* Ventana "Ver qué incluye". <dialog> nativo: se cierra con Esc, con la X o tocando fuera. */}
      <dialog
        ref={dialogo}
        className="modal"
        aria-labelledby="modal-titulo"
        onClose={() => setDetalle(null)}
        onClick={(e) => e.target === e.currentTarget && cerrar()}
      >
        {detalle && (
          <div className="modal-caja">
            <button type="button" className="modal-x" onClick={cerrar} aria-label="Cerrar">
              <X size={20} strokeWidth={2} aria-hidden="true" />
            </button>
            {detalle.destacado && <span className="plan-badge" style={{ position: 'static', alignSelf: 'flex-start' }}>RECOMENDADO</span>}
            <div className="modal-head">
              <span className="plan-ico"><Icono id={detalle.id} /></span>
              <h3 id="modal-titulo" className="card-t" style={{ margin: 0 }}>{detalle.nombre}</h3>
            </div>
            <p className="muted" style={{ margin: 0 }}>{detalle.desc}</p>
            <div className="kicker" style={{ margin: '8px 0 0' }}>QUÉ INCLUYE</div>
            <ul className="incluye">
              {detalle.incluye?.map((it) => (
                <li key={it}><Check size={18} strokeWidth={2.25} aria-hidden="true" />{it}</li>
              ))}
            </ul>
            <p className="note">El valor se define según el alcance de tu proyecto: lo conversamos en el diagnóstico.</p>
            <div className="modal-acciones">
              <button type="button" className="btn btn-red" onClick={() => toggle(detalle.id)} aria-pressed={picked.has(detalle.id)}>
                {picked.has(detalle.id) ? '✓ En tu selección' : '+ Agregar a mi selección'}
              </button>
              <button type="button" className="btn btn-out" onClick={cerrar}>Cerrar</button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
