'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { waUrl } from '@/lib/config'

/* Botón "Hablemos": aparece al bajar 80% de la pantalla. Sin número, lleva a /contacto. */
export default function WhatsAppFlotante() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cls = `btn btn-red wa-float transition-all duration-300 ${show ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`
  const inner = (
    <>
      <MessageCircle size={20} strokeWidth={2.25} style={{ marginRight: 8 }} aria-hidden="true" />
      Hablemos
    </>
  )
  const wa = waUrl('Hola HHiAgencia, quiero conversar sobre mi proyecto.')
  return wa ? (
    <a className={cls} tabIndex={show ? 0 : -1} href={wa} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp">{inner}</a>
  ) : (
    <Link className={cls} tabIndex={show ? 0 : -1} href="/contacto" aria-label="Ir a contacto">{inner}</Link>
  )
}
