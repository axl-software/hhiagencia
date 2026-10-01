import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import Orbitas from '../Orbitas'

/* Banda roja de cierre que lleva a /contacto (CTA aprobado: Solicita cotización).
   La frase de cada página está en src/lib/config.ts → hooks. */
export default function CtaBanda({ titulo = CONFIG.hooks.inicio }: { titulo?: string }) {
  return (
    <section className="cta con-deco">
      <Orbitas lado="derecha" clara />
      <div className="wrap" data-reveal>
        <div className="cta-txt">
          <span className="cta-kicker">¿HABLAMOS?</span>
          <h2 className="display">{titulo}</h2>
        </div>
        <Link className="btn btn-white cta-btn" href="/contacto" style={{ minHeight: 60, fontSize: 16 }}>
          Solicita cotización <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
