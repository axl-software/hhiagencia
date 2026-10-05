import { Suspense } from 'react'
import type { Metadata } from 'next'
import PruebaGratis from '@/components/sections/PruebaGratis'

export const metadata: Metadata = {
  title: 'Prueba gratis',
  alternates: { canonical: '/prueba-gratis' },
  description:
    'Prueba gratis tu sistema de reservas y ventas con tu marca. Elige tu tipo de negocio, cuéntanos cómo se llama y primero lo pruebas; si te sirve, te quedas.',
}

export default function PruebaGratisPage() {
  return (
    <Suspense>
      <PruebaGratis />
    </Suspense>
  )
}
