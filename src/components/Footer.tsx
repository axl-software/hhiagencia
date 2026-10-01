import Link from 'next/link'
import { CONFIG } from '@/lib/config'
import { NAV } from '@/lib/nav'
import WhatsAppFlotante from './WhatsAppFlotante'

export default function Footer() {
  return (
    <>
      <footer>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }} aria-label="HHA Digital Solutions, inicio">
              {/* eslint-disable-next-line @next/next/no-img-element -- logo chico; next/image rompe la vista previa en HTML */}
              <img src="/brand/hh-logo-blanco.png" alt="" width={480} height={299} style={{ height: 40, width: 'auto' }} />
              <span style={{ fontFamily: 'var(--f-head)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>HHA Digital Solutions</span>
            </Link>
            <span style={{ fontSize: 14, color: 'var(--mut)' }}>Web, automatización y marketing · Casablanca · Valparaíso · Viña del Mar, Chile</span>
          </div>
          <nav aria-label="Pie de página">
            <Link href="/">Inicio</Link>
            {NAV.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            <a href={`https://instagram.com/${CONFIG.instagram}`} target="_blank" rel="noopener noreferrer">Instagram</a>
          </nav>
          <span className="mono" style={{ fontSize: 13, color: 'var(--mut)', padding: '12px 0' }}>© {new Date().getFullYear()} HHA Digital Solutions</span>
        </div>
      </footer>
      <WhatsAppFlotante />
    </>
  )
}
