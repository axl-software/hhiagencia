import type { Metadata } from 'next'
import Link from 'next/link'
import { ACTUALIZADO } from '@/components/sections/Legal'
import styles from './terminos.module.css'
import { CONFIG, EMPRESA, telVisible } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Condiciones de uso del sitio de HHA Digital Solutions SpA, cotizaciones, planes, pagos y contratación de servicios digitales en todo Chile.',
  alternates: { canonical: '/terminos' },
}

/* Términos de una empresa real: HHA Digital Solutions SpA, con base en Casablanca (Región de Valparaíso), que trabaja en
   todo Chile. Los montos de los planes NO se repiten aquí (cambian): están en /servicios, desde src/lib/precios.ts.
   PENDIENTE ANTES DE PUBLICAR (no visible para el visitante): agregar el RUT de la sociedad y la dirección completa de
   su domicilio cuando los fundadores los entreguen, y que un abogado revise este texto. */
export default function TerminosPage() {
  return (
    <section className={`wrap sec ${styles.layout}`} aria-labelledby="terminos-titulo">
      <article className={styles.article}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>INFORMACIÓN LEGAL</p>
          <h1 id="terminos-titulo" tabIndex={-1}>Términos y condiciones de {EMPRESA.nombre}</h1>
          <p className={styles.updated}>Última actualización: {ACTUALIZADO}</p>
        </header>
      <p>Estas condiciones explican el uso de hhiagencia.cl y cómo solicitar y contratar los servicios de desarrollo web, HHA Systems, marketing, automatización y consultoría de {EMPRESA.nombre}.</p>

      <h2 id="responsable" tabIndex={-1}>1. Quién opera este sitio</h2>
      <p>Este sitio es operado por <strong>{EMPRESA.nombre}</strong> (“HHA”), sociedad por acciones chilena con domicilio en {EMPRESA.base}, Chile. HHiAgencia es su marca comercial.</p>
      <p>Para consultas, escríbenos a <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a> o llámanos al <a href={`tel:+${CONFIG.whatsapp}`}>{telVisible()}</a>.</p>

      <h2 id="cobertura" tabIndex={-1}>2. Dónde trabajamos</h2>
      <p><strong>Trabajamos en todo Chile.</strong> Nuestra base está en Casablanca, Región de Valparaíso, y atendemos a clientes de todo el país, de forma remota y por los medios digitales acordados en cada proyecto. No necesitas estar en nuestra región para contratarnos.</p>

      <h2 id="cotizaciones" tabIndex={-1}>3. Información y solicitudes de cotización</h2>
      <p>El sitio permite conocer nuestros servicios y planes y solicitar una propuesta. Enviar un formulario, completar el diagnóstico o pedir una reunión no genera por sí solo una contratación ni un cobro.</p>
      <p>El diagnóstico ofrece una orientación inicial basada en tus respuestas. El alcance definitivo se determina al revisar las necesidades de tu proyecto.</p>
      <p>Los valores publicados están expresados en pesos chilenos (CLP) y se muestran más IVA. La propuesta escrita detalla los servicios incluidos y sus exclusiones, el valor total con los impuestos aplicables, la forma de pago, los plazos y la vigencia de la cotización. Las ofertas y condiciones que resulten legalmente vinculantes se respetarán.</p>

      <h2 id="planes" tabIndex={-1}>4. Planes, precios y pagos</h2>
      <p><strong>Precio regular y precio lanzamiento.</strong> Algunos planes muestran un precio regular y un precio de lanzamiento. El precio lanzamiento es una promoción vigente y puede modificarse o terminar; el precio y el período que te corresponden son los que indique tu cotización aceptada.</p>
      <p><strong>Pago mensual o anual.</strong> Los planes web y los de HHA Systems pueden contratarse con pago mensual o con pago anual. La opción anual tiene un 20% de descuento sobre el precio lanzamiento vigente y se paga completa por adelantado. Esa condición se te informa antes de contratar.</p>
      <p><strong>Costo de implementación.</strong> Los planes que lo indican llevan, además de la suscripción, un costo de implementación de pago único. En los planes web y de HHA Systems el monto figura en el detalle de cada plan (“Ver todo lo incluido”); en los demás servicios se informa en la cotización, antes de que te comprometas.</p>
      <p><strong>Pedido y forma de pago.</strong> En /pedido eliges lo que quieres contratar y ves su valor. Para confirmarlo escoges pagar por transferencia bancaria (te enviamos los datos por correo) o que te contactemos por correo para facilitar el pago. Confirmar el pedido no genera ningún cobro: la contratación queda acordada cuando te enviamos la propuesta o los datos de pago y los aceptas.</p>
      <p><strong>Cambios mensuales.</strong> Los planes web incluyen un número de rondas mensuales de cambios menores (textos, imágenes, enlaces, teléfonos, horarios, llamados a la acción y ajustes visuales pequeños). Una página nueva, un rediseño general, una funcionalidad nueva, una tienda online nueva, una integración compleja o un desarrollo especial se cotizan aparte. Las rondas no utilizadas no se acumulan para los meses siguientes.</p>
      <p><strong>Dominios.</strong> El dominio propio se incluye según el plan y la modalidad de pago, como se indica en cada plan. Un dominio premium o con un costo extraordinario puede tener una diferencia adicional. Un dominio incluido no obliga a HHA a conseguir cualquier nombre que exista en el mercado.</p>
      <p><strong>SEO, Analytics y Search Console.</strong> Los planes que los mencionan incluyen configuración técnica y optimización inicial. No incluyen campañas SEO mensuales, generación continua de contenido ni garantía de posiciones en buscadores. La configuración de Google Analytics y Search Console no es un servicio de análisis mensual.</p>
      <p><strong>Servicios adicionales y costos de terceros.</strong> WhatsApp (API), flujos de automatización personalizados, email marketing gestionado por HHA, creación de contenido, fotografía y video, integraciones especiales y desarrollos particulares son adicionales y se cotizan según el alcance. Las plataformas de terceros (por ejemplo, correo masivo, APIs o proveedores) pueden tener costos propios.</p>
      <p><strong>Inversión publicitaria.</strong> Nuestros planes de marketing y captación cubren la gestión, no el presupuesto de anuncios. La inversión en Meta Ads, Google Ads, TikTok Ads u otras plataformas se paga por separado, directamente en cada plataforma.</p>
      <p>Los resultados comerciales de un proyecto dependen de factores que exceden nuestro control: no garantizamos ventas, crecimiento ni posicionamiento.</p>

      <h2 id="contratacion" tabIndex={-1}>5. Contratación, desarrollo y mantenimiento</h2>
      <p>Antes de comenzar, acordaremos por escrito los entregables, responsabilidades, materiales necesarios, revisiones incluidas y condiciones de aceptación. Los cambios de alcance requieren acordar su costo y su efecto en los plazos.</p>
      <p>La propuesta indica la duración mínima aplicable, qué cubre el mantenimiento mensual, los servicios de terceros y las condiciones de renovación y término.</p>
      <p>Cuando ofrezcamos una demo o prueba gratuita (por ejemplo, la prueba de HHA Systems), su duración, funciones y condiciones se informan al solicitarla. Pedirla no equivale a aceptar servicios de pago ni genera cobros: si decides continuar, lo acordamos expresamente.</p>

      <h2 id="cancelaciones" tabIndex={-1}>6. Cancelaciones y derechos del cliente</h2>
      <p>Las condiciones para cancelar un proyecto, terminar una suscripción o el mantenimiento, y gestionar eventuales devoluciones, se informan antes de contratar. No se establece en esta página una prohibición general de reembolsos.</p>
      <p>Cuando corresponda una relación de consumo, se respetan los derechos que reconoce la legislación chilena, incluida la Ley N° 19.496 sobre protección de los derechos de los consumidores y el retracto cuando resulte aplicable. Ninguna propuesta o cláusula de este sitio limita derechos irrenunciables.</p>

      <h2 id="uso" tabIndex={-1}>7. Uso del sitio</h2>
      <p>Entrega información de contacto correcta y únicamente datos propios o que estés autorizado a facilitar. No utilices los formularios para enviar contenido ilícito, suplantar identidades, distribuir código malicioso o interferir con el funcionamiento del servicio.</p>

      <h2 id="propiedad-intelectual" tabIndex={-1}>8. Propiedad intelectual</h2>
      <p>Los contenidos, diseños y elementos de marca del sitio pertenecen a {EMPRESA.nombre} o a sus respectivos titulares, o se utilizan bajo las autorizaciones o licencias correspondientes. Su uso debe respetar esos derechos y las excepciones legales aplicables.</p>
      <p>La titularidad y las licencias de los entregables de cada proyecto se definen en su contrato, incluyendo, cuando corresponda, código fuente, materiales del cliente y componentes de terceros.</p>

      <h2 id="disponibilidad" tabIndex={-1}>9. Disponibilidad y servicios externos</h2>
      <p>El sitio puede experimentar interrupciones o errores. Si detectas información incorrecta o problemas para enviar una solicitud, comunícalo por correo.</p>
      <p>Los enlaces a plataformas externas permiten acceder a servicios con sus propias condiciones. Estas condiciones no constituyen una garantía de ventas o posicionamiento. Lo anterior no excluye las responsabilidades que legalmente correspondan por nuestros servicios o actuaciones.</p>

      <h2 id="privacidad-seguridad" tabIndex={-1}>10. Privacidad y seguridad</h2>
      <p>El tratamiento de la información se explica en la <Link href="/privacidad">Política de privacidad</Link>. En <Link href="/seguridad">Seguridad</Link> puedes consultar los canales oficiales y cómo comunicar un posible incidente.</p>

      <h2 id="legislacion" tabIndex={-1}>11. Cambios y legislación aplicable</h2>
      <p>Las actualizaciones se publican con su fecha de revisión. Un cambio en esta página no modifica por sí solo las condiciones de un contrato ya celebrado ni autoriza nuevos usos de datos personales.</p>
      <p>Se aplica la legislación de la República de Chile, sin perjuicio de las normas imperativas y vías de reclamación que correspondan al cliente. Cualquier controversia que no se resuelva de común acuerdo se somete a los tribunales ordinarios de justicia de Chile, salvo que la ley disponga otra cosa.</p>
    </article>
      <aside className={styles.sidebar}>
        <nav aria-label="Índice de términos y condiciones">
          <p className={styles.eyebrow}>EN ESTA PÁGINA</p>
          <ul className={styles.index}>
            <li><a href="#terminos-titulo">Términos y condiciones</a></li>
            <li><a href="#responsable">Quién opera este sitio</a></li>
            <li><a href="#cobertura">Dónde trabajamos</a></li>
            <li><a href="#cotizaciones">Información y cotizaciones</a></li>
            <li><a href="#planes">Planes, precios y pagos</a></li>
            <li><a href="#contratacion">Contratación y mantenimiento</a></li>
            <li><a href="#cancelaciones">Cancelaciones y derechos</a></li>
            <li><a href="#uso">Uso del sitio</a></li>
            <li><a href="#propiedad-intelectual">Propiedad intelectual</a></li>
            <li><a href="#disponibilidad">Disponibilidad y servicios externos</a></li>
            <li><a href="#privacidad-seguridad">Privacidad y seguridad</a></li>
            <li><a href="#legislacion">Cambios y legislación</a></li>
          </ul>
        </nav>
        <div className={styles.contact}>
          <h2>¿Tienes alguna consulta?</h2>
          <p>Escríbenos para aclarar las condiciones antes de solicitar o contratar un servicio.</p>
          <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
        </div>
      </aside>
    </section>
  )
}
