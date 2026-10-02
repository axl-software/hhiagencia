/* Vista previa en un solo HTML (sin Next): mismas páginas y componentes,
   con un router por hash (#servicios, #como-trabajamos, #proyectos, #contacto…). */
import { StrictMode, Suspense, useEffect, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Inicio from '@/app/page'
import ServiciosPage from '@/app/servicios/page'
import ProyectosPage from '@/app/proyectos/page'
import ComoTrabajamosPage from '@/app/como-trabajamos/page'
import ContactoPage from '@/app/contacto/page'
import PrivacidadPage from '@/app/privacidad/page'
import TerminosPage from '@/app/terminos/page'
import SeguridadPage from '@/app/seguridad/page'
import { useAncla, usePath } from './shims/router'
import '@/app/globals.css'

/* Sin servidor: los formularios muestran el mensaje de gracias como demostración (src/lib/contacto.ts) */
;(window as Window & { __VISTA_PREVIA__?: boolean }).__VISTA_PREVIA__ = true

const PAGES: Record<string, ComponentType> = {
  '/': Inicio,
  '/servicios': ServiciosPage,
  '/como-trabajamos': ComoTrabajamosPage,
  '/proyectos': ProyectosPage,
  '/contacto': ContactoPage,
  '/privacidad': PrivacidadPage,
  '/terminos': TerminosPage,
  '/seguridad': SeguridadPage,
}

function App() {
  const path = usePath()
  const ancla = useAncla()
  const Page = PAGES[path] ?? Inicio
  // al cambiar de página: arriba, o a la sección pedida (#servicios#soluciones).
  // Con llaves: en Chrome reciente scrollTo devuelve una promesa, y React la tomaría como función de limpieza
  useEffect(() => {
    const destino = ancla ? document.getElementById(ancla) : null
    if (destino) destino.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [path, ancla])
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
