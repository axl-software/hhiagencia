/* =========================================================
   Escenas animadas de "Cómo trabajamos": una por paso del proceso y una por métrica.
   Mismo lenguaje que los dibujos de los planes (Servicios): ventanas, bloques y el rojo de marca,
   con colores desde globals.css (.ilus), así cambian con el tema. Solo decoración (aria-hidden).
   Las animaciones tienen pausas y rebotes suaves para que no se vean mecánicas, arrancan cuando la
   tarjeta aparece en pantalla y se detienen con "reducir movimiento" (quedan en su estado final).
   Sin números: no mostramos cifras que parezcan resultados reales.
   ========================================================= */

const engrane = (cx: number, cy: number, r: number, dientes: number) => {
  const pts: string[] = []
  for (let i = 0; i < dientes * 2; i++) {
    const a = (Math.PI * i) / dientes
    const rr = i % 2 ? r * 0.78 : r
    const a1 = a - Math.PI / dientes / 2.2
    const a2 = a + Math.PI / dientes / 2.2
    pts.push(`${(cx + rr * Math.cos(a1)).toFixed(1)} ${(cy + rr * Math.sin(a1)).toFixed(1)}`)
    pts.push(`${(cx + rr * Math.cos(a2)).toFixed(1)} ${(cy + rr * Math.sin(a2)).toFixed(1)}`)
  }
  return `M${pts.join('L')}Z`
}

const Ventana = ({ x = 14, y = 12, w = 172, h = 106, puntos = true }: { x?: number; y?: number; w?: number; h?: number; puntos?: boolean }) => (
  <>
    <rect className="pi-ventana" x={x} y={y} width={w} height={h} rx="11" />
    {puntos && [0, 8, 16].map((d) => <circle key={d} className="pi-punto" cx={x + 12 + d} cy={y + 11} r="2.4" />)}
  </>
)

const Check = ({ x, y, s = 1, clase = 'pi-check' }: { x: number; y: number; s?: number; clase?: string }) => (
  <path className={clase} d={`M${x - 4.5 * s} ${y + 0.3 * s}l${3 * s} ${3 * s} ${6 * s}-${6.2 * s}`} />
)

/* ---------- pasos del proceso (1 a 8) ---------- */
function Paso1() {
  /* Primer contacto: llega tu mensaje, escribimos y respondemos */
  return (
    <>
      <Ventana />
      <g className="ch-1">
        <rect className="pi-burbuja" x="26" y="32" width="104" height="26" rx="13" />
        <rect className="pi-suave-osc" x="38" y="40" width="64" height="4.5" rx="2.2" />
        <rect className="pi-suave-osc" x="38" y="48" width="40" height="4.5" rx="2.2" />
      </g>
      <g className="ch-puntos">
        <rect className="pi-bloque" x="130" y="66" width="44" height="20" rx="10" />
        {[142, 152, 162].map((cx, i) => <circle key={cx} className={`pi-suave ch-punto ch-punto-${i}`} cx={cx} cy="76" r="2.8" />)}
      </g>
      <g className="ch-2">
        <rect className="pi-rojo" x="70" y="64" width="104" height="26" rx="13" />
        <rect className="pi-blanco" x="82" y="72" width="62" height="4.5" rx="2.2" />
        <rect className="pi-blanco pi-medio" x="82" y="80" width="38" height="4.5" rx="2.2" />
      </g>
      <rect className="pi-bloque" x="26" y="98" width="148" height="12" rx="6" />
      <circle className="pi-rojo" cx="167" cy="104" r="4" />
    </>
  )
}

function Paso2() {
  /* Reunión de diagnóstico: videollamada, conversan los dos */
  return (
    <>
      <Ventana />
      {[24, 102].map((x, i) => (
        <g key={x}>
          <rect className="pi-bloque" x={x} y="30" width="74" height="54" rx="8" />
          <circle className="pi-suave" cx={x + 37} cy="50" r="9" />
          <rect className="pi-suave" x={x + 23} y="63" width="28" height="14" rx="7" />
          <rect className={`ll-marco ll-${i}`} x={x} y="30" width="74" height="54" rx="8" />
          <g className={`ll-onda ll-onda-${i}`}>
            {[0, 1, 2, 3].map((b) => <rect key={b} className={`pi-rojo ll-barra ll-barra-${b}`} x={x + 6 + b * 4} y="72" width="2.4" height="8" rx="1.2" />)}
          </g>
        </g>
      ))}
      <circle className="pi-bloque" cx="84" cy="102" r="7" />
      <circle className="pi-bloque" cx="100" cy="102" r="7" />
      <circle className="pi-rojo" cx="116" cy="102" r="7" />
    </>
  )
}

