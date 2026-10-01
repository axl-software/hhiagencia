import type { Metadata } from 'next'
import Servicios from '@/components/sections/Servicios'
import Metodo from '@/components/sections/Metodo'
import CtaBanda from '@/components/sections/CtaBanda'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Servicios',
  alternates: { canonical: '/servicios' },
  description:
    'Desarrollo web (Web Start, Web Business y Web Pro), marketing y captación de clientes, automatización e integraciones, e IA y consultoría. Elige lo que necesitas y solicita tu cotización.',
}

export default function ServiciosPage() {
  return (
    <>
      <Servicios as="h1" />
      <Metodo />
      <CtaBanda cierre={CONFIG.hooks.servicios} />
    </>
  )
}
