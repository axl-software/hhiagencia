'use client'

import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { CONFIG, igDmUrl, waUrl } from '@/lib/config'
import { Kicker, Title, type Level } from './Heading'

/* Formulario de diagnóstico. Lee ?servicios=a,b (viene de /servicios) para dejar
   marcados esos servicios y arma el mensaje. Canal: WhatsApp si hay número, si no
   email, y mientras ambos están pendientes, Instagram (copia el mensaje y ofrece abrir el chat).
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
  const canal = wa
    ? 'Se abre WhatsApp con tu mensaje listo.'
    : CONFIG.email
      ? 'Se abre tu correo con el mensaje listo.'
      : 'Copiamos tu mensaje y te llevamos al chat de Instagram para que lo pegues.'

  const [msg, setMsg] = useState('')
  const [igListo, setIgListo] = useState(false)
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (!f.get('nombre')) {
      setMsg('Escribe tu nombre para continuar.')
      e.currentTarget.querySelector<HTMLInputElement>('[name="nombre"]')?.focus()
      return
    }
    const text = `Hola HHiAgencia, soy ${f.get('nombre')}${f.get('negocio') ? ' de ' + f.get('negocio') : ''}.
Me interesa: ${sel.map((s) => s.nombre).join(', ') || 'Por definir'}
Objetivo: ${f.get('objetivo') || '-'}
Fecha tentativa: ${f.get('fecha') || '-'}
Presupuesto: ${f.get('presupuesto') || '-'}
Decide: ${f.get('decisor') || '-'}`
    const waText = waUrl(text)
    if (waText) {
      window.open(waText, '_blank', 'noopener')
      setMsg('Abrimos WhatsApp con tu mensaje listo.')
    } else if (CONFIG.email) {
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Solicitud de cotización · HHiAgencia')}&body=${encodeURIComponent(text)}`
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
          <a href={`https://instagram.com/${CONFIG.instagram}`} target="_blank" rel="noopener noreferrer"><span className="mono">INSTAGRAM</span><strong>@{CONFIG.instagram}</strong></a>
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer"><span className="mono">WHATSAPP</span><strong>+{CONFIG.whatsapp}</strong></a>}
          {CONFIG.email && <a href={`mailto:${CONFIG.email}`}><span className="mono">EMAIL</span><strong>{CONFIG.email}</strong></a>}
          <div><span className="mono">BASE</span><strong>Casablanca · Valparaíso · Viña del Mar</strong></div>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <div className="two">
          <label>Tu nombre<input id="nombre" name="nombre" autoComplete="name" required /></label>
          <label>Negocio o proyecto<input id="negocio" name="negocio" /></label>
        </div>
        <fieldset>
          <legend>¿Qué necesitas?</legend>
          <div className="chips">
            {CONFIG.servicios.map((s) => (
              <button key={s.id} type="button" className="chip" aria-pressed={picked.has(s.id)} onClick={() => toggle(s.id)}>{s.nombre}</button>
            ))}
          </div>
        </fieldset>
        <label>¿Cuál es el objetivo principal?<textarea id="objetivo" name="objetivo" rows={3} /></label>
        <div className="two">
          <label>Fecha tentativa<input id="fecha" name="fecha" placeholder="Ej: mediados de noviembre" /></label>
          <label>Presupuesto aproximado<input id="presupuesto" name="presupuesto" /></label>
        </div>
        <label>¿Quién toma la decisión final?<input id="decisor" name="decisor" /></label>
        <button className="btn btn-red" type="submit" style={{ minHeight: 56, fontSize: 16 }}>Solicita cotización →</button>
        <p className="note">{canal}</p>
        <p className="note" role="status">{msg}</p>
        {igListo && (
          <a className="btn btn-out" href={igDmUrl()} target="_blank" rel="noopener noreferrer">Abrir chat de Instagram →</a>
        )}
      </form>
    </section>
  )
}
