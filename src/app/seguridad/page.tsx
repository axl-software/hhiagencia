import type { Metadata } from 'next'
import Legal from '@/components/sections/Legal'
import { CONFIG, telVisible } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Seguridad',
  description: 'Cómo protegemos este sitio, cuáles son nuestros canales oficiales y cómo reportar un problema de seguridad.',
  alternates: { canonical: '/seguridad' },
}

export default function SeguridadPage() {
  return (
    <Legal titulo="Seguridad">
      <h2>Cómo cuidamos el sitio</h2>
      <ul>
        <li>La conexión con el sitio va cifrada (HTTPS).</li>
        <li>El formulario no guarda tus datos en servidores: el mensaje lo envías tú por WhatsApp o por correo.</li>
        <li>No usamos cookies de seguimiento; la analítica es anónima y sin cookies.</li>
        <li>Los enlaces externos se abren en una pestaña nueva y sin acceso a esta página.</li>
      </ul>

      <h2>Nuestros canales oficiales</h2>
      <p>Solo te contactamos desde estos canales:</p>
      <ul>
        {CONFIG.whatsapp && <li>Teléfono: {telVisible()}</li>}
        {CONFIG.email && <li>Correo: {CONFIG.email}</li>}
        {CONFIG.instagram && <li>Instagram: @{CONFIG.instagram}</li>}
      </ul>
      <p>
        Nunca te pediremos contraseñas ni códigos de verificación por mensaje. Los pagos se coordinan solo a partir de una propuesta formal. Si alguien te
        escribe en nuestro nombre desde otro canal, avísanos.
      </p>

      <h2>Reportar un problema</h2>
      <p>
        Si encuentras una falla de seguridad en este sitio, escríbenos a <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>. Te agradecemos que no la
        publiques hasta que la hayamos corregido.
      </p>
    </Legal>
  )
}
