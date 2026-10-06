import type { Metadata, Viewport } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CONFIG } from '@/lib/config'
import TemaScript from '@/components/TemaScript'
import Revelar from '@/components/Revelar'
import TemaRuta from '@/components/TemaRuta'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hhiagencia.cl'),
  title: {
    default: 'HHA Digital Solutions | Web, Automatización y Marketing',
    template: '%s | HHA Digital Solutions',
  },
  description:
    'Ayudamos a marcas, creadores y empresas con contenido, estrategias, automatizaciones y soluciones digitales. Desde la Región de Valparaíso para todo Chile.',
  openGraph: {
    title: 'HHA Digital Solutions | Web, Automatización y Marketing',
    description: 'Digitaliza. Automatiza. Escala. Web, automatización y marketing para marcas, creadores y empresas.',
    siteName: 'HHiAgencia',
    locale: 'es_CL',
    type: 'website',
  },
}

/* Ficha para Google (schema.org): solo datos aprobados en docs/.
   Dirección y teléfono se agregan cuando estén definidos. */
const ORGANIZACION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HHA Digital Solutions',
  legalName: 'HHA Digital Solutions SpA',
  alternateName: 'HHiAgencia',
  url: 'https://www.hhiagencia.cl',
  logo: 'https://www.hhiagencia.cl/brand/hh-logo-azul.png',
  slogan: 'Digitaliza. Automatiza. Escala.',
  description:
    'Ayudamos a marcas, creadores y empresas con contenido, estrategias, automatizaciones y soluciones digitales. Base en Casablanca, Región de Valparaíso; trabajamos en todo Chile.',
  address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressRegion: 'Región de Valparaíso', addressCountry: 'CL' },
  areaServed: [
    { '@type': 'Country', name: 'Chile' },
    { '@type': 'AdministrativeArea', name: 'Región de Valparaíso' },
    ...['Valparaíso', 'Viña del Mar', 'Casablanca', 'Quilpué', 'Villa Alemana', 'San Antonio', 'Quillota', 'Los Andes', 'San Felipe'].map(
      (name) => ({ '@type': 'City', name })
    ),
  ],
  email: CONFIG.email,
  telephone: `+${CONFIG.whatsapp}`,
  founder: [
    { '@type': 'Person', name: 'Herberth Garay' },
    { '@type': 'Person', name: 'Alexander Bello' },
  ],
  sameAs: [`https://instagram.com/${CONFIG.instagram}`],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E6EDF7' },
    { media: '(prefers-color-scheme: dark)', color: '#05070A' },
  ],
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // suppressHydrationWarning: el script de tema agrega data-theme antes de que React cargue.
    // data-scroll-behavior: Next 16 lo pide para desactivar el desplazamiento suave al cambiar de página.
    <html lang="es-CL" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <TemaScript />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZACION).replace(/</g, '\\u003c') }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <Revelar />
        <TemaRuta />
        {/* Vercel Web Analytics: sin cookies y anónimo; eventos en src/lib/medir.ts.
            Solo cuando el sitio se arma en Vercel (VERCEL=1): fuera de Vercel su archivo no existe
            y el navegador mostraría un error 404 en cada página. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  )
}
