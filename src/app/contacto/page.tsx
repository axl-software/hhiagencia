import { Suspense } from 'react'
import type { Metadata } from 'next'
import Contacto from '@/components/sections/Contacto'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Agenda una reunión con HHiAgencia: cuéntanos qué necesitas, tu objetivo, fecha y presupuesto, y te enviamos una propuesta.',
}

export default function ContactoPage() {
  return (
    <Suspense>
      <Contacto as="h1" />
    </Suspense>
  )
}
