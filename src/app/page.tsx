import HeroOrbita from '@/components/HeroOrbita'
import Postura from '@/components/sections/Postura'
import Metodo from '@/components/sections/Metodo'
import Nosotros from '@/components/sections/Nosotros'
import Equipo from '@/components/sections/Equipo'
import CtaBanda from '@/components/sections/CtaBanda'

/* Inicio: portada, postura, método, quiénes somos, equipo y CTA. */
export default function Inicio() {
  return (
    <>
      <HeroOrbita />
      <Postura />
      <Metodo alt />
      <Nosotros />
      <Equipo />
      <CtaBanda />
    </>
  )
}
