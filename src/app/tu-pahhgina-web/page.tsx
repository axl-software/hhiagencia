import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PlanesWeb from '@/components/paginaweb/PlanesWeb'
import type { Plan } from '@/components/ui/pricing-plan-tilt'
import { CONFIG } from '@/lib/config'
import { PRECIOS, anualDe, clp } from '@/lib/precios'

export const metadata: Metadata = {
  title: 'Tu pAHHgina Web | Desarrollo de páginas web',
  alternates: { canonical: '/tu-pahhgina-web' },
  description: `Páginas web profesionales con mantenimiento mensual, dominio y soporte según el plan. Planes desde ${clp(PRECIOS['web-presentation'].lanzamiento ?? 0)} al mes + IVA.`,
}

/* Tu pAHHgina Web (fundadores, 2026-11-19): página solo de desarrollo de páginas web. Los cuatro planes (Presentation, Starter, Business y Pro) salen de
   src/lib/config.ts (textos) y src/lib/precios.ts (montos). El precio que se muestra es el de lanzamiento; el anual es 20 % de descuento pagado por
   adelantado. La implementación va como "costo de implementación, pago único", sin monto en la tarjeta. */
const IDS = ['web-presentation', 'web-starter', 'web-business', 'web-pro']

export default function TuPahhginaWebPage() {
  const plans: Plan[] = IDS.flatMap((id) => {
    const s = CONFIG.servicios.find((x) => x.id === id)
    const p = PRECIOS[id]
    if (!s || !p) return []
    const mensual = p.lanzamiento ?? p.monto ?? 0
    const anual = anualDe(p)
    const extra = [p.regular ? `Precio lanzamiento · regular ${clp(p.regular)}` : 'Precio lanzamiento', p.implementacion ? '+ costo de implementación (pago único)' : ''].filter(Boolean).join(' · ')
    return [{
      id, name: s.nombre.replace(/^Web /, ''), tagline: s.desc ?? '', popular: Boolean(s.destacado),
      monthly: mensual, yearly: anual?.mensual ?? mensual, yearlyTotal: anual?.total ?? mensual * 12, extra,
      features: (s.beneficios ?? []).map((text) => ({ text })),
    }]
  })

  return (
    <>
      <section className="mx-auto w-full max-w-5xl px-4 pt-14 text-center sm:pt-20" aria-labelledby="pahhgina-t">
        <p className="kicker" style={{ justifyContent: 'center' }}>DESARROLLO DE PÁGINAS WEB</p>
        <h1 id="pahhgina-t" className="display" style={{ fontSize: 'clamp(46px, 9.5vw, 132px)', lineHeight: 0.95, letterSpacing: '-0.045em', fontWeight: 800, margin: '4px 0 0' }}>
          Tu p<span style={{ color: 'var(--red)' }}>AHH</span>gina Web
        </h1>
        <p className="lead" style={{ margin: '20px auto 0', maxWidth: '52ch' }}>
          Sitios web profesionales con mantenimiento mensual: tu web siempre al día, con dominio y soporte según el plan.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 28 }}>
          <a className="btn-vivo" href="#planes">Ver planes <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" /></a>
          <Link className="btn btn-out" href="/contacto?servicios=web-business">Pedir mi demo gratis</Link>
        </div>
      </section>

      <section className="mx-auto flex w-full justify-center px-4 pb-24 pt-16 sm:pt-24" id="planes" aria-label="Planes">
        <PlanesWeb plans={plans} />
      </section>
    </>
  )
}
