'use client'

import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { CONFIG, igDmUrl, telVisible, waUrl } from '@/lib/config'
import { Kicker, Title, type Level } from './Heading'

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* Formulario corto para cotizar: nombre (persona o proyecto), de qué se trata el negocio,
   servicios (llegan marcados desde /servicios con ?servicios=a,b) y correo y/o teléfono.
   Envía por WhatsApp; si también hay email, ofrece enviarlo por correo. Sin ninguno de los
   dos, copia el mensaje y ofrece el chat de Instagram.
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

  const wa = waUrl()
  const [msg, setMsg] = useState('')
  const [igListo, setIgListo] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const val = (k: string) => String(f.get(k) ?? '').trim()
    const focus = (k: string) => form.querySelector<HTMLInputElement>(`[name="${k}"]`)?.focus()

    if (!val('nombre')) {
      setMsg('Escribe tu nombre o el de tu proyecto.')
      return focus('nombre')
    }
    if (!val('email') && !val('telefono')) {
      setMsg('Déjanos tu correo o tu teléfono para responderte.')
      return focus('email')
    }
    if (val('email') && !EMAIL_OK.test(val('email'))) {
      setMsg('Revisa tu correo: parece que le falta algo.')
      return focus('email')
    }

    const text = `Hola HHiAgencia, soy ${val('nombre')}.
Mi negocio o proyecto: ${val('negocio') || '-'}
Me interesa: ${sel.map((s) => s.nombre).join(', ') || 'Por definir'}
Correo: ${val('email') || '-'}
Teléfono: ${val('telefono') || '-'}`

    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value
    const waText = waUrl(text)
    if (waText && via !== 'email') {
      window.open(waText, '_blank', 'noopener')
      setMsg('Abrimos WhatsApp con tu mensaje listo: solo falta enviarlo.')
    } else if (CONFIG.email) {
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Solicitud de cotización · HHiAgencia')}&body=${encodeURIComponent(text)}`
      setMsg('Abrimos tu correo con el mensaje listo: solo falta enviarlo.')
    } else {
      try {
        await navigator.clipboard.writeText(text)
        setMsg('Listo: copiamos tu mensaje. Abre el chat y pégalo.')
      } catch {
        setMsg('Abre el chat y cuéntanos lo que escribiste aquí.')
      }
      setIgListo(true)
    }
  }

  return (
    <section className="wrap sec split" style={{ alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Kicker style={{ margin: 0 }}>CONTACTO</Kicker>
        <Title as={as}>Agenda una reunión</Title>
        <p className="lead">Cuéntanos qué necesitas y llegamos a la reunión con una propuesta, no con preguntas.</p>
        <div className="channels">
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer"><span className="mono">WHATSAPP</span><strong>{telVisible()}</strong></a>}
          {CONFIG.email && <a href={`mailto:${CONFIG.email}`}><span className="mono">CORREO</span><strong>{CONFIG.email}</strong></a>}
          <a href={`https://instagram.com/${CONFIG.instagram}`} target="_blank" rel="noopener noreferrer"><span className="mono">INSTAGRAM</span><strong>@{CONFIG.instagram}</strong></a>
          <div><span className="mono">BASE</span><strong>Región de Valparaíso</strong></div>
          <div><span className="mono">ATENDEMOS</span><strong>Todo Chile</strong></div>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <label>Nombre (tuyo o de tu proyecto)<input id="nombre" name="nombre" autoComplete="name" required /></label>
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
          <label>Correo<input id="email" name="email" type="email" autoComplete="email" inputMode="email" /></label>
          <label>Teléfono o WhatsApp<input id="telefono" name="telefono" type="tel" autoComplete="tel" inputMode="tel" placeholder="+56 9 1234 5678" /></label>
        </div>
        <p className="note" style={{ marginTop: -10 }}>Con uno de los dos basta.</p>
        <button className="btn btn-red" type="submit" name="via" value="principal" style={{ minHeight: 56, fontSize: 16 }}>Solicita cotización →</button>
        {wa && CONFIG.email && (
          <button className="link-btn" type="submit" name="via" value="email">o envíala por correo</button>
        )}
        <p className="note" role="status">{msg}</p>
        {igListo && (
          <a className="btn btn-out" href={igDmUrl()} target="_blank" rel="noopener noreferrer">Abrir chat de Instagram →</a>
        )}
      </form>
    </section>
  )
}
