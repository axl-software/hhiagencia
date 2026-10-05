'use client'

import { useEffect, useRef, useState, type FormEvent, type CSSProperties } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { completaFalta, contactarPor, enviarSolicitud, armarMensaje, validar, type Falta } from '@/lib/contacto'
import { RUBROS } from '../portada/rubros'
import { Escena, VENTANAS } from '../portada/sistemasData'
import AvisoFalta from '../AvisoFalta'
import RespuestaSolicitud, { type Resultado } from '../RespuestaSolicitud'
import s from './PruebaGratis.module.css'

/* =========================================================
   Prueba gratis de HHA Systems. A la izquierda, el formulario: tipo de negocio, nombre del negocio, tu nombre,
   correo y WhatsApp. A la derecha, la vista previa de ejemplo del sistema que cambia según el tipo de negocio
   (y muestra el nombre del negocio que la persona escribe). Es una VISTA DE EJEMPLO: la prueba real la prepara
   el equipo con los datos del formulario (se guarda como cualquier solicitud, src/app/api/solicitudes) y se
   avisa por correo o WhatsApp. Aquí no se cotiza: se pide la prueba. La duración sale de CONFIG.demoPlazo.
   Usa useSearchParams (?rubro=barberia): la página debe envolverlo en <Suspense>.
   ========================================================= */
const OPCIONES = RUBROS.filter((r) => r.id !== 'negocio')
const AVISO = 'prueba-aviso'
const EJEMPLO_NOMBRE: Record<string, string> = {
  barberia: 'Barbería El Corte',
  estetica: 'Estudio Luna',
  tatuajes: 'Tinta Negra Estudio',
  optica: 'Óptica Visión',
  wellness: 'Centro Armonía',
}

