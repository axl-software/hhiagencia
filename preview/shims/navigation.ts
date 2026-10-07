/* Reemplazo de next/navigation para la vista previa. */
import { useMemo } from 'react'
import { usePath, useQuery, toHash } from './router'

export const usePathname = () => usePath()
export const useSearchParams = () => {
  const q = useQuery()
  return useMemo(() => new URLSearchParams(q), [q])
}

/* Navegar desde código (ir al pedido al elegir un plan) */
export const useRouter = () => ({ push: (href: string) => { window.location.hash = toHash(href) } })
