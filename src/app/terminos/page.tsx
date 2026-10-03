import type { Metadata } from 'next'
import Link from 'next/link'
import { ACTUALIZADO } from '@/components/sections/Legal'
import styles from './terminos.module.css'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Condiciones de uso de HHiAgencia, solicitudes de cotización y contratación de servicios digitales.',
  alternates: { canonical: '/terminos' },
}

export default function TerminosPage() {
  return (
    <section className={`wrap sec ${styles.layout}`} aria-labelledby="terminos-titulo">
      <article className={styles.article}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>INFORMACIÓN LEGAL</p>
          <h1 id="terminos-titulo" tabIndex={-1}>Términos y condiciones de HHiAgencia</h1>
          <p className={styles.updated}>Última actualización: {ACTUALIZADO}</p>
        </header>
      <p>Estas condiciones explican el uso de hhiagencia.cl y cómo solicitar nuestros servicios de desarrollo web, automatización, marketing y consultoría.</p>

      <h2 id="responsable" tabIndex={-1}>1. Quién opera este sitio</h2>
      <p>HHiAgencia es la marca comercial del proyecto HHA Digital Solutions, operado por Herberth Garay y Alexander Bello, con atención principal a clientes en Chile.</p>
      {/* PENDIENTE ANTES DE PUBLICAR (no visible para el visitante): completar el domicilio de contacto
          y la identificación de quien celebra y factura los contratos. No se atribuye la operación a una
          sociedad todavía no constituida. */}
      <p>Para consultas, escríbenos a <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>.</p>

      <h2 id="cotizaciones" tabIndex={-1}>2. Información y solicitudes de cotización</h2>
      <p>El sitio permite conocer nuestros servicios y solicitar una propuesta. Enviar un formulario, completar el diagnóstico o pedir una reunión no genera por sí solo una contratación ni un cobro.</p>
      <p>El diagnóstico ofrece una orientación inicial basada en tus respuestas. El alcance definitivo se determina al revisar las necesidades de tu proyecto.</p>
      <p>La propuesta escrita debe detallar los servicios incluidos, sus exclusiones, precio total e impuestos aplicables, forma de pago, plazos y vigencia de la cotización. Las ofertas y condiciones que resulten legalmente vinculantes se respetarán.</p>

      <h2 id="contratacion" tabIndex={-1}>3. Contratación, desarrollo y mantenimiento</h2>
      <p>Antes de comenzar, acordaremos por escrito los entregables, responsabilidades, materiales necesarios, revisiones incluidas y condiciones de aceptación. Los cambios de alcance requieren acordar su costo y efecto en los plazos.</p>
      <p>En los planes web, el desarrollo y el mantenimiento mensual se cobran por separado. La propuesta debe indicar la duración mínima aplicable, qué cubre el mantenimiento, los servicios de terceros y las condiciones de renovación y término.</p>
      <p>Cuando se ofrezca una demo gratuita, su duración, funciones y condiciones se informarán al cotizar. Solicitarla no equivale a aceptar servicios de pago.</p>

      <h2 id="cancelaciones" tabIndex={-1}>4. Cancelaciones y derechos del cliente</h2>
      <p>Las condiciones para cancelar un proyecto, terminar el mantenimiento y gestionar eventuales devoluciones deben informarse antes de contratar. No se establece en esta página una prohibición general de reembolsos.</p>
      <p>Cuando corresponda una relación de consumo, se respetarán los derechos que reconoce la legislación chilena, incluido el retracto cuando resulte aplicable. Ninguna propuesta o cláusula de este sitio limita derechos irrenunciables.</p>

      <h2 id="uso" tabIndex={-1}>5. Uso del sitio</h2>
      <p>Entrega información de contacto correcta y únicamente datos propios o que estés autorizado a facilitar. No utilices los formularios para enviar contenido ilícito, suplantar identidades, distribuir código malicioso o interferir con el funcionamiento del servicio.</p>

      <h2 id="propiedad-intelectual" tabIndex={-1}>6. Propiedad intelectual</h2>
      <p>Los contenidos, diseños y elementos de marca del sitio pertenecen a sus respectivos titulares o se utilizan bajo las autorizaciones o licencias correspondientes. Su uso debe respetar esos derechos y las excepciones legales aplicables.</p>
      <p>La titularidad y las licencias de los entregables de cada proyecto se definirán en su contrato, incluyendo, cuando corresponda, código fuente, materiales del cliente y componentes de terceros.</p>

      <h2 id="disponibilidad" tabIndex={-1}>7. Disponibilidad y servicios externos</h2>
      <p>El sitio puede experimentar interrupciones o errores. Si detectas información incorrecta o problemas para enviar una solicitud, comunícalo por correo.</p>
      <p>Los enlaces a plataformas externas permiten acceder a servicios con sus propias condiciones. Los resultados comerciales de un proyecto dependen de factores que deben evaluarse en cada propuesta; estas condiciones no constituyen una garantía de ventas o posicionamiento.</p>
      <p>Lo anterior no excluye las responsabilidades que legalmente correspondan por nuestros servicios o actuaciones.</p>

      <h2 id="privacidad-seguridad" tabIndex={-1}>8. Privacidad y seguridad</h2>
      <p>El tratamiento de la información se explica en la <Link href="/privacidad">Política de privacidad</Link>. En <Link href="/seguridad">Seguridad</Link> puedes consultar los canales oficiales y cómo comunicar un posible incidente.</p>

      <h2 id="legislacion" tabIndex={-1}>9. Cambios y legislación aplicable</h2>
      <p>Las actualizaciones se publicarán con su fecha de revisión. Un cambio en esta página no modifica por sí solo las condiciones de un contrato ya celebrado ni autoriza nuevos usos de datos personales.</p>
      <p>Se aplica la legislación de la República de Chile, sin perjuicio de las normas imperativas y vías de reclamación que correspondan al cliente.</p>
    </article>
      <aside className={styles.sidebar}>
        <nav aria-label="Índice de términos y condiciones">
          <p className={styles.eyebrow}>EN ESTA PÁGINA</p>
          <ul className={styles.index}>
            <li><a href="#terminos-titulo">Términos y condiciones de HHiAgencia</a></li>
            <li><a href="#responsable">Quién opera este sitio</a></li>
            <li><a href="#cotizaciones">Información y cotizaciones</a></li>
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
