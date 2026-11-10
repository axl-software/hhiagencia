import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { PRECIOS } from '@/lib/precios'
import { Pesos } from '@/components/ui/precio-animado'
import s from './AgendaVideo.module.css'

/* agendAHH en el inicio: un video explicativo (las interfaces completas viven solo en /agendahh). Datos aprobados:
   0 % de comisión, prueba gratis (CONFIG.demoPlazo) y precio "desde" de agendAHH Solo (src/lib/precios.ts). */
export default function AgendaVideo() {
  return (
    <section className="wrap sec" id="agendahh" aria-labelledby="agenda-t">
      <div className={s.dentro}>
        <div data-reveal>
          <p className="kicker">AGENDAHH · HHA SYSTEMS</p>
          <h2 id="agenda-t" className={`display h2 ${s.h2}`}>Tus clientes reservan solos. Tú ves tu día.</h2>
          <p className={`lead ${s.lead}`}>Agenda online con tu marca, tus clientes y tus métricas en un panel propio. Para barberías, estética, tatuajes, ópticas y centros wellness. Mira el video y entiende cómo funciona en un minuto.</p>
          <ul className={s.datos}>
            <li><b>0 %</b> de comisión por tus reservas y ventas</li>
            <li>Prueba de <b>{CONFIG.demoPlazo}</b> sin pagar</li>
            <li>Desde <b><Pesos valor={PRECIOS['system-agenda-solo'].monto ?? 0} /></b>/mes + IVA</li>
          </ul>
          <div className={s.botones}>
            <Link className="btn-vivo" href="/prueba-gratis">Probar agendAHH gratis <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" /></Link>
            <Link className="btn btn-out" href="/agendahh">Ver agendAHH completo</Link>
          </div>
        </div>
        <div className={s.video} data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
          <video controls playsInline preload="none" poster="/videos/agendahh/lanzamiento.jpg" aria-label="Video explicativo de agendAHH">
            <source src="/videos/agendahh/lanzamiento.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
