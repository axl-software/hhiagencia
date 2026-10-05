import type { Metadata } from 'next'
import Portada from '@/components/portada/Portada'
import Soluciones from '@/components/portada/Soluciones'
import Sistemas from '@/components/portada/Sistemas'
import Diferencia from '@/components/portada/Diferencia'
import Acompanamiento from '@/components/portada/Acompanamiento'
import Nosotros from '@/components/sections/Nosotros'
import Equipo from '@/components/sections/Equipo'
import CtaBanda from '@/components/sections/CtaBanda'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/* Inicio: portada con video, servicios, HHA Systems, por qué HHA, acompañamiento, equipo, nosotros y CTA.
   (El método ya no va aquí: está en /como-trabajamos.) */
export default function Inicio() {
  return (
    <>
      <Portada />
      <Soluciones />
      <Sistemas />
      <Diferencia />
      <Acompanamiento />
      <Equipo />
      <Nosotros />
      <CtaBanda cierre={CONFIG.hooks.inicio} logo="derecha" />
    </>
  )
}
