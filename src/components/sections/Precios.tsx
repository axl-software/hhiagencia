import { PACKS_PRECIO, anualDe, clp, precioDe, textoPrecio } from '@/lib/precios'
import m from './Servicios.module.css'

/* Piezas de precio de Servicios. Ningún monto está escrito aquí: todo sale de src/lib/precios.ts. */

/** Nota discreta bajo los planes (y dentro del detalle de los demás): el monto no se publica. */
export const NOTA_IMPL = '+ costo de implementación (pago único)'
export const NOTA_IMPL_DETALLE = 'El monto exacto se informa en tu cotización, antes de contratar.'
export const NOTA_PAUTA = 'La inversión publicitaria, cuando exista, se paga por separado directamente en la plataforma correspondiente.'

/** "+ IVA" chico junto a cada precio (los valores se publican sin IVA). */
export function Iva() {
  return <small className={m.iva}>+ IVA</small>
}

/** Selector Mensual | Anual -20% (funciona con el dedo: botones grandes, sin hover). */
export function Periodo({ anual, onChange, etiqueta }: { anual: boolean; onChange: (anual: boolean) => void; etiqueta: string }) {
  return (
    <div className={m.periodo} role="group" aria-label={`Forma de pago de ${etiqueta}`}>
      <button type="button" aria-pressed={!anual} onClick={() => onChange(false)}>Mensual</button>
      <button type="button" aria-pressed={anual} onClick={() => onChange(true)}>Anual <b>-20%</b></button>
    </div>
  )
}

/** Precio de un plan con precio regular y de lanzamiento, en modo mensual o anual. */
export function PrecioPlan({ id, anual }: { id: string; anual: boolean }) {
  const p = precioDe(id)
  if (!p) return null
  const a = anual && p.anual ? anualDe(p) : null

  if (p.regular && p.lanzamiento) {
    return (
      <div className={m.precio} aria-live="polite">
        <p className={m.regular}>
          <s>{clp(p.regular)}{a ? '/mes' : ''}</s> <span>Precio regular</span>
        </p>
        {a ? (
          <>
            <p className={m.principal}>
              <strong>{clp(a.mensual)}</strong>
              <span className={m.unidad}><span>aprox. / mes</span><Iva /></span>
              <span className={m.nota}>pagando anualmente</span>
            </p>
            <p className={m.total}>
              {clp(a.total)} <Iva /> facturado anualmente <em>Facturación anual</em>
            </p>
            <p className={m.ahorro}>Ahorras {clp(a.ahorro)} al año</p>
          </>
        ) : (
          <>
            <p className={m.principal}>
              <strong>{clp(p.lanzamiento)}</strong>
              <span className={m.unidad}><span>/ mes</span><Iva /></span>
            </p>
            <p className={m.etiqueta}>Precio lanzamiento</p>
          </>
        )}
      </div>
    )
  }
  return <PrecioSimple id={id} />
}

/** Precio de una sola cifra (marketing, contenido): "$119.990 / mes" o "Desde $249.990 / mes". */
export function PrecioSimple({ id }: { id: string }) {
  const p = precioDe(id)
  if (!p) return null
  const monto = p.monto ?? 0
  return (
    <div className={m.precio}>
      <p className={m.principal}>
        {p.desde && <small>Desde </small>}
        <strong>{clp(monto)}</strong>
        <span className={m.unidad}>{p.unidad !== 'pago único' && <span>/ {p.unidad}</span>}<Iva /></span>
      </p>
    </div>
  )
}

/** Texto corto de precio de una línea ("Desde $49.990/mes"). */
export function PrecioLinea({ id }: { id: string }) {
  const p = precioDe(id)
  if (!p) return null
  return <span className={m.desde}>{textoPrecio(p)} <Iva /></span>
}

/** Precio y ahorro de un pack. El ahorro tiene la mayor visibilidad. */
export function PrecioPack({ id }: { id: string }) {
  const p = PACKS_PRECIO[id]
  if (!p) {
    return <p className={m.sinPrecio}>Se cotiza según el plan de HHA Systems que elijas.</p>
  }
  const unico = p.unidad === 'pago único'
  const soloAcompanamiento = id === 'herramientas'
  return (
    <div className={m.precio}>
      <p className={m.principal}>
        {p.desde && <small>Desde </small>}
        <strong>{clp(p.precio)}</strong>
        <span className={m.unidad}><span>{unico ? 'pago único' : '/ mes'}</span><Iva /></span>
      </p>
      <p className={m.regular}>
        <s>{clp(p.separado)}{unico ? '' : '/mes'}</s>{' '}
        <span>{soloAcompanamiento ? 'Acompañamiento sin pack' : 'Valor por separado'}</span>
      </p>
      <p className={m.ahorro}>
        {unico ? `Ahorras ${clp(p.ahorro)}` : soloAcompanamiento ? `Ahorras ${clp(p.ahorro)} al mes en acompañamiento` : `Ahorras ${clp(p.ahorro)} cada mes`}
      </p>
      {p.ahorroAnual ? <p className={m.ahorroAnual}>{soloAcompanamiento ? `Son ${clp(p.ahorroAnual)} al año` : `Ahorras hasta ${clp(p.ahorroAnual)} al año`}</p> : null}
    </div>
  )
}
