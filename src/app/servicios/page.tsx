import type { Metadata } from 'next'
import Servicios from '@/components/sections/Servicios'
import Metodo from '@/components/sections/Metodo'
import CtaBanda from '@/components/sections/CtaBanda'

export const metadata: Metadata = {
  title: 'Servicios y precios',
  description:
    'Dirección creativa, producción audiovisual, contenido para redes, eventos, propuestas para marcas y apoyo a creadores. Arma tu proyecto y cotiza.',
}

export default function ServiciosPage() {
  return (
    <>
      <Servicios as="h1" />
      <Metodo />
      <CtaBanda titulo="¿Ya elegiste? Lo bajamos a una propuesta." />
    </>
  )
}
