import { CONFIG } from '@/lib/config'
import { PRECIOS } from '@/lib/precios'
import { Pesos } from '@/components/ui/precio-animado'
import s from './Secciones.module.css'

/* Barra de hechos: solo datos aprobados (0 % comisión confirmada el 2026-11-09; precio "desde" = agendAHH Solo). */
export default function Hechos() {
  return (
    <div className={s.hechos}>
      <div className="wrap">
        <ul>
          <li><b>0 %</b><span>comisión por reserva o venta</span></li>
          <li><b><Pesos valor={PRECIOS['system-agenda-solo'].monto ?? 0} /></b><span>desde, al mes + IVA (agendAHH Solo)</span></li>
          <li><b>{CONFIG.demoPlazo}</b><span>de prueba gratis de agendAHH</span></li>
          <li><b>Todo Chile</b><span>oficina en Viña del Mar, atención remota</span></li>
        </ul>
      </div>
    </div>
  )
}
