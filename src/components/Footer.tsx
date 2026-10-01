import Link from 'next/link'
import { CONFIG, telHref, telVisible } from '@/lib/config'
import { LEGAL, NAV } from '@/lib/nav'
import Redes from './Redes'

/* Pie de página: marca, navegación y contacto. El teléfono va escrito y con enlace de llamada
   (no a WhatsApp, para evitar spam y bots: docs/HHA_BRAND_FOUNDATION.md → Official channels). */
export default function Footer() {
  return (
    <footer>
      <div className="wrap pie">
        <div className="pie-marca">
          <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }} aria-label="HHA Digital Solutions, inicio">
            {/* eslint-disable-next-line @next/next/no-img-element -- logo chico; next/image rompe la vista previa en HTML */}
            <img className="solo-oscuro" src="/brand/hh-logo-blanco.png" alt="" width={480} height={299} style={{ height: 40, width: 'auto' }} />
            {/* eslint-disable-next-line @next/next/no-img-element -- versión azul para el modo claro */}
            <img className="solo-claro" src="/brand/hh-logo-azul.png" alt="" width={480} height={299} style={{ height: 40, width: 'auto' }} />
            <span style={{ fontFamily: 'var(--f-head)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>HHA Digital Solutions</span>
          </Link>
          <span className="pie-lema">
            Web, automatización y marketing
            <span>Base en Valparaíso · Trabajamos en todo Chile</span>
          </span>
        </div>

        <nav aria-label="Pie de página" className="pie-col">
          <span className="pie-titulo">Sitio</span>
          <Link href="/">Inicio</Link>
          {NAV.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>

        <div className="pie-col">
          <span className="pie-titulo">Contacto</span>
          {CONFIG.whatsapp && <a href={telHref()}>{telVisible()}</a>}
          {CONFIG.email && <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>}
          <Redes usuario="lado" />
        </div>
      </div>
      <div className="wrap pie-base">
        <span className="mono">© {new Date().getFullYear()} HHA Digital Solutions</span>
        <nav aria-label="Legal" className="pie-legal">
          {LEGAL.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
      </div>
    </footer>
  )
}
