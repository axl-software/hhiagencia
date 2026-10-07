'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { armarMensaje, completaFalta, enviarSolicitud, validar, type Falta } from '@/lib/contacto'
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
import { CONFIG } from '@/lib/config'
import m from './Pedido.module.css'

const TIPO: Record<Linea['tipo'], string> = { plan: 'Plan', servicio: 'Servicio', pack: 'Pack' }

/* Una cosa elegida: su nombre, lo que cuesta en una línea, y (si hay otros niveles) un selector para cambiar de plan */
function ItemPedido({ l, rubro }: { l: Linea; rubro: string }) {
  const esSistema = l.id.startsWith('system-')
  const unidad = l.unidadRecurrente === 'mes' ? ' / mes' : l.unidadRecurrente === 'año' ? ' / año' : ''
  return (
    <article className={m.item}>
      <div className={m.itemTop}>
        <div>
          <span className={m.tipo}>{TIPO[l.tipo]}</span>
          <h3 className={m.nombre}>{l.nombre}</h3>
        </div>
        <button type="button" className={m.quitar} onClick={() => quitar(l.id)} aria-label={`Quitar ${l.nombre} del pedido`}>Quitar</button>
      </div>

      {l.hoy !== null && <p className={m.precio}>{dinero(l.hoy)}<small>{unidad} <Iva /></small></p>}
      {l.desde && l.montoDesde !== null && <p className={m.precio}><small>Desde </small>{dinero(l.montoDesde)}<small>{l.unidadRecurrente ? ` / ${l.unidadRecurrente}` : ''} <Iva /></small></p>}
      {l.esAnual && <p className={m.sub}>Plan anual: 12 meses por adelantado.</p>}
      {l.ahorroAnual !== null && <p className={m.ahorro}>Ahorras {dinero(l.ahorroAnual)} al año</p>}
      {l.implementacion !== null && <p className={m.sub}>+ Implementación (pago único): <strong>{dinero(l.implementacion)}</strong> <Iva /></p>}
      {l.implementacionPorCotizar && <p className={m.sub}>+ Costo de implementación (pago único): se informa en tu cotización.</p>}
      {l.desde && <p className={m.sub}>El valor final se confirma contigo antes de pagar.</p>}
      {l.incluye.length > 0 && <p className={m.sub}><strong>Incluye:</strong> {l.incluye.join(' · ')}</p>}
      {l.repetidos.length > 0 && (
        <p className={m.aviso} role="note">Este pack ya incluye {l.repetidos.join(' y ')}, que también tienes en el pedido. Quita el servicio suelto para no pagarlo dos veces.</p>
      )}

      {l.hermanos.length > 1 && (
        <label className={m.campo}>
          ¿Quieres otro nivel?
          <select value={l.id} onChange={(e) => cambiarPlan(l.id, e.target.value)} aria-label={`Cambiar el plan ${l.nombre}`}>
            {l.hermanos.map((h) => <option key={h.id} value={h.id}>{h.nombre} · {h.precio} / mes</option>)}
          </select>
        </label>
      )}

      {esSistema && (
        <>
          <label className={m.campo}>
            ¿Qué tipo de negocio es?
            <select value={rubro} onChange={(e) => fijarRubro(e.target.value)} aria-label="Tipo de negocio">
              <option value="">Elige uno (opcional)</option>
              {VENTANAS.map((v) => <option key={v.id} value={rubroDe(v.id)?.chip ?? v.id}>{rubroDe(v.id)?.chip ?? v.id}</option>)}
            </select>
          </label>
          <Link className={m.enlace} href={`/prueba-gratis?plan=${l.id}`}>Prefiero probarlo gratis primero</Link>
        </>
      )}
      {l.id.startsWith('web-') && <p className={m.sub}>Antes de decidir, te preparamos una demo para que pruebes tu web.</p>}
    </article>
  )
}

