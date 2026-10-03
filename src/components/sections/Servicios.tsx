'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Building2, CalendarClock, Check, Clock, Gift, GraduationCap, LifeBuoy, ListChecks, Magnet, Megaphone, PenTool,
  Plug, Puzzle, Rocket, ShoppingCart, Sparkles, Users, Wallet, Workflow, X, type LucideIcon,
} from 'lucide-react'
import { CONFIG, type Categoria, type Pack, type Servicio } from '@/lib/config'
import { medir } from '@/lib/medir'
import { Kicker, Title, type Level } from './Heading'
import Orbitas from '../Orbitas'
import GuiaPlan from '../GuiaPlan'

const pad = (n: number) => String(n).padStart(2, '0')
/* Demo gratuita de los planes web; el plazo se edita en src/lib/config.ts → demoPlazo */
const DEMO = `al cotizar te preparamos una demo para que pruebes tu web antes de decidir`
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

/* Dibujo del sitio que se construye en cada plan: crece de Start (una página) a Business (varias
   secciones y contactos que llegan) y a Pro (tienda conectada con otras herramientas).
   Colores desde globals.css (.plan-ilus), así cambia con el tema. */
function PlanIlustracion({ nivel }: { nivel: number }) {
  const ancho = nivel === 3 ? 214 : 288
  return (
    <svg viewBox="0 0 320 150" role="presentation" focusable="false">
      <rect className="pi-ventana" x="16" y="14" width={ancho} height="124" rx="12" />
      <circle className="pi-punto" cx="32" cy="30" r="3" />
      <circle className="pi-punto" cx="42" cy="30" r="3" />
      <circle className="pi-punto" cx="52" cy="30" r="3" />
      <rect className="pi-suave" x="64" y="25" width={nivel === 3 ? 70 : 92} height="10" rx="5" />
      {nivel === 1 && (
        <>
          <rect className="pi-texto" x="36" y="56" width="118" height="10" rx="5" />
          <rect className="pi-suave" x="36" y="74" width="92" height="7" rx="3.5" />
          <rect className="pi-suave" x="36" y="86" width="70" height="7" rx="3.5" />
          <rect className="pi-rojo pi-latido" x="36" y="104" width="64" height="18" rx="9" />
          <rect className="pi-bloque" x="184" y="52" width="104" height="70" rx="9" />
          <circle className="pi-suave" cx="208" cy="74" r="7" />
          <path className="pi-suave" d="M196 112l24-22 16 14 12-9 26 17z" />
        </>
      )}
      {nivel === 2 && (
        <>
          <rect className="pi-suave" x="196" y="27" width="18" height="6" rx="3" />
          <rect className="pi-suave" x="220" y="27" width="18" height="6" rx="3" />
          <rect className="pi-suave" x="244" y="27" width="18" height="6" rx="3" />
          <rect className="pi-texto" x="36" y="50" width="112" height="9" rx="4.5" />
          <rect className="pi-suave" x="36" y="65" width="84" height="6" rx="3" />
          <rect className="pi-rojo" x="36" y="78" width="54" height="14" rx="7" />
          <rect className="pi-bloque" x="36" y="102" width="74" height="26" rx="6" />
          <rect className="pi-bloque" x="120" y="102" width="74" height="26" rx="6" />
          <rect className="pi-bloque" x="204" y="102" width="84" height="26" rx="6" />
          {/* un contacto nuevo que llega desde la web */}
          <g className="pi-flota">
            <rect className="pi-burbuja" x="206" y="46" width="98" height="36" rx="11" />
            <circle className="pi-rojo" cx="224" cy="64" r="9" />
            <path className="pi-check" d="M219.5 64.2l3 3 6-6.2" />
            <rect className="pi-texto-osc" x="240" y="56" width="50" height="6" rx="3" />
            <rect className="pi-suave-osc" x="240" y="67" width="34" height="5" rx="2.5" />
          </g>
        </>
      )}
      {nivel === 3 && (
        <>
          <circle className="pi-rojo" cx="210" cy="30" r="7" />
          {[32, 92, 152].map((x, i) => (
            <g key={x}>
              <rect className="pi-bloque" x={x} y="48" width="52" height="40" rx="7" />
              <rect className="pi-suave" x={x} y="95" width="40" height="6" rx="3" />
              <rect className={i === 1 ? 'pi-rojo' : 'pi-texto'} x={x} y="107" width="24" height="7" rx="3.5" />
            </g>
          ))}
          {/* la tienda conectada con otras herramientas (correo, CRM, pagos) */}
          {[40, 76, 112].map((y) => (
            <path key={y} className="pi-flujo" d={`M230 76 C 252 76, 256 ${y}, 278 ${y}`} />
          ))}
          <circle className="pi-nodo" cx="290" cy="40" r="12" />
          <circle className="pi-nodo pi-nodo-rojo" cx="290" cy="76" r="12" />
          <circle className="pi-nodo" cx="290" cy="112" r="12" />
          <rect className="pi-suave" x="284" y="36" width="12" height="8" rx="2" />
          <rect className="pi-blanco" x="284" y="72" width="12" height="8" rx="4" />
          <circle className="pi-suave" cx="290" cy="112" r="4" />
        </>
      )}
    </svg>
  )
}

