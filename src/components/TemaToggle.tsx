'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { TEMA_CLAVE as CLAVE, leerTema as leer, suscribirTema as suscribir, type Tema } from '@/lib/tema'

/* Botón de tema claro/oscuro. El tema inicial lo pone TEMA_SCRIPT (src/lib/tema.ts);
   aquí solo se lee y se cambia, y la elección queda guardada en este navegador. */
const aplicar = (t: Tema) => {
  document.documentElement.dataset.theme = t
}

export default function TemaToggle({ className }: { className?: string }) {
  const tema = useSyncExternalStore(suscribir, leer, (): Tema => 'dark')

  /* Sin elección guardada, sigue al dispositivo también si cambia con la página abierta */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      try {
        if (localStorage.getItem(CLAVE)) return
      } catch {
        /* almacenamiento bloqueado: igual seguimos al dispositivo */
      }
      aplicar(mq.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const siguiente: Tema = tema === 'light' ? 'dark' : 'light'
  const etiqueta = siguiente === 'light' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
  const cambiar = () => {
    aplicar(siguiente)
    try {
      localStorage.setItem(CLAVE, siguiente)
    } catch {
      /* sin almacenamiento: el cambio dura hasta recargar */
    }
  }

  return (
    <button type="button" className={className} onClick={cambiar} aria-label={etiqueta} title={etiqueta}>
      {tema === 'light' ? <Moon size={18} strokeWidth={2} aria-hidden="true" /> : <Sun size={18} strokeWidth={2} aria-hidden="true" />}
    </button>
  )
}
