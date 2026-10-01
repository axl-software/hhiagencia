import { Suspense } from 'react'
import type { Metadata } from 'next'
import Contacto from '@/components/sections/Contacto'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Agenda una reunión con HHiAgencia: cuéntanos qué quieres crear, tu objetivo, fecha y presupuesto, y te respondemos por WhatsApp.',
}

export default function ContactoPage() {
  return (
    <Suspense>
      <Contacto as="h1" />
    </Suspense>
  )
}
