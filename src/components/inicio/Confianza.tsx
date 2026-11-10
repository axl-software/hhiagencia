import Link from 'next/link'
import s from './Secciones.module.css'

/* Negocios que ya trabajan con HHA. Solo nombres (sin cifras ni testimonios inventados). Cuando haya permiso y descripción de cada
   proyecto, se suman aquí. "Tu negocio, aquí" lleva a pedir cotización. */
const NEGOCIOS = [
  { nombre: 'Tamburrini', detalle: 'Barber Studio' },
  { nombre: 'Fanatigol', detalle: 'Tienda deportiva' },
  { nombre: 'JAV Ingeniería', detalle: 'Ingeniería' },
]

export default function Confianza() {
  return (
    <section className="wrap sec" id="confianza" aria-labelledby="conf-t">
      <div className={s.head} data-reveal>
        <p className="kicker">CONFIANZA</p>
        <h2 id="conf-t" className="display h2">Ya trabajan con nosotros.</h2>
        <p className="lead">Algunos de los negocios que ya trabajan con nosotros.</p>
      </div>
      <ul className={s.logos}>
        {NEGOCIOS.map((n, i) => (
          <li key={n.nombre} className={s.logo} data-reveal style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}>
            {n.nombre}<small>{n.detalle}</small>
          </li>
        ))}
        <li data-reveal style={{ '--d': '0.24s' } as React.CSSProperties}>
          <Link href="/contacto" className={`${s.logo} ${s.logoVacio}`} style={{ display: 'block' }}>Tu negocio, aquí</Link>
        </li>
      </ul>
    </section>
  )
}
