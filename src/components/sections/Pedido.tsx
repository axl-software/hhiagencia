'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Gift, ShoppingCart } from 'lucide-react'
import { CONFIG } from '@/lib/config'
import { armarMensaje, completaFalta, contactarPor, enviarSolicitud, validar, type Falta } from '@/lib/contacto'
import {
  METODOS, IVA, cambiarPlan, dinero, fijarPeriodo, fijarRubro, quitar, resumir, textoPedido, usePedido, vaciar,
  type Linea, type MetodoPago,
} from '@/lib/pedido'
import { Kicker, Title, type Level } from './Heading'
import { Iva, Periodo } from './Precios'
import { VENTANAS, rubroDe } from '../portada/sistemasData'
import GuiaPlan from '../GuiaPlan'
import AvisoFalta from '../AvisoFalta'
import RespuestaSolicitud, { type Resultado } from '../RespuestaSolicitud'
import m from './Pedido.module.css'

const TIPO: Record<Linea['tipo'], string> = { plan: 'Plan', servicio: 'Servicio', pack: 'Pack' }

/* Lo que se paga por una línea, escrito claro: período, monto y "+ IVA" */
function Valores({ l }: { l: Linea }) {
  return (
    <ul className={m.valores}>
      {l.hoy !== null && (
        <li>
          <span>{l.esAnual ? 'Plan anual (12 meses por adelantado)' : l.unidadRecurrente === 'mes' ? 'Suscripción mensual' : 'Valor'}</span>
          <b>{dinero(l.hoy)}{l.unidadRecurrente === 'mes' ? ' / mes' : ''} <Iva /></b>
        </li>
      )}
      {l.desde && l.montoDesde !== null && (
        <li>
          <span>Desde</span>
          <b>{dinero(l.montoDesde)}{l.unidadRecurrente ? ` / ${l.unidadRecurrente}` : ''} <Iva /></b>
        </li>
      )}
      {l.implementacion !== null && (
        <li>
          <span>Implementación (pago único)</span>
          <b>{dinero(l.implementacion)} <Iva /></b>
        </li>
      )}
      {l.implementacionPorCotizar && (
        <li><span>+ costo de implementación (pago único)</span><small>se informa en tu cotización</small></li>
      )}
      {l.desde && <li><small>El valor final de este servicio se confirma en tu cotización, antes de pagar.</small></li>}
    </ul>
  )
}

function ItemPedido({ l, rubro }: { l: Linea; rubro: string }) {
  const esSistema = l.id.startsWith('system-')
  return (
    <article className={m.item}>
      <div className={m.itemTop}>
        <div>
          <span className={m.tipo}>{TIPO[l.tipo]}</span>
          <h2 className={m.nombre}>{l.nombre}</h2>
        </div>
        <button type="button" className={m.quitar} onClick={() => quitar(l.id)} aria-label={`Quitar ${l.nombre} del pedido`}>Quitar</button>
      </div>

      {l.hermanos.length > 1 && (
        <div className={m.cambiar} role="radiogroup" aria-label="Cambiar de plan">
          <span>¿Quieres otro nivel? Cámbialo aquí:</span>
          <div className={m.opcs}>
            {l.hermanos.map((h) => (
              <button key={h.id} type="button" role="radio" aria-checked={h.id === l.id} className={m.opc} onClick={() => cambiarPlan(l.id, h.id)}>
                <b>{h.nombre}</b>
                <small>{h.precio}{l.unidadRecurrente === 'año' || l.unidadRecurrente === 'mes' ? ' / mes' : ''}</small>
              </button>
            ))}
          </div>
        </div>
      )}

      {l.incluye.length > 0 && (
        <p className={m.aparte} style={{ color: 'var(--tx2)' }}><strong>Incluye:</strong> {l.incluye.join(' · ')}</p>
      )}
      {l.repetidos.length > 0 && (
        <p className={m.aviso} role="note">Este pack ya incluye {l.repetidos.join(' y ')}, que también tienes en el pedido. Quita el servicio suelto para no pagarlo dos veces.</p>
      )}

      <Valores l={l} />
      {l.ahorroAnual !== null && <p className={m.ahorro}>Ahorras {dinero(l.ahorroAnual)} al año con el plan anual</p>}

      {esSistema && (
        <>
          <label className={m.campo}>
            ¿Qué tipo de negocio es?
            <select value={rubro} onChange={(e) => fijarRubro(e.target.value)} aria-label="Tipo de negocio">
              <option value="">Elige uno (opcional)</option>
              {VENTANAS.map((v) => <option key={v.id} value={rubroDe(v.id)?.chip ?? v.id}>{rubroDe(v.id)?.chip ?? v.id}</option>)}
            </select>
          </label>
          <div className={m.enlaces}>
            <Link href={`/prueba-gratis?plan=${l.id}`}><Gift size={14} strokeWidth={2.25} aria-hidden="true" style={{ display: 'inline', marginRight: 6 }} />Prefiero probarlo gratis primero</Link>
          </div>
        </>
      )}
      {l.tipo === 'plan' && l.id.startsWith('web-') && (
        <p className={m.aparte}>Antes de decidir, preparamos una demo para que pruebes tu web.</p>
      )}
    </article>
  )
}

