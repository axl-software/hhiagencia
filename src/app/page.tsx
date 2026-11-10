import type { Metadata } from 'next'
import Bienvenida from '@/components/inicio/Bienvenida'
import HeroNeon from '@/components/inicio/HeroNeon'
import AgendaScroll from '@/components/inicio/AgendaScroll'
import WebZoom from '@/components/inicio/WebZoom'
import Hechos from '@/components/inicio/Hechos'
import Caminos from '@/components/inicio/Caminos'
import Calculadora from '@/components/inicio/Calculadora'
import Planes from '@/components/inicio/Planes'
import MarketingBloque from '@/components/inicio/Marketing'
import Resenas3D from '@/components/inicio/Resenas3D'
import Preguntas from '@/components/inicio/Preguntas'
import Sistemas from '@/components/portada/Sistemas'
import CartAHH from '@/components/inicio/CartAHH'
import Diferencia from '@/components/portada/Diferencia'
import Acompanamiento from '@/components/portada/Acompanamiento'
import Nosotros from '@/components/sections/Nosotros'
import Equipo from '@/components/sections/Equipo'
import CtaBanda from '@/components/sections/CtaBanda'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/* Inicio (fundadores, 2026-11-09): bienvenida 3D (una vez por visita), hero neón HHA que al hacer scroll muestra la información, agendAHH (tarjeta que se endereza), páginas web (zoom con parallax), hechos, cuatro caminos,
   agendAHH por rubro, calculadora, planes, por qué HHA, marketing, negocios que trabajan con HHA, cómo trabajamos, equipo,
   nosotros, preguntas y cierre. Los llamados principales: Probar agendAHH gratis, Ver planes y Solicitar cotización. */
export default function Inicio() {
  return (
    <>
      <Bienvenida />
      <HeroNeon />
      <AgendaScroll />
      <WebZoom />
      <Hechos />
      <Caminos />
      <Sistemas />
      <CartAHH />
      <Calculadora />
      <Planes />
      <Diferencia />
      <MarketingBloque />
      <Resenas3D />
      <Acompanamiento />
      <Equipo />
      <Nosotros />
      <Preguntas />
      <CtaBanda cierre={CONFIG.hooks.inicio} logo="derecha" />
    </>
  )
}
