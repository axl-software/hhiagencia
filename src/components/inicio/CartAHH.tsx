import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Pesos } from '@/components/ui/precio-animado'
import { CARTAHH_PLANES, montoCart } from '@/lib/cartahh'
import s from './CartAHH.module.css'

/* Bloque de cartAHH en el inicio: carta digital con QR. Montos de src/lib/precios.ts (IVA incluido). Textos aprobados 2026-11-10. */
export default function CartAHH() {
  return (
    <section className={s.bloque} id="cartahh" aria-labelledby="cartahh-t">
      <div className={`wrap ${s.dentro}`}>
        <div className={s.texto} data-reveal>
          <p className={s.kicker}>CARTAHH · CARTA DIGITAL CON QR</p>
          <h2 id="cartahh-t" className={s.h2}>Tu carta, vista <em>como merece.</em></h2>
          <p className={s.lead}>Tus clientes escanean un QR y abren tu carta en el navegador, con fotografías, precios y categorías. Sin instalar nada y sin comisiones por pedidos.</p>
          <ul className={s.planes}>
            {CARTAHH_PLANES.map((p) => (
              <li key={p.id}><b>{p.nombre}</b><span>{p.lema}</span><em>Desde <Pesos valor={montoCart(p.id)} />/mes</em></li>
            ))}
          </ul>
          <p className={s.nota}>Valores con IVA incluido. Implementación de pago único.</p>
          <div className={s.botones}>
            <Link className="btn-vivo" href="/cartahh">Conocer cartAHH <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" /></Link>
            <Link className="btn btn-out" href="/contacto">Solicitar cotización</Link>
          </div>
        </div>
        <div className={s.video} data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
          <video controls playsInline muted loop preload="none" poster="/videos/cartahh/visual.jpg" aria-label="Video de cartAHH">
            <source src="/videos/cartahh/visual.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
