'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Building2, CalendarCheck, Check, Clock, Gift, Globe, GraduationCap, Heart, LayoutDashboard, LifeBuoy, ListChecks, Magnet, Mail, Megaphone, MessageCircle, PenTool,
  Plug, Puzzle, Rocket, ShoppingCart, Sparkles, TrendingUp, Users, Wallet, Workflow, X, type LucideIcon,
} from 'lucide-react'
import { CONFIG, type Categoria, type Pack, type Servicio } from '@/lib/config'
import { PACKS_PRECIO, precioDe } from '@/lib/precios'
import { medir } from '@/lib/medir'
import { Kicker, Title, type Level } from './Heading'
import Orbitas from '../Orbitas'
import GuiaPlan from '../GuiaPlan'
import MuestraWeb from './MuestraWeb'
import { Periodo, PrecioLinea, PrecioPack, PrecioPlan, PrecioSimple, NOTA_IMPL, NOTA_IMPL_DETALLE, NOTA_PAUTA } from './Precios'
import { Escena, VENTANAS, rubroDe } from '../portada/sistemasData'
import m from './Servicios.module.css'

const pad = (n: number) => String(n).padStart(2, '0')
/* Demo gratuita de los planes web; el plazo se edita en src/lib/config.ts → demoPlazo */
const DEMO = `al cotizar te preparamos una demo para que pruebes tu web antes de decidir`
const porId = (id: string) => CONFIG.servicios.find((s) => s.id === id)
const serviciosDe = (c: Categoria) => c.servicios.map(porId).filter((s) => s !== undefined)
const planesDe = (linea: Servicio) => (linea.planes ?? []).map(porId).filter((s) => s !== undefined)

/* Ícono de cada línea de servicio (por id de src/lib/config.ts). Sin robots ni cerebros: docs/HHA_BRAND_FOUNDATION.md */
const ICONOS: Record<string, LucideIcon> = {
  web: Globe,
  'web-presentation': Rocket,
  'web-starter': Building2,
  'web-business': Building2,
  'web-pro': ShoppingCart,
  'hha-systems': LayoutDashboard,
  automatizacion: Workflow,
  integraciones: Plug,
  procesos: ListChecks,
  marketing: Megaphone,
  captacion: Magnet,
  'email-marketing': Mail,
  contenido: PenTool,
  ia: GraduationCap,
  capacitacion: Users,
  acompanamiento: LifeBuoy,
}

/* Foto de cada servicio (Unsplash, licencia libre para uso comercial; autores en docs/HHA_TECH_STACK.md).
   HHA Systems no lleva: sus vistas previas por rubro van debajo. */
