'use client'

import { ArrowRight } from 'lucide-react'
import TeamLanyardRail, { type LanyardMember } from '@/components/ui/team-lanyard-rail'

/* Hero de /wahhllet: el nombre al centro y, abajo, un riel con tarjetas colgantes. Cuatro son ejemplos de negocios (rotulados como
   ejemplo) y en el centro va la tarjeta real "HHA Partner's Club", con el QR tapado y el nombre cambiado por "HHA Admin".
   El botón lleva a la plataforma: https://wallet.hhiagencia.cl/ */
const URL_WALLET = 'https://wallet.hhiagencia.cl/'

/* Avatar de ejemplo: círculo de color con la inicial del negocio (no es el logo de ningún cliente) */
const avatar = (letra: string, fondo: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${fondo}"/><text x="50" y="66" font-family="Arial,Helvetica,sans-serif" font-size="52" font-weight="700" text-anchor="middle" fill="#fff">${letra}</text></svg>`)}`

const TARJETAS: LanyardMember[] = [
  {
    id: 'barberia', name: 'Barbería Ejemplo', role: 'Tarjeta de sellos', team: 'wAHHllet · Ejemplo', tone: 2,
    image: avatar('B', '#0B1020'), tags: ['4/10 sellos', 'Ejemplo'],
    bio: 'Cada visita suma un sello. Al completar los 10, el cliente canjea su recompensa.',
  },
  {
    id: 'cafe', name: 'Café Ejemplo', role: 'Tarjeta de sellos', team: 'wAHHllet · Ejemplo', tone: 5,
    image: avatar('C', '#B5543A'), tags: ['7/10 sellos', 'Ejemplo'],
    bio: 'El cliente guarda su tarjeta en el teléfono y el local suma el sello al escanearla.',
  },
  {
    id: 'hha', name: 'HHA Partner´s Club', role: 'HHA Admin', team: 'wAHHllet', tone: 1, drop: 10,
    image: '/brand/hh-logo-blanco.png', faceImage: '/wahhllet/hha-partners-club.jpg', hideQr: true,
    tags: ['4/10 sellos', 'Tarjeta real'],
    bio: 'Tarjeta real del programa de HHA. Recompensa: Partner´s Cash Reward.',
  },
  {
    id: 'estetica', name: 'Estética Ejemplo', role: 'Tarjeta de sellos', team: 'wAHHllet · Ejemplo', tone: 4,
    image: avatar('E', '#8F5BFF'), tags: ['2/10 sellos', 'Ejemplo'],
    bio: 'Sellos y recompensas para que tus clientas vuelvan, sin tarjetas de cartón.',
  },
  {
    id: 'pizzeria', name: 'Pizzería Ejemplo', role: 'Tarjeta de sellos', team: 'wAHHllet · Ejemplo', tone: 3,
    image: avatar('P', '#D7263D'), tags: ['9/10 sellos', 'Ejemplo'],
    bio: 'La recompensa se activa al completar los sellos y el local la canjea con un toque.',
  },
]

const ETIQUETAS = {
  flip: 'Toca la tarjeta o presiona Enter para darla vuelta',
  back: 'Tócala otra vez o presiona Esc para volver',
  show: 'Ver',
}

export default function HeroTarjetas() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 pt-14 text-center sm:pt-20" aria-labelledby="wahhllet-t">
      <p className="kicker" style={{ justifyContent: 'center' }}>HHA WALLET LOYALTY · HHA DIGITAL SOLUTIONS</p>
      <h1 id="wahhllet-t" className="display" style={{ fontSize: 'clamp(54px, 11vw, 150px)', lineHeight: 0.95, letterSpacing: '-0.045em', fontWeight: 800, margin: '4px 0 0' }}>
        w<span style={{ color: 'var(--red)' }}>AHH</span>llet
      </h1>
      <p className="lead" style={{ margin: '18px auto 0', maxWidth: '44ch' }}>
        La tarjeta de sellos y recompensas que tus clientes guardan en el teléfono.
      </p>

      <TeamLanyardRail
        className="mt-6 bg-transparent"
        items={TARJETAS}
        labels={ETIQUETAS}
        autoplay
        interval={3200}
        caption="Roza el riel para ver cada tarjeta, tira de una hacia abajo y tócala para darla vuelta."
        action={
          <a className="btn-vivo" href={URL_WALLET} target="_blank" rel="noopener noreferrer">
            Mira wAHHllet aquí <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
          </a>
        }
      />
    </section>
  )
}
