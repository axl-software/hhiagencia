'use client'

import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { CONFIG, waUrl } from '@/lib/config'
import { Kicker, Title, type Level } from './Heading'

/* Formulario de diagnóstico. Lee ?servicios=a,b (viene del cotizador) para
   dejar marcados esos servicios, y abre WhatsApp (o email) con el mensaje armado.
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

  const [msg, setMsg] = useState('')
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (!f.get('nombre')) {
      setMsg('Escribe tu nombre para continuar.')
      e.currentTarget.querySelector<HTMLInputElement>('[name="nombre"]')?.focus()
      return
    }
    const text = `Hola HH, soy ${f.get('nombre')}${f.get('negocio') ? ' de ' + f.get('negocio') : ''}.
Quiero: ${sel.map((s) => s.nombre).join(', ') || 'Por definir'}
Objetivo: ${f.get('objetivo') || '-'}
Fecha tentativa: ${f.get('fecha') || '-'}
Presupuesto: ${f.get('presupuesto') || '-'}
Decide: ${f.get('decisor') || '-'}`
    const wa = waUrl(text)
    if (wa) {
      window.open(wa, '_blank', 'noopener')
      setMsg('Abrimos WhatsApp con tu mensaje listo.')
    } else if (CONFIG.email) {
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Reunión de prueba HH')}&body=${encodeURIComponent(text)}`
    } else {
      setMsg('Falta configurar el WhatsApp o el email en src/lib/config.ts.')
    }
  }

  const wa = waUrl()

  return (
    <section className="wrap sec split" style={{ alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Kicker style={{ margin: 0 }}>CONTACTO</Kicker>
        <Title as={as}>Agenda tu reunión de prueba</Title>
        <p className="lead">Responde estas preguntas y llegamos a la reunión con una propuesta, no con preguntas. El formulario abre WhatsApp con tu mensaje listo.</p>
        <div className="channels">
          <a href={`https://instagram.com/${CONFIG.instagram}`} target="_blank" rel="noopener noreferrer"><span className="mono">INSTAGRAM</span><strong>@{CONFIG.instagram}</strong></a>
          {wa ? <a href={wa} target="_blank" rel="noopener noreferrer"><span className="mono">WHATSAPP</span><strong>+{CONFIG.whatsapp}</strong></a>
              : <div><span className="mono">WHATSAPP</span><strong>[TU NÚMERO]</strong></div>}
          {CONFIG.email ? <a href={`mailto:${CONFIG.email}`}><span className="mono">EMAIL</span><strong>{CONFIG.email}</strong></a>
              : <div><span className="mono">EMAIL</span><strong>[TU EMAIL]</strong></div>}
          <div><span className="mono">BASE</span><strong>Casablanca · Valparaíso · Viña del Mar</strong></div>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <div className="two">
          <label>Tu nombre<input id="nombre" name="nombre" autoComplete="name" required /></label>
          <label>Negocio o proyecto<input id="negocio" name="negocio" /></label>
        </div>
        <fieldset>
          <legend>¿Qué quieres crear?</legend>
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
        <button className="btn btn-red" type="submit" style={{ minHeight: 56, fontSize: 16 }}>Enviar por WhatsApp →</button>
        <p className="note" role="status">{msg}</p>
      </form>
    </section>
  )
}
