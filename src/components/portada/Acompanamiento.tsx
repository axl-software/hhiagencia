'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Send } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import s from './Acompanamiento.module.css'

/* =========================================================
   "Te acompañamos en cada paso": cuatro etapas a la izquierda y, a la derecha, una conversación de EJEMPLO
   por etapa, como en un celular. Reemplaza al método de ocho pasos en el inicio (el detalle sigue en
   /como-trabajamos). Las conversaciones son de muestra (rotuladas): no son clientes reales. Sin plazos
   exactos, salvo la demo gratuita (CONFIG.demoPlazo). La etapa cambia sola hasta que la persona elige una;
   con "reducir movimiento" no cambia sola. El botón lleva al formulario de contacto, no a WhatsApp.
   ========================================================= */

type Mensaje = { de: 'cliente' | 'hha'; texto: string; hora: string }
type Etapa = { quien: string; foto: string; cuando: string; titulo: string; texto: string; dia: string; mensajes: Mensaje[] }

const demo = CONFIG.demoPlazo ? `gratuita de ${CONFIG.demoPlazo}` : 'gratuita'

const ETAPAS: Etapa[] = [
  {
    quien: 'HHA Digital Solutions',
    foto: '/img/chat/hha.webp',
    cuando: 'AL INICIO',
    titulo: 'Conversamos',
    texto: 'Entendemos tu negocio y dónde está el problema antes de ofrecerte cualquier solución.',
    dia: 'Martes',
    mensajes: [
      { de: 'cliente', texto: 'Hola, tengo una barbería y llevo las reservas por mensajes. Se me cruzan los horarios 😅', hora: '09:41' },
      { de: 'hha', texto: 'Sin problema. Cuéntanos cómo atiendes hoy y qué te gustaría que hiciera tu sistema.', hora: '09:44' },
      { de: 'hha', texto: 'Con eso armamos una propuesta a tu medida.', hora: '09:44' },
    ],
  },
  {
    quien: 'Herberth · HHA',
    foto: '/img/chat/herberth.webp',
    cuando: 'ANTES DE DECIDIR',
    titulo: 'Lo pruebas',
    texto: `Te preparamos una demo ${demo} para que lo veas funcionando antes de decidir.`,
    dia: 'Jueves',
    mensajes: [
      { de: 'hha', texto: `Ya está lista tu demo ${demo}. Entra con este enlace y pruébala.`, hora: '11:00' },
      { de: 'cliente', texto: 'Me gusta. ¿Se puede cambiar el color de los botones?', hora: '18:20' },
      { de: 'hha', texto: 'Listo, ajustado. Revísalo y me cuentas.', hora: '18:24' },
    ],
  },
  {
    quien: 'Alexander · HHA',
    foto: '/img/chat/alexander.webp',
    cuando: 'AL PUBLICAR',
    titulo: 'Construimos y publicamos',
    texto: 'Armamos tu solución, la probamos en celular y computador, y la publicamos.',
    dia: 'Viernes',
    mensajes: [
      { de: 'hha', texto: 'Tu sitio ya está publicado. Lo revisamos en celular y en computador.', hora: '10:15' },
      { de: 'cliente', texto: '¡Quedó genial! Ya lo compartí con mis clientes.', hora: '10:32' },
      { de: 'hha', texto: 'Cualquier ajuste, nos escribes por aquí.', hora: '10:33' },
    ],
  },
  {
    quien: 'HHA Digital Solutions',
    foto: '/img/chat/hha.webp',
    cuando: 'DESPUÉS',
    titulo: 'Te acompañamos',
    texto: 'Mantenemos, medimos y mejoramos lo construido a medida que tu negocio crece.',
    dia: 'Lunes',
    mensajes: [
      { de: 'cliente', texto: 'Quiero agregar una promoción para este mes.', hora: '09:10' },
      { de: 'hha', texto: 'La preparamos y te avisamos cuando esté publicada.', hora: '09:15' },
      { de: 'hha', texto: 'Además te dejamos un resumen del mes con visitas y contactos.', hora: '09:16' },
    ],
  },
]

const CADA_MS = 8000

export default function Acompanamiento() {
  const [i, setI] = useState(0)
  const [manual, setManual] = useState(false)

  useEffect(() => {
    if (manual) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % ETAPAS.length)
    }, CADA_MS)
    return () => window.clearInterval(t)
  }, [manual])

  const etapa = ETAPAS[i]

  return (
    <section className={s.seccion} aria-labelledby="acompanamiento-titulo">
      <div className="wrap sec">
        <div className={s.caja}>
          <div className={s.izq}>
            <span className={s.kicker}>CÓMO TRABAJAMOS</span>
            <h2 id="acompanamiento-titulo" className={s.titulo}>Te acompañamos en cada paso.</h2>
            <p className={s.sub}>Elige una etapa y mira cómo conversamos.</p>

            <ol className={s.etapas}>
              {ETAPAS.map((e, n) => (
                <li key={e.titulo} className={n <= i ? s.hecha : undefined}>
                  <button
                    type="button"
                    className={s.etapa}
                    aria-pressed={n === i}
                    onClick={() => { setManual(true); setI(n) }}
                  >
                    <span className={s.punto} aria-hidden="true">{n < i ? <Check size={12} strokeWidth={3} /> : null}</span>
                    <span className={s.cuando}>{e.cuando}</span>
                    <span className={s.nombre}>{e.titulo}</span>
                    <span className={s.detalle}>{e.texto}</span>
                  </button>
                </li>
              ))}
            </ol>

            <Link className="btn-vivo" href="/contacto">
              Solicita cotización <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </div>

          <div className={s.der}>
            <span className={s.ejemplo}>EJEMPLO DE CONVERSACIÓN</span>
            <div className={s.celular}>
              <div className={s.cabeza}>
                <span className={s.avatar} aria-hidden="true">
                  {/* quien atiende en esa etapa: logo de HHA o una de las dos personas del equipo */}
                  {/* eslint-disable-next-line @next/next/no-img-element -- imagen chica; next/image rompe la vista previa en HTML */}
                  <img key={etapa.foto + i} src={etapa.foto} alt="" width={128} height={128} />
                </span>
                <div>
                  <strong>{etapa.quien}</strong>
                  <small><i aria-hidden="true" /> en línea</small>
                </div>
                <span className={s.dia}>{etapa.dia}</span>
              </div>
              {/* key: al cambiar de etapa, los mensajes vuelven a entrar uno tras otro */}
              <ol key={i} className={s.chat} aria-label={`Conversación de ejemplo: ${etapa.titulo}`} aria-live={manual ? 'polite' : 'off'}>
                {etapa.mensajes.map((m, k) => (
                  <li key={k} className={`${s.burbuja} ${m.de === 'cliente' ? s.cliente : s.hha}`} style={{ '--k': k } as CSSProperties}>
                    <span>{m.texto}</span>
                    <time>{m.hora}</time>
                  </li>
                ))}
              </ol>
              <div className={s.escribir} aria-hidden="true">
                <span>Escribe un mensaje</span>
                <i><Send size={14} strokeWidth={2.25} /></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
