'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV } from '@/lib/nav'
import TemaToggle from './TemaToggle'
import Redes from './Redes'
import GuiaPlan from './GuiaPlan'
import s from './Header.module.css'

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className={s.logo} aria-label="HHiAgencia, inicio" onClick={onClick}>
      {/* eslint-disable-next-line @next/next/no-img-element -- logo chico; next/image rompe la vista previa en HTML */}
      <img className={`${s.logoImg} solo-oscuro`} src="/brand/hh-logo-blanco.png" alt="" width={480} height={299} />
      {/* eslint-disable-next-line @next/next/no-img-element -- versión azul para el modo claro */}
      <img className={`${s.logoImg} solo-claro`} src="/brand/hh-logo-azul.png" alt="" width={480} height={299} />
      <span className={s.logoTxt}>HHiAgencia</span>
    </Link>
  )
}

export default function Header() {
  const pathname = usePathname()
  /* El menú móvil recuerda en qué página se abrió: al cambiar de página (por ejemplo desde
     "Prefiero el formulario completo" del diagnóstico) se cierra solo. */
  const [abiertoEn, setAbiertoEn] = useState<string | null>(null)
  const open = abiertoEn === pathname
  const close = () => setAbiertoEn(null)
  const panel = useRef<HTMLDivElement>(null)
  const hamburguesa = useRef<HTMLButtonElement>(null)

  /* Mientras el menú está abierto: se bloquea el scroll, cierra con Escape y el tabulador da la
     vuelta dentro del panel (está sobre la página, que sigue debajo). Al cerrarlo, el foco vuelve
     al botón que lo abrió. Si encima se abre el diagnóstico, su <dialog> maneja el foco y aquí no
     se interviene, para no pelear con él. */
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('dialog[open]')) return
      if (e.key === 'Escape') {
        setAbiertoEn(null)
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const focosables = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!focosables.length) return
      const primero = focosables[0]
      const ultimo = focosables[focosables.length - 1]
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      hamburguesa.current?.focus()
    }
  }, [open])

  const current = (href: string) => (pathname === href ? 'page' : undefined)

  return (
    <>
    <header className={s.header}>
      <div className={s.bar}>
        <div className={s.left}>
          <Logo />
          <nav aria-label="Principal">
            <ul className={s.nav}>
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link className={s.link} href={l.href} aria-current={current(l.href)}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={s.right}>
          <TemaToggle className={s.tema} />
          {/* El botón principal abre el diagnóstico de 3 preguntas (docs/HHA_BRAND_FOUNDATION.md).
              Mismo diseño que el botón rojo de la portada (.btn-vivo), en tamaño compacto. */}
          <span className={s.ctaDesk}>
            <GuiaPlan etiqueta="Haz tu diagnóstico" className="btn-vivo btn-vivo-sm" giro={false} origen="encabezado" />
          </span>
          <button ref={hamburguesa} type="button" className={s.burger} onClick={() => setAbiertoEn(pathname)} aria-label="Abrir menú" aria-expanded={open}>
            <Menu size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>

      {/* fuera del <header>: su backdrop-filter recortaría un elemento fixed */}
      {open && (
        <div ref={panel} className={s.menu} role="dialog" aria-modal="true" aria-label="Menú">
          <div className={s.menuTop}>
            <Logo onClick={close} />
            <button type="button" className={s.burger} style={{ display: 'inline-flex' }} onClick={close} aria-label="Cerrar menú" autoFocus>
              <X size={20} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
          <ul className={s.menuList}>
            <li><Link className={s.menuLink} href="/" onClick={close} aria-current={current('/')}>Inicio</Link></li>
            {NAV.map((l) => (
              <li key={l.href}>
                <Link className={s.menuLink} href={l.href} onClick={close} aria-current={current(l.href)}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <div className={s.menuFoot}>
            <Redes />
            <GuiaPlan etiqueta="Haz tu diagnóstico" className="btn-vivo" giro={false} origen="menu" />
          </div>
        </div>
      )}
    </>
  )
}
