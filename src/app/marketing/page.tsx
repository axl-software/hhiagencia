import type { Metadata } from 'next'
import Casos from '@/components/sections/Casos'
import Servicios from '@/components/sections/Servicios'
import Metodo from '@/components/sections/Metodo'
import CtaBanda from '@/components/sections/CtaBanda'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Marketing y captación',
  alternates: { canonical: '/marketing' },
  description: 'Estrategia, contenido, email marketing y embudos para generar clientes. Casos reales de streaming y gastronomía.',
}

/* Marketing: primero los casos reales (Aaron y Bar de Blas, que antes estaban en Proyectos) como ejemplo,
   y debajo solo los servicios de marketing, sin las órbitas del inicio. */
export default function MarketingPage() {
  return (
    <>
      <Casos as="h1" kicker="EJEMPLOS REALES" encabezado="Marketing y contenido en la práctica" />
      <Servicios as="h2" marketing />
      <Metodo />
      <CtaBanda cierre={CONFIG.hooks.marketing} logo="centro" />
    </>
  )
}
