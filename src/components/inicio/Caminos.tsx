import Link from 'next/link'
import { CalendarCheck, Megaphone, Monitor, Workflow } from 'lucide-react'
import GuiaPlan from '../GuiaPlan'
import { PRECIOS, clp } from '@/lib/precios'
import s from './Secciones.module.css'
import { Animado } from '@/components/ui/precio-animado'

/* "Elige por dónde empezar": los cuatro caminos, con su precio "desde" (src/lib/precios.ts) y las líneas que incluyen. */
const desde = (ids: string[]) => Math.min(...ids.map((id) => PRECIOS[id]).filter(Boolean).map((p) => p.lanzamiento ?? p.monto ?? Infinity))

const CAMINOS = [
  {
    id: 'agendahh', estrella: true, Icono: CalendarCheck, nombre: 'agendAHH', href: '/agendahh', ir: 'Probar gratis 7 días →',
    texto: 'Tus clientes reservan solos y tú ves tu día, tus clientes y tus métricas en un panel.',
    tags: ['Solo', 'Starter', 'Business', 'Pro'], precio: `${clp(desde(['system-agenda-solo']))} / mes + IVA`,
  },
  {
    id: 'web', Icono: Monitor, nombre: 'Páginas web', href: '/servicios#cat-web', ir: 'Ver planes web →',
    texto: 'Una web profesional para presentar tu negocio, captar clientes y, si quieres, vender.',
    tags: ['Presentation', 'Starter', 'Business', 'Pro'], precio: `${clp(desde(['web-presentation']))} / mes + IVA`,
  },
  {
    id: 'marketing', Icono: Megaphone, nombre: 'Marketing', href: '/marketing', ir: 'Ver marketing →',
    texto: 'Estrategia, contenido y campañas para que más personas te encuentren y te escriban.',
    tags: ['Marketing digital', 'Contenido', 'Captación', 'Email'], precio: `${clp(desde(['email-marketing', 'captacion-start', 'content-start', 'marketing-starter']))} / mes + IVA`,
  },
  {
    id: 'automatizacion', Icono: Workflow, nombre: 'Automatización e IA', href: '/servicios#cat-automatizacion', ir: 'Solicitar cotización →',
    texto: 'Menos tareas repetitivas y herramientas que trabajan juntas. Se cotiza según tu caso.',
    tags: ['Automatización', 'Integraciones', 'Consultoría IA'], precio: `${clp(desde(['integraciones', 'automatizacion', 'procesos']))} / proyecto + IVA`,
  },
]

export default function Caminos() {
  return (
    <section className="wrap sec" id="caminos" aria-labelledby="caminos-t">
      <div className={s.head} data-reveal>
        <p className="kicker">QUÉ HACEMOS</p>
        <h2 id="caminos-t" className="display h2">Elige por dónde empezar.</h2>
        <p className="lead">Cuatro caminos, un mismo equipo. Puedes partir por uno y sumar los otros cuando los necesites.</p>
      </div>
      <ul className={s.caminos}>
        {CAMINOS.map(({ id, estrella, Icono, nombre, href, ir, texto, tags, precio }, n) => (
          <li key={id} data-reveal style={{ '--d': `${n * 0.08}s` } as React.CSSProperties}>
            <Link href={href} className={`${s.camino} ${estrella ? s.estrella : ''}`}>
              <span className={s.ico} aria-hidden="true"><Icono size={22} strokeWidth={1.9} /></span>
              <h3>{nombre}</h3>
              <p>{texto}</p>
              <ul className={s.tags}>{tags.map((t) => <li key={t}>{t}</li>)}</ul>
              <span className={s.desde}>Desde<b><Animado t={precio} /></b></span>
              <span className={s.ir}>{ir}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* herramienta secundaria: no compite con los tres llamados principales */}
      <div className={s.orienta} data-reveal>
        <div>
          <b>¿No sabes por dónde empezar?</b>
          <p>Responde 3 preguntas y te recomendamos un camino. Toma menos de un minuto.</p>
        </div>
        <GuiaPlan etiqueta="Te orientamos en 3 preguntas" className="btn btn-out" giro={false} origen="inicio" />
      </div>
    </section>
  )
}
