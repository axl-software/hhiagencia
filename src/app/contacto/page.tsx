import { Suspense } from 'react'
import type { Metadata } from 'next'
import Contacto from '@/components/sections/Contacto'

export const metadata: Metadata = {
  title: 'Contacto',
  alternates: { canonical: '/contacto' },
  description: 'Cuéntanos qué necesitas y te contactamos: acordamos una reunión y llegamos con una propuesta para tu negocio.',
}

export default function ContactoPage() {
  return (
    <Suspense>
      <Contacto as="h1" />
    </Suspense>
  )
}
