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

export default function MarketingPage() {
  return (
    <>
      <Servicios as="h1" marketing />
      <Metodo />
      <CtaBanda cierre={CONFIG.hooks.servicios} />
    </>
  )
}
