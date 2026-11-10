/* =========================================================
   ESCENA DE BIENVENIDA (Three.js): un monitor 3D cuya pantalla muestra, una tras otra, cuatro interfaces de ejemplo de HHA:
   agenda (agendAHH), página web, flujos automáticos y marketing. La pantalla es un <canvas> 2D que se redibuja a cada cuadro
   y se usa como textura. Entre pantallas hay una transición de "ola" (borde ondulante, como la tela del prompt original).
   El monitor se mueve con un resorte amortiguado que sigue al mouse. Todo está rotulado "Vista de ejemplo": las cifras
   y los nombres son de muestra, no son clientes ni datos reales.
   Three.js se carga con import dinámico: solo pesa en la bienvenida y no entra al resto del sitio.
   ========================================================= */
import type * as THREE from 'three'

export type Escena = {
  /** Acerca la cámara a la pantalla. `mitad` se llama cuando la pantalla ya llena la vista; `fin` al terminar. */
  zoom: (mitad: () => void, fin: () => void) => void
  parar: () => void
}

type Opciones = { reduce: boolean; host: HTMLElement }

const INK = '#0B1020'
const RED = '#D7263D'
const RED2 = '#B3192F'
const MUT = '#5C5D64'
const BGC = '#F2F6FC'
const BLUE = '#2b5bd7'
const F = '"Segoe UI",system-ui,sans-serif'
const MONO = 'Consolas,monospace'

const c01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
const eo = (x: number) => 1 - Math.pow(1 - c01(x), 3)
const eio = (x: number) => {
  x = c01(x)
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}
const eb = (x: number) => {
  x = c01(x)
  const c = 1.70158
  return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2)
}

