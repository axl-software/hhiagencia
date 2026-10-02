import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CONFIG, type Cierre } from '@/lib/config'
import Orbitas from '../Orbitas'

/* Banda de cierre (roja en oscuro, azul noche en claro). Frase, botón y destino de cada página
   en src/lib/config.ts → hooks. */
export default function CtaBanda({ cierre = CONFIG.hooks.inicio }: { cierre?: Cierre }) {
  const { kicker, titulo, boton, href } = cierre
  return (
    <section className="cta con-deco">
      <Orbitas lado="derecha" clara />
      <div className="wrap" data-reveal>
        <div className="cta-txt">
          <span className="cta-kicker">{kicker}</span>
          <h2 className="display">{titulo}</h2>
        </div>
        <Link className="btn btn-white cta-btn" href={href} style={{ minHeight: 60, fontSize: 16 }}>
          {boton} <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
