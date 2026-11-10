import type { Metadata } from 'next'
import Servicios from '@/components/sections/Servicios'
import HeroPortatil from '@/components/servicios/HeroPortatil'
import Metodo from '@/components/sections/Metodo'
import CtaBanda from '@/components/sections/CtaBanda'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Servicios',
  alternates: { canonical: '/servicios' },
  description:
    'Planes web desde $14.990/mes, HHA Systems, marketing y captación de clientes, automatización, integraciones e IA, con packs y opción anual -20%. Trabajamos en todo Chile. Elige lo que necesitas y solicita tu cotización.',
}

export default function ServiciosPage() {
  return (
    <>
      <HeroPortatil />
      <Servicios as="h2" />
      <Metodo />
      <CtaBanda cierre={CONFIG.hooks.servicios} logo="izquierda" />
    </>
  )
}
