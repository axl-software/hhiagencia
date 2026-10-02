'use client'

import { useState } from 'react'
import { AlertCircle, Check, Mail, MessageCircle } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { enviar } from '@/lib/contacto'

/** Lo que pasó al enviar un formulario (contacto o diagnóstico). */
export type Resultado = {
  ok: boolean
  nombre: string
  canal: 'whatsapp' | 'email'
  /** El teléfono o el correo que dejó la persona. */
  dato: string
  /** Mensaje armado, por si hay que enviarlo por WhatsApp o correo (solo si falló el guardado). */
  texto: string
  origen: 'formulario' | 'diagnostico'
}

/* Respuesta después de enviar: agradece y dice por dónde y cuándo lo contacta el asesor comercial.
   Si no se pudo guardar, ofrece enviar la solicitud por WhatsApp o correo para que no se pierda.
   El plazo está en src/lib/config.ts → tiempoRespuesta. */
export default function RespuestaSolicitud({ r, onListo, tituloId }: { r: Resultado; onListo: () => void; tituloId: string }) {
  const [aviso, setAviso] = useState('')
  const nombre = r.nombre.split(/\s+/)[0]

  if (r.ok) {
    const via = r.canal === 'whatsapp' ? `por WhatsApp al ${r.dato}` : `por correo a ${r.dato}`
    return (
      <div className="respuesta">
        <span className="respuesta-ico"><Check size={30} strokeWidth={2.5} aria-hidden="true" /></span>
        <h3 id={tituloId} className="card-t" style={{ margin: 0 }}>¡Gracias por contarnos tu proyecto, {nombre}!</h3>
        <p className="muted" style={{ margin: 0 }}>
          Nuestro asesor comercial te contactará <strong>{via}</strong> {CONFIG.tiempoRespuesta}.
        </p>
        <button type="button" className="btn btn-red" onClick={onListo}>Listo</button>
      </div>
    )
  }

  return (
    <div className="respuesta respuesta-error">
      <span className="respuesta-ico"><AlertCircle size={30} strokeWidth={2.25} aria-hidden="true" /></span>
      <h3 id={tituloId} className="card-t" style={{ margin: 0 }}>No pudimos enviar tu solicitud</h3>
      <p className="muted" style={{ margin: 0 }}>
        Puede ser un problema de conexión. Para que no se pierda, envíanosla directo con un clic: el mensaje ya va escrito.
      </p>
      <div className="respuesta-acciones">
        {CONFIG.whatsapp && (
          <button type="button" className="btn btn-red" onClick={async () => setAviso(await enviar(r.texto, 'whatsapp', r.origen))}>
            <MessageCircle size={18} strokeWidth={2} aria-hidden="true" style={{ marginRight: 8 }} /> Enviar por WhatsApp
          </button>
        )}
        {CONFIG.email && (
          <button type="button" className="btn btn-out" onClick={async () => setAviso(await enviar(r.texto, 'email', r.origen))}>
            <Mail size={18} strokeWidth={2} aria-hidden="true" style={{ marginRight: 8 }} /> Enviar por correo
          </button>
        )}
      </div>
      <button type="button" className="link-btn" onClick={onListo}>Volver e intentar de nuevo</button>
      <p className="note" role="status">{aviso}</p>
    </div>
  )
}
