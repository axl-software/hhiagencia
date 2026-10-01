'use client'

import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { CONFIG, telHref, telVisible } from '@/lib/config'
import { armarMensaje, enviar, validar } from '@/lib/contacto'
import { respuestasLegibles } from '@/lib/diagnostico'
import { Kicker, Title, type Level } from './Heading'
import Redes from '../Redes'

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
  const [error, setError] = useState<{ campo: string; texto: string } | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const val = (k: string) => String(f.get(k) ?? '').trim()
    const datos = { nombre: val('nombre'), email: val('email'), telefono: val('telefono') }

    /* Los dos botones necesitan los mismos datos para armar el mensaje: si falta algo,
       se avisa arriba del botón y se marca el campo. */
    const falta = validar(datos)
    if (falta) {
      setMsg('')
      setError(falta)
      form.querySelector<HTMLInputElement>(`[name="${falta.campo}"]`)?.focus()
      return
    }
    setError(null)

    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === 'email' ? 'email' : 'whatsapp'
    const texto = armarMensaje({ ...datos, negocio: val('negocio'), servicios: sel.map((s) => s.nombre), diagnostico })
    setMsg(await enviar(texto, via, 'formulario'))
  }

  return (
    <section className="wrap sec contacto">
      <div className="contacto-intro">
        <Kicker style={{ margin: 0 }}>CONTACTO</Kicker>
        <Title as={as}>Te contactamos</Title>
        <p className="lead">Cuéntanos qué necesitas. Te escribimos para acordar una reunión y llegamos con una propuesta, no con preguntas.</p>
        {diagnostico.length > 0 && (
          <p className="note">Ya tenemos tus respuestas del diagnóstico: van incluidas en tu mensaje.</p>
        )}
      </div>

      <div className="channels contacto-canales">
        {CONFIG.whatsapp && <a href={telHref()}><span className="mono">TELÉFONO</span><strong>{telVisible()}</strong></a>}
        {CONFIG.email && <a href={`mailto:${CONFIG.email}`}><span className="mono">CORREO</span><strong>{CONFIG.email}</strong></a>}
        <div><span className="mono">REDES</span><Redes usuario="abajo" /></div>
        <div><span className="mono">BASE</span><strong>Valparaíso · Trabajamos en todo Chile</strong></div>
      </div>

      <form className="contacto-form" onSubmit={onSubmit} noValidate>
        <label>Nombre (tuyo o de tu proyecto)<input id="nombre" name="nombre" autoComplete="name" required aria-invalid={error?.campo === 'nombre' || undefined} /></label>
        <label>¿De qué se trata tu negocio o proyecto?<input id="negocio" name="negocio" placeholder="Ej: cafetería, consultora, marca de ropa" /></label>
        <fieldset>
          <legend>¿Qué necesitas?</legend>
          <div className="chips">
            {CONFIG.servicios.map((s) => (
              <button key={s.id} type="button" className="chip" aria-pressed={picked.has(s.id)} onClick={() => toggle(s.id)}>{s.nombre}</button>
            ))}
          </div>
        </fieldset>
        <div className="two">
          <label>Correo<input id="email" name="email" type="email" autoComplete="email" inputMode="email" aria-invalid={error?.campo === 'email' || undefined} /></label>
          <label>Teléfono o WhatsApp<input id="telefono" name="telefono" type="tel" autoComplete="tel" inputMode="tel" placeholder="+56 9 1234 5678" /></label>
        </div>
        <p className="note" style={{ marginTop: -10 }}>Con uno de los dos basta.</p>
        {error && <p className="form-error" role="alert">{error.texto}</p>}
        <button className="btn btn-red" type="submit" name="via" value="whatsapp" style={{ minHeight: 56, fontSize: 16 }}>Solicita cotización →</button>
        {CONFIG.email && (
          <button className="link-btn" type="submit" name="via" value="email">o envíala por correo</button>
        )}
        <p className="note" role="status">{msg}</p>
      </form>
    </section>
  )
}
