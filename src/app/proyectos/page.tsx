import type { Metadata } from 'next'
import Casos from '@/components/sections/Casos'
import Resenas from '@/components/sections/Resenas'
import CtaBanda from '@/components/sections/CtaBanda'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Proyectos',
  alternates: { canonical: '/proyectos' },
  description: 'Trabajo real con clientes reales: contenido, marketing y producción para streaming y gastronomía.',
}

export default function ProyectosPage() {
  return (
    <>
      <Casos as="h1" />
      <Resenas />
      <CtaBanda cierre={CONFIG.hooks.proyectos} />
    </>
  )
}
