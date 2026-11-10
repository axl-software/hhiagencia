import { CONFIG } from '@/lib/config'
import s from './Secciones.module.css'

/* Preguntas del inicio: una selección de las de Servicios (src/lib/config.ts → faq), para que no se repitan ni se contradigan. */
const CLAVES = ['comisión', 'implementación', 'demo de una página', 'IVA', 'Región de Valparaíso']

export default function Preguntas() {
  const lista = CLAVES.map((c) => CONFIG.faq.find((f) => f.q.includes(c))).filter((f): f is NonNullable<typeof f> => Boolean(f))
  return (
    <section className="alt" aria-labelledby="faq-inicio-t">
      <div className="wrap sec">
        <div className={s.head} data-reveal>
          <p className="kicker">PREGUNTAS FRECUENTES</p>
          <h2 id="faq-inicio-t" className="display h2">Lo que más nos preguntan.</h2>
        </div>
        <div className={s.faq} data-reveal>
          {lista.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