const FOTOS: Record<string, string> = {
  marketing: '/img/servicios/marketing.webp',
  'email-marketing': '/img/servicios/email-marketing.webp',
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

/* Qué se abre en "Ver todo lo incluido": un servicio o plan, o un pack */
type Detalle = { tipo: 'servicio'; s: Servicio } | { tipo: 'pack'; p: Pack }

/* Plan: el nombre, su frase de valor, el precio (regular tachado + lanzamiento, o anual), los beneficios principales
   y un botón. Al elegirlo, el botón pasa a "Solicita cotización" con la selección (igual que los packs). El recomendado
   lleva el botón rojo. En web se ve una muestra de la página que se construye.
   Titulo: el nivel de encabezado que corresponde bajo el de su categoría (sin saltos). */
function PlanCard({ plan, linea, nivel, total, anual, elegido, href, toggle, verDetalle, Titulo }: {
  plan: Servicio
  linea: string
  nivel: number
  total: number
  anual: boolean
  elegido: boolean
  href: string
  toggle: (id: string) => void
  verDetalle: (d: Detalle) => void
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
  const p = precioDe(plan.id)
  const dominio = plan.dominio ? (anual ? plan.dominio.anual : plan.dominio.mensual) : null
  const destacarDominio = anual && plan.dominio?.anualDestacado

  return (
    <article
      className={`plan${plan.destacado ? ' plan-top' : ''}${elegido ? ' plan-elegido' : ''}`}
      data-reveal
      style={{ '--d': `${(nivel - 1) * 0.08}s` } as CSSProperties}
    >
      {plan.destacado && <span className="plan-badge">RECOMENDADO</span>}
      {linea === 'web' && <div className="plan-ilus" aria-hidden="true"><MuestraWeb id={plan.id} nivel={nivel} /></div>}
      <div className="plan-cabeza">
        <Titulo className="plan-nombre">{plan.nombre}</Titulo>
        <span className="plan-nivel" aria-hidden="true">
          {Array.from({ length: total }, (_, n) => <i key={n} className={n < nivel ? 'on' : undefined} />)}
        </span>
      </div>
      <p className="plan-necesidad" style={{ flex: 'none' }}>{plan.desc}</p>
      <PrecioPlan id={plan.id} anual={anual} />
      {plan.beneficios?.length ? (
        <ul className={m.bens}>
          {plan.beneficios.map((b) => (
            <li key={b}><Check size={16} strokeWidth={2.5} aria-hidden="true" />{b}</li>
          ))}
          {dominio && (
            <li className={destacarDominio ? m.domDestacado : undefined}>
              <Globe size={16} strokeWidth={2.25} aria-hidden="true" />
              {destacarDominio ? <strong>{plan.dominio?.anualDestacado}</strong> : dominio}
            </li>
          )}
        </ul>
      ) : null}
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
        ) : plan.prueba === 'sistemas' ? (
          /* HHA Systems: elegir plan lleva a elegir el rubro (barbería, estética…) y pedir la prueba con tu nombre y contacto */
          <Link
            className={`${plan.destacado ? 'btn-vivo' : 'btn-plan'} plan-btn ${m.planSistema}`}
            href={`/prueba-gratis?plan=${plan.id}`}
            onClick={() => medir('servicio_agregado', { servicio: plan.id })}
            aria-label={`Elegir ${plan.nombre} y escoger tu tipo de negocio`}
          >
            Elegir plan <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
          </Link>
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
        {p?.implementacion && <p className={m.impl}>{NOTA_IMPL}</p>}
        <button type="button" className="ver-mas" onClick={() => verDetalle({ tipo: 'servicio', s: plan })}>
          Ver todo lo incluido <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

/* Pack: se vende completo ("Elegir pack" agrega todos sus servicios). Quien quiera solo uno lo
   agrega desde las categorías de arriba. El ahorro va destacado, justo bajo el precio. */
function PackCard({ pack, i, picked, href, elegirPack, verDetalle, Titulo }: {
  pack: Pack
  i: number
  picked: Set<string>
  href: string
  elegirPack: (pack: Pack, agregar: boolean) => void
  verDetalle: (d: Detalle) => void
  Titulo: 'h3' | 'h4'
}) {
  const completo = pack.servicios.every((id) => picked.has(id))
  const IconoPack = ICONOS_PACK[pack.id]
  return (
    <article className={`pack brillo${completo ? ' pack-completo' : ''}${pack.id === 'reservas' ? ' pack-ancho' : ''}${pack.destacado ? ` ${m.packTop}` : ''}`} data-reveal style={{ '--d': `${(i % 2) * 0.08}s` } as CSSProperties}>
      {pack.destacado && <span className={m.packBadge}>RECOMENDADO</span>}
      <div className="pack-cabeza">
        {IconoPack && <span className="pack-ico"><IconoPack size={22} strokeWidth={1.75} aria-hidden="true" /></span>}
        <span className="pack-nombre">PACK {pack.nombre.toUpperCase()}</span>
      </div>
      <Titulo className="pack-problema">{pack.problema}</Titulo>
      <p className="muted" style={{ margin: 0 }}>{pack.detalle}</p>
      <PrecioPack id={pack.id} />
      <ul className={m.bens} aria-label="Incluye">
        {pack.incluye.map((it) => (
          <li key={it}><Check size={16} strokeWidth={2.5} aria-hidden="true" />{it}</li>
        ))}
      </ul>
      <div className="pack-pie">
        {completo ? (
          <>
            <Link className="btn btn-red pack-btn" href={href}>Solicita cotización →</Link>
            <button type="button" className="link-btn" onClick={() => elegirPack(pack, false)}>Quitar pack</button>
            <span className="pack-badge">✓ Pack en tu selección</span>
          </>
        ) : (
          <button type="button" className="btn btn-red pack-btn" onClick={() => elegirPack(pack, true)}>Elegir pack</button>
        )}
        <button type="button" className="ver-mas" onClick={() => verDetalle({ tipo: 'pack', p: pack })}>
          Ver qué incluye <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

/* Servicios en bloques (docs/HHA_SERVICES.md):
   1. Categorías: Desarrollo web y HHA Systems (planes con precio regular, lanzamiento y opción anual), Marketing y
      captación, Automatización, e IA y consultoría. Cada categoría tiene ancla: /servicios#cat-marketing.
   2. "¿Qué problema quieres resolver?": packs con nombre y ahorro, que se eligen completos.
   3. "Tu selección": sin nada elegido invita al diagnóstico; con algo elegido, a la cotización.
   4. Servicios adicionales y preguntas frecuentes.
   Los montos salen de src/lib/precios.ts (única fuente). La implementación nunca muestra monto: solo "+ costo de
   implementación (pago único)". La selección viaja a /contacto?servicios=a,b. */
export default function Servicios({ as = 'h2', marketing = false }: { as?: Level; marketing?: boolean }) {
  /* Encabezados sin saltos: las categorías van un nivel bajo el título de la sección, y los planes,
     servicios y packs un nivel bajo su categoría. El diseño lo dan las clases, no el elemento. */
  const Categoria = as === 'h1' ? 'h2' : 'h3'
  const Item = as === 'h1' ? 'h3' : 'h4'
  const [picked, setPicked] = useState<Set<string>>(() => new Set())
  /* Mensual | Anual: una sola elección para los planes web y los de HHA Systems */
  const [anual, setAnual] = useState(false)
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

  /* Ventana "Ver todo lo incluido": detalle del plan, servicio o pack. <dialog> nativo: se cierra con Esc, con la X o tocando fuera. */
  const [detalle, setDetalle] = useState<Detalle | null>(null)
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

  /* Grupo de planes de una línea (web, HHA Systems, marketing, contenido) */
  const grupoPlanes = (linea: Servicio, conPeriodo: boolean) => {
    const planes = planesDe(linea)
    return (
      <div className={m.grupo} key={linea.id}>
        {conPeriodo ? (
          <div className={m.grupoCabeza}>
            <Periodo anual={anual} onChange={setAnual} etiqueta={linea.nombre} />
            <p className={m.periodoNota}>Precio lanzamiento vigente. En anual pagas los 12 meses por adelantado, con 20% de descuento.</p>
          </div>
        ) : null}
        <div className={m.planes}>
          {planes.map((pl, n) => (
            <PlanCard key={pl.id} plan={pl} linea={linea.id} nivel={n + 1} total={planes.length} anual={anual} elegido={picked.has(pl.id)} href={href} toggle={toggle} verDetalle={setDetalle} Titulo={Item} />
          ))}
        </div>
      </div>
    )
  }

  const [web, ...otrasLineas] = CONFIG.categorias
  const lineas = marketing ? otrasLineas.filter((c) => c.id === 'marketing') : otrasLineas
  const lineaWeb = porId('web')

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
            Marca lo que te interesa y solicita tu cotización. Valores en pesos chilenos, más IVA. El detalle de pago y plazos va en tu cotización.
          </p>
        </div>

        {/* Prueba gratis: visible desde el inicio de la página */}
        {!marketing && (
          <Link className={m.demo} href="/prueba-gratis" data-reveal>
            <i aria-hidden="true" />Prueba gratis {CONFIG.demoPlazo}: primero lo pruebas, si te sirve te quedas <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        )}

        {/* 1. Desarrollo web: la tarjeta tiene un dibujo del sitio que se construye, el precio y lo principal que trae */}
        {!marketing && lineaWeb && <>
        <div id={`cat-${web.id}`} className="cat-web" data-reveal>
          <span className="cat-n">{pad(1)}</span>
          <Categoria className="sub">{web.nombre}</Categoria>
          <p className="muted" style={{ margin: 0 }}>{web.necesidad}</p>
        </div>
        {grupoPlanes(lineaWeb, true)}
        </>}

        {/* 2-4. HHA Systems, Marketing y captación, Automatización, IA y consultoría */}
        <div className="cats">
          {lineas.map((c, ci) => {
            const conPlanes = serviciosDe(c).some((s) => s.planes?.length)
            return (
              <div id={`cat-${c.id}`} className={`cat${conPlanes ? ` ${m.catAncho}` : ''}`} key={c.id} data-reveal>
                <div className="cat-head">
                  <span className="cat-n">{pad(ci + (marketing ? 1 : 2))}</span>
                  <Categoria className="sub">{c.nombre}</Categoria>
                  <p className="muted" style={{ margin: 0 }}>{c.necesidad}</p>
                </div>
                <div className={`${m.catCuerpo}${conPlanes ? '' : ' cat-lista'}`}>
                  {c.id === 'marketing' && !marketing && (
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
                  )}

                  {serviciosDe(c).map((s) => {
                    /* Línea con niveles: sus planes en tarjetas */
                    if (s.planes?.length) {
                      return (
                        <div key={s.id} className={m.linea}>
                          {s.id !== 'hha-systems' && <div className={m.lineaCabeza}>
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
                              <Item className={m.lineaNombre}>{s.nombre}</Item>
                              <p className="muted" style={{ margin: '4px 0 0' }}>{s.desc}</p>
                            </div>
                          </div>}
                          {grupoPlanes(s, s.id === 'hha-systems')}
                        </div>
                      )
                    }
                    /* Servicio con un solo precio: fila con su precio "desde", lo que incluye y agregar */
                    return (
                      <div className={`svc-row ${m.fila}`} key={s.id}>
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
                            <div className={m.filaPrecio}>
                              <PrecioLinea id={s.id} />
                              <button type="button" className="ver-mas" onClick={() => setDetalle({ tipo: 'servicio', s })}>
                                Ver qué incluye <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {addBtn(s)}
                      </div>
                    )
                  })}

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

                  {c.id === 'marketing' && <p className={m.pauta}>{NOTA_PAUTA}</p>}
                </div>
              </div>
            )
          })}
        </div>

        {/* Packs: problema → solución, se eligen completos */}
        {!marketing && <>
        <div id="soluciones" className="soluciones-head" data-reveal>
          <Categoria className="sub">¿Qué problema quieres resolver?</Categoria>
          <p className="muted" style={{ margin: 0 }}>Cada pack resuelve un problema completo e incluye todos sus servicios, con ahorro. ¿Necesitas solo uno? Agrégalo desde las categorías de arriba.</p>
        </div>
        <div className="packs">
          {CONFIG.packs.map((p, i) => (
            <PackCard key={p.id} pack={p} i={i} picked={picked} href={href} elegirPack={elegirPack} verDetalle={setDetalle} Titulo={Item} />
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

        {/* Adicionales y preguntas frecuentes (solo en Servicios) */}
        {!marketing && <>
        <div id="adicionales" className={m.bloque} data-reveal>
          <Categoria className="sub">Servicios adicionales</Categoria>
          <p className="muted" style={{ margin: 0 }}>Lo que no incluyen los planes se puede sumar según tu necesidad. Se cotiza según el alcance.</p>
          <div className={m.adic}>
            {CONFIG.adicionales.map((a) => (
              <div key={a.titulo} className={m.adicCard}>
                <Item className={m.adicTitulo}>{a.titulo}</Item>
                <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>

        <div id="preguntas" className={m.bloque} data-reveal>
          <Categoria className="sub">Preguntas frecuentes</Categoria>
          <div className={m.faq}>
            {CONFIG.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        </>}
      </div>

      {/* Ventana "Ver todo lo incluido": lo que trae el plan, servicio o pack */}
      <dialog
        ref={dialogo}
        className="modal"
        aria-labelledby="modal-titulo"
        onClose={() => setDetalle(null)}
        onClick={(e) => e.target === e.currentTarget && cerrar()}
      >
        {detalle && <ContenidoDetalle detalle={detalle} anual={anual} picked={picked} toggle={toggle} elegirPack={elegirPack} cerrar={cerrar} />}
      </dialog>

    </section>
  )
}

function ContenidoDetalle({ detalle, anual, picked, toggle, elegirPack, cerrar }: {
  detalle: Detalle
  anual: boolean
  picked: Set<string>
  toggle: (id: string) => void
  elegirPack: (p: Pack, agregar: boolean) => void
  cerrar: () => void
}) {
  const esPack = detalle.tipo === 'pack'
  const s = detalle.tipo === 'servicio' ? detalle.s : null
  const pack = detalle.tipo === 'pack' ? detalle.p : null
  const nombre = s?.nombre ?? `Pack ${pack?.nombre}`
  const idIcono = s ? (CONFIG.servicios.find((x) => x.planes?.includes(s.id))?.id ?? s.id) : 'marketing'
  const destacado = s?.destacado || pack?.destacado
  const incluye = s?.incluye ?? pack?.incluye ?? []
  const noIncluye = s?.noIncluye ?? pack?.noIncluye
  const precioId = s?.id
  const p = precioId ? precioDe(precioId) : undefined
  const packPrecio = pack ? PACKS_PRECIO[pack.id] : undefined
  const llevaImpl = Boolean(p?.implementacion || packPrecio?.implementacion)
  const elegido = s ? picked.has(s.id) : pack ? pack.servicios.every((id) => picked.has(id)) : false
  const alElegir = () => (s ? toggle(s.id) : pack ? elegirPack(pack, !elegido) : undefined)

  return (
    <div className="modal-caja">
      <button type="button" className="modal-x" onClick={cerrar} aria-label="Cerrar">
        <X size={20} strokeWidth={2} aria-hidden="true" />
      </button>
      {destacado && <span className="plan-badge" style={{ position: 'static', alignSelf: 'flex-start' }}>RECOMENDADO</span>}
      <div className="modal-head">
        <span className="plan-ico"><Icono id={esPack ? 'marketing' : idIcono} /></span>
        <h3 id="modal-titulo" className="card-t" style={{ margin: 0 }}>{nombre}</h3>
      </div>
      <p className="muted" style={{ margin: 0 }}>{s?.desc ?? pack?.detalle}</p>

      {s?.grupo === 'plan' && p ? <div className={m.modalPrecio}>{p.regular ? <PrecioPlan id={s.id} anual={anual} /> : <PrecioSimple id={s.id} />}</div> : null}
      {s?.grupo === 'linea' && p ? <div className={m.modalPrecio}><PrecioLinea id={s.id} /></div> : null}
      {pack ? <div className={m.modalPrecio}><PrecioPack id={pack.id} /></div> : null}

      <div className="kicker" style={{ margin: '8px 0 0' }}>QUÉ INCLUYE</div>
      <ul className="incluye">
        {incluye.map((it) => (
          <li key={it}><Check size={18} strokeWidth={2.25} aria-hidden="true" />{it}</li>
        ))}
      </ul>

      {s?.ejemplo && <p className={m.ejemplo}>{s.ejemplo}</p>}

      {noIncluye?.length ? (
        <>
          <div className="kicker" style={{ margin: '8px 0 0' }}>NO INCLUYE</div>
          <ul className="incluye">
            {noIncluye.map((it) => (
              <li key={it}><X size={18} strokeWidth={2.25} aria-hidden="true" style={{ color: 'var(--mut)' }} />{it}</li>
            ))}
          </ul>
        </>
      ) : null}

      {s?.dominio && (
        <>
          <div className="kicker" style={{ margin: '8px 0 0' }}>DOMINIO</div>
          <ul className="incluye">
            <li><Globe size={18} strokeWidth={2} aria-hidden="true" /><span>Pagando mensual: {s.dominio.mensual}<br />Pagando anual: {s.dominio.anual}</span></li>
          </ul>
        </>
      )}

      {s?.notas?.length ? (
        <ul className="incluye">
          {s.notas.map((n) => <li key={n}><Gift size={18} strokeWidth={2} aria-hidden="true" />{n}</li>)}
        </ul>
      ) : null}

      {packPrecio?.nota && <p className="note">{packPrecio.nota}</p>}

      {(p?.anual || llevaImpl || s?.prueba === 'web') && (
        <>
          <div className="kicker" style={{ margin: '8px 0 0' }}>CÓMO SE PAGA</div>
          <ul className="incluye">
            {p?.anual && <li><Wallet size={18} strokeWidth={2} aria-hidden="true" /><span>Suscripción mensual, o anual con 20% de descuento sobre el precio lanzamiento. El plan anual se paga completo por adelantado.</span></li>}
            {llevaImpl && <li><Wallet size={18} strokeWidth={2} aria-hidden="true" /><span><strong>{NOTA_IMPL}.</strong> {NOTA_IMPL_DETALLE}</span></li>}
            {s?.prueba === 'web' && <li><Gift size={18} strokeWidth={2} aria-hidden="true" /><span><strong>Demo gratuita:</strong> {DEMO}</span></li>}
          </ul>
        </>
      )}

      {(pack?.id === 'clientes' || s?.id === 'marketing-starter' || s?.id === 'marketing-business' || s?.id === 'marketing-pro' || s?.id === 'captacion') && (
        <p className="note">{NOTA_PAUTA}</p>
      )}

      <p className="note">Valores en pesos chilenos (CLP), más IVA. El plazo de entrega y la forma de pago se detallan en tu cotización.</p>
      <div className="modal-acciones">
        <button type="button" className="btn btn-red" onClick={alElegir} aria-pressed={elegido}>
          {elegido ? (esPack ? '✓ Pack elegido' : '✓ Elegido') : esPack ? 'Elegir este pack' : s?.grupo === 'plan' ? 'Elegir este plan' : 'Agregar a mi selección'}
        </button>
        <button type="button" className="btn btn-out" onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  )
}
