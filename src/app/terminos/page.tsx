import type { Metadata } from 'next'
import Legal from '@/components/sections/Legal'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Condiciones de uso del sitio de HHiAgencia y cómo funcionan nuestras cotizaciones y propuestas.',
  alternates: { canonical: '/terminos' },
}

export default function TerminosPage() {
  return (
    <Legal titulo="Términos y condiciones">
      <h2>Sobre este sitio</h2>
      <p>
        Este sitio presenta los servicios de HHA Digital Solutions (HHiAgencia), proyecto en formación con razón social en trámite. Al usarlo, aceptas
        estos términos.
      </p>

      <h2>Información referencial</h2>
      <p>
        Las descripciones de servicios y planes, y la guía de recomendación, son referenciales y no constituyen una oferta. El precio, el alcance, los plazos
        y las condiciones de cada proyecto se definen en una propuesta escrita.
      </p>

      <h2>Contratación</h2>
      <p>Las condiciones de pago, plazos y mantenimiento se acuerdan en la propuesta o el contrato de cada proyecto, que prevalecen sobre este sitio.</p>

      <h2>Propiedad intelectual</h2>
      <p>
        El logo, los textos y el diseño de este sitio pertenecen a HHA Digital Solutions. No pueden reproducirse sin autorización. Las marcas de clientes
        mencionadas pertenecen a sus respectivos titulares.
      </p>

      <h2>Enlaces externos</h2>
      <p>Los enlaces a redes sociales u otros sitios se rigen por las condiciones de esos servicios.</p>

      <h2>Responsabilidad</h2>
      <p>Hacemos lo posible por mantener la información al día, pero puede contener errores u omisiones que corregiremos apenas los detectemos.</p>

      <h2>Legislación</h2>
      <p>Estos términos se rigen por las leyes de la República de Chile.</p>

      <h2>Contacto</h2>
      <p>
        Dudas sobre estos términos: <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>.
      </p>
    </Legal>
  )
}
