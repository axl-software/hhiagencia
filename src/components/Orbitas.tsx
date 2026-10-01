/* Órbitas decorativas para dar vida a las secciones con el mismo lenguaje de la portada:
   anillos finos, uno punteado que gira lento y un punto rojo que lo recorre.
   Solo decoración (aria-hidden); se detienen con "reducir movimiento" (globals.css → .orbitas).
   La sección que las contiene necesita la clase "con-deco". */
export default function Orbitas({ lado = 'derecha', clara = false }: { lado?: 'derecha' | 'izquierda'; clara?: boolean }) {
  return (
    <div className={`orbitas orbitas-${lado}${clara ? ' orbitas-clara' : ''}`} aria-hidden="true">
      <span className="orb orb-1" />
      <span className="orb orb-2" />
      <span className="orb orb-3"><i /></span>
    </div>
  )
}
