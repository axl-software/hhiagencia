import type { CSSProperties } from 'react'
import { Plus } from 'lucide-react'
import { RUBROS } from './rubros'
import e from './Escena.module.css'

/* =========================================================
   HHA SYSTEMS (docs/HHA_SYSTEMS_PRODUCT.md): datos de las cinco "ventanitas" de ejemplo y el componente que las
   dibuja (Escena). Las usan el inicio (Sistemas.tsx), Servicios (vistas previas) y Prueba gratis.
   Son vistas de EJEMPLO con textos de muestra, rotuladas así: no son clientes ni capturas reales.
   Fotos: Unsplash (licencia libre para uso comercial), en /public/img/sistemas; autores en docs/HHA_TECH_STACK.md.
   ========================================================= */

export type Bloque =
  | { t: 'staff'; items: string[] }
  | { t: 'servicios'; items: [string, string][] }
  | { t: 'dias'; items: string[]; sel: number }
  | { t: 'horas'; items: string[] }
  | { t: 'galeria' }
  | { t: 'productos'; items: string[] }
  | { t: 'boton'; texto: string }

export type Ventana = {
  id: string
  foto: string
  /** Si hay varias, se turnan con un fundido (óptica y dentista) */
  fotos?: string[]
  marca: string
  titulo: string
  texto: string
  tags: string[]
  /** Aviso de ejemplo que aparece y desaparece sobre la foto, como una notificación del sistema */
  aviso: string
  bloques: Bloque[]
  /** Lo que muestra "Ver qué incluye" para este rubro (lo primero es lo propio del rubro) */
  incluye: string[]
}

const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie']
const HORAS = ['11:00', '11:45', '12:30', '16:00']

/* Lo que comparten todos los rubros (el sistema es el mismo) */
const COMUN = [
  'Reserva online: tus clientes eligen servicio, día y hora.',
  'Agenda con la disponibilidad de tu negocio.',
  'Tienda para tus productos, con carrito y pedidos.',
  'Panel con tus ventas, reservas y próximas citas.',
  'Registro simple de tus clientes y su historial.',
  'Diseño con tu marca: fotos, colores, tipografía y animaciones propias.',
]

export const VENTANAS: Ventana[] = [
  {
    id: 'barberia', foto: '/img/sistemas/barberia.webp', marca: 'Tu barbería',
    titulo: 'Tus clientes reservan solos. Tú atiendes.',
    texto: 'Eligen servicio, profesional y hora, y tú ves todo en tu agenda, con la identidad de tu barbería o peluquería.',
    tags: ['Reservas', 'Productos', 'Panel'],
    aviso: 'Nueva reserva · 11:45',
    bloques: [
      { t: 'staff', items: ['Ana', 'Luis', 'Sofi'] },
      { t: 'servicios', items: [['Corte clásico', '45 min'], ['Corte y barba', '60 min']] },
      { t: 'horas', items: HORAS },
      { t: 'boton', texto: 'Reservar' },
    ],
    incluye: ['Servicios con su duración, y profesionales con su propia agenda.', ...COMUN],
  },
  {
    id: 'estetica', foto: '/img/sistemas/estetica.webp', marca: 'Tu estudio',
    titulo: 'Cada tratamiento, con su tiempo y su horario libre.',
    texto: 'Servicios con su duración y disponibilidad, para que cada cliente reserve el horario que sí está libre.',
    tags: ['Reservas', 'Clientes', 'Panel'],
    aviso: 'Hora confirmada · Martes',
    bloques: [
      { t: 'dias', items: DIAS, sel: 1 },
      { t: 'servicios', items: [['Limpieza facial', '60 min'], ['Masaje relajante', '50 min']] },
      { t: 'horas', items: HORAS },
      { t: 'boton', texto: 'Agendar' },
    ],
    incluye: ['Tratamientos con su duración y horarios disponibles.', ...COMUN],
  },
  {
    id: 'tatuajes', foto: '/img/sistemas/tatuajes.webp', marca: 'Tu estudio',
    titulo: 'Tu trabajo primero, la reserva después.',
    texto: 'Una portada que muestra tu estilo y una reserva simple para consultas y sesiones.',
    tags: ['Reservas', 'Clientes', 'Pedidos'],
    aviso: 'Consulta pedida · Sábado',
    bloques: [
      { t: 'galeria' },
      { t: 'servicios', items: [['Consulta de diseño', '30 min'], ['Sesión', '3 h']] },
      { t: 'boton', texto: 'Pedir hora' },
    ],
    incluye: ['Portafolio de tu trabajo y reserva de consultas y sesiones.', ...COMUN],
  },
  {
    id: 'optica', foto: '/img/sistemas/optica-ojos.webp', fotos: ['/img/sistemas/optica-ojos.webp', '/img/sistemas/optica-dentista.webp'], marca: 'Tu consulta',
    titulo: 'Hora para tu examen o tu control, y tienda en línea.',
    texto: 'Para ópticas, dentistas y cualquier consulta con hora: tus pacientes reservan online y también compran productos con carrito.',
    tags: ['Reservas', 'Productos', 'Panel'],
    aviso: 'Nueva hora · 16:00',
    bloques: [
      { t: 'servicios', items: [['Examen visual', '30 min'], ['Control dental', '40 min']] },
      { t: 'productos', items: ['Armazones', 'Kits de cuidado', 'Accesorios'] },
      { t: 'boton', texto: 'Reservar hora' },
    ],
    incluye: ['Reserva de horas para exámenes, controles y atenciones de salud.', 'Catálogo de productos (armazones, kits de cuidado y más).', ...COMUN],
  },
  {
    id: 'wellness', foto: '/img/sistemas/wellness.webp', marca: 'Tu centro',
    titulo: 'Sesiones para reservar, con horarios claros.',
    texto: 'Clases y sesiones con horarios claros, y productos para vender junto a ellas.',
    tags: ['Reservas', 'Productos', 'Panel'],
    aviso: 'Cupo reservado · Yoga',
    bloques: [
      { t: 'servicios', items: [['Yoga grupal', '60 min'], ['Masaje', '50 min'], ['Meditación', '30 min']] },
      { t: 'horas', items: HORAS },
      { t: 'boton', texto: 'Reservar sesión' },
    ],
    incluye: ['Clases y sesiones con horarios claros, y productos para vender junto a ellas.', ...COMUN],
  },
]

