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
            <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }} aria-label="HH Studio Creativo, inicio">
              <span className="font-display text-[42px] leading-none">HH</span>
              <span className="dot" />
              <span className="mono" style={{ fontSize: 13, letterSpacing: 3, color: 'var(--mut)' }}>STUDIO CREATIVO</span>
            </Link>
            <span style={{ fontSize: 14, color: 'var(--mut)' }}>Agencia de IA y marketing · Casablanca · Valparaíso · Viña del Mar, Chile</span>
          </div>
          <nav aria-label="Pie de página">
            <Link href="/">Inicio</Link>
            {NAV.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            <a href={`https://instagram.com/${CONFIG.instagram}`} target="_blank" rel="noopener noreferrer">Instagram</a>
          </nav>
          <span className="mono" style={{ fontSize: 13, color: 'var(--mut)', padding: '12px 0' }}>© {new Date().getFullYear()} HH Studio Creativo</span>
        </div>
      </footer>
      <WhatsAppFlotante />
    </>
  )
}
