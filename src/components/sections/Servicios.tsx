'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Building2, CalendarCheck, CalendarClock, Check, Clock, Gift, GraduationCap, Heart, LayoutDashboard, LifeBuoy, ListChecks, Magnet, Megaphone, MessageCircle, PenTool,
  Plug, Puzzle, Rocket, ShoppingCart, Sparkles, TrendingUp, Users, Wallet, Workflow, X, type LucideIcon,
} from 'lucide-react'
import { CONFIG, type Categoria, type Pack, type Servicio } from '@/lib/config'
import { medir } from '@/lib/medir'
import { Kicker, Title, type Level } from './Heading'
import Orbitas from '../Orbitas'
import GuiaPlan from '../GuiaPlan'
import MuestraWeb from './MuestraWeb'
import { Escena, VENTANAS, rubroDe } from '../portada/sistemasData'
import m from './Servicios.module.css'

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
  'hha-systems': LayoutDashboard,
  automatizacion: Workflow,
  integraciones: Plug,
  procesos: ListChecks,
  marketing: Megaphone,
  captacion: Magnet,
  contenido: PenTool,
  ia: GraduationCap,
  acompanamiento: LifeBuoy,
}

/* Foto de cada servicio (Unsplash, licencia libre para uso comercial; autores en docs/HHA_TECH_STACK.md).
   HHA Systems no lleva: sus vistas previas por rubro van debajo. */
const FOTOS: Record<string, string> = {
  marketing: '/img/servicios/marketing.webp',
  captacion: '/img/servicios/captacion.webp',
  contenido: '/img/servicios/contenido.webp',
  automatizacion: '/img/servicios/automatizacion.webp',
  integraciones: '/img/servicios/integraciones.webp',
  procesos: '/img/servicios/procesos.webp',
  ia: '/img/servicios/ia.webp',
  acompanamiento: '/img/servicios/acompanamiento.webp',
}

/* Ícono de cada problema de los packs */
const ICONOS_PACK: Record<string, LucideIcon> = { clientes: Users, tiempo: Clock, imagen: Sparkles, herramientas: Puzzle, reservas: CalendarCheck }

function Icono({ id, size = 22 }: { id: string; size?: number }) {
  const I = ICONOS[id]
  return I ? <I size={size} strokeWidth={1.75} aria-hidden="true" /> : null
}

