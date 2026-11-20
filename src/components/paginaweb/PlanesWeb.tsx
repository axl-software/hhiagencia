'use client'

import PricingPlanTilt, { type Plan } from '@/components/ui/pricing-plan-tilt'

/* Planes de Tu pAHHgina Web (desarrollo de páginas web). Los datos llegan ya calculados desde la página (servidor): textos de src/lib/config.ts,
   montos de src/lib/precios.ts y el anual de anualDe (20 % de descuento, pagado por adelantado). */
export default function PlanesWeb({ plans }: { plans: Plan[] }) {
  return (
    <PricingPlanTilt
      plans={plans}
      title="Planes de Tu pAHHgina Web"
      subtitle="Precios mensuales, más IVA. El plan anual tiene 20 % de descuento y se paga por adelantado."
      note="Cada plan suma un costo de implementación, de pago único. Dominio y mantenimiento según el plan."
      actionLabel={(p) => `Pedir mi demo gratis · ${p.name}`}
      actionHref="/contacto"
    />
  )
}
