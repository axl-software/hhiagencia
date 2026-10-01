import type { Metadata } from 'next'
import Casos from '@/components/sections/Casos'
import Resenas from '@/components/sections/Resenas'
import CtaBanda from '@/components/sections/CtaBanda'

export const metadata: Metadata = {
  title: 'Casos y reseñas',
  description: 'Trabajo real con clientes reales: streaming en Kick, gastronomía y contenido propio. Lo que dicen después del rodaje.',
}

export default function CasosYResenasPage() {
  return (
    <>
      <Casos as="h1" />
      <Resenas />
      <CtaBanda titulo="¿El próximo caso es el tuyo?" />
    </>
  )
}
