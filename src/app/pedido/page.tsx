import type { Metadata } from 'next'
import Pedido from '@/components/sections/Pedido'

/* Página personal (lo que eligió cada visitante): no se indexa. */
export const metadata: Metadata = {
  title: 'Tu pedido',
  alternates: { canonical: '/pedido' },
  robots: { index: false, follow: true },
  description: 'Revisa el valor de lo que elegiste, cambia de plan o de período y confirma tu pedido con HHiAgencia. Pagas por transferencia o te contactamos por correo.',
}

export default function PedidoPage() {
  return <Pedido as="h1" />
}