export const rubroDe = (id: string) => RUBROS.find((r) => r.id === id)

function Contenido({ b }: { b: Bloque }) {
  switch (b.t) {
    case 'staff':
      return (
        <div className={e.staff}>
          {b.items.map((n, i) => (
            <span key={n} className={e.persona} data-sel={i === 0 ? '' : undefined}>
              <i>{n[0]}</i>{n}
            </span>
          ))}
        </div>
      )
    case 'servicios':
      return (
        <ul className={e.servicios}>
          {b.items.map(([n, d], i) => (
            <li key={n} data-sel={i === 0 ? '' : undefined}>
              <span>{n}<small>{d}</small></span>
              <Plus size={14} strokeWidth={2.5} />
            </li>
          ))}
        </ul>
      )
    case 'dias':
      return (
        <div className={e.dias}>
          {b.items.map((d, i) => <span key={d} data-sel={i === b.sel ? '' : undefined}>{d}</span>)}
        </div>
      )
    case 'horas':
      return (
        <div className={e.horas}>
          {b.items.map((h, i) => <span key={h} className={e.hora} style={{ '--i': i } as CSSProperties}>{h}</span>)}
        </div>
      )
    case 'galeria':
      return (
        <div className={e.galeria}>
          <span /><span /><span /><span /><span /><span />
        </div>
      )
    case 'productos':
      return (
        <div className={e.productos}>
          {b.items.map((p) => <span key={p}><i />{p}</span>)}
        </div>
      )
    case 'boton':
      return <span className={e.boton}>{b.texto}</span>
  }
}

/* La escena: foto del rubro de fondo, etiqueta, aviso que aparece y se va, y la ventanita del sistema.
   Es decorativa (aria-hidden en la ventana); lo que lee un lector de pantalla es el texto de la tarjeta. */
export function Escena({ v, retraso = 0, compacta = false, marca }: { v: Ventana; retraso?: number; compacta?: boolean; marca?: string }) {
  const rubro = rubroDe(v.id)
  const Icono = rubro?.icono
  return (
    <div
      className={`${e.escenario} ${e[`v_${v.id}`]}`}
      style={{ '--aviso-delay': `${2 + retraso * 1.7}s`, ...(compacta ? { '--e-min': '400px', '--e-top': '150px' } : {}) } as CSSProperties}
    >
      {(v.fotos ?? [v.foto]).map((f, n, todas) => (
        /* eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML */
        <img key={f} className={`${e.foto}${todas.length > 1 ? ` ${e.rota}` : ''}`} style={todas.length > 1 ? { animationDelay: `${n * -6}s` } : undefined} src={f} alt="" loading="lazy" decoding="async" width={1000} height={667} />
      ))}
      <div className={e.velo} aria-hidden="true" />
      <div className={e.cabeza}>
        <span className={e.etiqueta}>{Icono && <Icono size={14} strokeWidth={2} aria-hidden="true" />}{rubro?.chip}</span>
        <span className={e.ejemplo}>Ejemplo</span>
      </div>
      <div className={e.aviso} aria-hidden="true"><i />{v.aviso}</div>
      <div className={e.ventana} aria-hidden="true">
        <div className={e.barra}>
          <i /><i /><i />
          <span>{marca || v.marca}</span>
        </div>
        <div className={e.cuerpo}>
          {v.bloques.map((b, bi) => (
            <div key={bi} className={e.fila} style={{ '--k': bi } as CSSProperties}><Contenido b={b} /></div>
          ))}
        </div>
      </div>
    </div>
  )
}
