import type { CSSProperties } from 'react'
import { ShoppingCart } from 'lucide-react'
import s from './Servicios.module.css'

/* =========================================================
   Muestra de la página web que se construye en cada plan (Servicios → Desarrollo web): una ventana de navegador
   con una foto y la estructura típica del plan, que se desplaza sola como si alguien navegara. Al pasar el
   cursor (o enfocar la tarjeta) se frena y la ventana se levanta un poco. Son EJEMPLOS con textos de muestra,
   rotulados así: no son webs de clientes. Fotos: Unsplash (licencia libre para uso comercial), en
   /public/img/ejemplos; autores en docs/HHA_TECH_STACK.md.
   ========================================================= */

type Muestra = { foto: string; marca: string; titulo: string; boton: string; url: string }

const MUESTRAS: Record<string, Muestra> = {
  'web-presentation': { foto: '/img/ejemplos/web-presentation.webp', marca: 'Estudio Rivas', titulo: 'Arquitectura y diseño de interiores', boton: 'Agenda una reunión', url: 'estudiorivas.cl' },
  'web-starter': { foto: '/img/ejemplos/web-start.webp', marca: 'Café Aurora', titulo: 'Café de especialidad en el centro', boton: 'Escríbenos', url: 'cafeaurora.cl' },
  'web-business': { foto: '/img/ejemplos/web-business.webp', marca: 'Consultora Norte', titulo: 'Ordenamos tu empresa para crecer', boton: 'Solicitar contacto', url: 'consultoranorte.cl' },
  'web-pro': { foto: '/img/ejemplos/web-pro.webp', marca: 'Casa Sombrero', titulo: 'Sombreros y accesorios hechos a mano', boton: 'Ver tienda', url: 'casasombrero.cl' },
}

export default function MuestraWeb({ id, nivel: nivelPlan }: { id: string; nivel: number }) {
  const m = MUESTRAS[id]
  if (!m) return null
  /* Cuatro planes, tres estructuras de muestra: Presentation (una sección), Starter y Business (varias secciones), Pro (con tienda) */
  const nivel = ({ 1: 1, 2: 2, 3: 2, 4: 3 } as Record<number, number>)[nivelPlan] ?? 1
  return (
    <div className={`${s.muestra} ${s[`n${nivel}`]}`}>
      <div className={s.mBarra}>
        <i /><i /><i />
        <span>{m.url}</span>
        {nivel === 3 && <b className={s.carrito}><ShoppingCart size={12} strokeWidth={2.5} aria-hidden="true" /><em /></b>}
      </div>
      <div className={s.mVista}>
        <div className={s.mPagina}>
          <div className={s.mHero}>
            {/* eslint-disable-next-line @next/next/no-img-element -- next/image rompe la vista previa en HTML */}
            <img src={m.foto} alt="" loading="lazy" decoding="async" width={1000} height={667} />
            <div className={s.mHeroTxt}>
              <small>{m.marca}</small>
              <strong>{m.titulo}</strong>
              <span className={s.mBtn}>{m.boton}</span>
            </div>
          </div>
          {nivel === 1 && (
            <div className={s.mBloque}>
              <span className={s.mTitulo} /><span className={s.mLinea} /><span className={`${s.mLinea} ${s.corta}`} />
              <div className={s.mForm}><span /><span /><span className={s.mBtn} /></div>
            </div>
          )}
          {nivel === 2 && (
            <>
              <div className={s.mTres}>
                {[0, 1, 2].map((n) => <span key={n}><i /><b /><b className={s.corta} /></span>)}
              </div>
              <div className={s.mBloque}>
                <span className={s.mTitulo} /><span className={s.mLinea} /><span className={`${s.mLinea} ${s.corta}`} />
              </div>
              <div className={s.mForm}><span /><span /><span className={s.mBtn} /></div>
            </>
          )}
          {nivel === 3 && (
            <>
              <div className={s.mProductos}>
                {[0, 1, 2, 3].map((n) => <span key={n} style={{ '--n': n } as CSSProperties}><i /><b /><u /></span>)}
              </div>
              <div className={s.mBloque}>
                <span className={s.mTitulo} /><span className={s.mLinea} />
              </div>
            </>
          )}
        </div>
      </div>
      <span className={s.mEjemplo}>Ejemplo</span>
    </div>
  )
}
