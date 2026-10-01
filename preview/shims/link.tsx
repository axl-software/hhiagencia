/* Reemplazo de next/link para la vista previa: convierte rutas en hashes. */
import type { AnchorHTMLAttributes } from 'react'
import { toHash } from './router'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean }

export default function Link({ href, prefetch: _prefetch, ...rest }: Props) {
  void _prefetch
  return <a href={toHash(href)} {...rest} />
}
