'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Building2, Check, Clock, GraduationCap, LifeBuoy, ListChecks, Magnet, Megaphone, PenTool,
  Plug, Puzzle, Rocket, ShoppingCart, Sparkles, Users, Workflow, X, type LucideIcon,
} from 'lucide-react'
import { CONFIG, type Categoria, type Pack, type Servicio } from '@/lib/config'
import { medir } from '@/lib/medir'
import { Kicker, Title, type Level } from './Heading'
import Orbitas from '../Orbitas'
import GuiaPlan from '../GuiaPlan'

const pad = (n: number) => String(n).padStart(2, '0')
const porId = (id: string) => CONFIG.servicios.find((s) => s.id === id)
const serviciosDe = (c: Categoria) => c.servicios.map(porId).filter((s) => s !== undefined)

/* Ícono de cada servicio (por id de src/lib/config.ts). Sin robots ni cerebros: docs/HHA_BRAND_FOUNDATION.md */
const ICONOS: Record<string, LucideIcon> = {
  'web-start': Rocket,
  'web-business': Building2,
  'web-pro': ShoppingCart,
  automatizacion: Workflow,
  integraciones: Plug,
  procesos: ListChecks,
  marketing: Megaphone,
  captacion: Magnet,
  contenido: PenTool,
  ia: GraduationCap,
  acompanamiento: LifeBuoy,
}

/* Ícono de cada problema de los packs */
const ICONOS_PACK: Record<string, LucideIcon> = { clientes: Users, tiempo: Clock, imagen: Sparkles, herramientas: Puzzle }

function Icono({ id, size = 22 }: { id: string; size?: number }) {
  const I = ICONOS[id]
  return I ? <I size={size} strokeWidth={1.75} aria-hidden="true" /> : null
}

/* Pack: se vende completo ("Elegir pack" agrega todos sus servicios). Quien quiera solo uno lo
   agrega desde las categorías de arriba. */
function PackCard({ pack, i, picked, href, elegirPack }: {
  pack: Pack
  i: number
  picked: Set<string>
  href: string
  elegirPack: (pack: Pack, agregar: boolean) => void
}) {
  const completo = pack.servicios.every((id) => picked.has(id))
  const IconoPack = ICONOS_PACK[pack.id]
  return (
    <article className={`pack brillo${completo ? ' pack-completo' : ''}`} data-reveal style={{ '--d': `${(i % 2) * 0.08}s` } as CSSProperties}>
      <div className="pack-cabeza">
        {IconoPack && <span className="pack-ico"><IconoPack size={22} strokeWidth={1.75} aria-hidden="true" /></span>}
        <span className="pack-nombre">PACK {pack.nombre.toUpperCase()}</span>
      </div>
      <h4 className="pack-problema">{pack.problema}</h4>
      <p className="muted" style={{ margin: 0 }}>{pack.detalle}</p>
      <ul className="pack-solucion" aria-label="Incluye">
        {pack.servicios.map((id) => {
          const s = porId(id)
          if (!s) return null
          return (
            <li key={id} className="pack-item">
              <span className="svc-ico"><Icono id={id} size={18} /></span>
              <span>{s.nombre}</span>
              {completo && <Check size={16} strokeWidth={2.5} aria-hidden="true" />}
            </li>
          )
        })}
      </ul>
      <div className="pack-pie">
        {completo ? (
          <>
            <Link className="btn btn-red pack-btn" href={href}>Solicita cotización →</Link>
            <button type="button" className="link-btn" onClick={() => elegirPack(pack, false)}>Quitar pack</button>
            <span className="pack-badge">✓ Pack en tu selección</span>
          </>
        ) : (
          <>
            <button type="button" className="btn btn-red pack-btn" onClick={() => elegirPack(pack, true)}>Elegir pack</button>
          </>
        )}
      </div>
    </article>
  )
}

