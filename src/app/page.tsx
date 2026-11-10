import type { Metadata } from 'next'
import Bienvenida from '@/components/inicio/Bienvenida'
import Hero from '@/components/inicio/Hero'
import Hechos from '@/components/inicio/Hechos'
import Caminos from '@/components/inicio/Caminos'
import Calculadora from '@/components/inicio/Calculadora'
import Planes from '@/components/inicio/Planes'
import MarketingBloque from '@/components/inicio/Marketing'
import Confianza from '@/components/inicio/Confianza'
import Preguntas from '@/components/inicio/Preguntas'
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

/* Inicio en tono claro (fundadores, 2026-11-09): bienvenida 3D (una vez por visita), hero con rubros, hechos, cuatro caminos,
   agendAHH por rubro, calculadora, planes, por qué HHA, marketing, negocios que trabajan con HHA, cómo trabajamos, equipo,
   nosotros, preguntas y cierre. Los llamados principales: Probar agendAHH gratis, Ver planes y Solicitar cotización. */
export default function Inicio() {
  return (
    <>
      <Bienvenida />
      <Hero />
      <Hechos />
      <Caminos />
      <Sistemas />
      <Calculadora />
      <Planes />
      <Diferencia />
      <MarketingBloque />
      <Confianza />
      <Acompanamiento />
      <Equipo />
      <Nosotros />
      <Preguntas />
      <CtaBanda cierre={CONFIG.hooks.inicio} logo="derecha" />
    </>
  )
}
