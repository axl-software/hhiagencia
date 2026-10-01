/* Reemplazo de next/navigation para la vista previa. */
import { useMemo } from 'react'
import { usePath, useQuery } from './router'

export const usePathname = () => usePath()
export const useSearchParams = () => {
  const q = useQuery()
  return useMemo(() => new URLSearchParams(q), [q])
}
