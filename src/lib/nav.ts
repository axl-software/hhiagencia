/* Páginas del sitio: las usan Header y Footer. */
export const NAV = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Marketing', href: '/marketing' },
  { label: 'Proceso', href: '/como-trabajamos' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Contacto', href: '/contacto' },
] as const

/* Páginas legales: van en la base del pie de página. */
export const LEGAL = [
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Términos', href: '/terminos' },
  { label: 'Seguridad', href: '/seguridad' },
] as const
