import type { Metadata } from 'next'
import HeroTarjetas from '@/components/wahhllet/HeroTarjetas'
import PlanesWallet from '@/components/wahhllet/PlanesWallet'
import type { Plan } from '@/components/ui/pricing-plan-tilt'
import { PRECIOS, anualDe } from '@/lib/precios'

export const metadata: Metadata = {
  title: 'wAHHllet | Tarjeta de sellos en Apple Wallet',
  alternates: { canonical: '/wahhllet' },
  description: 'wAHHllet (HHA Wallet Loyalty): tu programa de fidelización en Apple Wallet. Tus clientes se registran con un QR y tu equipo suma sellos desde el celular. Planes desde $19.990 al mes + IVA.',
}

/* wAHHllet (fundadores, 2026-11-19): nombre comercial de HHA Wallet Loyalty. Los textos y planes son los de https://wallet.hhiagencia.cl: solo dos planes
   (Starter wAHHllet y Business Loyalty wAHHllet; Pro está oculto por ahora). Montos en src/lib/precios.ts. El anual es 20 % de descuento, pagado por
   adelantado (a pedido de los fundadores; la landing de Wallet aún no lo muestra). */
const DATOS = [
  {
    id: 'wallet-starter', name: 'Starter wAHHllet', tagline: 'Para que tus clientes y socios te conozcan.', popular: false,
    features: [{ text: 'Hasta 500 clientes activos' }, { text: '1 sucursal' }, { text: 'Vives en la wallet de tus clientes y socios' }, { text: 'Sin sellos ni recompensas', included: false }],
  },
  {
    id: 'wallet-business', name: 'Business Loyalty wAHHllet', tagline: 'Fideliza a tus clientes y dales una razón para volver.', popular: false,
    features: [{ text: 'Hasta 1.500 clientes activos' }, { text: '2 sucursales' }, { text: 'Sellos y premios para tus clientes' }, { text: 'Geomarketing: tu tarjeta aparece en su celular cuando están cerca de tu local' }],
  },
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
