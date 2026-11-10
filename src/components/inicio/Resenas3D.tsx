import Link from 'next/link'
import { CONFIG } from '@/lib/config'
import s from './Resenas3D.module.css'

/* =========================================================
   Reseñas y opiniones en columnas verticales que suben y bajan sobre un plano inclinado en 3D (adaptado de "3D Testimonials",
   21st.dev, sin shadcn ni Tailwind: CSS puro y la animación se detiene al pasar el mouse o con "reducir movimiento").
   REGLA: aquí solo va lo real. Las reseñas salen de src/lib/config.ts → resenas (textuales y con permiso del cliente). Mientras no
   haya ninguna, las tarjetas muestran los negocios que trabajan con HHA (solo nombre y rubro, sin cifras ni frases inventadas).
   ========================================================= */
type Tarjeta = { nombre: string; detalle: string; cuerpo: string; logo?: string }

const NEGOCIOS: Tarjeta[] = [
  { nombre: 'Tamburrini', detalle: 'Barber Studio', cuerpo: 'Reservas online con agendAHH: sus clientes eligen servicio, barbero y hora desde el celular.', logo: '/clientes/tamburrini.png' },
  { nombre: 'Fanatigol', detalle: 'Tienda deportiva', cuerpo: 'Trabaja con HHA Digital Solutions.' },
  { nombre: 'JAV Ingeniería', detalle: 'Ingeniería', cuerpo: 'Trabaja con HHA Digital Solutions.' },
]

const tarjetas: Tarjeta[] = CONFIG.resenas.length
  ? CONFIG.resenas.map((r) => ({ nombre: r.autor, detalle: r.rol, cuerpo: r.texto }))
  : NEGOCIOS

function Columna({ inversa, desfase }: { inversa?: boolean; desfase?: string }) {
  return (
    <div className={s.columna} style={{ '--des': desfase } as React.CSSProperties} aria-hidden="true">
      {[0, 1, 2].map((copia) => (
        <div key={copia} className={`${s.bloque} ${inversa ? s.inversa : ''}`}>
          {[...tarjetas, ...tarjetas].map((t, i) => (
            <figure key={i} className={s.tarjeta}>
              <div className={s.cab}>
                {t.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- logo chico del cliente
                  <img className={s.logo} src={t.logo} alt="" width={36} height={36} />
                ) : (
                  <span className={s.avatar}>{t.nombre[0]}</span>
                )}
                <figcaption>
                  <b>{t.nombre}</b>
                  <small>{t.detalle}</small>
                </figcaption>
              </div>
              <blockquote>{t.cuerpo}</blockquote>
            </figure>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Resenas3D() {
  const hayResenas = CONFIG.resenas.length > 0
  return (
    <section className="wrap sec" id="confianza" aria-labelledby="resenas-t">
      <div className={s.cabeza} data-reveal>
        <p className="kicker">{hayResenas ? 'OPINIONES' : 'CONFIANZA'}</p>
        <h2 id="resenas-t" className="display h2">{hayResenas ? 'Lo que dicen quienes trabajan con nosotros.' : 'Ya trabajan con nosotros.'}</h2>
        <p className="lead">{hayResenas ? 'Opiniones reales de nuestros clientes, tal como nos las escribieron.' : 'Algunos de los negocios que ya trabajan con HHA. Aquí también irán sus opiniones, cuando nos autoricen a publicarlas.'}</p>
      </div>

      {/* Lectura accesible: las columnas animadas son decorativas */}
      <ul className="sr-only">
        {tarjetas.map((t) => <li key={t.nombre}>{t.nombre}, {t.detalle}. {t.cuerpo}</li>)}
      </ul>

      <div className={s.escena} role="presentation" data-reveal>
        <div className={s.plano}>
          <Columna />
          <Columna inversa desfase="-9s" />
          <Columna desfase="-18s" />
          <Columna inversa desfase="-27s" />
        </div>
      </div>

      <div className={s.pie} data-reveal>
        <Link className="btn btn-out" href="/contacto">Tu negocio, aquí</Link>
      </div>
    </section>
  )
}
