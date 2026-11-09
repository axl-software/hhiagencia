import type { Metadata } from 'next'
import Servicios from '@/components/sections/Servicios'
import Metodo from '@/components/sections/Metodo'
import CtaBanda from '@/components/sections/CtaBanda'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Marketing y captación',
  alternates: { canonical: '/marketing' },
  description: 'Estrategia, contenido, email marketing y embudos para generar clientes.',
}

/* Marketing: solo los servicios de marketing, sin las órbitas del inicio. Los casos reales (Aaron y Bar de Blas) y el
   fondo de edición se quitaron el 2026-11-09 por pedido de los fundadores; el componente Casos sigue en el código. */
export default function MarketingPage() {
  return (
    <>
      <Servicios as="h1" marketing />
      <Metodo />
      <CtaBanda cierre={CONFIG.hooks.marketing} logo="centro" />
    </>
  )
}