/* Pedido: el carrito de la web, en una sola columna y tres pasos: lo que elegiste, tus datos y cómo pagas.
   Los valores salen de src/lib/precios.ts; el pedido se guarda en el navegador (src/lib/pedido.ts) y, al confirmar, viaja
   por el mismo flujo de solicitudes que el formulario de contacto (Supabase + aviso a n8n).
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
  const implTotal = res.lineas.reduce((a, l) => a + (l.implementacion ?? 0), 0)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (vacio) return
    const form = e.currentTarget
    const f = new FormData(form)
    const val = (k: string) => String(f.get(k) ?? '').trim()
    const datos = { nombre: val('nombre'), email: val('email'), telefono: val('telefono') }
    /* En un pedido el correo es obligatorio: ahí llegan los datos de pago y la confirmación */
    const falta = validar(datos) ?? (datos.email ? null : { campos: ['email'], texto: 'Escribe tu correo: ahí te enviamos los datos de pago y la confirmación de tu pedido.', accion: 'Agregar mi correo' })
    if (falta) {
      setError(falta)
      return
    }
    setError(null)

    const lineas = textoPedido(res, metodo, ped.items.some((i) => i.startsWith('system-')) ? ped.rubro : '')
    const completo = { ...datos, servicios: lineas }
    setEnviando(true)
    const ok = await enviarSolicitud({
      ...completo,
      origen: 'formulario',
      canal: 'email',
      sitio: val('sitio'),
      inicio: inicio.current,
      pedido: { metodo, periodo: ped.periodo, totalNeto: res.hoyNeto, porCotizar: res.hayPorCotizar, lineas },
    })
    setEnviando(false)
    setResultado({
      ok,
      nombre: datos.nombre,
      canal: 'email',
      dato: datos.email,
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
        <div className={m.pagina}>
          <div className={m.cabeza}>
            <Kicker style={{ margin: 0 }}>TU PEDIDO</Kicker>
            <Title as={as}>Revisa y confirma tu pedido</Title>
            <p className="lead">Mira el valor de lo que elegiste y confírmalo. Al confirmar no se cobra nada: te escribimos para dejarlo listo.</p>
          </div>

          {vacio ? (
            <div className={m.vacio}>
              <ShoppingCart size={34} strokeWidth={1.75} aria-hidden="true" />
              <p><strong>Tu pedido está vacío.</strong> Elige un plan o un pack en Servicios y vuelve aquí.</p>
              <div className={m.vacioAcc}>
                <Link className="btn-vivo" href="/servicios">Ver servicios <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" /></Link>
                <GuiaPlan etiqueta="Haz tu diagnóstico" className="btn btn-out" giro={false} origen="pedido" />
              </div>
            </div>
          ) : (
            <form
              ref={formRef}
              method="post"
              onSubmit={onSubmit}
              noValidate
              onInput={(ev) => {
                if (inicio.current === null) inicio.current = Date.now()
                if (error && completaFalta(error, ev.target as HTMLInputElement)) setError(null)
              }}
              style={{ display: 'grid', gap: 22 }}
            >
              {/* 1. Lo que elegiste */}
              <section className={m.paso} aria-labelledby="paso1">
                <div className={m.pasoCab}><span className={m.num} aria-hidden="true">1</span><h2 id="paso1" className={m.pasoTit}>Lo que elegiste</h2></div>

                {res.hayAnualDisponible && (
                  <div className={m.periodo}>
                    <Periodo anual={ped.periodo === 'anual'} onChange={(a) => fijarPeriodo(a ? 'anual' : 'mensual')} etiqueta="tu pedido" />
                    <p>En anual pagas los 12 meses por adelantado y tienes 20% de descuento.</p>
                  </div>
                )}

                {res.lineas.map((l) => <ItemPedido key={l.id} l={l} rubro={ped.rubro} />)}

                <div className={m.mas}>
                  <Link href="/servicios">+ Agregar otro servicio</Link>
                  <GuiaPlan etiqueta="¿Dudas? Haz tu diagnóstico" className="link-btn" giro={false} origen="pedido" />
                </div>

                <div className={m.total} aria-live="polite">
                  <div className={m.totalFila}>
                    <span>Primer pago{res.hayPorCotizar ? ' (sin lo que se cotiza)' : ''}, con IVA</span>
                    <strong>{dinero(res.hoyConIva)}</strong>
                  </div>
                  <small>{dinero(res.hoyNeto)} + IVA ({dinero(res.iva)})</small>
                  {res.cadaMes > 0 && <small>Después, cada mes: {dinero(res.cadaMes)} + IVA.</small>}
                  {res.hayPorCotizar && <small>Hay servicios con valor &quot;desde&quot; o con implementación por cotizar: su monto final se confirma contigo y no está en este total.</small>}
                  <details>
                    <summary>Ver el detalle</summary>
                    <div className={m.detalle}>
                      {res.lineas.map((l) => (
                        <div key={l.id}><span>{l.nombre}{l.esAnual ? ' (anual)' : ''}</span><b>{l.hoy !== null ? dinero(l.hoy) : l.montoDesde !== null ? `desde ${dinero(l.montoDesde)}` : 'a cotizar'}</b></div>
                      ))}
                      {implTotal > 0 && <div><span>Implementación (pago único)</span><b>{dinero(implTotal)}</b></div>}
                      <div><span>Subtotal (neto)</span><b>{dinero(res.hoyNeto)}</b></div>
                      <div><span>IVA ({Math.round(IVA * 100)}%)</span><b>{dinero(res.iva)}</b></div>
                      <small>Valores en pesos chilenos (CLP). Si hay pauta publicitaria, se paga aparte en cada plataforma.</small>
                    </div>
                  </details>
                </div>
              </section>

              {/* 2. Tus datos */}
              <section className={m.paso} aria-labelledby="paso2">
                <div className={m.pasoCab}><span className={m.num} aria-hidden="true">2</span><h2 id="paso2" className={m.pasoTit}>Tus datos</h2></div>
                <div className={m.datos}>
                  <label>
                    <span>Tu nombre</span>
                    <input id="nombre" name="nombre" autoComplete="name" required aria-invalid={marcar('nombre')} aria-describedby={describe('nombre')} />
                  </label>
                  <label>
                    <span>Tu correo <small>(ahí te escribimos)</small></span>
                    <input id="email" name="email" type="email" autoComplete="email" inputMode="email" aria-invalid={marcar('email')} aria-describedby={describe('email')} />
                  </label>
                  <label>
                    <span>Tu WhatsApp <small>(opcional)</small></span>
                    <input id="telefono" name="telefono" type="tel" autoComplete="tel" inputMode="tel" placeholder="+56 9 1234 5678" aria-invalid={marcar('telefono')} />
                  </label>
                  <div className={m.trampa} aria-hidden="true">
                    <label>Sitio web<input name="sitio" tabIndex={-1} autoComplete="off" /></label>
                  </div>
                </div>
              </section>

              {/* 3. Cómo pagas */}
              <section className={m.paso} aria-labelledby="paso3">
                <div className={m.pasoCab}><span className={m.num} aria-hidden="true">3</span><h2 id="paso3" className={m.pasoTit}>¿Cómo quieres pagar?</h2></div>
                <div className={m.pago} role="radiogroup" aria-labelledby="paso3">
                  {(Object.keys(METODOS) as MetodoPago[]).map((k) => (
                    <button key={k} type="button" role="radio" aria-checked={metodo === k} className={m.pagoOp} onClick={() => setMetodo(k)}>
                      <span className={m.punto} aria-hidden="true" />
                      <b>{METODOS[k].titulo}</b>
                      <span className="tx">{METODOS[k].texto}</span>
                    </button>
                  ))}
                </div>
              </section>

              <div className={m.confirmar}>
                {error && <AvisoFalta falta={error} form={formRef} id={AVISO} />}
                <button className="btn-vivo" type="submit" disabled={enviando} aria-busy={enviando || undefined}>
                  {enviando ? 'Enviando…' : 'Confirmar pedido →'}
                </button>
                <p>No se cobra nada al confirmar. Te escribimos {CONFIG.tiempoRespuesta}.</p>
                <p>Al confirmar, guardamos tus datos para contactarte. Más en <Link href="/privacidad">Privacidad</Link> y <Link href="/terminos">Términos</Link>.</p>
                <p role="status">{enviando ? 'Enviando tu pedido…' : ''}</p>
              </div>
            </form>
          )}
        </div>
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
