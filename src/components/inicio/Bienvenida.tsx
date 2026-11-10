'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Escena } from './escena'
import s from './Bienvenida.module.css'

/* =========================================================
   BIENVENIDA (hero inicial). Pantalla completa antes del inicio: un monitor 3D en Three.js cuya pantalla va mostrando
   agenda, página web, flujos y marketing (escena.ts). Al apretar "Entrar al sitio" la cámara entra en la pantalla y
   se abre el inicio. "Saltar" y Esc hacen lo mismo.
   - Se muestra una vez por visita (sessionStorage): un script mínimo marca <html data-intro="visto"> antes de pintar,
     así quien ya la vio no ve ningún parpadeo.
   - Mientras está abierta, el sitio de atrás no recibe foco ni lectores de pantalla (inert) y la página no se desplaza.
   - Sin WebGL o con "reducir movimiento" no hay escena 3D: queda el texto y el botón, sobre el fondo azul noche.
   - No es un <h1>: el título de la página es el del inicio (Hero), para no repetir encabezados principales.
   ========================================================= */

/* Script mínimo (corre al leer la página, antes de React). Es lo que hace la bienvenida imposible de "pegar":
   - si ya se vio en esta visita, no se muestra;
   - si no, la activa (html.intro-on) y deja listo un cierre que NO depende de React: "Entrar", "Saltar", Esc y el scroll funcionan igual;
   - si React no arranca en 8 segundos, la cierra sola y el sitio queda usable. */
const SCRIPT = `(function(){var d=document,h=d.documentElement;try{if(sessionStorage.getItem('hha-intro')){h.setAttribute('data-intro','visto');return}}catch(e){}
h.classList.add('intro-on');
function cerrar(){if(!h.classList.contains('intro-on'))return;h.classList.remove('intro-on');h.setAttribute('data-intro','visto');try{sessionStorage.setItem('hha-intro','1')}catch(e){}d.dispatchEvent(new Event('hha-intro-fin'))}
window.__introCerrar=cerrar;
d.addEventListener('click',function(e){if(window.__hhaIntroOk)return;var t=e.target;if(t&&t.closest&&t.closest('[data-intro-cerrar]'))cerrar()});
d.addEventListener('keydown',function(e){if(window.__hhaIntroOk)return;if(e.key==='Escape'||e.key==='ArrowDown'||e.key==='PageDown')cerrar()});
d.addEventListener('wheel',function(e){if(window.__hhaIntroOk)return;if(e.deltaY>6)cerrar()},{passive:true});
var y0=0;d.addEventListener('touchstart',function(e){y0=e.touches[0].clientY},{passive:true});
d.addEventListener('touchmove',function(e){if(window.__hhaIntroOk)return;if(y0-e.touches[0].clientY>40)cerrar()},{passive:true});
setTimeout(function(){if(!window.__hhaIntroOk)cerrar()},8000)})();`

/* Cada palabra sube desde una máscara, una tras otra (solo CSS) */
function Palabras({ texto, desde = 0 }: { texto: string; desde?: number }) {
  return texto.split(' ').map((w, i) => (
    <span key={i}>
      <span className={s.pw}>
        <span className={s.pwi} style={{ '--i': desde + i } as React.CSSProperties}>{w}</span>
      </span>
      {' '}
    </span>
  ))
}

type Fase = 'abierta' | 'zoom' | 'saliendo'

/* Lo que queda "de fondo" mientras la bienvenida está abierta: encabezado, pie y el resto del contenido. La bienvenida va dentro
   de <main>, así que NO se puede marcar <main> entero como inerte (la dejaría sin clics ni foco): se marcan sus otros hijos. */
function fondoDe(raiz: HTMLElement | null) {
  const hijos = Array.from(document.querySelectorAll<HTMLElement>('main > *')).filter((e) => e !== raiz && !e.contains(raiz) && !raiz?.contains(e))
  return [...Array.from(document.querySelectorAll<HTMLElement>('header, footer')), ...hijos].filter((e) => !raiz || (!e.contains(raiz) && !raiz.contains(e)))
}

