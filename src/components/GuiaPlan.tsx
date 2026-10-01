'use client'

import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, RotateCcw, X } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { armarMensaje, enviar, validar } from '@/lib/contacto'
import { PREGUNTAS, recomendar, respuestasLegibles } from '@/lib/diagnostico'
import { medir } from '@/lib/medir'

/* Diagnóstico "Descubre qué necesita tu negocio": tres preguntas, una recomendación y, en la misma
   ventana, nombre y contacto para enviar todo (respuestas incluidas) sin cambiar de página.
   Se usa en el encabezado y el menú móvil ("Haz tu diagnóstico"), en la portada (botón principal)
   y en Servicios ("Hacer diagnóstico"). */
export default function GuiaPlan({
  etiqueta = 'Descubre qué necesita tu negocio',
  className = 'btn-giro btn-giro-lg',
  giro = true,
  origen = 'portada',
}: { etiqueta?: string; className?: string; giro?: boolean; origen?: string }) {
  const dialogo = useRef<HTMLDialogElement>(null)
  const titulo = `${useId()}-titulo` // hay varias copias del botón en la misma página
  const [abierta, setAbierta] = useState(false)
  const [respuestas, setRespuestas] = useState<string[]>([])
  const [error, setError] = useState<{ campo: string; texto: string } | null>(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (abierta && !dialogo.current?.open) dialogo.current?.showModal()
  }, [abierta])

  const paso = respuestas.length
  const listo = paso === PREGUNTAS.length
  const ids = listo ? recomendar(respuestas) : []
  const recomendados = ids.map((id) => CONFIG.servicios.find((s) => s.id === id)).filter((s) => s !== undefined)
  const valores = { prioridad: respuestas[0] ?? '', web: respuestas[1] ?? '', etapa: respuestas[2] ?? '' }
  const hrefFormulario = `/contacto?${new URLSearchParams({ servicios: ids.join(','), ...valores }).toString()}`

  const abrir = () => {
    setRespuestas([])
    setError(null)
    setMsg('')
    setAbierta(true)
    medir('guia_inicio', { origen })
  }
  const cerrar = () => dialogo.current?.close()
  const responder = (valor: string) => {
    const nuevas = [...respuestas, valor]
    setRespuestas(nuevas)
    if (nuevas.length === PREGUNTAS.length) medir('guia_fin', { origen, recomendacion: recomendar(nuevas).join(',') })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const val = (k: string) => String(f.get(k) ?? '').trim()
    const datos = { nombre: val('nombre'), email: val('email'), telefono: val('telefono') }
    const falta = validar(datos)
    if (falta) {
      setMsg('')
      setError(falta)
      form.querySelector<HTMLInputElement>(`[name="${falta.campo}"]`)?.focus()
      return
    }
    setError(null)
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === 'email' ? 'email' : 'whatsapp'
    const texto = armarMensaje({ ...datos, servicios: recomendados.map((s) => s.nombre), diagnostico: respuestasLegibles(valores) })
    setMsg(await enviar(texto, via, 'diagnostico'))
  }

  const boton = (
    <button type="button" className={className} onClick={abrir}>
      <span>{etiqueta}</span>
      <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
    </button>
  )

  return (
    <>
      {giro ? <span className="btn-giro-wrap">{boton}</span> : boton}

      <dialog
        ref={dialogo}
        className="modal guia"
        aria-labelledby={titulo}
        onClose={() => setAbierta(false)}
        onClick={(e) => e.target === e.currentTarget && cerrar()}
      >
        {abierta && (
          <div className="modal-caja">
            <button type="button" className="modal-x" onClick={cerrar} aria-label="Cerrar">
              <X size={20} strokeWidth={2} aria-hidden="true" />
            </button>

            {!listo ? (
              <>
                <div className="guia-progreso" aria-hidden="true">
                  {PREGUNTAS.map((_, i) => <span key={i} className={i <= paso ? 'on' : undefined} />)}
                </div>
                <div className="kicker" style={{ margin: 0 }}>PREGUNTA {paso + 1} DE {PREGUNTAS.length}</div>
                <h3 id={titulo} className="card-t" style={{ margin: 0, paddingRight: 44 }}>{PREGUNTAS[paso].titulo}</h3>
                <div className="guia-opciones">
                  {PREGUNTAS[paso].opciones.map(([valor, texto]) => (
                    <button key={valor} type="button" className="opcion" onClick={() => responder(valor)}>
                      {texto}
                      <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                  ))}
                </div>
                {paso > 0 && (
                  <button type="button" className="link-btn" style={{ alignSelf: 'flex-start' }} onClick={() => setRespuestas(respuestas.slice(0, -1))}>
                    <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" style={{ display: 'inline', verticalAlign: -2, marginRight: 6 }} />
                    Volver
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="kicker" style={{ margin: 0 }}>NUESTRA RECOMENDACIÓN</div>
                <h3 id={titulo} className="card-t" style={{ margin: 0, paddingRight: 44 }}>Esto es lo que tu negocio necesita para partir</h3>
                <div className="guia-resultado">
                  {recomendados.map((s, i) => (
                    <div key={s.id} className={`guia-rec${i === 0 ? ' principal' : ''}`}>
                      <span className="mono guia-etiqueta">{i === 0 ? 'TE RECOMENDAMOS' : 'PARA COMPLEMENTAR'}</span>
                      <strong>{s.nombre}</strong>
                      <span className="muted">{s.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Contacto en la misma ventana: las respuestas van incluidas en el mensaje */}
                <form className="guia-form" onSubmit={onSubmit} noValidate>
                  <p className="muted" style={{ margin: 0 }}>Déjanos tus datos y te contactamos para una conversación de diagnóstico sobre tu caso.</p>
                  <label>Nombre (tuyo o de tu proyecto)<input id="guia-nombre" name="nombre" autoComplete="name" aria-invalid={error?.campo === 'nombre' || undefined} /></label>
                  <div className="two">
                    <label>Teléfono o WhatsApp<input id="guia-telefono" name="telefono" type="tel" autoComplete="tel" inputMode="tel" placeholder="+56 9 1234 5678" /></label>
                    <label>Correo<input id="guia-email" name="email" type="email" autoComplete="email" inputMode="email" aria-invalid={error?.campo === 'email' || undefined} /></label>
                  </div>
                  {error && <p className="form-error" role="alert">{error.texto}</p>}
                  <button className="btn btn-red" type="submit" name="via" value="whatsapp">Enviar por WhatsApp →</button>
                  {CONFIG.email && <button className="link-btn" type="submit" name="via" value="email">o envíalo por correo</button>}
                  <p className="note" role="status">{msg}</p>
                </form>

                <div className="guia-pie">
                  <Link href={hrefFormulario} onClick={cerrar} className="link-btn">Prefiero el formulario completo</Link>
                  <button type="button" className="link-btn" onClick={() => setRespuestas([])}>
                    <RotateCcw size={14} strokeWidth={2} aria-hidden="true" style={{ display: 'inline', verticalAlign: -2, marginRight: 6 }} />
                    Volver a empezar
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  )
}
