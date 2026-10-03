'use client'

import type { RefObject } from 'react'
import { ArrowUp } from 'lucide-react'
import type { Falta } from '@/lib/contacto'

/* Aviso amable cuando falta un dato obligatorio (el nombre, y el correo o el WhatsApp), con un
   botón que lleva directo al campo que falta. Lo usan el formulario de contacto y el del diagnóstico. */
/* id: los campos marcados lo apuntan con aria-describedby, para que el lector de pantalla lea qué
   falta también cuando la persona vuelve al campo, no solo cuando el aviso aparece. */
export default function AvisoFalta({ falta, form, id }: { falta: Falta; form: RefObject<HTMLFormElement | null>; id?: string }) {
  const ir = () => {
    const campo = form.current?.querySelector<HTMLInputElement>(falta.campos.map((c) => `[name="${c}"]`).join(','))
    if (!campo) return
    const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    campo.focus({ preventScroll: true })
    campo.scrollIntoView({ block: 'center', behavior: suave ? 'smooth' : 'instant' })
    /* respaldo: si el desplazamiento suave no terminó (pestaña en segundo plano, navegador antiguo),
       salta directo al campo para que siempre quede a la vista */
    window.setTimeout(() => {
      const { top, bottom } = campo.getBoundingClientRect()
      if (top < 0 || bottom > window.innerHeight) campo.scrollIntoView({ block: 'center', behavior: 'instant' })
    }, 700)
  }
  return (
    <div className="form-aviso" role="alert" id={id}>
      <p>{falta.texto}</p>
      <button type="button" className="form-aviso-btn" onClick={ir}>
        {falta.accion} <ArrowUp size={16} strokeWidth={2.25} aria-hidden="true" />
      </button>
    </div>
  )
}
