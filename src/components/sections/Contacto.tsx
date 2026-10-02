'use client'

import { useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AtSign, Mail, MapPin, Phone } from 'lucide-react'
import { CONFIG, telHref, telVisible } from '@/lib/config'
import { armarMensaje, completaFalta, enviar, guardar, validar, type Falta } from '@/lib/contacto'
import { respuestasLegibles } from '@/lib/diagnostico'
import { Kicker, Title, type Level } from './Heading'
import Redes from '../Redes'
import Orbitas from '../Orbitas'
import AvisoFalta from '../AvisoFalta'

/* Formulario corto para cotizar: nombre (persona o proyecto), de qué se trata el negocio,
   servicios y correo y/o teléfono. Lee ?servicios=a,b (de /servicios o del diagnóstico) y, si viene
   del diagnóstico, ?prioridad=&web=&etapa= para incluir esas respuestas en el mensaje.
   En móvil el formulario va antes que los datos de contacto (globals.css → .contacto).
   Usa useSearchParams: la página debe envolverlo en <Suspense>. */
export default function Contacto({ as = 'h2' }: { as?: Level }) {
  const params = useSearchParams()
  const [picked, setPicked] = useState<Set<string>>(
    () => new Set((params.get('servicios') ?? '').split(',').filter((id) => CONFIG.servicios.some((s) => s.id === id)))
  )
  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const sel = CONFIG.servicios.filter((s) => picked.has(s.id))
  const diagnostico = respuestasLegibles({
    prioridad: params.get('prioridad') ?? '',
    web: params.get('web') ?? '',
    etapa: params.get('etapa') ?? '',
  })

  const [msg, setMsg] = useState('')
  const [error, setError] = useState<Falta | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inicio = useRef<number | null>(null) // cuándo empezó a escribir (contra bots)
  const marcar = (campo: string) => error?.campos.includes(campo) || undefined

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const val = (k: string) => String(f.get(k) ?? '').trim()
    const datos = { nombre: val('nombre'), email: val('email'), telefono: val('telefono') }

    /* Nombre y correo o WhatsApp son obligatorios: si falta algo, aparece un aviso amable arriba del
       botón, con un botón que lleva directo al campo; los campos que faltan quedan marcados. */
    const falta = validar(datos)
    if (falta) {
      setMsg('')
      setError(falta)
      return
    }
    setError(null)

    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === 'email' ? 'email' : 'whatsapp'
    const completo = { ...datos, negocio: val('negocio'), servicios: sel.map((s) => s.nombre), diagnostico }
    /* se guarda en Supabase y, en el mismo clic, se abre WhatsApp o el correo */
    guardar({ ...completo, origen: 'formulario', canal: via, sitio: val('sitio'), inicio: inicio.current })
    setMsg(await enviar(armarMensaje(completo), via, 'formulario'))
  }

  return (
    <section className="con-deco contacto-sec">
      <Orbitas lado="izquierda" />
      <div className="wrap sec contacto">
      <div className="contacto-intro">
        <Kicker style={{ margin: 0 }}>CONTACTO</Kicker>
        <Title as={as}>Te contactamos</Title>
        <p className="lead">Cuéntanos qué necesitas y agendamos una conversación de diagnóstico. Primero entendemos tu negocio; después te enviamos una propuesta por escrito.</p>
        {diagnostico.length > 0 && (
          <p className="note">Ya tenemos tus respuestas del diagnóstico: van incluidas en tu mensaje.</p>
        )}
      </div>

      {/* Datos de contacto, cada uno con su ícono */}
      <div className="canales contacto-canales">
        {CONFIG.whatsapp && (
          <a className="canal" href={telHref()}>
            <span className="canal-ico"><Phone size={18} strokeWidth={2} aria-hidden="true" /></span>
            <span className="canal-txt"><span className="mono">TELÉFONO</span><strong>{telVisible()}</strong></span>
          </a>
        )}
        {CONFIG.email && (
          <a className="canal" href={`mailto:${CONFIG.email}`}>
            <span className="canal-ico"><Mail size={18} strokeWidth={2} aria-hidden="true" /></span>
            <span className="canal-txt"><span className="mono">CORREO</span><strong>{CONFIG.email}</strong></span>
          </a>
        )}
        <div className="canal">
          <span className="canal-ico"><AtSign size={18} strokeWidth={2} aria-hidden="true" /></span>
          <span className="canal-txt"><span className="mono">REDES</span><Redes usuario="abajo" /></span>
        </div>
        <div className="canal">
          <span className="canal-ico"><MapPin size={18} strokeWidth={2} aria-hidden="true" /></span>
          <span className="canal-txt"><span className="mono">BASE</span><strong>Valparaíso · Trabajamos en todo Chile</strong></span>
        </div>
      </div>

      {/* Tarjeta del formulario: azul noche en ambos modos, con brillo rojo (globals.css → .contacto-form).
          method="post": si alguien enviara antes de que cargue la página, sus datos no quedan en la dirección. */}
      <form
        ref={formRef}
        className="contacto-form"
        method="post"
        onSubmit={onSubmit}
        onInput={(e) => {
          if (inicio.current === null) inicio.current = Date.now()
          if (error && completaFalta(error, e.target as HTMLInputElement)) setError(null)
        }}
        noValidate
      >
        <div className="form-cabeza">
          <h2 className="card-t" style={{ margin: 0 }}>Cuéntanos de tu proyecto</h2>
          <p className="muted" style={{ margin: 0 }}>Solo tu nombre y un medio de contacto son obligatorios; el resto lo vemos en la conversación.</p>
        </div>
        <label>
          <span className="label-fila">Nombre (tuyo o de tu proyecto) <span className="obligatorio">Obligatorio</span></span>
          <input id="nombre" name="nombre" autoComplete="name" required aria-invalid={marcar('nombre')} />
        </label>
        <label>¿De qué se trata tu negocio o proyecto?<input id="negocio" name="negocio" placeholder="Ej: cafetería, consultora, marca de ropa" /></label>
        <fieldset>
          <legend>¿Qué necesitas?</legend>
          <div className="chips">
            {CONFIG.servicios.map((s) => (
              <button key={s.id} type="button" className="chip" aria-pressed={picked.has(s.id)} onClick={() => toggle(s.id)}>{s.nombre}</button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend><span className="label-fila">¿Cómo te contactamos? <span className="obligatorio">Obligatorio: uno de los dos</span></span></legend>
          <div className="two">
            <label>Correo<input id="email" name="email" type="email" autoComplete="email" inputMode="email" aria-invalid={marcar('email')} /></label>
            <label>Teléfono o WhatsApp<input id="telefono" name="telefono" type="tel" autoComplete="tel" inputMode="tel" placeholder="+56 9 1234 5678" aria-invalid={marcar('telefono')} /></label>
          </div>
        </fieldset>
        {/* campo trampa: invisible para las personas; si llega con algo, lo llenó un bot */}
        <div className="trampa" aria-hidden="true">
          <label>Sitio web<input name="sitio" tabIndex={-1} autoComplete="off" /></label>
        </div>
        {error && <AvisoFalta falta={error} form={formRef} />}
        {/* El botón sigue la intención: con servicios elegidos pide cotización; sin ellos, una reunión */}
        <button className="btn-vivo contacto-enviar" type="submit" name="via" value="whatsapp">
          {sel.length ? 'Solicita cotización →' : 'Agenda una reunión →'}
        </button>
        {CONFIG.email && (
          <button className="link-btn" type="submit" name="via" value="email">o envíalo por correo</button>
        )}
        <p className="note form-legal">
          Al enviar, guardamos tus datos para poder contactarte. Más detalles en <Link href="/privacidad">Privacidad</Link>.
        </p>
        <p className="note" role="status">{msg}</p>
      </form>
      </div>
    </section>
  )
}
