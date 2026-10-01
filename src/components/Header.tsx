'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { NAV } from '@/lib/nav'
import s from './Header.module.css'

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className={s.logo} aria-label="HH Studio Creativo, inicio" onClick={onClick}>
      {/* eslint-disable-next-line @next/next/no-img-element -- logo chico; next/image rompe la vista previa en HTML */}
      <img className={s.logoImg} src="/brand/hh-logo-blanco.png" alt="" width={480} height={299} />

    </Link>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  /* bloquea el scroll y cierra con Escape mientras el menú móvil está abierto */
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
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
          <a className={`${s.link} ${s.mute}`} href={`https://instagram.com/${CONFIG.instagram}`} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <span className={`btn-giro-wrap ${s.ctaDesk}`}>
            <Link className="btn-giro" href="/contacto"><span>Agenda tu reunión</span></Link>
          </span>
          <button type="button" className={s.burger} onClick={() => setOpen(true)} aria-label="Abrir menú" aria-expanded={open}>
            <Menu size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>

      {/* fuera del <header>: su backdrop-filter recortaría un elemento fixed */}
      {open && (
        <div className={s.menu} role="dialog" aria-modal="true" aria-label="Menú">
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
            <a className={s.link} href={`https://instagram.com/${CONFIG.instagram}`} target="_blank" rel="noopener noreferrer">
              @{CONFIG.instagram}
            </a>
            <span className="btn-giro-wrap">
              <Link className="btn-giro btn-giro-lg" href="/contacto" onClick={close}><span>Agenda tu reunión</span></Link>
            </span>
          </div>
        </div>
      )}
    </>
  )
}
