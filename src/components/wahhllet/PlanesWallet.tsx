'use client'

import PricingPlanTilt, { type Plan } from '@/components/ui/pricing-plan-tilt'

/* Planes de wAHHllet. Los montos salen de src/lib/precios.ts (mensual + IVA) y el anual lo calcula anualDe: 12 meses con 20 % de descuento,
   pagados por adelantado. Los datos llegan ya calculados desde la página (servidor). */
export default function PlanesWallet({ plans }: { plans: Plan[] }) {
  return (
    <PricingPlanTilt
      plans={plans}
      title="Planes de wAHHllet"
      subtitle="Precios mensuales, más IVA. El plan anual tiene 20 % de descuento y se paga por adelantado."
      note="Las funciones de cada plan se activan según lo contratado. Los límites los controla la plataforma."
      actionLabel={() => 'Quiero fidelizar'}
      actionHref="/contacto"
    />
  )
}
