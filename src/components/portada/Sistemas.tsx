'use client'

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, X } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { Escena, VENTANAS, rubroDe, type Ventana } from './sistemasData'
import s from './Sistemas.module.css'

/* =========================================================
   HHA SYSTEMS (docs/HHA_SYSTEMS_PRODUCT.md). Cinco tarjetas siempre visibles, una por rubro: la foto del
   negocio de fondo y encima una "ventanita" con el mismo sistema de reservas y ventas, pero con otra cara en
   cada negocio (diseño, composición, tipografía, forma). Al pasar el cursor la tarjeta se levanta y se inclina
   un poco, en 3D. Las ventanas son vistas de EJEMPLO con textos de muestra, rotuladas así: no son clientes
   ni capturas reales. Cada tarjeta tiene "Ver qué incluye" y lleva a crear la prueba gratis (no a cotizar).
   El nombre interno del producto no se muestra.
   ========================================================= */

/* Inclinación 3D según dónde está el cursor (no en pantallas táctiles) */
const inclinar = (ev: PointerEvent<HTMLDivElement>) => {
  if (ev.pointerType === 'touch') return
  const el = ev.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--ry', `${((ev.clientX - r.left) / r.width - 0.5) * 9}deg`)
  el.style.setProperty('--rx', `${-((ev.clientY - r.top) / r.height - 0.5) * 9}deg`)
}
const soltar = (ev: PointerEvent<HTMLDivElement>) => {
  ev.currentTarget.style.removeProperty('--ry')
  ev.currentTarget.style.removeProperty('--rx')
}

export default function Sistemas() {
  /* Ventana "Ver qué incluye": <dialog> nativo, se cierra con Esc, con la X o tocando fuera */
  const [abierta, setAbierta] = useState<Ventana | null>(null)
  const dialogo = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (abierta && !dialogo.current?.open) dialogo.current?.showModal()
  }, [abierta])
  const cerrar = () => dialogo.current?.close()

  return (
    <section id="sistemas" className={s.sistemas} aria-labelledby="sistemas-titulo">
      <div className={`wrap ${s.interior}`}>
        <div className={s.cabecera}>
          <div className={s.marca} data-reveal>
            <span className={s.kicker}>HHA SYSTEMS</span>
            <span className={s.por}>by HHA Digital Solutions SpA</span>
          </div>
          <h2 id="sistemas-titulo" className={s.titulo} data-reveal style={{ '--d': '0.08s' } as CSSProperties}>
            El sistema de tu negocio, <em>con tu marca.</em>
          </h2>
          <p className={s.lead} data-reveal style={{ '--d': '0.16s' } as CSSProperties}>
            Tus clientes reservan y compran online. Tú ves tus reservas, ventas y clientes desde un panel propio. Todo con el diseño, las fotos y el estilo de tu negocio: dos negocios pueden usar HHA Systems y verse completamente distintos.
          </p>
          <ul className={s.pilares} data-reveal style={{ '--d': '0.24s' } as CSSProperties}>
            {['Reservas', 'Ventas', 'Panel', 'Clientes'].map((p) => <li key={p}>{p}</li>)}
            <li className={s.gratis}>Pruébalo gratis {CONFIG.demoPlazo}</li>
          </ul>
        </div>

        <div className={s.rejilla}>
          {VENTANAS.map((v, n) => (
            <article key={v.id} className={s.tarjeta} data-reveal style={{ '--d': `${(n % 3) * 0.12}s` } as CSSProperties}>
              <div className={s.cara} onPointerMove={inclinar} onPointerLeave={soltar}>
                <Escena v={v} retraso={n} />
                <div className={s.texto}>
                  <h3 className={s.tituloTarjeta}>{v.titulo}</h3>
                  <p>{v.texto}</p>
                  <ul className={s.tags}>{v.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  <div className={s.acciones}>
                    <button type="button" className={s.incluye} onClick={() => setAbierta(v)}>
                      Ver qué incluye <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
                    </button>
                    <Link className={s.probar} href={`/prueba-gratis?rubro=${v.id}`}>
                      Probar gratis <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={s.pie} data-reveal>
          <p>Vistas de ejemplo con textos de muestra. Tu sistema se diseña con tu marca, tus fotos y tus servicios. Primero lo pruebas {CONFIG.demoPlazo}; si te sirve, te quedas.</p>
          {/* Lleva a crear la prueba gratis (nombre del negocio, correo y WhatsApp) */}
          <Link className="btn-vivo" href="/prueba-gratis">
            Crea tu prueba gratis <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Ventana "Ver qué incluye" del rubro elegido */}
      <dialog
        ref={dialogo}
        className="modal"
        aria-labelledby="sistemas-modal-titulo"
        onClose={() => setAbierta(null)}
        onClick={(ev) => ev.target === ev.currentTarget && cerrar()}
      >
        {abierta && (
          <div className="modal-caja">
            <button type="button" className="modal-x" onClick={cerrar} aria-label="Cerrar">
              <X size={20} strokeWidth={2} aria-hidden="true" />
            </button>
            <div className="kicker" style={{ margin: 0 }}>HHA SYSTEMS · {rubroDe(abierta.id)?.chip.toUpperCase()}</div>
            <h3 id="sistemas-modal-titulo" className="card-t" style={{ margin: 0 }}>{abierta.titulo}</h3>
            <p className="muted" style={{ margin: 0 }}>{abierta.texto}</p>
            <div className="kicker" style={{ margin: '8px 0 0' }}>QUÉ INCLUYE</div>
            <ul className="incluye">
              {abierta.incluye.map((it) => (
                <li key={it}><Check size={18} strokeWidth={2.25} aria-hidden="true" />{it}</li>
              ))}
            </ul>
            <p className="note"><strong>Prueba gratis de {CONFIG.demoPlazo}:</strong> primero lo pruebas y, si te sirve, te quedas. El alcance y el valor definitivos se acuerdan contigo.</p>
            <div className="modal-acciones">
              <Link className="btn-vivo" href={`/prueba-gratis?rubro=${abierta.id}`}>
                Crear mi prueba gratis <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
              </Link>
              <button type="button" className="btn btn-out" onClick={cerrar}>Cerrar</button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
