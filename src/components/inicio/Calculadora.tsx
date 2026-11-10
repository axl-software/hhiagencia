'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import s from './Secciones.module.css'

/* "Haz la cuenta": cuánto tiempo al mes se va en agendar a mano. Es solo una multiplicación con los números de la persona
   (citas al día × minutos por cita × 26 días de lunes a sábado); no promete ahorros. */
export default function Calculadora() {
  const [citas, setCitas] = useState(20)
  const [min, setMin] = useState(3)
  const dia = citas * min
  const mes = Math.round((dia * 26) / 60)
  const diaTxt = dia >= 60 ? `${Math.floor(dia / 60)} h${dia % 60 ? ` ${dia % 60} min` : ''}` : `${dia} min`

  return (
    <section className="alt" aria-labelledby="calc-t">
      <div className={`wrap sec ${s.calc}`}>
        <div data-reveal>
          <p className="kicker">HAZ LA CUENTA</p>
          <h2 id="calc-t" className="display h2" style={{ marginBottom: 16 }}>Cada cita agendada a mano es tiempo que no estás atendiendo.</h2>
          <p className="lead">Responder, ofrecer horas, esperar la respuesta y confirmar toma minutos. Mueve los controles con los números de tu negocio y mira cuánto suma al mes.</p>
          <p className={s.nota}>Es una cuenta simple, con tus propios números. Con reserva online, tus clientes eligen la hora solos.</p>
          <p style={{ marginTop: 24 }}>
            <Link className="btn-vivo" href="/prueba-gratis">Probar agendAHH gratis <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" /></Link>
          </p>
        </div>
        <div className={s.calcBox} data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
          <div className={s.slider}>
            <label htmlFor="calc-citas">Citas al día <output htmlFor="calc-citas">{citas}</output></label>
            <input id="calc-citas" type="range" min={1} max={60} value={citas} onChange={(e) => setCitas(+e.target.value)} />
          </div>
          <div className={s.slider}>
            <label htmlFor="calc-min">Minutos que te toma agendar cada una <output htmlFor="calc-min">{min}</output></label>
            <input id="calc-min" type="range" min={1} max={15} value={min} onChange={(e) => setMin(+e.target.value)} />
          </div>
          <div className={s.res} aria-live="polite">
            <div><small>Al día se te van</small><b>{diaTxt}</b></div>
            <div className={s.grande}><small>Al mes (lunes a sábado)</small><b>{mes} horas</b></div>
          </div>
        </div>
      </div>
    </section>
  )
}