export async function crearEscena(canvas: HTMLCanvasElement, { reduce, host }: Opciones): Promise<Escena | null> {
  const probe = document.createElement('canvas')
  if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return null
  const THREE = await import('three')

  const W = 4.4
  const H = 2.75
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
  const rig = new THREE.Group()
  scene.add(rig)

  /* luces: frío de frente; rojo y azul de contraluz (la paleta de marca) */
  scene.add(new THREE.AmbientLight(0x93a5d6, 0.7))
  const key = new THREE.DirectionalLight(0xffffff, 1.7)
  key.position.set(-3, 4, 6)
  scene.add(key)
  const rim = new THREE.PointLight(0xd7263d, 70, 24, 2)
  rim.position.set(4, 0.4, -2.6)
  scene.add(rim)
  const rim2 = new THREE.PointLight(0x2b5bd7, 38, 24, 2)
  rim2.position.set(-4.5, 1.2, -2.4)
  scene.add(rim2)

  /* monitor */
  const bezel = new THREE.Mesh(
    new THREE.BoxGeometry(W + 0.26, H + 0.26, 0.16),
    new THREE.MeshStandardMaterial({ color: 0x151c38, metalness: 0.65, roughness: 0.32 })
  )
  rig.add(bezel)
  const UIS = window.innerWidth > 900 ? 1 : 0.75
  const cUI = document.createElement('canvas')
  cUI.width = Math.round(1280 * UIS)
  cUI.height = Math.round(800 * UIS)
  const g = cUI.getContext('2d')!
  const tex = new THREE.CanvasTexture(cUI)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ map: tex }))
  screen.position.z = 0.085
  rig.add(screen)

  /* reflejo de luz que recorre la pantalla */
  const cgl = document.createElement('canvas')
  cgl.width = 256
  cgl.height = 32
  const ggl = cgl.getContext('2d')!
  const lg = ggl.createLinearGradient(0, 0, 256, 0)
  lg.addColorStop(0, 'rgba(255,255,255,0)')
  lg.addColorStop(0.5, 'rgba(255,255,255,.55)')
  lg.addColorStop(1, 'rgba(255,255,255,0)')
  ggl.fillStyle = lg
  ggl.fillRect(0, 0, 256, 32)
  const glareTex = new THREE.CanvasTexture(cgl)
  glareTex.wrapS = THREE.RepeatWrapping
  glareTex.repeat.set(0.6, 1)
  const glare = new THREE.Mesh(
    new THREE.PlaneGeometry(W, H),
    new THREE.MeshBasicMaterial({ map: glareTex, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false })
  )
  glare.position.z = 0.09
  rig.add(glare)

  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.95, 0.14), new THREE.MeshStandardMaterial({ color: 0x1b2442, metalness: 0.7, roughness: 0.35 }))
  neck.position.set(0, -(H / 2 + 0.13 + 0.42), -0.1)
  rig.add(neck)
  const base = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.07, 1.05), new THREE.MeshStandardMaterial({ color: 0x232c4d, metalness: 0.7, roughness: 0.3 }))
  base.position.set(0, -(H / 2 + 0.13 + 0.9), -0.05)
  rig.add(base)

  /* resplandor rojo en el piso */
  const cg = document.createElement('canvas')
  cg.width = cg.height = 256
  const gx = cg.getContext('2d')!
  const rg = gx.createRadialGradient(128, 128, 4, 128, 128, 128)
  rg.addColorStop(0, 'rgba(215,38,61,.9)')
  rg.addColorStop(1, 'rgba(215,38,61,0)')
  gx.fillStyle = rg
  gx.fillRect(0, 0, 256, 256)
  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(7, 3),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cg), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.55 })
  )
  glow.rotation.x = -Math.PI / 2
  glow.position.set(0, -(H / 2 + 0.13 + 0.93), 0)
  rig.add(glow)

  /* ---------- contenido del monitor: cuatro pantallas ---------- */
  const logoA = new Image()
  let logoAOk = false
  logoA.onload = () => {
    logoAOk = true
  }
  logoA.src = '/brand/hh-logo-azul.png'
  let GT = 0

  const rr = (x: number, y: number, w: number, h: number, r: number) => {
    g.beginPath()
    g.moveTo(x + r, y)
    g.arcTo(x + w, y, x + w, y + h, r)
    g.arcTo(x + w, y + h, x, y + h, r)
    g.arcTo(x, y + h, x, y, r)
    g.arcTo(x, y, x + w, y, r)
    g.closePath()
  }
  const txt = (s: string, x: number, y: number, font: string, col: string, al: CanvasTextAlign = 'left') => {
    g.font = font
    g.fillStyle = col
    g.textAlign = al
    g.textBaseline = 'middle'
    g.fillText(s, x, y)
  }
  const card = (x: number, y: number, w: number, h: number, fill = '#fff') => {
    g.fillStyle = fill
    g.fillRect(x, y, w, h)
    g.strokeStyle = 'rgba(11,16,32,.12)'
    g.lineWidth = 2
    g.strokeRect(x, y, w, h)
  }
  const TABS = ['Agenda', 'Página web', 'Flujos', 'Marketing']

  const chrome = (cur: number) => {
    g.fillStyle = BGC
    g.fillRect(0, 0, 1280, 800)
    g.fillStyle = '#fff'
    g.fillRect(0, 0, 1280, 78)
    g.fillStyle = 'rgba(11,16,32,.12)'
    g.fillRect(0, 76, 1280, 2)
    if (logoAOk) g.drawImage(logoA, 26, 12, 92, 57)
    let x = 150
    TABS.forEach((s, i) => {
      g.font = '700 23px ' + F
      const w = g.measureText(s).width + 44
      if (i === cur) {
        g.fillStyle = INK
        rr(x, 16, w, 46, 8)
        g.fill()
        txt(s, x + 22, 40, '700 23px ' + F, '#fff')
      } else txt(s, x + 22, 40, '600 23px ' + F, MUT)
      x += w + 8
    })
    txt('HHA DIGITAL SOLUTIONS', 1240, 40, '600 15px ' + MONO, MUT, 'right')
    txt('VISTA DE EJEMPLO', 1240, 780, '600 15px ' + MONO, MUT, 'right')
  }

  /* 1) Agenda (agendAHH) */
  const sceneA = (l: number) => {
    txt('Hoy', 48, 128, '800 46px ' + F, INK)
    txt('Martes', 150, 134, '500 24px ' + F, MUT)
    const k = eo((l - 0.2) / 1.3)
    const M: [number, string, string][] = [[12, 'reservas hoy', ''], [3, 'clientes nuevos', ''], [78, 'agenda ocupada', '%']]
    M.forEach((m, i) => {
      const x = 48 + i * 262
      g.globalAlpha = eo((l - 0.1 * i) / 0.6)
      card(x, 166, 240, 118)
      txt(Math.round(m[0] * k) + m[2], x + 22, 214, '700 56px Inter,' + F, INK)
      txt(m[1], x + 22, 262, '500 22px ' + F, MUT)
      g.globalAlpha = 1
    })
    const FILAS = [['10:00', 'Corte clásico · Diego', 'Confirmada'], ['10:45', 'Corte y barba · Luis', 'Confirmada'], ['11:45', 'Limpieza facial · Ana', 'Nueva'], ['12:30', 'Masaje relajante · Sofi', 'Confirmada']]
    FILAS.forEach((f, i) => {
      const a = eb((l - (0.7 + i * 0.35)) / 0.8)
      if (a <= 0) return
      const y = 314 + i * 104
      const dx = (1 - a) * 70
      g.globalAlpha = c01(a)
      card(48 + dx, y, 780, 90)
      g.fillStyle = INK
      g.fillRect(68 + dx, y + 22, 108, 46)
      txt(f[0], 122 + dx, y + 45, '700 26px ' + MONO, '#fff', 'center')
      txt(f[1], 200 + dx, y + 45, '500 30px ' + F, INK)
      txt(f[2], 808 + dx, y + 45, '700 26px ' + F, f[2] === 'Nueva' ? RED : RED2, 'right')
      g.globalAlpha = 1
    })
    card(860, 166, 372, 584)
    txt('Esta semana', 884, 206, '700 28px ' + F, INK)
    const H7 = [0.5, 0.7, 0.45, 0.85, 0.65, 0.95, 0.55]
    const D7 = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    for (let i = 0; i < 7; i++) {
      const h = H7[i] * 300 * eo((l - 0.5 - i * 0.08) / 0.9) * (1 + 0.02 * Math.sin(GT * 2 + i))
      const x = 888 + i * 46
      g.fillStyle = i === 5 ? RED : '#c9d4e8'
      g.fillRect(x, 560 - h, 30, h)
      txt(D7[i], x + 15, 586, '600 18px ' + F, MUT, 'center')
    }
    const ta = eb((l - 2.3) / 0.7)
    if (ta > 0) {
      g.save()
      g.globalAlpha = c01(ta)
      g.translate((1 - ta) * 140, 0)
      card(884, 640, 324, 86)
      g.fillStyle = RED
      g.beginPath()
      g.arc(924, 683, 22, 0, 7)
      g.fill()
      txt('✓', 924, 684, '800 26px ' + F, '#fff', 'center')
      txt('Nueva reserva · 11:45', 960, 670, '700 22px ' + F, INK)
      txt('Reservó sola desde su celular', 960, 698, '500 17px ' + F, MUT)
      g.restore()
    }
  }

  /* 2) Página web: se arma bloque por bloque y baja con scroll suave; al lado, el celular */
  const sceneB = (l: number) => {
    const bx = 48
    const by = 104
    const bw = 830
    const bh = 650
    g.fillStyle = 'rgba(11,16,32,.10)'
    g.fillRect(bx + 10, by + 14, bw, bh)
    g.fillStyle = '#fff'
    g.fillRect(bx, by, bw, bh)
    g.strokeStyle = 'rgba(11,16,32,.2)'
    g.lineWidth = 2
    g.strokeRect(bx, by, bw, bh)
    g.fillStyle = '#EEF3FA'
    g.fillRect(bx, by, bw, 48)
    ;[RED, '#e6b422', '#3ca56b'].forEach((c, i) => {
      g.fillStyle = c
      g.beginPath()
      g.arc(bx + 26 + i * 24, by + 24, 7, 0, 7)
      g.fill()
    })
    g.fillStyle = '#fff'
    rr(bx + 120, by + 9, 420, 30, 15)
    g.fill()
    txt('tunegocio.cl', bx + 144, by + 24, '500 18px ' + F, MUT)
    g.save()
    g.beginPath()
    g.rect(bx, by + 48, bw, bh - 48)
    g.clip()
    const sc = eio((l - 1.0) / 3.4) * 430
    g.translate(bx, by + 48 - sc)
    const bloque = (i: number, fn: () => void) => {
      const a = eo((l - i * 0.18) / 0.8)
      g.save()
      g.globalAlpha = a
      g.translate(0, (1 - a) * 30)
      fn()
      g.restore()
    }
    bloque(0, () => {
      g.fillStyle = '#fff'
      g.fillRect(0, 0, bw, 70)
      g.fillStyle = INK
      g.fillRect(28, 18, 38, 34)
      txt('Tu marca', 78, 36, '700 24px ' + F, INK)
      ;[0, 1, 2].forEach((i) => {
        g.fillStyle = '#c9d4e8'
        g.fillRect(430 + i * 92, 30, 66, 12)
      })
      g.fillStyle = RED
      g.fillRect(704, 16, 100, 38)
    })
    bloque(1, () => {
      g.fillStyle = '#F2F6FC'
      g.fillRect(0, 70, bw, 330)
      txt('Tu negocio,', 44, 142, '800 58px ' + F, INK)
      txt('a la vista', 44, 206, '800 58px ' + F, INK)
      txt('de todos.', 44, 270, '800 58px ' + F, RED)
      g.fillStyle = '#c9d4e8'
      g.fillRect(44, 310, 300, 12)
      g.fillRect(44, 334, 240, 12)
      g.fillStyle = RED
      g.fillRect(44, 360, 210, 42)
      txt('Solicitar cotización', 62, 381, '700 18px ' + F, '#fff')
      const gr = g.createLinearGradient(460, 100, 800, 380)
      gr.addColorStop(0, INK)
      gr.addColorStop(1, RED)
      rr(470, 100, 320, 260, 16)
      g.fillStyle = gr
      g.fill()
      g.fillStyle = 'rgba(255,255,255,.18)'
      g.beginPath()
      g.arc(640 + Math.sin(GT) * 8, 200, 60, 0, 7)
      g.fill()
      g.fillRect(500, 290, 200, 14)
      g.fillRect(500, 316, 140, 14)
    })
    bloque(3, () => {
      txt('Servicios', 44, 450, '800 36px ' + F, INK)
      ;[0, 1, 2].forEach((i) => {
        const x = 44 + i * 262
        card(x, 480, 238, 140)
        g.fillStyle = i === 1 ? RED : INK
        g.beginPath()
        g.arc(x + 44, 526, 22, 0, 7)
        g.fill()
        g.fillStyle = INK
        g.fillRect(x + 24, 568, 150, 12)
        g.fillStyle = '#c9d4e8'
        g.fillRect(x + 24, 592, 110, 10)
      })
    })
    bloque(5, () => {
      txt('Planes', 44, 690, '800 36px ' + F, INK)
      ;[0, 1, 2].forEach((i) => {
        const x = 44 + i * 262
        card(x, 720, 238, 190, i === 1 ? '#fff' : '#F8FAFC')
        if (i === 1) {
          g.strokeStyle = RED
          g.lineWidth = 4
          g.strokeRect(x, 720, 238, 190)
          g.fillStyle = RED
          g.fillRect(x + 16, 708, 110, 24)
          txt('RECOMENDADO', x + 24, 720, '700 12px ' + MONO, '#fff')
        }
        g.fillStyle = INK
        g.fillRect(x + 24, 754, 120, 16)
        g.fillStyle = '#c9d4e8'
        g.fillRect(x + 24, 790, 160, 10)
        g.fillRect(x + 24, 812, 140, 10)
        g.fillRect(x + 24, 834, 150, 10)
      })
    })
    bloque(7, () => {
      g.fillStyle = INK
      g.fillRect(0, 950, bw, 120)
      g.fillStyle = '#c8d2e8'
      g.fillRect(44, 990, 200, 12)
      g.fillRect(44, 1016, 140, 10)
    })
    g.restore()
    /* celular con la misma página */
    const py = 104 + Math.sin(GT * 1.2) * 6
    const pa = eb((l - 0.5) / 0.9)
    g.save()
    g.globalAlpha = c01(pa)
    g.translate((1 - pa) * 80, 0)
    g.fillStyle = INK
    rr(920, py, 312, 560, 36)
    g.fill()
    g.fillStyle = '#fff'
    rr(932, py + 12, 288, 536, 28)
    g.fill()
    g.save()
    rr(932, py + 12, 288, 536, 28)
    g.clip()
    g.fillStyle = '#F2F6FC'
    g.fillRect(932, py + 12, 288, 200)
    txt('Tu negocio,', 952, py + 76, '800 32px ' + F, INK)
    txt('a la vista', 952, py + 112, '800 32px ' + F, INK)
    txt('de todos.', 952, py + 148, '800 32px ' + F, RED)
    g.fillStyle = RED
    g.fillRect(952, py + 176, 150, 34)
    ;[0, 1].forEach((i) => {
      card(952, py + 236 + i * 120, 248, 100)
      g.fillStyle = i ? RED : INK
      g.beginPath()
      g.arc(990, py + 286 + i * 120, 18, 0, 7)
      g.fill()
      g.fillStyle = '#c9d4e8'
      g.fillRect(1022, py + 274 + i * 120, 140, 10)
      g.fillRect(1022, py + 296 + i * 120, 100, 10)
    })
    g.restore()
    g.restore()
    const PIL: [string, number, number][] = [['Diseño propio', 920, 690], ['Adaptada a celular', 1068, 690], ['Lista para Google', 920, 732]]
    PIL.forEach((p, i) => {
      const a = eo((l - 1.6 - i * 0.2) / 0.6)
      if (a <= 0) return
      g.globalAlpha = a
      g.font = '700 17px ' + F
      const w = g.measureText(p[0]).width + 30
      g.fillStyle = INK
      rr(p[1], p[2], w, 34, 17)
      g.fill()
      txt(p[0], p[1] + 15, p[2] + 17, '700 17px ' + F, '#fff')
      g.globalAlpha = 1
    })
  }

  /* 3) Flujos automáticos: pasos conectados con puntos que viajan por las curvas */
  type Nodo = { x: number; y: number; t: string; s: string; c: string }
  const NODOS: Nodo[] = [
    { x: 60, y: 340, t: 'Reserva online', s: 'Tu cliente elige su hora', c: RED },
    { x: 360, y: 340, t: 'Confirmación', s: 'Correo al cliente', c: BLUE },
    { x: 660, y: 250, t: 'Aviso al equipo', s: 'Email al profesional', c: BLUE },
    { x: 660, y: 440, t: 'Agenda', s: 'Se bloquea la hora', c: RED },
    { x: 960, y: 345, t: 'Panel y métricas', s: 'Todo en un solo lugar', c: INK },
  ]
  const ARCOS = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4]]
  const bez = (a: Nodo, b: Nodo, u: number) => {
    const x0 = a.x + 260
    const y0 = a.y + 52
    const x1 = b.x
    const y1 = b.y + 52
    const dx = Math.max(60, (x1 - x0) * 0.5)
    const p = [{ x: x0, y: y0 }, { x: x0 + dx, y: y0 }, { x: x1 - dx, y: y1 }, { x: x1, y: y1 }]
    const v = 1 - u
    return {
      x: v * v * v * p[0].x + 3 * v * v * u * p[1].x + 3 * v * u * u * p[2].x + u * u * u * p[3].x,
      y: v * v * v * p[0].y + 3 * v * v * u * p[1].y + 3 * v * u * u * p[2].y + u * u * u * p[3].y,
      p,
    }
  }
  const sceneC = (l: number) => {
    txt('Flujos automáticos', 48, 128, '800 46px ' + F, INK)
    txt('Cada reserva activa los pasos siguientes, sin trabajo manual.', 48, 176, '500 24px ' + F, MUT)
    ARCOS.forEach((ar, i) => {
      const A = NODOS[ar[0]]
      const B = NODOS[ar[1]]
      const a = eo((l - (0.5 + ar[1] * 0.4)) / 0.8)
      if (a <= 0) return
      const b = bez(A, B, 0).p
      g.globalAlpha = a
      g.strokeStyle = 'rgba(11,16,32,.22)'
      g.lineWidth = 4
      g.beginPath()
      g.moveTo(b[0].x, b[0].y)
      g.bezierCurveTo(b[1].x, b[1].y, b[2].x, b[2].y, b[3].x, b[3].y)
      g.stroke()
      for (let k = 0; k < 3; k++) {
        const u = (GT * 0.32 + k / 3 + i * 0.17) % 1
        const q = bez(A, B, u)
        g.fillStyle = 'rgba(215,38,61,.25)'
        g.beginPath()
        g.arc(q.x, q.y, 15, 0, 7)
        g.fill()
        g.fillStyle = RED
        g.beginPath()
        g.arc(q.x, q.y, 7, 0, 7)
        g.fill()
      }
      g.globalAlpha = 1
    })
    NODOS.forEach((n, i) => {
      const a = eb((l - (0.3 + i * 0.4)) / 0.7)
      if (a <= 0) return
      const cx0 = n.x + 130
      const cy0 = n.y + 52
      g.save()
      g.translate(cx0, cy0 + Math.sin(GT * 1.1 + i) * 4)
      g.scale(a, a)
      g.translate(-cx0, -cy0)
      g.fillStyle = 'rgba(11,16,32,.10)'
      g.fillRect(n.x + 6, n.y + 12, 260, 104)
      card(n.x, n.y, 260, 104)
      g.fillStyle = n.c
      g.beginPath()
      g.arc(n.x + 48, n.y + 52, 26, 0, 7)
      g.fill()
      txt(String(i + 1), n.x + 48, n.y + 53, '800 24px ' + F, '#fff', 'center')
      txt(n.t, n.x + 90, n.y + 42, '700 24px ' + F, INK)
      txt(n.s, n.x + 90, n.y + 72, '500 18px ' + F, MUT)
      const ring = (GT * 0.8 + i * 0.3) % 1
      g.strokeStyle = 'rgba(215,38,61,' + 0.35 * (1 - ring) + ')'
      g.lineWidth = 3
      g.beginPath()
      g.arc(n.x + 48, n.y + 52, 26 + ring * 18, 0, 7)
      g.stroke()
      g.restore()
    })
    g.globalAlpha = eo((l - 2.6) / 0.7)
    g.fillStyle = INK
    rr(48, 690, 520, 48, 8)
    g.fill()
    txt('Ejemplo de flujo: de la reserva a la agenda', 72, 714, '600 20px ' + F, '#fff')
    g.globalAlpha = 1
  }

  /* 4) Marketing y contenido */
  const sceneD = (l: number) => {
    txt('Marketing y contenido', 48, 128, '800 46px ' + F, INK)
    txt('Calendario del mes', 48, 176, '500 24px ' + F, MUT)
    ;['L', 'M', 'M', 'J', 'V', 'S', 'D'].forEach((s, i) => txt(s, 48 + i * 80 + 34, 224, '700 18px ' + F, MUT, 'center'))
    const COL = [RED, INK, BLUE, '#c9d4e8']
    const P = [[0, 0], [0, 2], [1, 1], [1, 4], [2, 0], [2, 3], [2, 5], [3, 2], [3, 6], [0, 5], [1, 6], [3, 0]]
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 7; c++) {
        g.fillStyle = 'rgba(11,16,32,.06)'
        g.fillRect(48 + c * 80, 244 + r * 88, 70, 78)
      }
    P.forEach((p, i) => {
      const a = eb((l - (0.4 + i * 0.16)) / 0.6)
      if (a <= 0) return
      const x = 48 + p[1] * 80
      const y = 244 + p[0] * 88
      g.save()
      g.translate(x + 35, y + 39)
      g.scale(a, a)
      g.translate(-(x + 35), -(y + 39))
      g.fillStyle = COL[i % 4]
      g.fillRect(x, y, 70, 78)
      g.fillStyle = 'rgba(255,255,255,.75)'
      g.fillRect(x + 10, y + 14, 50, 34)
      g.fillRect(x + 10, y + 56, 36, 8)
      g.restore()
    })
    card(640, 166, 592, 360)
    txt('Consultas del mes', 668, 206, '700 28px ' + F, INK)
    const k = eo((l - 0.5) / 1.8)
    txt(String(Math.round(128 * k)), 668, 276, '800 70px Inter,' + F, INK)
    txt('de ejemplo', 830, 284, '600 18px ' + MONO, MUT)
    const pts = [0.2, 0.3, 0.25, 0.45, 0.4, 0.6, 0.55, 0.8, 0.75, 0.95]
    const n = pts.length
    const prog = eo((l - 0.6) / 2.2)
    const X = (i: number) => 668 + i * (540 / (n - 1))
    const Y = (i: number) => 490 - pts[i] * 170
    const punto = (j: number) => {
      const f = c01(prog * (n - 1) - j + 1)
      if (f <= 0) return null
      return { x: j === 0 ? X(0) : X(j - 1) + (X(j) - X(j - 1)) * f, y: j === 0 ? Y(0) : Y(j - 1) + (Y(j) - Y(j - 1)) * f, f }
    }
    g.save()
    g.beginPath()
    g.rect(668, 310, 540, 190)
    g.clip()
    g.beginPath()
    g.moveTo(X(0), 490)
    for (let i = 0; i < n; i++) {
      const p = punto(i)
      if (!p) break
      g.lineTo(p.x, p.y)
      if (p.f < 1) break
    }
    g.lineTo(668 + prog * 540, 490)
    g.closePath()
    const gr = g.createLinearGradient(0, 310, 0, 490)
    gr.addColorStop(0, 'rgba(215,38,61,.35)')
    gr.addColorStop(1, 'rgba(215,38,61,0)')
    g.fillStyle = gr
    g.fill()
    g.beginPath()
    for (let j = 0; j < n; j++) {
      const p = punto(j)
      if (!p) break
      if (j === 0) g.moveTo(p.x, p.y)
      else g.lineTo(p.x, p.y)
      if (p.f < 1) break
    }
    g.strokeStyle = RED
    g.lineWidth = 6
    g.lineJoin = 'round'
    g.stroke()
    g.restore()
    ;[['Publicaciones', '12'], ['Campañas', '2']].forEach((s, i) => {
      const a = eb((l - (1.8 + i * 0.25)) / 0.6)
      if (a <= 0) return
      g.globalAlpha = c01(a)
      card(640 + i * 302, 552, 290, 150)
      txt(s[0], 664 + i * 302, 590, '600 22px ' + F, MUT)
      txt(s[1], 664 + i * 302, 650, '800 56px Inter,' + F, i ? RED : INK)
      g.globalAlpha = 1
    })
  }

  const ESC = [sceneA, sceneB, sceneC, sceneD]
  const dibujar = (i: number, l: number) => {
    g.save()
    chrome(i)
    ESC[i](l)
    g.restore()
  }
  const DUR = 5.8
  const TRN = 1.0
  const drawUI = (T: number) => {
    GT = T
    g.setTransform(UIS, 0, 0, UIS, 0, 0)
    g.clearRect(0, 0, 1280, 800)
    const idx = Math.floor(T / DUR) % 4
    const l = T % DUR
    const ls = l + (T >= DUR ? TRN : 0)
    if (l > DUR - TRN) {
      /* transición de ola: la pantalla siguiente entra tras un borde ondulante con filo rojo */
      const p = (l - (DUR - TRN)) / TRN
      const nx = (idx + 1) % 4
      dibujar(idx, ls)
      const edge = -160 + eio(p) * (1280 + 520)
      const amp = 60 * Math.sin(p * Math.PI)
      const pa = (y: number) => edge + Math.sin(y * 0.012 + T * 4) * amp + (y - 400) * 0.22
      g.save()
      g.beginPath()
      g.moveTo(0, 0)
      for (let y = 0; y <= 800; y += 10) g.lineTo(pa(y), y)
      g.lineTo(0, 800)
      g.closePath()
      g.clip()
      dibujar(nx, p * TRN)
      g.restore()
      g.save()
      g.beginPath()
      for (let y = 0; y <= 800; y += 10) {
        if (y === 0) g.moveTo(pa(y), y)
        else g.lineTo(pa(y), y)
      }
      g.strokeStyle = RED
      g.lineWidth = 10
      g.shadowColor = 'rgba(215,38,61,.8)'
      g.shadowBlur = 24
      g.stroke()
      g.shadowBlur = 0
      g.strokeStyle = '#fff'
      g.lineWidth = 3
      g.stroke()
      g.restore()
    } else dibujar(idx, ls)
    tex.needsUpdate = true
  }

  /* ---------- tarjetas que flotan delante (profundidad) ---------- */
  type Tarjeta = THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> & { userData: { x: number; y: number; z: number; ph: number } }
  const tarjeta = (w: number, h: number, dibuja: (q: CanvasRenderingContext2D, w: number, h: number) => void, x: number, y: number, z: number, ph: number): Tarjeta => {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = Math.round((512 * h) / w)
    const q = c.getContext('2d')!
    dibuja(q, c.width, c.height)
    const tx = new THREE.CanvasTexture(c)
    tx.colorSpace = THREE.SRGBColorSpace
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tx, transparent: true, opacity: 0 })) as Tarjeta
    m.userData = { x, y, z, ph }
    m.position.set(x, y, z)
    rig.add(m)
    return m
  }
  const sats = [
    tarjeta(1.9, 0.62, (q, w, h) => {
      q.fillStyle = '#F8FAFC'
      q.fillRect(0, 0, w, h)
      q.fillStyle = RED
      q.beginPath()
      q.arc(64, h / 2, 34, 0, 7)
      q.fill()
      q.fillStyle = '#fff'
      q.font = '800 40px sans-serif'
      q.textAlign = 'center'
      q.textBaseline = 'middle'
      q.fillText('✓', 64, h / 2 + 2)
      q.textAlign = 'left'
      q.fillStyle = INK
      q.font = '700 34px ' + F
      q.fillText('Nueva reserva · 11:45', 120, h / 2 - 14)
      q.fillStyle = MUT
      q.font = '500 26px ' + F
      q.fillText('Reservó sola desde su celular', 120, h / 2 + 26)
    }, -2.0, -0.85, 0.85, 0),
    tarjeta(1.35, 0.62, (q, w, h) => {
      q.fillStyle = INK
      q.fillRect(0, 0, w, h)
      q.fillStyle = '#ff8a99'
      q.font = '600 24px ' + MONO
      q.fillText('COMISIÓN', 28, 52)
      q.fillStyle = '#fff'
      q.font = '800 96px Inter,' + F
      q.fillText('0 %', 26, h - 34)
    }, 1.7, 1.2, 0.7, 2),
    tarjeta(1.5, 0.5, (q, w, h) => {
      q.fillStyle = RED
      q.fillRect(0, 0, w, h)
      q.fillStyle = '#fff'
      q.font = '700 38px ' + F
      q.textBaseline = 'middle'
      q.fillText('Prueba 7 días gratis', 26, h / 2)
    }, 1.75, -1.12, 0.55, 4),
  ]

  /* partículas */
  const N = 160
  const pg = new THREE.BufferGeometry()
  const pp = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    pp[i * 3] = (Math.random() - 0.5) * 14
    pp[i * 3 + 1] = (Math.random() - 0.5) * 8
    pp[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1
  }
  pg.setAttribute('position', new THREE.BufferAttribute(pp, 3))
  const pts = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.035, color: 0xc8d2e8, transparent: true, opacity: 0.55, depthWrite: false }))
  scene.add(pts)

  /* encuadre: el monitor a la derecha en escritorio y abajo en celular */
  const layout = { z: 9, ox: 0, oy: 0 }
  const fit = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    renderer.setSize(w, h, false)
    const asp = w / h
    camera.aspect = asp
    const th = Math.tan((camera.fov * Math.PI) / 360)
    const desk = w > 900
    const frac = desk ? 0.56 : 0.95
    const d = (W + 1.2) / (frac * 2 * th * asp)
    const vw = 2 * d * th * asp
    const vh = 2 * d * th
    layout.z = d
    layout.ox = desk ? vw * 0.15 : 0
    layout.oy = desk ? -0.1 : -vh * 0.2
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', fit)
  fit()

  /* movimiento fluido: resorte amortiguado (aceleración = k·(objetivo − posición) − c·velocidad) en vez de un seguimiento rígido */
  let tgtY = 0
  let tgtX = 0
  const alMover = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return
    tgtY = e.clientX / window.innerWidth - 0.5
    tgtX = e.clientY / window.innerHeight - 0.5
  }
  host.addEventListener('pointermove', alMover)
  const rp = { y: 0, x: 0 }
  const rv = { y: 0, x: 0 }
  let t0 = performance.now()
  let last = t0
  let raf = 0
  let corriendo = true
  let zoom: { t0: number; mid: () => void; fin: () => void; hechoMid: boolean; hechoFin: boolean } | null = null
  const ease = eo

  const render = (now: number) => {
    const t = reduce ? 3.2 : (now - t0) / 1000
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    const K = 46
    const C = 8.5
    rv.y += (K * (tgtY * 0.5 - rp.y) - C * rv.y) * dt
    rp.y += rv.y * dt
    rv.x += (K * (-tgtX * 0.34 - rp.x) - C * rv.x) * dt
    rp.x += rv.x * dt
    const dolly = reduce ? 1 : 1 + 0.75 * (1 - ease(t / 2.4))
    let z = layout.z * dolly
    let ox = layout.ox
    let oy = layout.oy
    let rot = -0.22 + rp.y
    let rx = 0.08 + rp.x
    if (zoom) {
      const k = Math.min(1, (now - zoom.t0) / 1400)
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2
      z = layout.z * (1 - e) + 2.55 * e
      ox = layout.ox * (1 - e)
      oy = layout.oy * (1 - e) + -0.02 * e
      rot *= 1 - e
      rx *= 1 - e
      if (!zoom.hechoMid && k > 0.62) {
        zoom.hechoMid = true
        zoom.mid()
      }
      if (k >= 1 && !zoom.hechoFin) {
        zoom.hechoFin = true
        zoom.fin()
      }
    }
    camera.position.set(0, 0, z)
    camera.lookAt(0, 0, 0)
    rig.position.set(ox, oy + Math.sin(t * 0.9) * 0.05, 0)
    rig.rotation.set(rx + Math.sin(t * 0.6) * 0.015, rot + Math.sin(t * 0.5) * 0.03, Math.sin(t * 0.4) * 0.006)
    /* las tarjetas se retrasan un poco respecto al monitor (inercia) */
    sats.forEach((s, i) => {
      const u = s.userData
      const a = reduce ? 1 : ease((t - (1.6 + i * 0.35)) / 0.8)
      s.material.opacity = a * (zoom ? Math.max(0, 1 - (now - zoom.t0) / 500) : 1)
      s.position.set(u.x + Math.sin(t * 0.7 + u.ph) * 0.05 - rv.y * 0.12 * (i + 1), u.y + Math.sin(t * 0.9 + u.ph) * 0.09 + rv.x * 0.1 * (i + 1), u.z + (1 - a) * -0.4)
      s.rotation.y = -rot * 0.5
    })
    glareTex.offset.x = (t * 0.05) % 1
    pts.rotation.y = t * 0.02
    pts.position.y = Math.sin(t * 0.2) * 0.15
    drawUI(t)
    renderer.render(scene, camera)
    if (corriendo && !reduce) raf = requestAnimationFrame(render)
  }

  const alCambiarVisibilidad = () => {
    if (reduce) return
    if (document.hidden) {
      corriendo = false
      cancelAnimationFrame(raf)
    } else if (!corriendo) {
      corriendo = true
      last = performance.now()
      t0 = performance.now() - GT * 1000
      raf = requestAnimationFrame(render)
    }
  }
  document.addEventListener('visibilitychange', alCambiarVisibilidad)

  if (reduce) render(performance.now())
  else raf = requestAnimationFrame(render)

  return {
    zoom: (mitad, fin) => {
      zoom = { t0: performance.now(), mid: mitad, fin, hechoMid: false, hechoFin: false }
      if (!corriendo) {
        corriendo = true
        raf = requestAnimationFrame(render)
      }
      if (reduce) {
        mitad()
        fin()
      }
    },
    parar: () => {
      corriendo = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', fit)
      host.removeEventListener('pointermove', alMover)
      document.removeEventListener('visibilitychange', alCambiarVisibilidad)
      renderer.dispose()
    },
  }
}
