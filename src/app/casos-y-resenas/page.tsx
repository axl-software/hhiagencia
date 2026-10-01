import type { Metadata } from 'next'
import Casos from '@/components/sections/Casos'
import Resenas from '@/components/sections/Resenas'
import CtaBanda from '@/components/sections/CtaBanda'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Casos',
  alternates: { canonical: '/casos-y-resenas' },
  description: 'Trabajo real con clientes reales: contenido, marketing y producción para streaming y gastronomía.',
}

export default function CasosYResenasPage() {
  return (
    <>
      <Casos as="h1" />
      <Resenas />
      <CtaBanda titulo={CONFIG.hooks.casos} />
    </>
  )
}
