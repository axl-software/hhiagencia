import type { MetadataRoute } from 'next'

/* Permite que Google lea todo el sitio y le indica dónde está el mapa: /robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://hhiagencia.cl/sitemap.xml',
  }
}
