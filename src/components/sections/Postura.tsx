import { Kicker, Title, type Level } from './Heading'

export default function Postura({ as = 'h2' }: { as?: Level }) {
  return (
    <section className="wrap sec split">
      <div>
        <Kicker>POSTURA</Kicker>
        <Title as={as}>No somos solo quien graba.</Title>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 8 }}>
        <p className="lead" style={{ fontSize: 17 }}>
          Un video sin dirección es un archivo más en el celular. En HH partimos por el negocio: qué quieres lograr, a quién le hablas y qué tiene que pasar después de que alguien te ve.
        </p>
        <p className="lead" style={{ fontSize: 17 }}>
          Recién ahí encendemos la cámara. Idea, guion, producción, diseño y publicación salen de la misma cabeza, así que todo empuja hacia el mismo objetivo.
        </p>
      </div>
    </section>
  )
}
