import type { Metadata } from 'next'
import Link from 'next/link'
import Legal from '@/components/sections/Legal'
import { CONFIG, telVisible } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Seguridad',
  description: 'Canales oficiales de HHiAgencia, precauciones al contactarnos y reporte de problemas de seguridad.',
  alternates: { canonical: '/seguridad' },
}

export default function SeguridadPage() {
  return (
    <Legal titulo="Seguridad">
      <p>Aquí encontrarás nuestros canales oficiales, recomendaciones para proteger tu información y una vía para comunicar posibles problemas de seguridad.</p>

      <h2>1. Al utilizar el sitio</h2>
      <p>Comprueba que visitas el dominio hhiagencia.cl y que tu navegador muestra una conexión HTTPS sin advertencias de certificado antes de enviar información. Una conexión cifrada protege los datos en tránsito, pero no sustituye la verificación del destinatario.</p>
      <p>Los formularios solicitan información de contacto y del proyecto. No incluyas contraseñas, códigos de verificación, claves de acceso ni datos de tarjetas.</p>

      <h2>2. Tratamiento de solicitudes</h2>
      <p>El formulario comprueba campos y límites de longitud en el servidor e incorpora filtros básicos contra envíos automatizados. Estas medidas reducen determinados envíos no deseados, pero no eliminan todos los riesgos.</p>
      <p>La información sobre almacenamiento, proveedores y derechos se encuentra en la <Link href="/privacidad">Política de privacidad</Link>.</p>
      <p>Esta página no constituye una certificación de seguridad ni una garantía de disponibilidad permanente o ausencia de vulnerabilidades.</p>

      <h2>3. Nuestros canales oficiales</h2>
      <ul>
        <li>Sitio web: hhiagencia.cl.</li>
        {CONFIG.whatsapp && <li>Teléfono y WhatsApp: {telVisible()}.</li>}
        {CONFIG.email && <li>Correo: <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>.</li>}
        {CONFIG.instagram && <li>Instagram: @{CONFIG.instagram}.</li>}
      </ul>
      <p>Si recibes una solicitud de pago o de información desde otro contacto, verifica su autenticidad escribiéndonos por estos canales. Comprueba también cualquier cambio de cuenta de pago mediante un contacto conocido.</p>
      <p>Los pagos se coordinan conforme a la propuesta o contrato correspondiente. No facilites contraseñas ni códigos de verificación en respuesta a mensajes que afirmen provenir de nosotros.</p>

      <h2>4. Cómo reportar un posible problema</h2>
      <p>Escríbenos a <a href={`mailto:${CONFIG.email}?subject=Reporte%20de%20seguridad`}>{CONFIG.email}</a> con el asunto «Reporte de seguridad» e incluye:</p>
      <ul>
        <li>La página o función afectada y una descripción del problema.</li>
        <li>La fecha aproximada y los pasos mínimos que permitieron observarlo.</li>
        <li>Si resulta útil, una captura con datos personales y secretos ocultos.</li>
        <li>Un medio de contacto para coordinar el seguimiento.</li>
      </ul>
      <p>No envíes datos de otras personas ni descargues información para demostrar el problema. Si encuentras información ajena de forma accidental, detén la interacción y comunica lo observado.</p>
      <p>Este canal permite recibir avisos; no autoriza pruebas intrusivas, acceso a cuentas ajenas, modificación de datos ni pruebas de carga. Cualquier evaluación de ese tipo debe acordarse previamente con un alcance específico.</p>
      <p>Te pedimos coordinar la divulgación para permitir evaluar y corregir el problema sin exponer a otras personas. No se ofrece un programa de recompensas mediante esta página.</p>

      <h2>5. Si sospechas una suplantación</h2>
      <p>Evita continuar la conversación o enviar pagos hasta verificarla. Conserva el mensaje y los datos del remitente y comunícanos lo ocurrido por el correo oficial. Si revelaste credenciales de otro servicio, cambia esas credenciales directamente en dicho servicio.</p>
    </Legal>
  )
}
