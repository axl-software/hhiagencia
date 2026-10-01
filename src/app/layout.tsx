import type { Metadata, Viewport } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
    url: 'https://hhiagencia.cl',
    siteName: 'HHiAgencia',
    locale: 'es_CL',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#05070A',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es-CL">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
