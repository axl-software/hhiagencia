'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent, type TouchEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Image as ImagenIcono, Images, MonitorPlay, Pause, Play, Wine, X, type LucideIcon } from 'lucide-react'
import { CONFIG, categoriaDe, type Caso } from '@/lib/config'
import { medir } from '@/lib/medir'
import { Kicker, Title, type Level } from './Heading'
import FondoProyectos from '../FondoProyectos'

const CATS = ['Todos', ...Array.from(new Set(CONFIG.casos.map((c) => c.cat)))]
const nombreServicio = (id: string) => CONFIG.servicios.find((s) => s.id === id)?.nombre ?? id
/* "Reducir movimiento" del dispositivo: los clips no se reproducen solos (se muestran con controles) */
const sinSuscripcion = () => () => {}
const useReducirMovimiento = () =>
  useSyncExternalStore(sinSuscripcion, () => window.matchMedia('(prefers-reduced-motion: reduce)').matches, () => false)

/* Ícono de la portada según el rubro del proyecto (mientras no haya foto) */
const ICONO_RUBRO: Record<string, LucideIcon> = { Streaming: MonitorPlay, Gastronomía: Wine }

/* Casos aprobados (docs/HHA_BUSINESS_MODEL.md). Foto y resultado solo si son reales.
   Al tocar un proyecto se abre su galería: imágenes que se pasan con flechas, puntos, teclado
   o deslizando el dedo, cada una con qué se hizo y con qué servicio. */
/* Portada de la tarjeta: la primera foto del proyecto o, mientras no haya, un fondo azul noche con
   brillo rojo en movimiento, una trama de puntos, un haz de luz que la cruza y el ícono del rubro
   (globals.css → .case-portada). */
function Portada({ caso }: { caso: Caso }) {
  const primera = caso.galeria.find((g) => g.imagen)
  const foto = caso.foto || primera?.imagen
  const Icono = ICONO_RUBRO[caso.cat] ?? Images
  const videos = caso.galeria.filter((g) => g.video).length
  const fotos = caso.galeria.length - videos
  const conteo = [fotos && `${fotos} ${fotos === 1 ? 'FOTO' : 'FOTOS'}`, videos && `${videos} ${videos === 1 ? 'VIDEO' : 'VIDEOS'}`].filter(Boolean).join(' · ')
  return (
    <div className={`case-portada${foto ? ' case-portada-foto' : ''}`} aria-hidden="true">
      {foto ? (
        // eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML
        <img src={foto} alt="" loading="lazy" style={primera?.foco && !caso.foto ? { objectPosition: primera.foco } : undefined} />
      ) : (
        <span className="case-portada-ico"><Icono size={34} strokeWidth={1.6} /></span>
      )}
      {caso.galeria.length > 0 && <span className="case-pasos mono">{conteo}</span>}
    </div>
  )
}

