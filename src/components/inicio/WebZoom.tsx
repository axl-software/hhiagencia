import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { PRECIOS, clp } from '@/lib/precios'
import { ZoomParallax, type ImagenZoom } from './ZoomParallax'
import s from './Scroll.module.css'

/* Páginas web: zoom con parallax con las maquetas de ejemplo de nuestros planes web (textos de muestra, no son clientes; mismas que
   Servicios → MuestraWeb). La del centro (Web Business, el plan recomendado) termina llenando la pantalla. Textos y precios de config.ts y precios.ts. */
const IMAGENES: ImagenZoom[] = [
  { src: '/img/ejemplos/web-business.webp', marca: 'Consultora Norte', titulo: 'Ordenamos tu empresa para crecer', boton: 'Solicitar contacto', url: 'consultoranorte.cl', alt: 'Ejemplo de página web del plan Business' },
  { src: '/img/ejemplos/web-pro.webp', marca: 'Casa Sombrero', titulo: 'Sombreros y accesorios hechos a mano', boton: 'Ver tienda', url: 'casasombrero.cl' },
  { src: '/img/ejemplos/web-presentation.webp', marca: 'Estudio Rivas', titulo: 'Arquitectura y diseño de interiores', boton: 'Solicitar cotización', url: 'estudiorivas.cl' },
  { src: '/img/ejemplos/web-start.webp', marca: 'Café Aurora', titulo: 'Café de especialidad en el centro', boton: 'Escríbenos', url: 'cafeaurora.cl' },
  { src: '/img/ejemplos/metricas.webp' },
  { src: '/img/agendahh/tamburrini-local.webp' },
  { src: '/img/agendahh/turno-uno.webp' },
]

export default function WebZoom() {
  return (
    <>
      <div className={s.intro} id="paginas-web">
        <p className="kicker" style={{ margin: 0 }}>PÁGINAS WEB</p>
        <h2 className="display h2">Tu página web, lista para presentarte y vender.</h2>
        <p className="lead">Desde una presencia simple hasta una tienda con pasarela de pago. Antes de decidir, una demo gratuita de {CONFIG.demoWeb} para que veas cómo quedaría.</p>
        <p className={s.baja} aria-hidden="true">Sigue bajando ↓</p>
      </div>
      <ZoomParallax imagenes={IMAGENES} />
      <div className={s.cierre}>
        <h3>Elige la web que necesita tu negocio.</h3>
        <p>Presentation, Starter, Business y Pro. Desde {clp(PRECIOS['web-presentation'].lanzamiento ?? 0)}/mes + IVA, con dominio y mantenimiento según el plan.</p>
        <div className={s.botones}>
          <Link className="btn-vivo" href="/servicios#cat-web">
            Ver planes web <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
          </Link>
          <Link className="btn btn-out" href="/contacto?servicios=web-business">Pedir mi demo gratis</Link>
        </div>
      </div>
    </>
  )
}
