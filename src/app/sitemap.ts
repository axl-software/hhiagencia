import type { MetadataRoute } from 'next'

const BASE = 'https://www.hhiagencia.cl'

/* Mapa del sitio para Google: /sitemap.xml */
export default function sitemap(): MetadataRoute.Sitemap {
  const hoy = new Date()
  return [
    { url: BASE, lastModified: hoy, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/servicios`, lastModified: hoy, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/marketing`, lastModified: hoy, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/prueba-gratis`, lastModified: hoy, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/contacto`, lastModified: hoy, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${BASE}/como-trabajamos`, lastModified: hoy, changeFrequency: 'monthly', priority: 0.7 },
    ...['privacidad', 'terminos', 'seguridad'].map((p) => ({
      url: `${BASE}/${p}`, lastModified: hoy, changeFrequency: 'yearly' as const, priority: 0.2,
    })),
  ]
}
