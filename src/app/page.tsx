import type { Metadata } from 'next'
import HeroOrbita from '@/components/HeroOrbita'
import Postura from '@/components/sections/Postura'
import Metodo from '@/components/sections/Metodo'
import Nosotros from '@/components/sections/Nosotros'
import Equipo from '@/components/sections/Equipo'
import CtaBanda from '@/components/sections/CtaBanda'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/* Inicio: portada, por qué HHA, método, nosotros, equipo y CTA. */
export default function Inicio() {
  return (
    <>
      <HeroOrbita />
      <Postura />
      <Metodo alt />
      <Nosotros />
      <Equipo />
      <CtaBanda titulo={CONFIG.hooks.inicio} />
    </>
  )
}
