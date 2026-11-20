import type { Metadata } from 'next'
import HeroTarjetas from '@/components/wahhllet/HeroTarjetas'
import PlanesWallet from '@/components/wahhllet/PlanesWallet'
import type { Plan } from '@/components/ui/pricing-plan-tilt'
import { PRECIOS, anualDe } from '@/lib/precios'

export const metadata: Metadata = {
  title: 'wAHHllet | Tarjeta de sellos y recompensas en el teléfono',
  alternates: { canonical: '/wahhllet' },
  description: 'wAHHllet (HHA Wallet Loyalty): la tarjeta de sellos y recompensas que tus clientes guardan en el teléfono. Planes desde $19.990 al mes + IVA.',
}

/* wAHHllet (fundadores, 2026-11-19): nombre comercial de HHA Wallet Loyalty. Planes y datos: Starter (500 clientes activos, 1 sucursal, sin sellos ni
   recompensas), Business (1.500 clientes, 2 sucursales, con sellos y recompensas) y Pro (desde, 5.000 clientes, 3 o más sucursales, con sellos y
   recompensas). Montos en src/lib/precios.ts. El anual es 20 % de descuento, pagado por adelantado. */
const DATOS = [
  { id: 'wallet-starter', name: 'Starter', tagline: 'Para empezar a fidelizar', popular: false, features: [{ text: 'Hasta 500 clientes activos' }, { text: '1 sucursal' }, { text: 'Sin sellos ni recompensas', included: false }] },
  { id: 'wallet-business', name: 'Business', tagline: 'Con sellos y recompensas', popular: true, features: [{ text: 'Hasta 1.500 clientes activos' }, { text: '2 sucursales' }, { text: 'Sellos y recompensas' }] },
  { id: 'wallet-pro', name: 'Pro', tagline: 'Para varias sucursales', popular: false, features: [{ text: 'Hasta 5.000 clientes activos' }, { text: '3 o más sucursales' }, { text: 'Sellos y recompensas' }] },
]

export default function WahhlletPage() {
  const plans: Plan[] = DATOS.map((d) => {
    const p = PRECIOS[d.id]
    const anual = anualDe(p)
    return {
      id: d.id, name: d.name, tagline: d.tagline, popular: d.popular, features: d.features,
      monthly: p.monto ?? 0, yearly: anual?.mensual ?? p.monto ?? 0, yearlyTotal: anual?.total ?? (p.monto ?? 0) * 12, from: Boolean(p.desde),
    }
  })
  return (
    <>
      <HeroTarjetas />
      <section className="mx-auto flex w-full justify-center px-4 pb-24 pt-16 sm:pt-24" id="planes" aria-label="Planes">
        <PlanesWallet plans={plans} />
      </section>
    </>
  )
}
