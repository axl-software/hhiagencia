import type { Metadata } from 'next'
import Link from 'next/link'
import Legal from '@/components/sections/Legal'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Datos tratados por HHiAgencia, finalidades, proveedores y formas de ejercer tus derechos.',
  alternates: { canonical: '/privacidad' },
}

export default function PrivacidadPage() {
  return (
    <Legal titulo="Política de privacidad">
      <p>Esta política explica el tratamiento de datos de quienes visitan hhiagencia.cl, completan el diagnóstico o nos contactan para consultar por nuestros servicios.</p>

      <h2>1. Responsable y contacto</h2>
      <p>HHiAgencia es la marca comercial del proyecto HHA Digital Solutions, operado por Herberth Garay y Alexander Bello, con atención principal a clientes en Chile.</p>
      {/* PENDIENTE ANTES DE PUBLICAR (no visible para el visitante): confirmar quién o quiénes deciden
          sobre el tratamiento de los datos y completar su identificación y domicilio de contacto. */}
      <p>Puedes dirigir tus consultas de privacidad a <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>.</p>

      <h2>2. Qué información tratamos</h2>
      <ul>
        <li><strong>Contacto:</strong> nombre o nombre de tu proyecto y, al menos, correo electrónico o teléfono. La descripción del negocio y los servicios de interés complementan la solicitud.</li>
        <li><strong>Diagnóstico:</strong> las respuestas que envías junto con tu solicitud, para orientar la propuesta.</li>
        <li><strong>Gestión de solicitudes:</strong> fecha de creación, formulario de origen, página desde la que se envía, canal de contacto y estado de atención.</li>
        <li><strong>Comunicaciones:</strong> la información que decides enviarnos por correo o WhatsApp durante la atención.</li>
        <li><strong>Datos técnicos:</strong> los proveedores de alojamiento pueden tratar datos de conexión, como dirección IP y registros de solicitudes, para operar y proteger sus servicios. La analítica se describe más abajo.</li>
      </ul>
      <p>Los formularios no solicitan contraseñas, códigos de verificación, datos de tarjetas ni información sensible. Evita incluirlos en los campos de texto libre.</p>

      <h2>3. Para qué se utilizan</h2>
      <p>Utilizamos los datos de la solicitud para responderte, comprender tus necesidades, preparar una propuesta y coordinar una reunión. Si contratas, los datos necesarios se utilizarán también para gestionar el servicio y cumplir las obligaciones aplicables.</p>
      <p>Si facilitas un teléfono, el flujo de contacto prioriza WhatsApp; si dejas solo un correo, utilizamos ese medio. Puedes indicarnos otro canal de preferencia.</p>
      <p>Una consulta no equivale a suscribirse a campañas de marketing. Cualquier uso adicional debe contar con la información y habilitación que correspondan.</p>

      <h2>4. Autorización y datos necesarios</h2>
      <p>Decides si envías una solicitud. Para poder atenderla necesitamos un nombre y al menos un medio de contacto. Sin esos datos no es posible completar el formulario.</p>
      <p>Cuando el tratamiento se base en tu consentimiento, puedes revocarlo escribiendo al correo de contacto, sin efecto retroactivo. La mera visita a esta página no constituye autorización para cualquier tratamiento.</p>
      {/* PENDIENTE ANTES DE PUBLICAR (no visible para el visitante): completar el mecanismo de
          autorización informada en ambos formularios y su registro, o documentar la habilitación
          legal aplicable. Este texto no sustituye ese mecanismo. */}

      <h2>5. Almacenamiento, proveedores y comunicaciones</h2>
      <p>Las solicitudes se almacenan en Supabase. Según la configuración documentada del proyecto, la base de datos está ubicada en Virginia del Norte, Estados Unidos. El sitio utiliza Vercel para alojamiento y analítica.</p>
      <p>Estos proveedores intervienen en el tratamiento necesario para prestar sus servicios. Si nos escribes a nuestra dirección de Gmail o por WhatsApp, Google o el proveedor de WhatsApp también procesan información conforme a sus condiciones y políticas.</p>
      {/* PENDIENTE ANTES DE PUBLICAR (no visible para el visitante): confirmar si está activa la
          automatización de respuestas y detallar su proveedor, alojamiento y destinatarios. El sistema
          permite remitir los datos de la solicitud a ese flujo (SOLICITUDES_WEBHOOK_URL); no debe
          describirse como un tratamiento exclusivamente interno. */}
      <p>El uso de estos servicios puede implicar tratamiento fuera de Chile. Puedes consultar por los proveedores y las condiciones aplicables a tus datos mediante el correo de contacto.</p>

      <h2>6. Conservación y eliminación</h2>
      <p>La conservación debe responder a la finalidad de atención y, si existe contratación, a la gestión del servicio y las obligaciones legales aplicables. Una solicitud de eliminación se evaluará considerando si existe un motivo legal para conservar parte de la información.</p>
      {/* PENDIENTE ANTES DE PUBLICAR (no visible para el visitante): definir los plazos de solicitudes
          sin contratación, comunicaciones, documentación contractual y copias de respaldo, junto con el
          procedimiento para cumplirlos. No existe un plazo automático de borrado acreditado en el código. */}

      <h2>7. Tus derechos</h2>
      <p>Puedes solicitar información sobre tus datos, su procedencia, finalidad y destinatarios, así como su rectificación, eliminación o bloqueo cuando corresponda. También puedes comunicar tu oposición al uso publicitario y revocar una autorización en los términos legales aplicables.</p>
      <p>Escribe a <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>, indicando tu solicitud y el medio de contacto utilizado. Para proteger tus datos, podremos solicitar la información mínima necesaria para verificar que te pertenecen. No envíes contraseñas ni documentos de identidad de forma anticipada.</p>

      <h2>8. Almacenamiento local y analítica</h2>
      <p>Tu preferencia de tema claro u oscuro se guarda en el almacenamiento local del navegador. Puedes eliminarla desde la configuración del navegador; entonces el sitio dejará de recordar esa elección.</p>
      <p>La integración actual utiliza Vercel Web Analytics para estadísticas de visitas y acciones, como completar el diagnóstico o enviar una solicitud. Según su documentación, funciona sin cookies de terceros y ofrece estadísticas agregadas; puede tratar información como página visitada, referencia, navegador, dispositivo y ubicación aproximada.</p>
      <p>Los eventos configurados no incluyen los campos de nombre, correo, teléfono ni descripción del negocio. Esto no significa que los servicios de alojamiento dejen de procesar datos de conexión. Consulta la <a href="https://vercel.com/docs/analytics/privacy-policy">información de privacidad de Vercel Web Analytics</a>.</p>

      <h2>9. Seguridad y actualizaciones</h2>
      <p>Puedes consultar los canales de reporte en nuestra página de <Link href="/seguridad">Seguridad</Link>. Ningún sistema puede garantizar la ausencia total de incidentes.</p>
      <p>Actualizaremos esta política cuando cambien los tratamientos. Publicar una nueva versión no sustituye la información o autorización que resulte necesaria para una finalidad diferente.</p>
    </Legal>
  )
}
