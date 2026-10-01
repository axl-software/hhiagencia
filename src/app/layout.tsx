import type { Metadata, Viewport } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CONFIG } from '@/lib/config'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://hhiagencia.cl'),
  title: {
    default: 'HHA Digital Solutions | Web, Automatización y Marketing',
    template: '%s | HHA Digital Solutions',
  },
  description:
    'Ayudamos a marcas, creadores y empresas con contenido, estrategias, automatizaciones y soluciones digitales. Casablanca, Valparaíso y Viña del Mar.',
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
  alternateName: 'HHiAgencia',
  url: 'https://hhiagencia.cl',
  logo: 'https://hhiagencia.cl/brand/hh-logo-azul.png',
  slogan: 'Digitaliza. Automatiza. Escala.',
  description:
    'Ayudamos a marcas, creadores y empresas con contenido, estrategias, automatizaciones y soluciones digitales.',
  areaServed: ['Casablanca', 'Valparaíso', 'Viña del Mar'].map((name) => ({ '@type': 'City', name })),
  founder: [
    { '@type': 'Person', name: 'Herberth Garay' },
    { '@type': 'Person', name: 'Alexander Bello' },
  ],
  sameAs: [`https://instagram.com/${CONFIG.instagram}`],
}

export const viewport: Viewport = {
  themeColor: '#05070A',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es-CL">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZACION).replace(/</g, '\\u003c') }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