/* Plan web: muestra de la página que se construye, para quién es y un botón principal. Al elegirlo, el botón pasa a
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
      <div className="plan-ilus" aria-hidden="true"><MuestraWeb id={plan.id} nivel={nivel} /></div>
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
    <article className={`pack brillo${completo ? ' pack-completo' : ''}${pack.id === 'reservas' ? ' pack-ancho' : ''}`} data-reveal style={{ '--d': `${(i % 2) * 0.08}s` } as CSSProperties}>
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
export default function Servicios({ as = 'h2', marketing = false }: { as?: Level; marketing?: boolean }) {
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

  const [web, ...otrasLineas] = CONFIG.categorias
  const lineas = marketing ? otrasLineas.filter((c) => c.id === 'marketing') : otrasLineas

  return (
    <section className="alt con-deco">
      {!marketing && <Orbitas lado="derecha" />}
      <div className="wrap sec">
        <div className="head-row" data-reveal>
          <div>
            <Kicker>{marketing ? 'MARKETING' : 'SERVICIOS'}</Kicker>
            <Title as={as}>{marketing ? 'Servicios de marketing' : 'Elige por dónde empezar'}</Title>
          </div>
          <p className="muted" style={{ maxWidth: 420, margin: 0 }}>
            Marca lo que te interesa y solicita tu cotización. El valor y los plazos dependen del alcance de tu proyecto: los definimos contigo al cotizar.
          </p>
        </div>

        {/* Prueba gratis: visible desde el inicio de la página */}
        {!marketing && (
          <Link className={m.demo} href="/prueba-gratis" data-reveal>
            <i aria-hidden="true" />Prueba gratis {CONFIG.demoPlazo}: primero lo pruebas, si te sirve te quedas <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        )}

        {/* 1. Desarrollo web: la tarjeta dice para quién es, con un dibujo del sitio que se construye;
            la explicación va en "Ver qué incluye" */}
        {!marketing && <>
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

        </>}

        {/* 2-4. Marketing y captación, Automatización, IA y consultoría */}
        <div className="cats">
          {lineas.map((c, ci) => (
            <div id={`cat-${c.id}`} className="cat" key={c.id} data-reveal>
              <div className="cat-head">
                <span className="cat-n">{pad(ci + (marketing ? 1 : 2))}</span>
                <Categoria className="sub">{c.nombre}</Categoria>
                <p className="muted" style={{ margin: 0 }}>{c.necesidad}</p>
              </div>
              {c.id === 'marketing' && !marketing ? (
                <Link className={m.mkBanner} href="/marketing" aria-label="Ver marketing y casos reales">
                  {/* eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML */}
                  <img src="/img/ejemplos/marketing.webp" alt="" loading="lazy" decoding="async" width={1000} height={667} />
                  <span className={m.mkFlota} aria-hidden="true">
                    <span style={{ '--i': 0 } as CSSProperties}><Heart size={20} strokeWidth={2.25} /></span>
                    <span style={{ '--i': 1 } as CSSProperties}><TrendingUp size={20} strokeWidth={2.25} /></span>
                    <span style={{ '--i': 2 } as CSSProperties}><MessageCircle size={20} strokeWidth={2.25} /></span>
                  </span>
                  <span className={m.mkTxt}>
                    <small>MARKETING Y CAPTACIÓN</small>
                    <strong>Mira el marketing en acción</strong>
                    <p>Casos reales de contenido y marketing, y los servicios para que más personas te encuentren y te escriban.</p>
                    <span className={m.mkBoton}>Ver marketing <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" /></span>
                  </span>
                </Link>
              ) : <div className="cat-lista">
                {serviciosDe(c).map((s) => (
                  <div className="svc-row" key={s.id}>
                    <div className="svc-txt">
                      {FOTOS[s.id] ? (
                        <span className={m.svcFoto}>
                          {/* eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML */}
                          <img src={FOTOS[s.id]} alt="" loading="lazy" decoding="async" width={800} height={533} />
                          <i><Icono id={s.id} size={16} /></i>
                        </span>
                      ) : (
                        <span className="svc-ico"><Icono id={s.id} size={20} /></span>
                      )}
                      <div>
                        <Item className="t">{s.nombre}</Item>
                        <div className="d">{s.desc}</div>
                      </div>
                    </div>
                    {/* HHA Systems no se agrega: se prueba gratis o se cotiza desde sus vistas previas */}
                    {s.id !== 'hha-systems' && addBtn(s)}
                  </div>
                ))}
              </div>}
              {c.id === 'sistemas' && (
                <>
                  <div className={m.sisPrev}>
                    {VENTANAS.map((v, n) => (
                      <Link key={v.id} className={m.mini} href={`/prueba-gratis?rubro=${v.id}`} aria-label={`Probar gratis HHA Systems: ${rubroDe(v.id)?.chip}`}>
                        <span className={m.miniCara}>
                          <Escena v={v} retraso={n} compacta />
                          <span className={m.miniPie}>{rubroDe(v.id)?.chip}<span>Probar gratis <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" /></span></span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className={m.sisCta}>
                    <p>Vistas de ejemplo con textos de muestra. Tu sistema se diseña con tu marca, tus fotos y tus servicios. Primero lo pruebas {CONFIG.demoPlazo}; si te sirve, te quedas.</p>
                    <Link className="btn-vivo" href="/prueba-gratis">Crea tu prueba gratis <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" /></Link>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Packs: problema → solución, se eligen completos */}
        {!marketing && <>
        <div id="soluciones" className="soluciones-head" data-reveal>
          <Categoria className="sub">¿Qué problema quieres resolver?</Categoria>
          <p className="muted" style={{ margin: 0 }}>Cada pack resuelve un problema completo e incluye todos sus servicios. ¿Necesitas solo uno? Agrégalo desde las categorías de arriba.</p>
        </div>
        <div className="packs">
          {CONFIG.packs.map((p, i) => (
            <PackCard key={p.id} pack={p} i={i} picked={picked} href={href} elegirPack={elegirPack} Titulo={Item} />
          ))}
        </div>

        </>}

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
            <p className="note"><strong>Plazo de entrega:</strong> se define contigo al cotizar, según el alcance de tu proyecto, igual que el valor.</p>
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