/* Servicios en cuatro bloques (docs/HHA_SERVICES.md):
   1. Categorías: Desarrollo web (planes, con la necesidad que cubren), Marketing y captación,
      Automatización, e IA y consultoría. Agrupan el catálogo para que quien sabe lo que quiere lo
      encuentre, sin buscar nombres técnicos. Cada categoría tiene ancla: /servicios#cat-marketing.
   2. "¿Qué problema quieres resolver?": packs con nombre, que se eligen completos.
   3. "Tu selección": sin nada elegido invita al diagnóstico; con algo elegido, a la cotización.
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

  /* Ventana "Ver qué incluye" de un plan. <dialog> nativo: se cierra con Esc, con la X o tocando fuera. */
  const [detalle, setDetalle] = useState<Servicio | null>(null)
  const dialogo = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (detalle && !dialogo.current?.open) dialogo.current?.showModal()
  }, [detalle])
  const cerrar = () => dialogo.current?.close()

  const sel = CONFIG.servicios.filter((s) => picked.has(s.id))
  const href = `/contacto?servicios=${sel.map((s) => s.id).join(',')}`

  const addBtn = (s: Servicio) => {
    const on = picked.has(s.id)
    return (
      <button type="button" className="add" aria-pressed={on} aria-label={`${on ? 'Quitar' : 'Agregar'} ${s.nombre}`} onClick={() => toggle(s.id)}>
        {on ? '✓ Agregado' : '+ Agregar'}
      </button>
    )
  }

  const [web, ...lineas] = CONFIG.categorias

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

        {/* 1. Desarrollo web: la tarjeta dice para quién es; la explicación va en "Ver qué incluye" */}
        <div id={`cat-${web.id}`} className="cat-web" data-reveal>
          <span className="cat-n">{pad(1)}</span>
          <h3 className="sub">{web.nombre}</h3>
          <p className="muted" style={{ margin: 0 }}>{web.necesidad}</p>
        </div>
        <div className="plans">
          {serviciosDe(web).map((s, i) => (
            <article className={`plan${s.destacado ? ' plan-top' : ''}`} key={s.id} data-reveal style={{ '--d': `${i * 0.08}s` } as CSSProperties}>
              {s.destacado && <span className="plan-badge">RECOMENDADO</span>}
              <span className="plan-ico"><Icono id={s.id} /></span>
              <h4 className="card-t" style={{ margin: 0 }}>{s.nombre}</h4>
              <p className="plan-necesidad">{s.necesidad ?? s.desc}</p>
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

        {/* 2-4. Marketing y captación, Automatización, IA y consultoría */}
        <div className="cats">
          {lineas.map((c, ci) => (
            <div id={`cat-${c.id}`} className="cat" key={c.id} data-reveal>
              <div className="cat-head">
                <span className="cat-n">{pad(ci + 2)}</span>
                <h3 className="sub">{c.nombre}</h3>
                <p className="muted" style={{ margin: 0 }}>{c.necesidad}</p>
              </div>
              <div className="cat-lista">
                {serviciosDe(c).map((s) => (
                  <div className="svc-row" key={s.id}>
                    <div className="svc-txt">
                      <span className="svc-ico"><Icono id={s.id} size={20} /></span>
                      <div>
                        <h4 className="t">{s.nombre}</h4>
                        <div className="d">{s.desc}</div>
                      </div>
                    </div>
                    {addBtn(s)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Packs: problema → solución, se eligen completos */}
        <div id="soluciones" className="soluciones-head" data-reveal>
          <h3 className="sub">¿Qué problema quieres resolver?</h3>
          <p className="muted" style={{ margin: 0 }}>Cada pack resuelve un problema completo e incluye todos sus servicios. ¿Necesitas solo uno? Agrégalo desde las categorías de arriba.</p>
        </div>
        <div className="packs">
          {CONFIG.packs.map((p, i) => (
            <PackCard key={p.id} pack={p} i={i} picked={picked} href={href} elegirPack={elegirPack} />
          ))}
        </div>

        {/* Tu selección: el botón cambia según lo que el visitante ya hizo */}
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
            <GuiaPlan etiqueta="Haz tu diagnóstico" className="btn btn-red" giro={false} origen="servicios" />
          )}
        </div>
      </div>

      {/* Ventana "Ver qué incluye": explicación del plan y lo que trae */}
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
