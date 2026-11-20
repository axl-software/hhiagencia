'use client'

import { ArrowRight } from 'lucide-react'
import TeamLanyardRail, { type LanyardMember } from '@/components/ui/team-lanyard-rail'

/* Hero de /wahhllet: el nombre al centro y, abajo, un riel con tarjetas colgantes. Cuatro son ejemplos de negocios (rotulados como
   ejemplo) y en el centro va la tarjeta "HHA Partner's Club" (en la web de Wallet figura como Próximamente), con el QR tapado y el nombre cambiado por "HHA Admin".
   El botón lleva a la plataforma: https://wallet.hhiagencia.cl/ */
const URL_WALLET = 'https://wallet.hhiagencia.cl/'

/* Avatar de ejemplo: círculo de color con la inicial del negocio (no es el logo de ningún cliente) */
const avatar = (letra: string, fondo: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${fondo}"/><text x="50" y="66" font-family="Arial,Helvetica,sans-serif" font-size="52" font-weight="700" text-anchor="middle" fill="#fff">${letra}</text></svg>`)}`

const TARJETAS: LanyardMember[] = [
  {
    id: 'barberia', name: 'Barbería Ejemplo', role: 'Club de sellos', team: 'wAHHllet · Ejemplo', tone: 2,
    image: avatar('B', '#0B1020'), tags: ['4/10 sellos', 'Ejemplo'],
    bio: 'Ejemplo ilustrativo. Cada compra suma un sello; al completar la meta se crea la recompensa, con su vencimiento.',
  },
  {
    id: 'cafe', name: 'Café Ejemplo', role: 'Club de sellos', team: 'wAHHllet · Ejemplo', tone: 5,
    image: avatar('C', '#B5543A'), tags: ['8/10 sellos', 'Café gratis'],
    bio: 'Ejemplo ilustrativo. El cliente guarda su tarjeta en Apple Wallet y tu equipo suma el sello al escanearla.',
  },
  {
    id: 'hha', name: 'HHA Partner´s Club', role: 'HHA Admin', team: 'wAHHllet', tone: 1, drop: 10,
    image: '/brand/hh-logo-blanco.png', faceImage: '/wahhllet/hha-partners-club.jpg', hideQr: true,
    tags: ['4/10 sellos', 'Próximamente'],
    bio: 'HHA Partners Club Wallet: próximamente. Vista conceptual; sus condiciones se confirmarán al lanzarlo.',
  },
  {
    id: 'estetica', name: 'Estética Ejemplo', role: 'Club de sellos', team: 'wAHHllet · Ejemplo', tone: 4,
    image: avatar('E', '#8F5BFF'), tags: ['2/10 sellos', 'Ejemplo'],
    bio: 'Ejemplo ilustrativo. Menos cartón perdido y un motivo más para volver.',
  },
  {
    id: 'pizzeria', name: 'Pizzería Ejemplo', role: 'Club de sellos', team: 'wAHHllet · Ejemplo', tone: 3,
    image: avatar('P', '#D7263D'), tags: ['9/10 sellos', 'Ejemplo'],
    bio: 'Ejemplo ilustrativo. Tu equipo escanea desde el celular y confirma la compra pagada.',
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
      <p className="lead" style={{ margin: '18px auto 0', maxWidth: '46ch' }}>
        La tarjeta de sellos que tus clientes ya llevan en el teléfono. wAHHllet pone tu programa de fidelización en Apple Wallet.
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
