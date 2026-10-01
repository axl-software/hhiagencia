'use client'

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Image as ImagenIcono, X } from 'lucide-react'
import { CONFIG, type Caso } from '@/lib/config'
import { medir } from '@/lib/medir'
import { Kicker, Title, type Level } from './Heading'
import Orbitas from '../Orbitas'

const CATS = ['Todos', ...Array.from(new Set(CONFIG.casos.map((c) => c.cat)))]
const nombreServicio = (id: string) => CONFIG.servicios.find((s) => s.id === id)?.nombre ?? id

/* Casos aprobados (docs/HHA_BUSINESS_MODEL.md). Foto y resultado solo si son reales.
   Al tocar un proyecto se abre su galería: imágenes que se pasan con flechas, puntos, teclado
   o deslizando el dedo, cada una con qué se hizo y con qué servicio. */
export default function Casos({ as = 'h2' }: { as?: Level }) {
  const [cat, setCat] = useState('Todos')
  const casos = CONFIG.casos.filter((c) => cat === 'Todos' || c.cat === cat)

  const [abierto, setAbierto] = useState<Caso | null>(null)
  const [paso, setPaso] = useState(0)
  const dialogo = useRef<HTMLDialogElement>(null)
  const toque = useRef<number | null>(null)
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
  const servicios = Array.from(new Set(fotos.map((f) => f.servicio)))

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
      <Orbitas lado="derecha" />
      <div className="wrap sec">
        <div className="head-row" data-reveal>
          <div>
            <Kicker>TRABAJO REAL</Kicker>
            <Title as={as}>Proyectos</Title>
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
            <article className={`case card${c.galeria.length ? ' case-abre' : ''}`} key={c.nombre} data-reveal style={{ '--d': `${i * 0.1}s` } as CSSProperties}>
              {c.foto && (
                // eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML
                <div className="ph"><img src={c.foto} alt={c.nombre} loading="lazy" /></div>
              )}
              <span className="mono" style={{ fontSize: 12, letterSpacing: 1.5, color: 'var(--redtx)' }}>{c.tag}</span>
              <span className="card-t">{c.nombre}</span>
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
              <div className="galeria-foto" key={paso}>
                {actual.imagen ? (
                  // eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML
                  <img src={actual.imagen} alt={actual.titulo} />
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
              <Link className="btn btn-red" href={`/contacto?servicios=${servicios.join(',')}`} onClick={cerrar}>Quiero algo así →</Link>
              <button type="button" className="btn btn-out" onClick={cerrar}>Cerrar</button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
