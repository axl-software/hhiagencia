'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import { temaDeRuta } from '@/lib/tema'

/* Pone el tono (claro azulado u oscuro) que corresponde a la página en que está la persona.
   El primer tono lo pone TEMA_SCRIPT desde el servidor; esto lo actualiza al navegar entre páginas.
   Las rutas claras se editan en src/lib/tema.ts. */
export default function TemaRuta() {
  const ruta = usePathname()
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = temaDeRuta(ruta)
  }, [ruta])
  return null
}
