/* Vista previa en un solo HTML (sin Next): mismas páginas y componentes,
   con un router por hash (#servicios, #casos-y-resenas, #contacto). */
import { StrictMode, Suspense, useEffect, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Inicio from '@/app/page'
import ServiciosPage from '@/app/servicios/page'
import CasosYResenasPage from '@/app/casos-y-resenas/page'
import ContactoPage from '@/app/contacto/page'
import { usePath } from './shims/router'
import '@/app/globals.css'

const PAGES: Record<string, ComponentType> = {
  '/': Inicio,
  '/servicios': ServiciosPage,
  '/casos-y-resenas': CasosYResenasPage,
  '/contacto': ContactoPage,
}

function App() {
  const path = usePath()
  const Page = PAGES[path] ?? Inicio
  useEffect(() => window.scrollTo(0, 0), [path])
  return (
    <>
      <Header />
      <main>
        <Suspense>
          <Page key={path} />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