export default function Casos({ as = 'h2', kicker = 'TRABAJO REAL', encabezado = 'Proyectos' }: { as?: Level; kicker?: string; encabezado?: string }) {
  /* El nombre de cada proyecto es un encabezado, un nivel bajo el título de la sección: así se puede
     saltar de un proyecto a otro con lector de pantalla. La clase .card-t mantiene el mismo aspecto. */
  const Nombre = as === 'h1' ? 'h2' : 'h3'
  const [cat, setCat] = useState('Todos')
  const casos = CONFIG.casos.filter((c) => cat === 'Todos' || c.cat === cat)

  const reducir = useReducirMovimiento()
  const [abierto, setAbierto] = useState<Caso | null>(null)
  const [paso, setPaso] = useState(0)
  const dialogo = useRef<HTMLDialogElement>(null)
  const toque = useRef<number | null>(null)
  /* Los clips se reproducen solos y en bucle: hace falta poder pausarlos (WCAG 2.2.2).
     Con "reducir movimiento" no arrancan solos y ya traen los controles del navegador. */
  const video = useRef<HTMLVideoElement>(null)
  const [pausado, setPausado] = useState(false)
  const titulo = useId()
  useEffect(() => {
    if (abierto && !dialogo.current?.open) dialogo.current?.showModal()
  }, [abierto])

  const abrir = (c: Caso) => {
    setPaso(0)
    setAbierto(c)
    medir('proyecto_visto', { proyecto: c.nombre })
  }
  const cerrar = () => dialogo.current?.close()

  const fotos = abierto?.galeria ?? []
  const total = fotos.length
  const actual = fotos[paso]
  const ir = (n: number) => setPaso((n + total) % total)
  /* "Explora soluciones similares": lleva a la categoría de Servicios del servicio principal del proyecto */
  const categoria = fotos.length ? categoriaDe(fotos[0].servicio) : undefined
  const hrefSimilares = categoria ? `${categoria.id === 'marketing' ? '/marketing' : '/servicios'}#cat-${categoria.id}` : '/servicios#soluciones'

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowRight') ir(paso + 1)
    if (e.key === 'ArrowLeft') ir(paso - 1)
  }
  const onTouchStart = (e: TouchEvent) => {
    toque.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: TouchEvent) => {
    if (toque.current === null) return
    const dx = e.changedTouches[0].clientX - toque.current
    toque.current = null
    if (Math.abs(dx) > 40) ir(paso + (dx < 0 ? 1 : -1))
  }

  return (
    <section className="alt con-deco">
      {/* fondo propio de Proyectos: interfaz de edición y automatización (no las órbitas) */}
      <FondoProyectos />
      <div className="wrap sec">
        <div className="head-row" data-reveal>
          <div>
            <Kicker>{kicker}</Kicker>
            <Title as={as}>{encabezado}</Title>
          </div>
          {CONFIG.casos.length > 3 && (
            <div className="chips" role="group" aria-label="Filtrar casos">
              {CATS.map((c) => (
                <button key={c} type="button" className="chip" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
          )}
        </div>
        <div className="grid">
          {casos.map((c, i) => (
            <article className={`case card brillo${c.galeria.length ? ' case-abre' : ''}`} key={c.nombre} data-reveal style={{ '--d': `${i * 0.1}s` } as CSSProperties}>
              <Portada caso={c} />
              <span className="mono" style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--redtx)' }}>{c.tag}</span>
              <Nombre className="card-t">{c.nombre}</Nombre>
              <span className="muted">{c.resumen}</span>
              <ul>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
              {c.resultado && <div className="result">RESULTADO: {c.resultado}</div>}
              {c.galeria.length > 0 && (
                /* el botón cubre toda la tarjeta (globals.css → .case-abre) */
                <button type="button" className="case-ver" onClick={() => abrir(c)}>
                  Ver proyecto <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
                </button>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Galería del proyecto. <dialog> nativo: se cierra con Esc, con la X o tocando fuera. */}
      <dialog
        ref={dialogo}
        className="modal modal-proyecto"
        aria-labelledby={titulo}
        onClose={() => setAbierto(null)}
        onClick={(e) => e.target === e.currentTarget && cerrar()}
        onKeyDown={onKeyDown}
      >
        {abierto && actual && (
          <div className="modal-caja">
            <button type="button" className="modal-x" onClick={cerrar} aria-label="Cerrar">
              <X size={20} strokeWidth={2} aria-hidden="true" />
            </button>
            <div className="proyecto-head">
              <span className="mono" style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--mut)' }}>{abierto.tag}</span>
              <h3 id={titulo} className="card-t" style={{ margin: 0 }}>{abierto.nombre}</h3>
            </div>

            <div className="galeria" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              {/* La foto o el clip se ven completos; detrás, la misma imagen difuminada llena los costados */}
              <div className="galeria-foto" key={paso}>
                {actual.imagen || actual.video ? (
                  <>
                    {actual.imagen && (
                      // eslint-disable-next-line @next/next/no-img-element -- fondo decorativo
                      <img className="galeria-fondo" src={actual.imagen} alt="" aria-hidden="true" />
                    )}
                    {actual.video ? (
                      <video
                        ref={video}
                        className="galeria-medio"
                        src={actual.video}
                        poster={actual.imagen || undefined}
                        aria-label={actual.titulo}
                        muted
                        loop
                        playsInline
                        autoPlay={!reducir}
                        controls={reducir}
                        onPlay={() => setPausado(false)}
                        onPause={() => setPausado(true)}
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML
                      <img className="galeria-medio" src={actual.imagen} alt={actual.titulo} />
                    )}
                  </>
                ) : (
                  <div className="galeria-vacia">
                    <ImagenIcono size={32} strokeWidth={1.5} aria-hidden="true" />
                    <span>Imagen pendiente</span>
                  </div>
                )}
              </div>
              {total > 1 && (
                <>
                  <button type="button" className="galeria-flecha galeria-ant" onClick={() => ir(paso - 1)} aria-label="Imagen anterior">
                    <ArrowLeft size={20} strokeWidth={2.25} aria-hidden="true" />
                  </button>
                  <button type="button" className="galeria-flecha galeria-sig" onClick={() => ir(paso + 1)} aria-label="Imagen siguiente">
                    <ArrowRight size={20} strokeWidth={2.25} aria-hidden="true" />
                  </button>
                </>
              )}
              {/* Pausar o reanudar el clip. Solo cuando arranca solo: con "reducir movimiento" el
                  video ya muestra los controles del navegador y no se duplican. */}
              {actual.video && !reducir && (
                <button
                  type="button"
                  className="galeria-flecha galeria-pausa"
                  onClick={() => {
                    const v = video.current
                    if (!v) return
                    if (v.paused) v.play().catch(() => {})
                    else v.pause()
                  }}
                  aria-label={pausado ? 'Reproducir el video' : 'Pausar el video'}
                >
                  {pausado
                    ? <Play size={18} strokeWidth={2.25} aria-hidden="true" />
                    : <Pause size={18} strokeWidth={2.25} aria-hidden="true" />}
                </button>
              )}
              <span className="galeria-contador mono" aria-hidden="true">{paso + 1} / {total}</span>
            </div>

            <div aria-live="polite">
              <div className="galeria-texto" key={paso}>
                <span className="galeria-servicio">{nombreServicio(actual.servicio)}</span>
                <strong>{actual.titulo}</strong>
                <span className="muted">{actual.texto}</span>
              </div>
            </div>

            {total > 1 && (
              <div className="galeria-puntos" role="group" aria-label="Elegir imagen">
                {fotos.map((f, i) => (
                  <button
                    key={f.titulo}
                    type="button"
                    aria-label={`Imagen ${i + 1} de ${total}: ${f.titulo}`}
                    aria-current={i === paso || undefined}
                    onClick={() => setPaso(i)}
                  />
                ))}
              </div>
            )}

            <div className="modal-acciones">
              <Link className="btn btn-red" href={hrefSimilares} onClick={cerrar}>Explora soluciones similares →</Link>
              <button type="button" className="btn btn-out" onClick={cerrar}>Cerrar</button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
