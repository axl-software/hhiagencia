'use client'

import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, RotateCcw, X } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { armarMensaje, completaFalta, contactarPor, enviarSolicitud, validar, type Falta } from '@/lib/contacto'
import { PREGUNTAS, recomendar, respuestasLegibles } from '@/lib/diagnostico'
import { medir } from '@/lib/medir'
import AvisoFalta from './AvisoFalta'
import RespuestaSolicitud, { type Resultado } from './RespuestaSolicitud'

/* Diagnóstico de 3 preguntas: una recomendación y, en la misma ventana, nombre y contacto para
   enviar todo (respuestas incluidas) sin cambiar de página. Al enviar se guarda en Supabase y la
   ventana muestra el mensaje de gracias (RespuestaSolicitud). Es el botón de quien todavía no sabe qué
   necesita: encabezado y menú móvil ("Haz tu diagnóstico"), portada ("Te orientamos en 3 preguntas")
   y Servicios cuando no hay nada elegido. */
export default function GuiaPlan({
  etiqueta = 'Haz tu diagnóstico',
  className = 'btn-giro btn-giro-lg',
  giro = true,
  origen = 'portada',
}: { etiqueta?: string; className?: string; giro?: boolean; origen?: string }) {
  const dialogo = useRef<HTMLDialogElement>(null)
  const titulo = `${useId()}-titulo` // hay varias copias del botón en la misma página
  const pasoId = `${titulo}-paso` // "PREGUNTA n DE 3": lo lee el lector de pantalla junto al encabezado
  const encabezado = useRef<HTMLHeadingElement>(null)
  const pasoPrevio = useRef<number | null>(null)
  const [abierta, setAbierta] = useState(false)
  const [respuestas, setRespuestas] = useState<string[]>([])
  const [error, setError] = useState<Falta | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inicio = useRef<number | null>(null) // cuándo empezó a escribir (contra bots)
  const marcar = (campo: string) => error?.campos.includes(campo) || undefined
  /* el aviso de datos faltantes queda asociado a los campos marcados (aria-describedby) */
  const avisoId = `${titulo}-aviso`
  const describe = (campo: string) => (marcar(campo) ? avisoId : undefined)
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState<Resultado | null>(null)
  /* si falla y la persona vuelve a intentar, sus datos siguen escritos */
  const [previo, setPrevio] = useState({ nombre: '', email: '', telefono: '' })

  useEffect(() => {
    if (abierta && !dialogo.current?.open) dialogo.current?.showModal()
  }, [abierta])

  const paso = respuestas.length
  const listo = paso === PREGUNTAS.length
  const ids = listo ? recomendar(respuestas) : []
  const recomendados = ids.map((id) => CONFIG.servicios.find((s) => s.id === id)).filter((s) => s !== undefined)
  const valores = { prioridad: respuestas[0] ?? '', web: respuestas[1] ?? '', etapa: respuestas[2] ?? '' }
  const hrefFormulario = `/contacto?${new URLSearchParams({ servicios: ids.join(','), ...valores }).toString()}`

  /* Al responder, el botón elegido desaparece y el foco se iba al <body>: quien navega con teclado o
     lector de pantalla quedaba fuera de la ventana, que seguía abierta. Al cambiar de paso movemos el
     foco al encabezado de la pregunta nueva (tabIndex -1, no entra en el orden de tabulación), y así
     el lector lo anuncia junto con "PREGUNTA n DE 3" (aria-describedby). No se mueve al abrir ni al
     enviar: ahí el foco ya queda donde corresponde. */
  useEffect(() => {
    if (!abierta) {
      pasoPrevio.current = null
      return
    }
    if (pasoPrevio.current !== null && pasoPrevio.current !== paso) {
      encabezado.current?.focus({ preventScroll: true })
    }
    pasoPrevio.current = paso
  }, [abierta, paso])

  const abrir = () => {
    setRespuestas([])
    setError(null)
    setResultado(null)
    setEnviando(false)
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
      setError(falta)
      return
    }
    setError(null)
    /* Se guarda en Supabase (y desde ahí parte la respuesta automática); ya no se abre WhatsApp. */
    const completo = { ...datos, servicios: recomendados.map((s) => s.nombre), diagnostico: respuestasLegibles(valores) }
    const canal = contactarPor(datos)
    setPrevio(datos)
    setEnviando(true)
    const ok = await enviarSolicitud({ ...completo, origen: 'diagnostico', canal, sitio: val('sitio'), inicio: inicio.current })
    setEnviando(false)
    setResultado({
      ok,
      nombre: datos.nombre,
      canal,
      dato: canal === 'whatsapp' ? datos.telefono : datos.email,
      texto: armarMensaje(completo),
      origen: 'diagnostico',
    })
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
                <div id={pasoId} className="kicker" style={{ margin: 0 }}>PREGUNTA {paso + 1} DE {PREGUNTAS.length}</div>
                <h3 ref={encabezado} id={titulo} tabIndex={-1} aria-describedby={pasoId} className="card-t" style={{ margin: 0, paddingRight: 44 }}>{PREGUNTAS[paso].titulo}</h3>
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
            ) : resultado ? (
              <RespuestaSolicitud r={resultado} tituloId={titulo} onListo={resultado.ok ? cerrar : () => setResultado(null)} />
            ) : (
              <>
                <div className="kicker" style={{ margin: 0 }}>NUESTRA RECOMENDACIÓN</div>
                <h3 ref={encabezado} id={titulo} tabIndex={-1} className="card-t" style={{ margin: 0, paddingRight: 44 }}>Esto es lo que tu negocio necesita para partir</h3>
                <div className="guia-resultado">
                  {recomendados.map((s, i) => (
                    <div key={s.id} className={`guia-rec${i === 0 ? ' principal' : ''}`}>
                      <span className="mono guia-etiqueta">{i === 0 ? 'TE RECOMENDAMOS' : 'PARA COMPLEMENTAR'}</span>
                      <strong>{s.nombre}</strong>
                      <span className="muted">{s.necesidad ?? s.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Contacto en la misma ventana: las respuestas van incluidas en el mensaje */}
                <form
                  ref={formRef}
                  className="guia-form"
                  method="post"
                  onSubmit={onSubmit}
                  onInput={(e) => {
                    if (inicio.current === null) inicio.current = Date.now()
                    if (error && completaFalta(error, e.target as HTMLInputElement)) setError(null)
                  }}
                  noValidate
                >
                  <p className="muted" style={{ margin: 0 }}>Déjanos tus datos y te contactamos para una conversación de diagnóstico sobre tu caso.</p>
                  <label>
                    <span className="label-fila">Nombre (tuyo o de tu proyecto) <span className="obligatorio">Obligatorio</span></span>
                    <input id="guia-nombre" name="nombre" autoComplete="name" required defaultValue={previo.nombre} aria-invalid={marcar('nombre')} aria-describedby={describe('nombre')} />
                  </label>
                  <fieldset>
                    <legend><span className="label-fila">¿Cómo te contactamos? <span className="obligatorio">Obligatorio: uno de los dos</span></span></legend>
                    <div className="two">
                      <label>Teléfono o WhatsApp<input id="guia-telefono" name="telefono" type="tel" autoComplete="tel" inputMode="tel" placeholder="+56 9 1234 5678" defaultValue={previo.telefono} aria-invalid={marcar('telefono')} aria-describedby={describe('telefono')} /></label>
                      <label>Correo<input id="guia-email" name="email" type="email" autoComplete="email" inputMode="email" defaultValue={previo.email} aria-invalid={marcar('email')} aria-describedby={describe('email')} /></label>
                    </div>
                  </fieldset>
                  {/* campo trampa: invisible para las personas; si llega con algo, lo llenó un bot */}
                  <div className="trampa" aria-hidden="true">
                    <label>Sitio web<input name="sitio" tabIndex={-1} autoComplete="off" /></label>
                  </div>
                  {error && <AvisoFalta falta={error} form={formRef} id={avisoId} />}
                  <button className="btn btn-red" type="submit" disabled={enviando} aria-busy={enviando || undefined}>
                    {enviando ? 'Enviando…' : 'Agenda una reunión →'}
                  </button>
                  <p className="note form-legal">
                    Al enviar, guardamos tus datos para poder contactarte. Más detalles en <Link href="/privacidad" onClick={cerrar}>Privacidad</Link>.
                  </p>
                  <p className="note" role="status">{enviando ? 'Enviando tu solicitud…' : ''}</p>
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
