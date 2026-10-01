import { siFacebook, siInstagram, siTiktok, type SimpleIcon } from 'simple-icons'
import { CONFIG } from '@/lib/config'

/* Íconos de redes sociales (logos de Simple Icons, licencia CC0).
   Solo se muestran las redes que tienen enlace en src/lib/config.ts. */
const REDES: { icono: SimpleIcon; url: string }[] = [
  { icono: siInstagram, url: CONFIG.instagram ? `https://instagram.com/${CONFIG.instagram}` : '' },
  { icono: siFacebook, url: CONFIG.facebook },
  { icono: siTiktok, url: CONFIG.tiktok },
]

export default function Redes({ className = 'redes' }: { className?: string }) {
  const activas = REDES.filter((r) => r.url)
  if (!activas.length) return null
  return (
    <ul className={className} aria-label="Redes sociales">
      {activas.map(({ icono, url }) => (
        <li key={icono.slug}>
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={icono.title} title={icono.title}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
              <path d={icono.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
