'use client'

import type { MouseEvent } from 'react'
import GlassHeadlineHero from '@/components/ui/glass-headline-hero'

/* Hero de /marketing (fundadores, 2026-11-10): "Haz visible tu marca" con el titular de vidrio. Los dos botones, "Hazme visible" y
   "Ver planes", llevan al mismo lugar: la sección de planes de más abajo, con un desplazamiento suave (sin movimiento si la persona
   pidió "reducir movimiento"). Colores (pedido de los fundadores): distintos azules con blanco y un rojizo café, bien mezclados. */
const COLORES = ['#0F2354', '#B5543A', '#E3EEFF', '#2A62E0', '#FFFFFF']

function irAPlanes(e: MouseEvent<HTMLElement>) {
  const destino = document.getElementById('planes')
  if (!destino) return
  e.preventDefault()
  const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  destino.scrollIntoView({ behavior: reducir ? 'auto' : 'smooth', block: 'start' })
  window.setTimeout(() => destino.focus({ preventScroll: true }), reducir ? 0 : 700)
}

export default function HeroVisible() {
  return (
    <GlassHeadlineHero
      eyebrow="Marketing + Web"
      title="Haz visible tu marca"
      description="Marketing y web trabajando juntos para que tu negocio se vea, se encuentre y se recuerde."
      primaryAction={{ label: 'Hazme visible', href: '#planes', onClick: irAPlanes }}
      secondaryAction={{ label: 'Ver planes', href: '#planes', onClick: irAPlanes }}
      colors={COLORES}
      height="100svh"
    />
  )
}