function Paso3() {
  /* Propuesta por escrito: el documento se escribe y queda aprobado */
  return (
    <>
      <rect className="pi-burbuja" x="50" y="10" width="100" height="112" rx="8" />
      <rect className="pi-texto-osc" x="62" y="24" width="54" height="7" rx="3.5" />
      {[66, 58, 70, 48, 62].map((w, i) => (
        <rect key={i} className={`pi-suave-osc doc-l doc-l-${i}`} x="62" y={40 + i * 11} width={w} height="4.5" rx="2.2" />
      ))}
      <path className="doc-firma" pathLength={100} d="M62 108c6-8 10 4 15-2s7-6 11 0 6 2 10-3" />
      <g className="doc-sello">
        <circle className="pi-rojo" cx="132" cy="100" r="12" />
        <Check x={132} y={100} s={1.2} />
      </g>
    </>
  )
}

function Paso4() {
  /* Inicio del proyecto: la lista de materiales y accesos se completa */
  return (
    <>
      <rect className="pi-ventana" x="22" y="12" width="156" height="106" rx="11" />
      {[28, 56, 84].map((y, i) => (
        <g key={y}>
          <rect className="chk-caja" x="36" y={y} width="16" height="16" rx="4.5" />
          <rect className={`pi-rojo chk-lleno chk-lleno-${i}`} x="36" y={y} width="16" height="16" rx="4.5" />
          <Check x={44} y={y + 8} clase={`pi-check chk-v chk-v-${i}`} />
          <rect className="pi-suave" x="62" y={y + 5} width={[80, 62, 92][i]} height="6" rx="3" />
        </g>
      ))}
    </>
  )
}

function Paso5() {
  /* Construcción con avances: el sitio se arma por partes y la barra avanza */
  return (
    <>
      <Ventana />
      <rect className="pi-texto obra-b obra-b1" x="26" y="34" width="56" height="7" rx="3.5" />
      <rect className="pi-bloque obra-b obra-b2" x="26" y="46" width="148" height="24" rx="6" />
      <rect className="pi-rojo obra-b obra-b2" x="34" y="58" width="34" height="7" rx="3.5" />
      {[26, 78, 130].map((x, i) => <rect key={x} className={`pi-bloque obra-b obra-b${3 + i}`} x={x} y="76" width="44" height="18" rx="5" />)}
      <rect className="pi-bloque" x="26" y="102" width="148" height="6" rx="3" />
      <rect className="pi-rojo obra-barra" x="26" y="102" width="148" height="6" rx="3" />
    </>
  )
}

function Paso6() {
  /* Pruebas, entrega y capacitación: probado en computador y celular, y publicado */
  return (
    <>
      <rect className="pi-ventana" x="22" y="16" width="100" height="64" rx="6" />
      <rect className="pi-suave" x="14" y="82" width="116" height="6" rx="3" />
      <rect className="pi-bloque" x="32" y="28" width="50" height="6" rx="3" />
      <rect className="pi-bloque" x="32" y="40" width="80" height="16" rx="4" />
      <rect className="pi-ventana" x="140" y="20" width="40" height="70" rx="8" />
      <rect className="pi-bloque" x="148" y="34" width="24" height="5" rx="2.5" />
      <rect className="pi-bloque" x="148" y="44" width="24" height="18" rx="3" />
      <g className="pr-1"><circle className="pi-rojo" cx="118" cy="20" r="9" /><Check x={118} y={20} /></g>
      <g className="pr-2"><circle className="pi-rojo" cx="178" cy="22" r="9" /><Check x={178} y={22} /></g>
      <rect className="pr-pista" x="62" y="100" width="34" height="16" rx="8" />
      <circle className="pr-perilla" cx="70" cy="108" r="6" />
      <rect className="pi-suave" x="102" y="105" width="46" height="6" rx="3" />
    </>
  )
}

function Paso7() {
  /* Acompañamiento mensual: cada mes una revisión, y la línea de resultados avanza */
  return (
    <>
      <rect className="pi-ventana" x="14" y="12" width="106" height="106" rx="11" />
      <path className="pi-rojo" d="M14 23a11 11 0 0 1 11-11h84a11 11 0 0 1 11 11v8H14z" />
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => (
        <rect key={`${r}-${c}`} className="pi-bloque" x={23 + c * 19} y={40 + r * 18} width="13" height="11" rx="3" />
      )))}
      <rect className="cal-marca" x="80" y="40" width="13" height="11" rx="3" />
      <rect className="pi-ventana" x="126" y="40" width="60" height="78" rx="9" />
      <path className="cal-linea" pathLength={100} d="M134 104l10-12 10 6 10-18 14-12" />
      <circle className="pi-rojo cal-punto" cx="178" cy="68" r="3.4" />
    </>
  )
}

