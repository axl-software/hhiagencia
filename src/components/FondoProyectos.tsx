/* Fondo de Proyectos: en vez de las órbitas, una interfaz de edición de contenido que alude al trabajo
   real detrás de cada proyecto (streams, reels y automatizaciones): vista previa con "REC", un flujo de
   automatización y una línea de tiempo con clips, audio y marcas, con el cabezal rojo avanzando.
   Solo decoración (aria-hidden), inclinada y desvanecida para no competir con las tarjetas.
   Colores y movimiento en globals.css (.fondo-proy); se detiene con "reducir movimiento".
   La sección que lo contiene necesita la clase "con-deco". */

const CLIPS: [number, number, boolean?][] = [[24, 118], [148, 132, true], [286, 96], [388, 150], [544, 72]]
const ONDA = Array.from({ length: 66 }, (_, i) => 4 + Math.round(Math.abs(Math.sin(i * 0.9) * 9 + Math.sin(i * 0.37) * 6)))
const MARCAS: [number, number, boolean?][] = [[40, 54], [170, 70, true], [330, 48], [468, 64]]

export default function FondoProyectos() {
  return (
    <div className="fondo-proy" aria-hidden="true">
      <svg viewBox="0 0 640 380" role="presentation" focusable="false">
        <rect className="fp-panel" x="1" y="1" width="638" height="378" rx="18" />
        {/* barra superior */}
        {[0, 10, 20].map((d) => <circle key={d} className="fp-suave" cx={22 + d} cy="20" r="3.4" />)}
        <rect className="fp-bloque" x="56" y="14" width="140" height="12" rx="6" />
        <g className="fp-rec">
          <rect className="fp-bloque" x="560" y="11" width="60" height="18" rx="9" />
          <circle className="fp-rojo fp-rec-punto" cx="574" cy="20" r="4" />
          <rect className="fp-suave" x="584" y="17" width="26" height="6" rx="3" />
        </g>

        {/* vista previa del video */}
        <rect className="fp-monitor" x="20" y="42" width="290" height="156" rx="12" />
        <rect className="fp-bloque" x="34" y="56" width="70" height="8" rx="4" />
        <path className="fp-play" d="M154 104v28l24-14z" />
        <rect className="fp-bloque" x="34" y="180" width="262" height="4" rx="2" />
        <rect className="fp-rojo fp-avance" x="34" y="180" width="262" height="4" rx="2" />

        {/* flujo de automatización */}
        <rect className="fp-monitor" x="324" y="42" width="296" height="156" rx="12" />
        <path className="fp-flujo" d="M392 84h44" />
        <path className="fp-flujo" d="M488 84c22 0 22 40 0 40" />
        <path className="fp-flujo" d="M436 124h-44" />
        {[[340, 70, true], [436, 70], [436, 110], [340, 110]].map(([x, y, rojo], i) => (
          <g key={i} className={`fp-nodo fp-nodo-${i}`}>
            <rect className={rojo ? 'fp-rojo' : 'fp-bloque-2'} x={x as number} y={y as number} width="52" height="28" rx="8" />
            <rect className={rojo ? 'fp-blanco' : 'fp-suave'} x={(x as number) + 10} y={(y as number) + 11} width="32" height="6" rx="3" />
          </g>
        ))}
        <rect className="fp-bloque" x="340" y="156" width="120" height="7" rx="3.5" />
        <rect className="fp-bloque" x="340" y="170" width="84" height="7" rx="3.5" />

        {/* regla de tiempo */}
        {Array.from({ length: 30 }, (_, i) => (
          <rect key={i} className="fp-suave" x={24 + i * 20} y={i % 5 ? 216 : 212} width="1.4" height={i % 5 ? 5 : 9} />
        ))}

        {/* pista de video */}
        {CLIPS.map(([x, w, rojo]) => (
          <g key={x}>
            <rect className={rojo ? 'fp-clip-rojo' : 'fp-clip'} x={x} y="232" width={w} height="34" rx="6" />
            {Array.from({ length: Math.floor(w / 26) }, (_, j) => (
              <rect key={j} className="fp-cuadro" x={x + 6 + j * 26} y="238" width="20" height="22" rx="3" />
            ))}
          </g>
        ))}
        {/* pista de audio */}
        <rect className="fp-pista" x="24" y="276" width="592" height="30" rx="6" />
        {ONDA.map((h, i) => (
          <rect key={i} className="fp-onda" x={30 + i * 8.8} y={291 - h / 2} width="3.2" height={h} rx="1.6" style={{ animationDelay: `${-(i % 11) * 0.22}s` }} />
        ))}
        {/* pista de marcas (textos y publicaciones) */}
        {MARCAS.map(([x, w, rojo]) => <rect key={x} className={rojo ? 'fp-rojo' : 'fp-bloque-2'} x={x} y="318" width={w} height="14" rx="7" />)}

        {/* cabezal */}
        <g className="fp-cabezal">
          <path className="fp-rojo" d="M18 206h12l-6 8z" />
          <rect className="fp-rojo" x="23" y="212" width="2" height="128" />
        </g>
      </svg>
    </div>
  )
}
