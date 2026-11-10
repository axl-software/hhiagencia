import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { PRECIOS } from '@/lib/precios'
import { ContainerScroll } from './ContainerScroll'
import { SlidingNumber } from '@/components/ui/sliding-number'
import s from './Scroll.module.css'
import { Pesos } from '@/components/ui/precio-animado'

/* agendAHH en primer plano: una tarjeta con el panel (vista de ejemplo) que se endereza al hacer scroll. Textos y precios de
   config.ts y precios.ts; HHA cobra 0 % de comisión (confirmado 2026-11-09). */
const FILAS = [
  ['10:00', 'Corte clásico', 'Diego', 'Confirmada'],
  ['10:45', 'Corte y barba', 'Luis', 'Confirmada'],
  ['11:45', 'Limpieza facial', 'Ana', 'Nueva'],
  ['12:30', 'Masaje relajante', 'Sofi', 'Confirmada'],
  ['13:15', 'Examen visual', 'Camila', 'Confirmada'],
]
const BARRAS = [50, 70, 45, 85, 65, 95, 55]

function Hora({ h }: { h: string }) {
  const [a, b] = h.split(':').map(Number)
  return <span style={{ display: 'inline-flex' }}><SlidingNumber value={a} padStart />:<SlidingNumber value={b} padStart /></span>
}

function Panel() {
  return (
    <div className={s.panel}>
      <aside className={s.pSide}>
        {/* eslint-disable-next-line @next/next/no-img-element -- logo chico; next/image rompe la vista previa en HTML */}
        <img src="/brand/hh-logo-blanco.png" alt="" width={480} height={299} />
        <span className={s.on}>Agenda</span><span>Clientes</span><span>Métricas</span><span>Servicios</span>
      </aside>
      <div className={s.pMain}>
        <div className={s.pHead}>Hoy<span>Martes</span><small>agendAHH · panel</small></div>
        <div className={s.pMets}>
          <div><b><SlidingNumber value={12} /></b><span>reservas hoy</span></div>
          <div><b><SlidingNumber value={3} /></b><span>clientes nuevos</span></div>
          <div><b><SlidingNumber value={78} />%</b><span>agenda ocupada</span></div>
        </div>
        <div className={s.pCols}>
          <div className={s.pAgenda}>
            {FILAS.map(([h, serv, quien, est]) => (
              <div key={h} className={s.pFila}><time><Hora h={h} /></time><span>{serv} <i>· {quien}</i></span><em>{est}</em></div>
            ))}
          </div>
          <div className={s.pChart}>
            <b>Esta semana</b>
            <div className={s.pBars} aria-hidden="true">
              {BARRAS.map((h, i) => <i key={i} className={i === 5 ? s.hoy : undefined} style={{ height: `${h}%` }} />)}
            </div>
          </div>
        </div>
      </div>
      <span className={s.pEj}>Vista de ejemplo</span>
    </div>
  )
}

export default function AgendaScroll() {
  return (
    <section className={s.agenda} id="agendahh" aria-labelledby="agenda-t">
      <ContainerScroll
        titulo={
          <>
            <p className="kicker" style={{ margin: 0 }}>AGENDAHH · HHA SYSTEMS</p>
            <h2 id="agenda-t" className="display h2">
              Tus clientes reservan solos.
              <span className={s.grande}>Tú ves tu día.</span>
            </h2>
            <p className="lead">Agenda online con tu marca, tus clientes y tus métricas en un panel propio. Para barberías, estética, tatuajes, ópticas y centros wellness.</p>
          </>
        }
        pie={
          <>
            <ul className={s.datos}>
              <li><b>0 %</b> de comisión por tus reservas y ventas</li>
              <li>Prueba de <b>{CONFIG.demoPlazo}</b> sin pagar</li>
              <li>Desde <b><Pesos valor={PRECIOS['system-agenda-solo'].monto ?? 0} /></b>/mes + IVA</li>
            </ul>
            <div className={s.botones}>
              <Link className="btn-vivo" href="/prueba-gratis">
                Probar agendAHH gratis <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
              </Link>
              <Link className="btn btn-out" href="/agendahh">Ver agendAHH</Link>
            </div>
          </>
        }
      >
        <Panel />
      </ContainerScroll>
    </section>
  )
}
