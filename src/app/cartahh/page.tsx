import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Pesos } from '@/components/ui/precio-animado'
import { CARTAHH_EJEMPLO, CARTAHH_PLANES, implCart, montoCart } from '@/lib/cartahh'
import s from './cartahh.module.css'

export const metadata: Metadata = {
  title: 'cartAHH | Carta digital con QR para restaurantes y cafés',
  description: `Carta digital que tus clientes abren con un QR, sin instalar nada. Planes desde $${montoCart('cart-visual').toLocaleString('es-CL')}/mes con IVA incluido. Sin comisiones por pedidos.`,
  alternates: { canonical: '/cartahh' },
}

export default function CartAHH() {
  return (
    <div className={s.pagina}>
      <section className={`wrap ${s.hero}`} aria-labelledby="cart-t">
        <p className={s.kicker}>CARTAHH · CARTA DIGITAL CON QR</p>
        <h1 id="cart-t" className={s.titulo}>¿Tu carta muestra <em>lo mejor</em> de tu negocio?</h1>
        <p className={s.lead}>Tus clientes escanean un código QR y abren una carta digital con fotografías, precios y descripciones. Se abre en el navegador, sin instalar aplicaciones. Nuestro equipo hace toda la configuración por ti.</p>
        <div className={s.botones}>
          <a className="btn-vivo" href="#planes">Ver planes <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" /></a>
          <Link className="btn btn-out" href="/contacto">Solicitar cotización</Link>
        </div>
        <p className={s.mini}>Desde <b><Pesos valor={montoCart('cart-visual')} /></b> al mes · IVA incluido</p>
      </section>

      <section className={`wrap ${s.planes}`} id="planes" aria-labelledby="cart-planes-t">
        <h2 id="cart-planes-t" className={s.h2}>Tres formas de <em>mostrar tu carta</em></h2>
        <ul className={s.grid}>
          {CARTAHH_PLANES.map((p) => (
            <li key={p.id} className={`${s.plan} ${p.destacado ? s.dest : ''}`}>
              <video className={s.video} controls playsInline preload="none" poster={`/videos/cartahh/${p.video}.jpg`} aria-label={`Video de cartAHH ${p.nombre}`}>
                <source src={`/videos/cartahh/${p.video}.mp4`} type="video/mp4" />
              </video>
              <h3 className={s.nombre}><span>cartAHH</span> {p.nombre}</h3>
              <p className={s.lema}>{p.lema}</p>
              <p className={s.precio}><b><Pesos valor={montoCart(p.id)} /></b><span>/ mes · IVA incluido</span></p>
              <p className={s.impl}>Implementación única: <Pesos valor={implCart(p.id)} /> (pago único, sin anualidad)</p>
              <ul className={s.lista}>{p.incluye.map((x) => <li key={x}>{x}</li>)}</ul>
              <div className={s.acc}>
                <a className="btn-plan" href={p.demo} target="_blank" rel="noopener noreferrer">Ver demo <ExternalLink size={15} strokeWidth={2.25} aria-hidden="true" /></a>
                <Link className={s.cot} href="/contacto">Pedir cotización</Link>
              </div>
            </li>
          ))}
        </ul>
        <p className={s.nota}>Las demos usan datos ficticios. Valores en pesos chilenos con IVA incluido. La implementación se paga una sola vez.</p>
      </section>

      <section className={`wrap ${s.claro}`} aria-labelledby="cart-claro-t">
        <h2 id="cart-claro-t" className={s.h2}>Claro desde el <em>primer día</em></h2>
        <ul className={s.puntos}>
          <li><b>0 % de comisión</b><span>No cobramos comisiones por pedidos.</span></li>
          <li><b>Configuración incluida</b><span>La configuración completa la realiza nuestro equipo.</span></li>
          <li><b>Pedidos por WhatsApp</b><span>En DarkKitchen, el cliente arma su pedido y lo envía por WhatsApp desde su propio dispositivo. cartAHH no procesa pagos.</span></li>
          <li><b>Sin anualidad</b><span>La implementación es un pago único.</span></li>
        </ul>
        <p className={s.ejemplo}>Un negocio real con cartAHH DarkKitchen: <a href={CARTAHH_EJEMPLO.url} target="_blank" rel="noopener noreferrer">{CARTAHH_EJEMPLO.nombre} <ExternalLink size={14} aria-hidden="true" /></a></p>
        <div className={s.botones}>
          <Link className="btn-vivo" href="/contacto">Solicitar cotización <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  )
}
