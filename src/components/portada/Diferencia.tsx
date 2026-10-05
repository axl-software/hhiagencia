import type { CSSProperties } from 'react'
import s from './Diferencia.module.css'

/* "Por qué HHA": la diferencia, en una banda (roja en oscuro, azul noche en claro, como la banda de cierre).
   El logo HH, solo el símbolo y muy tenue, ocupa la mitad derecha del fondo. Las frases son afirmaciones
   de negocio: antes de publicarlas, los fundadores confirman que son ciertas para HHA Systems (en especial
   "0 % de comisión"). Sin cifras de uso ni resultados. */
const FILAS: [string, string][] = [
  ['Tu marca', 'El sistema se adapta a tu identidad: diseño, fotos y animaciones propias.'],
  ['0 %', 'de comisión por tus reservas y ventas.'],
  ['Tu sistema', 'propio, sin depender de plataformas ajenas.'],
  ['Tu panel', 'tus ventas, reservas y clientes a la vista.'],
  ['Marketing', 'estrategia incorporada para que tus clientes no te olviden.'],
]

export default function Diferencia() {
  return (
    <section className={s.banda} aria-labelledby="diferencia-titulo">
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML */}
      <img className={s.logo} src="/brand/hh-logo-blanco.png" alt="" width={480} height={299} aria-hidden="true" />
      <div className={`wrap ${s.caja}`}>
        <div className={s.izq} data-reveal>
          <span className={s.kicker}>POR QUÉ HHA</span>
          <h2 id="diferencia-titulo" className={`display ${s.titulo}`}>Tu sistema, con tu identidad. Sin comisión.</h2>
        </div>
        <ul className={s.filas}>
          {FILAS.map(([chip, texto], i) => (
            <li key={chip} data-reveal style={{ '--d': `${i * 0.09}s`, '--i': i } as CSSProperties}>
              <span className={s.chip}>{chip}</span>
              <span className={s.texto}>{texto}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
