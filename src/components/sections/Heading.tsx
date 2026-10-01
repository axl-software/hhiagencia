import type { CSSProperties, ReactNode } from 'react'

/* Título de sección: h1 cuando abre la página, h2 en el resto. */
export type Level = 'h1' | 'h2'

export function Kicker({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div className="kicker" style={style}>{children}</div>
}

export function Title({ as: Tag = 'h2', children, style }: { as?: Level; children: ReactNode; style?: CSSProperties }) {
  return <Tag className="display h2" style={style}>{children}</Tag>
}
