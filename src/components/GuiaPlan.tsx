'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, RotateCcw, X } from 'lucide-react'
import { CONFIG } from '@/lib/config'

/* Guía "¿Qué plan necesito?": tres preguntas que recomiendan un plan web (Start, Business o Pro)
   o cualquiera de las otras líneas de servicio, y dejan la recomendación marcada para cotizar
   (/contacto?servicios=a,b). Prioriza la web cuando el negocio no tiene una que le sirva. */

type Prioridad = 'web' | 'automatizacion' | 'marketing' | 'contenido' | 'ia' | 'acompanamiento'
type EstadoWeb = 'no' | 'mala' | 'ok'
type Etapa = 'empezando' | 'creciendo' | 'online'

const PREGUNTAS = [
  {
    titulo: '¿Qué es lo más importante para tu negocio hoy?',
    opciones: [
      ['web', 'Tener una web o mejorar la que tengo'],
      ['automatizacion', 'Ahorrar tiempo automatizando tareas'],
      ['marketing', 'Conseguir más clientes'],
      ['contenido', 'Tener contenido para mis redes'],
      ['ia', 'Aprender a usar IA en mi negocio'],
      ['acompanamiento', 'Ayuda para implementar herramientas digitales'],
    ],
  },
  {
    titulo: '¿Tu negocio tiene sitio web?',
    opciones: [
      ['no', 'No, todavía no'],
      ['mala', 'Sí, pero no me trae clientes'],
      ['ok', 'Sí, y funciona bien'],
    ],
  },
  {
    titulo: '¿En qué etapa está tu negocio?',
    opciones: [
      ['empezando', 'Estoy empezando'],
      ['creciendo', 'Ya vendo y quiero crecer'],
      ['online', 'Quiero vender online o necesito algo a medida'],
    ],
  },
] as const

const PLAN_POR_ETAPA: Record<Etapa, string> = { empezando: 'web-start', creciendo: 'web-business', online: 'web-pro' }

/** Devuelve los ids recomendados: el principal primero. */
function recomendar(p: Prioridad, w: EstadoWeb, e: Etapa): string[] {
  const plan = PLAN_POR_ETAPA[e]
  if (p === 'web') return [plan]
  return w === 'ok' ? [p] : [p, plan]
}

export default function GuiaPlan({ className = 'btn-giro btn-giro-lg' }: { className?: string }) {
  const dialogo = useRef<HTMLDialogElement>(null)
  const [abierta, setAbierta] = useState(false)
  const [respuestas, setRespuestas] = useState<string[]>([])

  useEffect(() => {
    if (abierta && !dialogo.current?.open) dialogo.current?.showModal()
  }, [abierta])

  const paso = respuestas.length
  const listo = paso === PREGUNTAS.length
  const ids = listo ? recomendar(respuestas[0] as Prioridad, respuestas[1] as EstadoWeb, respuestas[2] as Etapa) : []
  const recomendados = ids.map((id) => CONFIG.servicios.find((s) => s.id === id)).filter((s) => s !== undefined)

  const abrir = () => {
    setRespuestas([])
    setAbierta(true)
  }
  const cerrar = () => dialogo.current?.close()

  return (
    <>
      <span className="btn-giro-wrap">
        <button type="button" className={className} onClick={abrir}>
          <span>¿Qué plan necesito?</span>
          <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
        </button>
      </span>

      <dialog
        ref={dialogo}
        className="modal guia"
        aria-labelledby="guia-titulo"
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
                <h3 id="guia-titulo" className="card-t" style={{ margin: 0, paddingRight: 44 }}>{PREGUNTAS[paso].titulo}</h3>
                <div className="guia-opciones">
                  {PREGUNTAS[paso].opciones.map(([valor, texto]) => (
                    <button key={valor} type="button" className="opcion" onClick={() => setRespuestas([...respuestas, valor])}>
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
                <h3 id="guia-titulo" className="card-t" style={{ margin: 0, paddingRight: 44 }}>Esto es lo que te conviene para partir</h3>
                <div className="guia-resultado">
                  {recomendados.map((s, i) => (
                    <div key={s.id} className={`guia-rec${i === 0 ? ' principal' : ''}`}>
                      <span className="mono guia-etiqueta">{i === 0 ? 'TE RECOMENDAMOS' : 'PARA COMPLEMENTAR'}</span>
                      <strong>{s.nombre}</strong>
                      <span className="muted">{s.desc}</span>
                    </div>
                  ))}
                </div>
                <p className="note">Es una guía rápida: en el diagnóstico afinamos la propuesta contigo.</p>
                <div className="modal-acciones">
                  <Link className="btn btn-red" href={`/contacto?servicios=${ids.join(',')}`} onClick={cerrar}>Solicita cotización →</Link>
                  <Link className="btn btn-out" href="/servicios" onClick={cerrar}>Ver todos los servicios</Link>
                </div>
                <button type="button" className="link-btn" style={{ alignSelf: 'flex-start' }} onClick={() => setRespuestas([])}>
                  <RotateCcw size={14} strokeWidth={2} aria-hidden="true" style={{ display: 'inline', verticalAlign: -2, marginRight: 6 }} />
                  Volver a empezar
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  )
}
