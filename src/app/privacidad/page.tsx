import type { Metadata } from 'next'
import Legal from '@/components/sections/Legal'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Qué datos pedimos en el formulario de HHiAgencia, para qué los usamos y cómo puedes pedir que los eliminemos.',
  alternates: { canonical: '/privacidad' },
}

export default function PrivacidadPage() {
  return (
    <Legal titulo="Política de privacidad">
      <h2>Quiénes somos</h2>
      <p>
        HHA Digital Solutions (HHiAgencia) es un proyecto en formación; su razón social está en trámite. Para cualquier consulta sobre tus datos, escríbenos a{' '}
        <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>.
      </p>

      <h2>Qué datos pedimos</h2>
      <p>En el formulario de contacto te pedimos:</p>
      <ul>
        <li>Tu nombre o el de tu proyecto.</li>
        <li>De qué se trata tu negocio o proyecto.</li>
        <li>Los servicios que te interesan.</li>
        <li>Tu correo y/o tu teléfono.</li>
      </ul>
      <p>No pedimos datos sensibles ni datos de pago.</p>

      <h2>Cómo nos llegan</h2>
      <p>
        El formulario no guarda tus datos en nuestros servidores: arma un mensaje que tú decides enviarnos por WhatsApp o por correo. Desde ese momento lo
        recibimos en esos canales.
      </p>

      <h2>Para qué los usamos</h2>
      <p>Para responder tu solicitud, preparar una propuesta y coordinar una reunión. No vendemos ni cedemos tus datos a terceros.</p>

      <h2>Cuánto tiempo los guardamos</h2>
      <p>El tiempo necesario para gestionar tu solicitud y, si trabajamos juntos, nuestra relación comercial. Puedes pedir que los eliminemos cuando quieras.</p>

      <h2>Tus derechos</h2>
      <p>
        Puedes pedir acceso, corrección o eliminación de tus datos, u oponerte a su uso, según la legislación chilena de protección de datos personales.
        Escríbenos a <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>.
      </p>

      <h2>Lo que queda en tu navegador</h2>
      <p>
        Solo guardamos tu preferencia de tema (claro u oscuro) en tu propio navegador. No usamos cookies de seguimiento ni herramientas de analítica. Si esto
        cambia, actualizaremos esta página.
      </p>

      <h2>Servicios de terceros</h2>
      <p>
        Si nos escribes por WhatsApp o por correo, o haces clic en nuestras redes sociales, esos servicios tratan tus datos según sus propias políticas. Nuestro
        proveedor de alojamiento puede registrar datos técnicos de la conexión (como la dirección IP) para que el sitio funcione y sea seguro.
      </p>
    </Legal>
  )
}
