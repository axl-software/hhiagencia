import type { Metadata, Viewport } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://hhiagencia.cl'),
  title: {
    default: 'HH Studio Creativo — Agencia de IA y marketing',
    template: '%s · HH Studio Creativo',
  },
  description:
    'Agencia de IA y marketing en Casablanca, Valparaíso y Viña del Mar. Dirección creativa, contenido, producción audiovisual y automatizaciones con IA.',
  openGraph: {
    title: 'HH Studio Creativo — Agencia de IA y marketing',
    description: 'Marketing, contenido y automatizaciones con IA. Con dirección.',
    url: 'https://hhiagencia.cl',
    siteName: 'HH Studio Creativo',
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