function Paso8() {
  /* Mejora continua: el ciclo gira y cada vuelta sube un poco más */
  return (
    <>
      <g className="ciclo">
        <path className="ciclo-arco" d="M100 22a43 43 0 0 1 41 30" />
        <path className="ciclo-punta" d="M135 48l7 5 2-9" />
        <path className="ciclo-arco" d="M100 108a43 43 0 0 1-41-30" />
        <path className="ciclo-punta" d="M65 82l-7-5-2 9" />
      </g>
      {[0, 1, 2].map((i) => (
        <rect key={i} className={`${i === 2 ? 'pi-rojo' : 'pi-suave'} ciclo-barra ciclo-barra-${i}`} x={84 + i * 12} y={86 - (i + 1) * 12} width="8" height={(i + 1) * 12} rx="2" />
      ))}
    </>
  )
}

const PASOS = [Paso1, Paso2, Paso3, Paso4, Paso5, Paso6, Paso7, Paso8]

export function PasoIlustracion({ n }: { n: number }) {
  const Escena = PASOS[n]
  if (!Escena) return null
  return (
    <div className="ilus paso-ilus" aria-hidden="true">
      <svg viewBox="0 0 200 130" role="presentation" focusable="false"><Escena /></svg>
    </div>
  )
}

/* ---------- métricas ---------- */
function Visitas() {
  return (
    <>
      <path className="pi-bloque" d="M10 70V68h180v2z" />
      <path className="mv-area" d="M10 62C34 58 46 44 70 46s38-16 62-14 36-14 58-18V70H10z" />
      <path className="mv-linea" pathLength={100} d="M10 62C34 58 46 44 70 46s38-16 62-14 36-14 58-18" />
      {[[70, 46], [132, 32], [190, 14]].map(([cx, cy], i) => <circle key={i} className={`pi-rojo mv-punto mv-punto-${i}`} cx={cx} cy={cy} r="3.6" />)}
    </>
  )
}

function Contactos() {
  return (
    <>
      {[10, 34, 58].map((y, i) => (
        <g key={y} className={`mc mc-${i}`}>
          <rect className="pi-burbuja" x={30 + i * 14} y={y} width="118" height="18" rx="9" />
          <circle className="pi-rojo" cx={41 + i * 14} cy={y + 9} r="4.5" />
          <rect className="pi-suave-osc" x={51 + i * 14} y={y + 7} width={[60, 46, 70][i]} height="4" rx="2" />
        </g>
      ))}
      <circle className="pi-rojo mc-aviso" cx="176" cy="14" r="6" />
    </>
  )
}

function Conversion() {
  return (
    <>
      <rect className="pi-bloque" x="30" y="10" width="140" height="14" rx="7" />
      <rect className="pi-bloque" x="55" y="32" width="90" height="14" rx="7" />
      <rect className="pi-rojo" x="78" y="54" width="44" height="14" rx="7" />
      {[50, 70, 92, 112, 132, 150].map((cx, i) => <circle key={cx} className={`pi-suave mf-cae mf-cae-${i}`} cx={cx} cy="4" r="2.6" />)}
      {[94, 106].map((cx, i) => <circle key={cx} className={`pi-rojo mf-sale mf-sale-${i}`} cx={cx} cy="50" r="2.8" />)}
    </>
  )
}

function Tiempo() {
  const marcas = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6
    return <line key={i} className="mt-marca" x1={62 + 24 * Math.cos(a)} y1={40 + 24 * Math.sin(a)} x2={62 + 28 * Math.cos(a)} y2={40 + 28 * Math.sin(a)} />
  })
  return (
    <>
      <circle className="pi-ventana" cx="62" cy="40" r="32" />
      {marcas}
      <line className="mt-aguja mt-aguja-larga" x1="62" y1="40" x2="62" y2="18" />
      <line className="mt-aguja mt-aguja-corta" x1="62" y1="40" x2="76" y2="40" />
      <circle className="pi-rojo" cx="62" cy="40" r="3.2" />
      <path className="pi-suave mt-engrane" d={engrane(132, 40, 20, 9)} />
      <circle className="pi-ventana" cx="132" cy="40" r="7" />
      <path className="pi-rojo mt-rayo" d="M168 18l-12 24h9l-5 20 14-27h-9l6-17z" />
    </>
  )
}

const METRICAS: Record<string, () => React.JSX.Element> = { visitas: Visitas, contactos: Contactos, conversion: Conversion, tiempo: Tiempo }

export function MetricaIlustracion({ id }: { id: string }) {
  const Escena = METRICAS[id]
  if (!Escena) return null
  return (
    <div className="ilus metrica-ilus" aria-hidden="true">
      <svg viewBox="0 0 200 80" role="presentation" focusable="false"><Escena /></svg>
    </div>
  )
}