/* Plan web: dibujo del sitio, para quién es y un botón principal. Al elegirlo, el botón pasa a
   "Solicita cotización" con la selección (igual que los packs). El recomendado lleva el botón rojo.
   Titulo: el nivel de encabezado que corresponde bajo el de su categoría (sin saltos). */
function PlanCard({ plan, nivel, elegido, href, toggle, verDetalle, Titulo }: {
  plan: Servicio
  nivel: number
  elegido: boolean
  href: string
  toggle: (id: string) => void
  verDetalle: (s: Servicio) => void
  Titulo: 'h3' | 'h4'
}) {
  /* Al elegir el plan con su botón, el foco pasa a "Solicita cotización" para seguir con el teclado */
  const cotizar = useRef<HTMLAnchorElement>(null)
  const recienElegido = useRef(false)
  useEffect(() => {
    if (elegido && recienElegido.current) cotizar.current?.focus({ preventScroll: true })
    recienElegido.current = false
  }, [elegido])
  const elegir = () => {
    recienElegido.current = true
    toggle(plan.id)
  }

  return (
    <article
      className={`plan${plan.destacado ? ' plan-top' : ''}${elegido ? ' plan-elegido' : ''}`}
      data-reveal
      style={{ '--d': `${(nivel - 1) * 0.08}s` } as CSSProperties}
    >
      {plan.destacado && <span className="plan-badge">RECOMENDADO</span>}
      <div className="plan-ilus" aria-hidden="true"><PlanIlustracion nivel={nivel} /></div>
      <div className="plan-cabeza">
        <Titulo className="plan-nombre">{plan.nombre}</Titulo>
        <span className="plan-nivel" aria-hidden="true">
          {[1, 2, 3].map((n) => <i key={n} className={n <= nivel ? 'on' : undefined} />)}
        </span>
      </div>
      <p className="plan-necesidad">{plan.necesidad ?? plan.desc}</p>
      <div className="plan-acciones">
        {elegido ? (
          <>
            <Link ref={cotizar} className="btn-vivo plan-btn" href={href}>
              Solicita cotización <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </Link>
            <div className="plan-elegido-fila">
              <span className="plan-check"><Check size={15} strokeWidth={2.5} aria-hidden="true" /> En tu selección</span>
              <button type="button" className="link-btn" onClick={() => toggle(plan.id)} aria-label={`Quitar ${plan.nombre}`}>Quitar</button>
            </div>
          </>
        ) : (
          <button
            type="button"
            className={`${plan.destacado ? 'btn-vivo' : 'btn-plan'} plan-btn`}
            onClick={elegir}
            aria-label={`Elegir ${plan.nombre}`}
          >
            Elegir plan <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
          </button>
        )}
        {plan.incluye?.length ? (
          <button type="button" className="ver-mas" onClick={() => verDetalle(plan)}>
            Ver qué incluye <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </article>
  )
}

/* Pack: se vende completo ("Elegir pack" agrega todos sus servicios). Quien quiera solo uno lo
   agrega desde las categorías de arriba. */
function PackCard({ pack, i, picked, href, elegirPack, Titulo }: {
  pack: Pack
  i: number
  picked: Set<string>
  href: string
  elegirPack: (pack: Pack, agregar: boolean) => void
  Titulo: 'h3' | 'h4'
}) {
  const completo = pack.servicios.every((id) => picked.has(id))
  const IconoPack = ICONOS_PACK[pack.id]
  return (
    <article className={`pack brillo${completo ? ' pack-completo' : ''}`} data-reveal style={{ '--d': `${(i % 2) * 0.08}s` } as CSSProperties}>
      <div className="pack-cabeza">
        {IconoPack && <span className="pack-ico"><IconoPack size={22} strokeWidth={1.75} aria-hidden="true" /></span>}
        <span className="pack-nombre">PACK {pack.nombre.toUpperCase()}</span>
      </div>
      <Titulo className="pack-problema">{pack.problema}</Titulo>
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
  /* Encabezados sin saltos: las categorías van un nivel bajo el título de la sección, y los planes,
     servicios y packs un nivel bajo su categoría. El diseño lo dan las clases, no el elemento. */
  const Categoria = as === 'h1' ? 'h2' : 'h3'
  const Item = as === 'h1' ? 'h3' : 'h4'
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

        {/* 1. Desarrollo web: la tarjeta dice para quién es, con un dibujo del sitio que se construye;
            la explicación va en "Ver qué incluye" */}
        <div id={`cat-${web.id}`} className="cat-web" data-reveal>
          <span className="cat-n">{pad(1)}</span>
          <Categoria className="sub">{web.nombre}</Categoria>
          <p className="muted" style={{ margin: 0 }}>{web.necesidad}</p>
        </div>
        <div className="plans">
          {serviciosDe(web).map((s, i) => (
            <PlanCard key={s.id} plan={s} nivel={i + 1} elegido={picked.has(s.id)} href={href} toggle={toggle} verDetalle={setDetalle} Titulo={Item} />
          ))}
        </div>

        {/* 2-4. Marketing y captación, Automatización, IA y consultoría */}
        <div className="cats">
          {lineas.map((c, ci) => (
            <div id={`cat-${c.id}`} className="cat" key={c.id} data-reveal>
              <div className="cat-head">
                <span className="cat-n">{pad(ci + 2)}</span>
                <Categoria className="sub">{c.nombre}</Categoria>
                <p className="muted" style={{ margin: 0 }}>{c.necesidad}</p>
              </div>
              <div className="cat-lista">
                {serviciosDe(c).map((s) => (
                  <div className="svc-row" key={s.id}>
                    <div className="svc-txt">
                      <span className="svc-ico"><Icono id={s.id} size={20} /></span>
                      <div>
                        <Item className="t">{s.nombre}</Item>
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
          <Categoria className="sub">¿Qué problema quieres resolver?</Categoria>
          <p className="muted" style={{ margin: 0 }}>Cada pack resuelve un problema completo e incluye todos sus servicios. ¿Necesitas solo uno? Agrégalo desde las categorías de arriba.</p>
        </div>
        <div className="packs">
          {CONFIG.packs.map((p, i) => (
            <PackCard key={p.id} pack={p} i={i} picked={picked} href={href} elegirPack={elegirPack} Titulo={Item} />
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
            {detalle.mantencion && (
              <>
                <div className="kicker" style={{ margin: '8px 0 0' }}>CÓMO SE PAGA</div>
                <ul className="incluye">
                  <li><Wallet size={18} strokeWidth={2} aria-hidden="true" />Pago inicial: el desarrollo y la puesta en marcha de tu web.</li>
                  <li><CalendarClock size={18} strokeWidth={2} aria-hidden="true" />Mantenimiento mensual, aparte: {detalle.mantencion}.</li>
                  <li><Gift size={18} strokeWidth={2} aria-hidden="true" /><span><strong>Demo gratuita:</strong> {DEMO}</span></li>
                </ul>
              </>
            )}
            <p className="note"><strong>Plazo de entrega:</strong> se define en la reunión según el alcance de tu proyecto, igual que el valor.</p>
            <div className="modal-acciones">
              <button type="button" className="btn btn-red" onClick={() => toggle(detalle.id)} aria-pressed={picked.has(detalle.id)}>
                {picked.has(detalle.id) ? '✓ Plan elegido' : 'Elegir este plan'}
              </button>
              <button type="button" className="btn btn-out" onClick={cerrar}>Cerrar</button>
            </div>
          </div>
        )}
      </dialog>

    </section>
  )
}
