'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Building2, Check, ChevronDown, GraduationCap, LifeBuoy, Magnet, Megaphone, PenTool,
  Rocket, ShoppingCart, Workflow, X, type LucideIcon,
} from 'lucide-react'
import { CONFIG, type Pack, type Servicio } from '@/lib/config'
import { medir } from '@/lib/medir'
import { Kicker, Title, type Level } from './Heading'
import Orbitas from '../Orbitas'
import GuiaPlan from '../GuiaPlan'

const pad = (n: number) => String(n).padStart(2, '0')
const porId = (id: string) => CONFIG.servicios.find((s) => s.id === id)

/* Ícono de cada servicio (por id de src/lib/config.ts). Sin robots ni cerebros: docs/HHA_BRAND_FOUNDATION.md */
const ICONOS: Record<string, LucideIcon> = {
  'web-start': Rocket,
  'web-business': Building2,
  'web-pro': ShoppingCart,
  automatizacion: Workflow,
  marketing: Megaphone,
  captacion: Magnet,
  contenido: PenTool,
  ia: GraduationCap,
  acompanamiento: LifeBuoy,
}

function Icono({ id, size = 22 }: { id: string; size?: number }) {
  const I = ICONOS[id]
  return I ? <I size={size} strokeWidth={1.75} aria-hidden="true" /> : null
}

/* Pack: cada servicio se elige por separado o todos juntos (el pack completo es el recomendado) */
function PackCard({ pack, i, picked, toggle, elegirPack }: {
  pack: Pack
  i: number
  picked: Set<string>
  toggle: (id: string) => void
  elegirPack: (pack: Pack, agregar: boolean) => void
}) {
  const elegidos = pack.servicios.filter((id) => picked.has(id)).length
  const completo = elegidos === pack.servicios.length
  const estado = elegidos === 1 ? '1 solución elegida' : `${elegidos} soluciones elegidas`
  return (
    <article className={`pack${completo ? ' pack-completo' : ''}`} data-reveal style={{ '--d': `${(i % 2) * 0.08}s` } as CSSProperties}>
      <h4 className="pack-problema">{pack.problema}</h4>
      <p className="muted" style={{ margin: 0 }}>{pack.detalle}</p>
      <div className="pack-solucion" role="group" aria-label={`Soluciones para: ${pack.problema}`}>
        {pack.servicios.map((id) => {
          const s = porId(id)
          if (!s) return null
          const on = picked.has(id)
          return (
            <button key={id} type="button" className="pack-item" aria-pressed={on} onClick={() => toggle(id)}>
              <span className="svc-ico"><Icono id={id} size={18} /></span>
              <span>{s.nombre}</span>
              {on ? <Check size={16} strokeWidth={2.5} aria-hidden="true" /> : <span className="pack-mas" aria-hidden="true">+</span>}
            </button>
          )
        })}
      </div>
      <div className="pack-pie">
        <button type="button" className={`btn ${completo ? 'btn-out' : 'btn-red'} pack-btn`} onClick={() => elegirPack(pack, !completo)}>
          {completo ? 'Quitar pack' : 'Elegir pack completo'}
        </button>
        <span className="pack-badge">{completo ? '★ Pack completo · Recomendado' : 'Recomendado: pack completo'}</span>
        {elegidos > 0 && !completo && <span className="pack-estado">{estado}</span>}
      </div>
    </article>
  )
}

/* Servicios en tres bloques: planes web, "¿Qué problema quieres resolver?" (problema → solución,
   con elección de 1, 2 o el pack completo) y la lista completa, plegada en "Ver todos los servicios".
   Sin precios públicos (docs/HHA_BUSINESS_MODEL.md). La selección viaja a /contacto?servicios=a,b. */
export default function Servicios({ as = 'h2' }: { as?: Level }) {
  const [picked, setPicked] = useState<Set<string>>(() => new Set())
  const cambiar = (ids: string[], agregar: boolean) =>
    setPicked((prev) => {
      const next = new Set(prev)
      for (const id of ids) {
        if (agregar) next.add(id)
        else next.delete(id)
      }
      return next
    })
  const toggle = (id: string) => {
    const agregar = !picked.has(id)
    if (agregar) medir('servicio_agregado', { servicio: id })
    cambiar([id], agregar)
  }

  const elegirPack = (pack: Pack, agregar: boolean) => {
    if (agregar) medir('servicio_agregado', { pack: pack.id })
    cambiar(pack.servicios, agregar)
  }

  const [detalle, setDetalle] = useState<Servicio | null>(null)
  const [verTodos, setVerTodos] = useState(false)
  const dialogo = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (detalle && !dialogo.current?.open) dialogo.current?.showModal()
  }, [detalle])
  const cerrar = () => dialogo.current?.close()

  const sel = CONFIG.servicios.filter((s) => picked.has(s.id))
  const planes = CONFIG.servicios.filter((s) => s.grupo === 'web')
  const lineas = CONFIG.servicios.filter((s) => s.grupo === 'linea')
  const href = `/contacto?servicios=${sel.map((s) => s.id).join(',')}`

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
            Marca lo que te interesa y solicita tu cotización. El valor y los plazos dependen del alcance de tu proyecto: los definimos contigo en la reunión.
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

        <div id="soluciones" className="soluciones-head" data-reveal>
          <h3 className="sub">¿Qué problema quieres resolver?</h3>
          <p className="muted" style={{ margin: 0 }}>Elige una solución, dos o el pack completo.</p>
        </div>
        <div className="packs">
          {CONFIG.packs.map((p, i) => <PackCard key={p.id} pack={p} i={i} picked={picked} toggle={toggle} elegirPack={elegirPack} />)}
        </div>

        <button type="button" className="ver-todos" aria-expanded={verTodos} aria-controls="todos-los-servicios" onClick={() => setVerTodos(!verTodos)}>
          {verTodos ? 'Ocultar todos los servicios' : 'Ver todos los servicios'}
          <ChevronDown size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <div id="todos-los-servicios" className="svc-list" hidden={!verTodos}>
          {lineas.map((s, i) => (
            <div className="svc-row" key={s.id}>
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
              {sel.length ? sel.map((s) => s.nombre).join(' · ') : '¿No sabes qué elegir? Responde 3 preguntas y te recomendamos.'}
            </div>
          </div>
          {sel.length ? (
            <Link className="btn btn-red" href={href}>Solicita cotización →</Link>
          ) : (
            <GuiaPlan etiqueta="Hacer diagnóstico" className="btn btn-red" giro={false} origen="servicios" />
          )}
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
            <p className="note"><strong>Plazo de entrega:</strong> se define en la reunión según el alcance de tu proyecto, igual que el valor.</p>
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
