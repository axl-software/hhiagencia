import { siFacebook, siInstagram, siTiktok, type SimpleIcon } from 'simple-icons'
import { CONFIG } from '@/lib/config'

/* Íconos de redes sociales (logos de Simple Icons, licencia CC0).
   Solo se muestran las redes que tienen enlace en src/lib/config.ts.
   usuario: muestra "@hhiagencia.cl" al lado del logo de Instagram ("lado", pie de página)
   o debajo ("abajo", contacto). */
const REDES: { icono: SimpleIcon; url: string; usuario?: string }[] = [
  { icono: siInstagram, url: CONFIG.instagram ? `https://instagram.com/${CONFIG.instagram}` : '', usuario: CONFIG.instagram },
  { icono: siFacebook, url: CONFIG.facebook },
  { icono: siTiktok, url: CONFIG.tiktok },
]

export default function Redes({ className = 'redes', usuario }: { className?: string; usuario?: 'lado' | 'abajo' }) {
  const activas = REDES.filter((r) => r.url)
  if (!activas.length) return null
  return (
    <ul className={className} aria-label="Redes sociales">
      {activas.map(({ icono, url, usuario: cuenta }) => {
        const svg = (
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
            <path d={icono.path} />
          </svg>
        )
        return (
          <li key={icono.slug}>
            {usuario && cuenta ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className={`red-usuario red-usuario-${usuario}`} aria-label={`${icono.title}: @${cuenta}`}>
                <span className="red-ico">{svg}</span>
                <span>@{cuenta}</span>
              </a>
            ) : (
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={icono.title} title={icono.title}>
                {svg}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}