export default function Bienvenida() {
  const raiz = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const entrar = useRef<HTMLButtonElement>(null)
  const saltar = useRef<HTMLButtonElement>(null)
  const rigCss = useRef<HTMLDivElement>(null)
  const salirRef = useRef<() => void>(() => {})
  const escena = useRef<Escena | null>(null)
  const cerrando = useRef(false)
  const [fase, setFase] = useState<Fase>('abierta')
  const [conGl, setConGl] = useState(false)
  const [sinGl, setSinGl] = useState(false) // la escena 3D no se pudo crear: se muestra el monitor en CSS
  const [cerrada, setCerrada] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    /* React tomó el control: el cierre de respaldo del script mínimo se desactiva */
    ;(window as unknown as { __hhaIntroOk?: boolean }).__hhaIntroOk = true
    /* ya la vio en esta visita (o no se activó): no se prepara nada */
    if (!html.classList.contains('intro-on')) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resto = fondoDe(raiz.current)
    resto.forEach((e) => {
      e.inert = true
    })
    const foco = window.setTimeout(() => entrar.current?.focus({ preventScroll: true }), 60)

    let vivo = true
    /* si la escena 3D no está lista en 3,5 s (o falla), aparece el monitor en CSS: siempre hay un monitor a la vista */
    const plazo = window.setTimeout(() => {
      if (vivo && !escena.current) setSinGl(true)
    }, 3500)
    if (canvas.current && raiz.current) {
      import('./escena')
        .then((m) => m.crearEscena(canvas.current!, {
            reduce,
            host: raiz.current!,
            alFallar: () => {
              if (vivo) {
                setConGl(false)
                setSinGl(true)
              }
            },
          }))
        .then((e) => {
          if (!vivo) {
            e?.parar()
            return
          }
          if (!e) {
            setSinGl(true)
            return
          }
          escena.current = e
          setSinGl(false)
          setConGl(true)
        })
        .catch(() => {
          if (vivo) setSinGl(true)
        })
    }

    return () => {
      vivo = false
      window.clearTimeout(foco)
      window.clearTimeout(plazo)
      escena.current?.parar()
      escena.current = null
      resto.forEach((e) => {
        e.inert = false
      })
    }
  }, [])

  const salir = () => {
    if (cerrando.current) return
    cerrando.current = true
    fondoDe(raiz.current).forEach((e) => {
      e.inert = false
    })
    try {
      sessionStorage.setItem('hha-intro', '1')
    } catch {}
    window.scrollTo(0, 0)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let hecho = false
    const terminar = () => {
      if (hecho) return
      hecho = true
      ;(window as unknown as { __introCerrar?: () => void }).__introCerrar?.()
      setCerrada(true)
      escena.current?.parar()
      escena.current = null
      const h = document.getElementById('inicio-titulo')
      if (h) {
        h.setAttribute('tabindex', '-1')
        h.focus({ preventScroll: true })
      }
    }
    setFase('zoom')
    /* seguro: aunque la animación se trabe, a los 3,5 s la bienvenida se cierra sí o sí */
    window.setTimeout(terminar, 3500)
    if (escena.current && !reduce) {
      escena.current.zoom(() => setFase('saliendo'), terminar)
    } else {
      setFase('saliendo')
      window.setTimeout(terminar, reduce ? 0 : 900)
    }
  }

  /* Esc cierra; Tab alterna entre "Saltar" y "Entrar" (el resto de la página está inerte) */
  useEffect(() => {
    if (cerrada) return
    const alTeclear = (e: KeyboardEvent) => {
      if (cerrando.current) return
      if (e.key === 'Escape' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        salirRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const a = [saltar.current, entrar.current].filter(Boolean) as HTMLElement[]
      const i = a.indexOf(document.activeElement as HTMLElement)
      e.preventDefault()
      const n = e.shiftKey ? (i <= 0 ? a.length - 1 : i - 1) : (i + 1) % a.length
      a[n].focus()
    }
    /* el scroll (rueda o dedo hacia arriba) hace lo mismo que "Entrar": la cámara entra en la pantalla */
    let y0 = 0
    const alRueda = (e: WheelEvent) => {
      if (!cerrando.current && e.deltaY > 6) salirRef.current()
    }
    const alTocar = (e: TouchEvent) => {
      y0 = e.touches[0]?.clientY ?? 0
    }
    const alDeslizar = (e: TouchEvent) => {
      if (!cerrando.current && y0 - (e.touches[0]?.clientY ?? y0) > 40) salirRef.current()
    }
    /* el monitor de respaldo (CSS) sigue al mouse como el 3D */
    const alMover = (e: PointerEvent) => {
      const rig = rigCss.current
      if (!rig || e.pointerType === 'touch') return
      rig.style.setProperty('--ry', `${(e.clientX / window.innerWidth - 0.5) * 12}deg`)
      rig.style.setProperty('--rx', `${-(e.clientY / window.innerHeight - 0.5) * 9}deg`)
    }
    document.addEventListener('keydown', alTeclear)
    document.addEventListener('wheel', alRueda, { passive: true })
    document.addEventListener('touchstart', alTocar, { passive: true })
    document.addEventListener('touchmove', alDeslizar, { passive: true })
    document.addEventListener('pointermove', alMover)
    return () => {
      document.removeEventListener('keydown', alTeclear)
      document.removeEventListener('wheel', alRueda)
      document.removeEventListener('touchstart', alTocar)
      document.removeEventListener('touchmove', alDeslizar)
      document.removeEventListener('pointermove', alMover)
    }
  }, [cerrada])

  /* el cierre más reciente queda a mano para los controles de teclado, scroll y dedo */
  useEffect(() => {
    salirRef.current = salir
  })

  if (cerrada) return null

  const clase = [s.intro, conGl ? s.conGl : '', fase === 'zoom' ? s.zoom : '', fase === 'saliendo' ? `${s.zoom} ${s.saliendo}` : ''].filter(Boolean).join(' ')

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
      <div ref={raiz} className={clase} role="dialog" aria-modal="true" aria-labelledby="intro-t" aria-describedby="intro-d">
        <canvas ref={canvas} className={s.canvas} aria-hidden="true" />
        <div className={s.top}>
          <span className={s.marca}>
            {/* eslint-disable-next-line @next/next/no-img-element -- logo chico; next/image rompe la vista previa en HTML */}
            <img src="/brand/hh-logo-blanco.png" alt="" width={480} height={299} />
            <span>HHiAgencia</span>
          </span>
          <span className={s.loc}>Viña del Mar · Trabajamos en todo Chile</span>
          <button ref={saltar} type="button" className={s.saltar} onClick={salir} data-intro-cerrar>Saltar</button>
        </div>
        <div className={s.cuerpo}>
          <div className={s.copy}>
            <span className={`${s.kicker} ${s.entra}`}>HHA Digital Solutions</span>
            <p id="intro-t" role="heading" aria-level={2} className={s.titulo}>
              <Palabras texto="Bienvenido a" />
              <span className={s.rojo}><Palabras texto="HHA Digital Solutions." desde={2} /></span>
            </p>
            <p id="intro-d" className={`${s.texto} ${s.entra}`} style={{ '--d': '0.9s' } as React.CSSProperties}>
              Web, agenda de reservas y marketing para negocios de todo Chile. Digitaliza. Automatiza. Escala.
            </p>
            <div className={`${s.acciones} ${s.entra}`} style={{ '--d': '1.3s' } as React.CSSProperties}>
              <button ref={entrar} type="button" className="btn-vivo" onClick={salir} data-intro-cerrar>
                Entrar al sitio <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
              </button>
              <span className={s.pista}>mueve el mouse sobre el panel · o haz scroll para entrar</span>
            </div>
          </div>
          {sinGl ? (
            <div className={s.escenaCss} aria-hidden="true">
              <div ref={rigCss} className={s.rig}>
                <div className={s.mon}>
                  <div className={s.screen}>
                    <div className={s.side}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- logo chico */}
                      <img src="/brand/hh-logo-blanco.png" alt="" width={480} height={299} />
                      <span className={s.on}>Agenda</span><span>Clientes</span><span>Métricas</span><span>Servicios</span>
                    </div>
                    <div className={s.main}>
                      <div className={s.tt}>Hoy<small>agendAHH · panel</small></div>
                      <div className={s.mets}>
                        <div className={s.met}><b>12</b><span>reservas hoy</span></div>
                        <div className={s.met}><b>3</b><span>clientes nuevos</span></div>
                        <div className={s.met}><b>78%</b><span>agenda ocupada</span></div>
                      </div>
                      <div className={s.agenda}>
                        <div className={s.fila}><time>10:00</time><span>Corte clásico <i>· Diego</i></span><em>Confirmada</em></div>
                        <div className={s.fila}><time>10:45</time><span>Corte y barba <i>· Luis</i></span><em>Confirmada</em></div>
                        <div className={s.fila}><time>11:45</time><span>Limpieza facial <i>· Ana</i></span><em>Nueva</em></div>
                        <div className={s.fila}><time>12:30</time><span>Masaje relajante <i>· Sofi</i></span><em>Confirmada</em></div>
                      </div>
                      <span className={s.eg}>Vista de ejemplo</span>
                    </div>
                  </div>
                </div>
                <div className={s.neck} /><div className={s.pie} />
                <div className={`${s.carta} ${s.cReserva}`}><span className={s.ok}>✓</span><div><b>Nueva reserva · 11:45</b><small>Reservó sola desde su celular</small></div></div>
                <div className={`${s.carta} ${s.cCom}`}><small>COMISIÓN</small><b>0 %</b></div>
                <div className={`${s.carta} ${s.cPrueba}`}>Prueba 7 días gratis</div>
              </div>
            </div>
          ) : (
            <div aria-hidden="true" />
          )}
        </div>
      </div>
    </>
  )
}
