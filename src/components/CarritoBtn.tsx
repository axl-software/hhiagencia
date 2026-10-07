'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { usePedido } from '@/lib/pedido'
import s from './Header.module.css'

/* Ícono del pedido en el encabezado: lleva a /pedido y muestra cuántas cosas hay elegidas. */
export default function CarritoBtn() {
  const { items } = usePedido()
  const n = items.length
  return (
    <Link className={s.carrito} href="/pedido" aria-label={n ? `Mi pedido: ${n} ${n === 1 ? 'elemento' : 'elementos'}` : 'Mi pedido (vacío)'}>
      <ShoppingCart size={20} strokeWidth={2.25} aria-hidden="true" />
      {n > 0 && <span className={s.carritoN} aria-hidden="true">{n}</span>}
    </Link>
  )
}