export default function PruebaGratis() {
  const params = useSearchParams()
  const inicialRubro = OPCIONES.find((r) => r.id === params.get('rubro'))?.id ?? OPCIONES[0].id
  const [rubro, setRubro] = useState(inicialRubro)
  const [negocio, setNegocio] = useState('')
  const [error, setError] = useState<Falta | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const ventana = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inicio = useRef<number | null>(null) // cuándo empezó a escribir (contra bots)

  useEffect(() => {
    if (resultado && !ventana.current?.open) ventana.current?.showModal()
  }, [resultado])

  const v = VENTANAS.find((x) => x.id === rubro) ?? VENTANAS[0]
  const opcion = OPCIONES.find((r) => r.id === rubro) ?? OPCIONES[0]
  const marcar = (campo: string) => error?.campos.includes(campo) || undefined
  const describe = (campo: string) => (marcar(campo) ? AVISO : undefined)
  const dias = CONFIG.demoPlazo || 'unos días'

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const form = ev.currentTarget
    const f = new FormData(form)
    const val = (k: string) => String(f.get(k) ?? '').trim()
    const datos = { nombre: val('nombre'), email: val('email'), telefono: val('telefono') }
    const falta = validar(datos)
    if (falta) {
      setError(falta)
      return
    }
    setError(null)
    const completo = { ...datos, negocio: `${val('negocio')} (${opcion.chip})`.trim(), servicios: ['HHA Systems · Prueba gratis'] }
    const canal = contactarPor(datos)
    setEnviando(true)
    const ok = await enviarSolicitud({ ...completo, origen: 'formulario', canal, sitio: val('sitio'), inicio: inicio.current })
    setEnviando(false)
    setResultado({
      ok,
      nombre: datos.nombre,
      canal,
      dato: canal === 'whatsapp' ? datos.telefono : datos.email,
      texto: armarMensaje(completo),
      origen: 'formulario',
      prueba: true,
    })
    if (ok) {
      form.reset()
      setNegocio('')
      inicio.current = null
    }
  }

  return (
    <section className={s.pagina}>
      <div className={s.izq}>
        <div className={s.izqInterior}>
          <span className={s.sello}><i aria-hidden="true" />Prueba gratis · {dias}</span>
          <h1 className={s.titulo}>
            Tu sistema, <em>listo para probar.</em>
          </h1>
          <p className={s.lead}>
            Elige tu tipo de negocio y cuéntanos cómo se llama. Preparamos tu sistema de reservas y ventas con tu marca y lo pruebas durante {dias}. Primero lo pruebas; si te sirve, te quedas.
          </p>

          <form
            ref={formRef}
            className={s.form}
            method="post"
            onSubmit={onSubmit}
            onInput={(ev) => {
              if (inicio.current === null) inicio.current = Date.now()
              if (error && completaFalta(error, ev.target as HTMLInputElement)) setError(null)
            }}
            noValidate
          >
            <fieldset>
              <legend>¿Qué tipo de negocio tienes?</legend>
              <div className={s.rubros}>
                {OPCIONES.map((r) => {
                  const Icono = r.icono
                  return (
                    <button key={r.id} type="button" className={s.rubro} aria-pressed={r.id === rubro} onClick={() => setRubro(r.id)}>
                      <Icono size={16} strokeWidth={2} aria-hidden="true" />
                      {r.chip}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className={s.dos}>
              <label>
                Nombre del negocio
                <input name="negocio" placeholder={`Ej: ${EJEMPLO_NOMBRE[rubro] ?? 'Mi negocio'}`} autoComplete="organization" value={negocio} onChange={(ev) => setNegocio(ev.target.value)} maxLength={80} />
              </label>
              <label>
                Tu nombre
                <input name="nombre" placeholder="Ej: Carla" autoComplete="name" required aria-invalid={marcar('nombre')} aria-describedby={describe('nombre')} />
              </label>
            </div>
            <label>
              Correo
              <input name="email" type="email" placeholder="tu@correo.cl" autoComplete="email" inputMode="email" aria-invalid={marcar('email')} aria-describedby={describe('email')} />
              <small>Te escribimos ahí cuando tu prueba esté lista.</small>
            </label>
            <label>
              WhatsApp <span className={s.op}>(opcional si dejas tu correo)</span>
              <input name="telefono" type="tel" placeholder="+56 9 1234 5678" autoComplete="tel" inputMode="tel" aria-invalid={marcar('telefono')} aria-describedby={describe('telefono')} />
            </label>

            {/* campo trampa: invisible para las personas; si llega con algo, lo llenó un bot */}
            <div className="trampa" aria-hidden="true">
              <label>Sitio web<input name="sitio" tabIndex={-1} autoComplete="off" /></label>
            </div>
            {error && <AvisoFalta falta={error} form={formRef} id={AVISO} />}

            <button className="btn-vivo" type="submit" disabled={enviando} aria-busy={enviando || undefined}>
              {enviando ? 'Enviando…' : <>Crear mi prueba gratis <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" /></>}
            </button>
            <ul className={s.checks}>
              <li><Check size={14} strokeWidth={3} aria-hidden="true" />Gratis por {dias}</li>
              <li><Check size={14} strokeWidth={3} aria-hidden="true" />Con tu marca y tus servicios</li>
              <li><Check size={14} strokeWidth={3} aria-hidden="true" />Tú decides si te quedas</li>
            </ul>
            <p className="note">
              Al enviar, guardamos tus datos para contactarte. Más detalles en <Link href="/privacidad">Privacidad</Link>.
            </p>
            <p className="note" role="status">{enviando ? 'Enviando tu solicitud…' : ''}</p>
          </form>
        </div>
      </div>

      {/* Vista previa a la izquierda (el formulario va a la derecha, en el orden visual; en el código va primero para el teclado) */}
      <aside className={s.der} aria-label="Vista previa de ejemplo">
        <div className={s.derInterior}>
          <span className={s.kicker}>ASÍ QUEDARÁ TU PRUEBA</span>
          <div className={s.escenaWrap} key={rubro}>
            <div className={s.escena}>
              <Escena v={v} marca={negocio.trim() || undefined} compacta />
            </div>
            {/* tarjeta que se monta sobre la esquina de la vista previa */}
            <div className={s.leyenda}>
              <small>{opcion.chip}</small>
              <strong>{v.titulo}</strong>
            </div>
          </div>
          <p className={s.ejemploNota}>Vista de ejemplo con textos de muestra: tu prueba se prepara con tu marca, tus fotos y tus servicios.</p>
          <ol className={s.ruta}>
            {[
              ['Completas el formulario', 'Un par de minutos.'],
              ['Preparamos tu prueba', 'Con tu tipo de negocio y tu nombre. Te escribimos cuando esté lista.'],
              [`La usas ${dias}`, 'Primero lo pruebas; si te sirve, te quedas.'],
            ].map(([t, d], n) => (
              <li key={t} style={{ '--k': n } as CSSProperties}>
                <span aria-hidden="true">{n + 1}</span>
                <strong>{t}</strong>
                <small>{d}</small>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      {/* Ventana después de enviar. <dialog> nativo: se cierra con Esc, con "Listo" o tocando fuera. */}
      <dialog
        ref={ventana}
        className="modal"
        aria-labelledby="prueba-respuesta-titulo"
        onClose={() => setResultado(null)}
        onClick={(ev) => ev.target === ev.currentTarget && ventana.current?.close()}
      >
        {resultado && (
          <div className="modal-caja">
            <RespuestaSolicitud r={resultado} tituloId="prueba-respuesta-titulo" onListo={() => ventana.current?.close()} />
          </div>
        )}
      </dialog>
    </section>
  )
}