/* Pedido: el carrito de la web. Los valores salen de src/lib/precios.ts; el pedido se guarda en el navegador (src/lib/pedido.ts)
   y, al confirmar, viaja por el mismo flujo de solicitudes que el formulario de contacto (Supabase + aviso a n8n).
   No hay pago en línea: la persona elige transferencia o que HHA la contacte por correo. */
export default function Pedido({ as = 'h1' }: { as?: Level }) {
  const ped = usePedido()
  const res = resumir(ped.items, ped.periodo)
  const [metodo, setMetodo] = useState<MetodoPago>('transferencia')
  const [error, setError] = useState<Falta | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState<Resultado | null>(null)
  const ventana = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inicio = useRef<number | null>(null)
  const AVISO = 'pedido-aviso'
  const marcar = (campo: string) => error?.campos.includes(campo) || undefined
  const describe = (campo: string) => (marcar(campo) ? AVISO : undefined)

  useEffect(() => {
    if (resultado && !ventana.current?.open) ventana.current?.showModal()
  }, [resultado])

  const vacio = res.lineas.length === 0
  const hayAnual = res.lineas.some((l) => l.esAnual)
  const renovacion = res.lineas.filter((l) => l.recurrente !== null && l.unidadRecurrente === 'año')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (vacio) return
    const form = e.currentTarget
    const f = new FormData(form)
    const val = (k: string) => String(f.get(k) ?? '').trim()
    const datos = { nombre: val('nombre'), email: val('email'), telefono: val('telefono') }
    const falta = validar(datos)
    if (falta) {
      setError(falta)
      return
    }
    if (metodo === 'transferencia' && !datos.email) {
      setError({ campos: ['email'], texto: 'Para enviarte los datos de la transferencia necesitamos tu correo.', accion: 'Agregar mi correo' })
      return
    }
    setError(null)

    const lineas = textoPedido(res, metodo, ped.items.some((i) => i.startsWith('system-')) ? ped.rubro : '')
    const completo = { ...datos, negocio: val('negocio'), servicios: lineas }
    const canal = datos.email ? 'email' : contactarPor(datos)
    setEnviando(true)
    const ok = await enviarSolicitud({
      ...completo,
      origen: 'formulario',
      canal,
      sitio: val('sitio'),
      inicio: inicio.current,
      pedido: { metodo, periodo: ped.periodo, totalNeto: res.hoyNeto, porCotizar: res.hayPorCotizar, lineas },
    })
    setEnviando(false)
    setResultado({
      ok,
      nombre: datos.nombre,
      canal,
      dato: canal === 'whatsapp' ? datos.telefono : datos.email,
      texto: `Hola HHiAgencia, quiero confirmar este pedido:\n${lineas.join('\n')}\n\n${armarMensaje({ ...completo, servicios: [] })}`,
      origen: 'formulario',
      pedido: metodo,
    })
    if (ok) {
      form.reset()
      vaciar()
      inicio.current = null
    }
  }

  return (
    <section className="alt">
      <div className="wrap sec">
        <div className={m.cabeza}>
          <Kicker style={{ margin: 0 }}>TU PEDIDO</Kicker>
          <Title as={as}>Revisa y confirma tu pedido</Title>
          <p className="lead" style={{ margin: 0 }}>
            Aquí ves el valor exacto de lo que elegiste, puedes cambiar de plan o de período, y escoges cómo quieres pagar. Al confirmar no se cobra nada: te escribimos para dejarlo listo.
          </p>
        </div>

        {vacio ? (
          <div className={m.vacio}>
            <ShoppingCart size={34} strokeWidth={1.75} aria-hidden="true" />
            <p><strong>Tu pedido está vacío.</strong> Elige un plan o un pack en Servicios y vuelve aquí para ver el valor y confirmarlo.</p>
            <div className={m.vacioAcc}>
              <Link className="btn-vivo" href="/servicios">Ver servicios <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" /></Link>
              <GuiaPlan etiqueta="Haz tu diagnóstico" className="btn btn-out" giro={false} origen="pedido" />
            </div>
          </div>
        ) : (
          <div className={m.pedido}>
            <div className={m.col}>
              {res.hayAnualDisponible && (
                <div className={m.periodo}>
                  <Periodo anual={ped.periodo === 'anual'} onChange={(a) => fijarPeriodo(a ? 'anual' : 'mensual')} etiqueta="tu pedido" />
                  <p>Precio lanzamiento vigente. En anual pagas los 12 meses por adelantado, con 20% de descuento.</p>
                </div>
              )}

              {res.lineas.map((l) => <ItemPedido key={l.id} l={l} rubro={ped.rubro} />)}

              <div className={m.enlaces}>
                <Link href="/servicios">+ Agregar otro servicio</Link>
                <GuiaPlan etiqueta="¿Dudas? Haz tu diagnóstico" className="link-btn" giro={false} origen="pedido" />
              </div>
            </div>

            <div className={m.col}>
              {/* Resumen de valores */}
              <aside className={m.resumen} aria-label="Resumen del pedido">
                <h2>Resumen</h2>
                {res.lineas.map((l) => (
                  <div className={m.fila} key={l.id}>
                    <span>{l.nombre}{l.esAnual ? ' (anual)' : ''}</span>
                    <b>{l.hoy !== null ? dinero(l.hoy) : l.montoDesde !== null ? `desde ${dinero(l.montoDesde)}` : 'a cotizar'}</b>
                  </div>
                ))}
                {res.lineas.some((l) => l.implementacion !== null) && (
                  <div className={m.fila}>
                    <span>Implementación (pago único)</span>
                    <b>{dinero(res.lineas.reduce((a, l) => a + (l.implementacion ?? 0), 0))}</b>
                  </div>
                )}
                <div className={m.fila}><span>Subtotal (neto)</span><b>{dinero(res.hoyNeto)}</b></div>
                <div className={m.fila}><span>IVA ({Math.round(IVA * 100)}%)</span><b>{dinero(res.iva)}</b></div>
                <div className={`${m.fila} ${m.total}`}><span>Primer pago{res.hayPorCotizar ? ' (parcial)' : ''}</span><b>{dinero(res.hoyConIva)}</b></div>
                {res.cadaMes > 0 && <p className={m.nota}>Después, cada mes: {dinero(res.cadaMes)} + IVA.</p>}
                {hayAnual && renovacion.length > 0 && <p className={m.nota}>El plan anual se renueva cada 12 meses.</p>}
                {res.hayPorCotizar && (
                  <p className={m.nota}>Hay servicios con valor &quot;desde&quot; o con implementación por cotizar: su monto final se confirma en tu cotización y no está en este total.</p>
                )}
                <p className={m.nota}>Valores en pesos chilenos (CLP). Si hay pauta publicitaria, se paga aparte en cada plataforma.</p>
              </aside>

              {/* Datos y forma de pago */}
              <form
                ref={formRef}
                className="contacto-form"
                method="post"
                onSubmit={onSubmit}
                onInput={(ev) => {
                  if (inicio.current === null) inicio.current = Date.now()
                  if (error && completaFalta(error, ev.target as HTMLInputElement)) setError(null)
                }}
                noValidate
              >
                <div className="form-cabeza">
                  <h2 className="card-t" style={{ margin: 0 }}>Tus datos y el pago</h2>
                  <p className="muted" style={{ margin: 0 }}>Solo tu nombre y un medio de contacto son obligatorios.</p>
                </div>
                <label>
                  <span className="label-fila">Nombre (tuyo o de tu proyecto) <span className="obligatorio">Obligatorio</span></span>
                  <input id="nombre" name="nombre" autoComplete="name" required aria-invalid={marcar('nombre')} aria-describedby={describe('nombre')} />
                </label>
                <label>¿De qué se trata tu negocio o proyecto?<input id="negocio" name="negocio" placeholder="Ej: cafetería, consultora, marca de ropa" /></label>
                <fieldset>
                  <legend><span className="label-fila">¿Cómo te contactamos? <span className="obligatorio">Obligatorio: uno de los dos</span></span></legend>
                  <div className="two">
                    <label>Correo<input id="email" name="email" type="email" autoComplete="email" inputMode="email" aria-invalid={marcar('email')} aria-describedby={describe('email')} /></label>
                    <label>Teléfono o WhatsApp<input id="telefono" name="telefono" type="tel" autoComplete="tel" inputMode="tel" placeholder="+56 9 1234 5678" aria-invalid={marcar('telefono')} aria-describedby={describe('telefono')} /></label>
                  </div>
                </fieldset>

                <div className={m.pago} role="radiogroup" aria-label="Cómo quieres pagar">
                  <span style={{ fontWeight: 600 }}>¿Cómo quieres pagar?</span>
                  {(Object.keys(METODOS) as MetodoPago[]).map((k) => (
                    <button key={k} type="button" role="radio" aria-checked={metodo === k} className={m.pagoOp} onClick={() => setMetodo(k)}>
                      <span className={m.punto} aria-hidden="true" />
                      <b>{METODOS[k].titulo}</b>
                      <span className="tx">{METODOS[k].texto}</span>
                    </button>
                  ))}
                </div>

                <div className="trampa" aria-hidden="true">
                  <label>Sitio web<input name="sitio" tabIndex={-1} autoComplete="off" /></label>
                </div>
                {error && <AvisoFalta falta={error} form={formRef} id={AVISO} />}
                <button className="btn-vivo contacto-enviar" type="submit" disabled={enviando} aria-busy={enviando || undefined}>
                  {enviando ? 'Enviando…' : 'Confirmar pedido →'}
                </button>
                <p className={m.sinCobro}><Check size={16} strokeWidth={2.5} aria-hidden="true" style={{ flex: 'none', marginTop: 2 }} />No se cobra nada al confirmar. Te escribimos {CONFIG.tiempoRespuesta} para dejar el pago listo.</p>
                <p className="note form-legal">
                  Al enviar, guardamos tus datos para poder contactarte. Más detalles en <Link href="/privacidad">Privacidad</Link> y <Link href="/terminos">Términos</Link>.
                </p>
                <p className="note" role="status">{enviando ? 'Enviando tu pedido…' : ''}</p>
              </form>
            </div>
          </div>
        )}
      </div>

      <dialog
        ref={ventana}
        className="modal"
        aria-labelledby="pedido-titulo"
        onClose={() => setResultado(null)}
        onClick={(e) => e.target === e.currentTarget && ventana.current?.close()}
      >
        {resultado && (
          <div className="modal-caja">
            <RespuestaSolicitud r={resultado} tituloId="pedido-titulo" onListo={() => ventana.current?.close()} />
          </div>
        )}
      </dialog>
    </section>
  )
}

