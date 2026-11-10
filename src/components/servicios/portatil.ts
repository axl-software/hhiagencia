/* eslint-disable */
// @ts-nocheck
/* Portátil 3D del hero de Servicios: modelo hecho con formas (sin archivos 3D), pantalla dibujada en un canvas con cada servicio
   y una cámara que sigue una espiral según el avance del scroll (0 a 1). Solo dibuja cuando el avance cambia. */
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

export type Portatil = { pintar: (p: number) => void; ajustar: () => void; destroy: () => void }

const clamp = (x: number) => Math.max(0, Math.min(1, x))
const smooth = (t: number) => t * t * (3 - 2 * t)
const N = 5
const T0 = 0.2
const TRAMO = (1 - T0) / N

export function crearPortatil(canvas: HTMLCanvasElement, stage: HTMLElement): Portatil | null {
/* ---------- pantallas dibujadas en un canvas (textura del portátil) ---------- */
const SW = 1280, SH = 800;
const pc = document.createElement('canvas'); pc.width = SW; pc.height = SH;
const g = pc.getContext('2d');
const F = '-apple-system, "Segoe UI", system-ui, sans-serif', M = 'Consolas, monospace';
const R = (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(x, y, w, h); };
const T = (s, x, y, f, c, a = 'left') => { g.font = f; g.fillStyle = c; g.textAlign = a; g.textBaseline = 'alphabetic'; g.fillText(s, x, y); };
const caja = (x, y, w, h) => { R(x, y, w, h, '#fff'); g.strokeStyle = 'rgba(11,16,32,.12)'; g.lineWidth = 2; g.strokeRect(x + 1, y + 1, w - 2, h - 2); };
const pantallas = [
  () => { R(0,0,SW,SH,'#f2f6fc'); R(0,0,280,SH,'#0B1020'); T('agendAHH',36,70,`800 40px ${F}`,'#fff'); [['Agenda',1],['Clientes'],['Métricas'],['Servicios']].forEach((e,i)=>{ if(e[1]) R(24,110+i*62,232,50,'#D7263D'); T(e[0],44,143+i*62,`600 24px ${F}`,e[1]?'#fff':'#c8d2e8'); });
    T('Hoy',330,80,`800 40px ${F}`,'#0B1020'); T('PANEL',1230,76,`600 18px ${M}`,'#5c5d64','right');
    [['12','reservas hoy'],['3','clientes nuevos'],['78%','agenda ocupada']].forEach((m,i)=>{ caja(330+i*300,110,280,130); T(m[0],352+i*300,195,`800 68px ${F}`,'#0B1020'); T(m[1],352+i*300,228,`500 20px ${F}`,'#5c5d64'); });
    [['10:00','Corte clásico · Diego','Confirmada'],['10:45','Corte y barba · Luis','Confirmada'],['11:45','Limpieza facial · Ana','Nueva'],['12:30','Masaje relajante · Sofi','Confirmada']].forEach((f,i)=>{ const y=270+i*92; caja(330,y,900,76); R(348,y+16,104,44,'#0B1020'); T(f[0],400,y+46,`700 24px ${M}`,'#fff','center'); T(f[1],476,y+48,`500 28px ${F}`,'#0B1020'); T(f[2],1210,y+48,`700 24px ${F}`,'#b3192f','right'); });
    T('VISTA DE EJEMPLO',1230,776,`600 16px ${M}`,'#5c5d64','right'); },
  () => { R(0,0,SW,SH,'#fff'); R(0,0,SW,70,'#eef2f8'); [0,1,2].forEach(i=>{ g.fillStyle='#c9d2e2'; g.beginPath(); g.arc(38+i*30,35,9,0,7); g.fill(); }); R(150,18,560,36,'#fff'); T('tunegocio.cl',172,43,`500 22px ${F}`,'#5c5d64');
    T('TU NEGOCIO',90,170,`600 20px ${M}`,'#5c5d64'); T('Una web que',90,260,`800 92px ${F}`,'#0B1020'); T('vende por ti.',90,352,`800 92px ${F}`,'#D7263D'); T('Presenta tu negocio, capta clientes y, si quieres, vende.',90,410,`500 28px ${F}`,'#5c5d64');
    g.fillStyle='#D7263D'; g.beginPath(); g.roundRect(90,440,240,70,35); g.fill(); T('Contáctanos',210,486,`700 28px ${F}`,'#fff','center');
    [0,1,2].forEach(i=>{ const gr=g.createLinearGradient(0,560,0,760); gr.addColorStop(0,'#dfe8f6'); gr.addColorStop(1,'#f4f8ff'); g.fillStyle=gr; g.fillRect(90+i*370,560,340,190); });
    T('VISTA DE EJEMPLO',1230,776,`600 16px ${M}`,'#5c5d64','right'); },
  () => { R(0,0,SW,SH,'#0b0b0d'); T('Tu carta,',100,300,`400 84px Georgia, serif`,'#f4efe6'); T('como merece.',100,396,`italic 400 84px Georgia, serif`,'#cdb27a'); T('Escanea el QR y explora la carta',100,470,`400 28px ${F}`,'#c9c2b4'); T('con fotografías y precios.',100,510,`400 28px ${F}`,'#c9c2b4');
    R(780,90,330,620,'#15141a'); g.strokeStyle='#3a372f'; g.lineWidth=3; g.strokeRect(780,90,330,620);
    R(810,120,270,270,'#fff'); for(let y=0;y<9;y++)for(let x=0;x<9;x++) if((x*7+y*13+x*y)%3!==0) R(826+x*27,136+y*27,24,24,'#111');
    [['Burger Bruma','$10.990'],['Pizza Lumbre','$13.500'],['Dorada del Valle','$4.200']].forEach((m,i)=>{ R(810,420+i*86,270,70,'#1d1b22'); T(m[0],826,462+i*86,`500 24px ${F}`,'#f4efe6'); T(m[1],1064,462+i*86,`700 24px ${F}`,'#e9c777','right'); });
    T('CARTA DE EJEMPLO',1230,776,`600 16px ${M}`,'#8f897a','right'); },
  () => { R(0,0,SW,SH,'#fff'); T('Campañas',60,90,`800 40px ${F}`,'#0B1020'); T('MARKETING DIGITAL',1230,86,`600 18px ${M}`,'#5c5d64','right');
    R(60,130,760,560,'#f4f8ff'); [35,48,42,66,58,82,95].forEach((h,i)=>{ const gr=g.createLinearGradient(0,690-h*5,0,690); gr.addColorStop(0,'#ff5a6d'); gr.addColorStop(1,'#D7263D'); g.fillStyle=gr; g.fillRect(100+i*100,670-h*5.2,70,h*5.2); });
    [['Redes sociales','activa'],['Contenido','activa'],['Captación','activa']].forEach((a,i)=>{ caja(860,130+i*100,360,84); T(a[0],884,184+i*100,`700 28px ${F}`,'#0B1020'); T(a[1],1200,184+i*100,`500 24px ${F}`,'#5c5d64','right'); });
    T('VISTA DE EJEMPLO',1230,776,`600 16px ${M}`,'#5c5d64','right'); },
  () => { R(0,0,SW,SH,'#0B1020'); [['Cliente reserva','formulario',120,0],['Aviso automático','WhatsApp',520,1],['Panel al día','sin planillas',920,0]].forEach((n,i)=>{ R(n[2],320,240,130,n[3]?'#D7263D':'#17203a'); g.strokeStyle='rgba(255,255,255,.2)'; g.lineWidth=2; g.strokeRect(n[2],320,240,130); T(n[0],n[2]+120,375,`700 26px ${F}`,'#fff','center'); T(n[1],n[2]+120,415,`500 22px ${F}`,'#9fb0d6','center'); if(i<2){ const x0=n[2]+250,x1=n[2]+390; const gr=g.createLinearGradient(x0,0,x1,0); gr.addColorStop(0,'#5b8cff'); gr.addColorStop(1,'#ff5a6d'); g.fillStyle=gr; g.fillRect(x0,383,x1-x0-16,4); g.fillStyle='#ff5a6d'; g.beginPath(); g.moveTo(x1-16,372); g.lineTo(x1,385); g.lineTo(x1-16,398); g.fill(); } });
    T('VISTA DE EJEMPLO',1230,776,`600 16px ${M}`,'#9fb0d6','right'); },
];
const screenTex = new THREE.CanvasTexture(pc); screenTex.colorSpace = THREE.SRGBColorSpace; screenTex.anisotropy = 8;
let ultimaClave = '';
/* mezcla simple entre pantallas: se dibuja la siguiente y encima la actual con transparencia */
function pintarMezcla(i, mezcla) {
  const k = i + ':' + mezcla.toFixed(2); if (k === ultimaClave) return; ultimaClave = k;
  g.globalAlpha = 1; pantallas[Math.min(N - 1, i + (mezcla > 0 ? 1 : 0))]();
  if (mezcla > 0 && i < N - 1) { const t = document.createElement('canvas'); t.width = SW; t.height = SH; const tg = t.getContext('2d'); const prev = g; pantallas[i](); tg.drawImage(pc, 0, 0); pantallas[i + 1](); g.globalAlpha = 1 - mezcla; g.drawImage(t, 0, 0); g.globalAlpha = 1; }
  g.fillStyle = '#05070b'; g.beginPath(); g.roundRect(SW / 2 - 100, -2, 200, 30, [0, 0, 14, 14]); g.fill();
  screenTex.needsUpdate = true;
}

/* ---------- escena 3D ---------- */
let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { return null }
renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.65;
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
const sol = new THREE.DirectionalLight(0xffffff, 2.2); sol.position.set(3.5, 7, 4.5); sol.castShadow = true; sol.shadow.mapSize.set(2048, 2048); sol.shadow.radius = 7; sol.shadow.bias = -0.0004; Object.assign(sol.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 1, far: 20 }); scene.add(sol);
const relleno = new THREE.DirectionalLight(0xbcd0ff, 0.6); relleno.position.set(-5, 3, 3); scene.add(relleno);

const alu = new THREE.MeshPhysicalMaterial({ color: 0xc3c9d6, metalness: 1, roughness: 0.3, anisotropy: 0.35, anisotropyRotation: 0, envMapIntensity: 1.15 });
const aluOscuro = new THREE.MeshPhysicalMaterial({ color: 0x8e96a8, metalness: 1, roughness: 0.4, envMapIntensity: 1 });
const negro = new THREE.MeshStandardMaterial({ color: 0x05070b, metalness: 0.1, roughness: 0.55 });
const lap = new THREE.Group(); scene.add(lap);
const marcaCast = (m) => { m.castShadow = true; m.receiveShadow = true; return m; };

/* base de aluminio con bordes redondeados */
const base = marcaCast(new THREE.Mesh(new RoundedBoxGeometry(3.2, 0.11, 2.2, 5, 0.045), alu)); base.position.y = 0.055; lap.add(base);
/* hueco del teclado (más oscuro) */
const pozo = new THREE.Mesh(new THREE.PlaneGeometry(2.96, 1.02), new THREE.MeshStandardMaterial({ color: 0x0a0d14, roughness: 0.8, metalness: 0.2 })); pozo.rotation.x = -Math.PI / 2; pozo.position.set(0, 0.1103, -0.58); lap.add(pozo);
/* teclas individuales */
const FILAS = [{ n: 14, w: 0.17, d: 0.1 }, { n: 14, w: 0.17, d: 0.16 }, { n: 14, w: 0.17, d: 0.16 }, { n: 13, w: 0.17, d: 0.16 }, { n: 12, w: 0.17, d: 0.16 }];
const teclaGeo = new RoundedBoxGeometry(0.17, 0.03, 0.15, 3, 0.012);
const teclas = new THREE.InstancedMesh(teclaGeo, new THREE.MeshStandardMaterial({ color: 0x141824, roughness: 0.55, metalness: 0.15 }), 80);
let ti = 0; const m4 = new THREE.Matrix4(); const z0 = -1.04;
FILAS.forEach((fila, r) => { const zc = z0 + [0.06, 0.24, 0.42, 0.6, 0.78][r]; for (let c = 0; c < fila.n; c++) { const ancho = 2.8; const x = -ancho / 2 + 0.1 + c * (ancho - 0.2) / (fila.n - 1); m4.makeTranslation(x, 0.125, zc); teclas.setMatrixAt(ti++, m4); } });
teclas.count = ti; teclas.castShadow = true; lap.add(teclas);
/* letras sobre las teclas */
const lgc = document.createElement('canvas'); lgc.width = 1480; lgc.height = 510; const lgg = lgc.getContext('2d'); lgg.fillStyle = 'rgba(210,218,235,.92)'; lgg.font = '600 28px -apple-system, Segoe UI, sans-serif'; lgg.textAlign = 'center'; lgg.textBaseline = 'middle';
const LETRAS = ['esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 ⏻', '` 1 2 3 4 5 6 7 8 9 0 - = ⌫', 'tab Q W E R T Y U I O P [ ] \\', 'caps A S D F G H J K L ; \' ↵', 'shift Z X C V B N M , . / ⇧'];
LETRAS.forEach((fila, r) => { const items = fila.split(' '); items.forEach((l, c) => { const x = (-2.8 / 2 + 0.1 + c * (2.8 - 0.2) / (items.length - 1)); const px = (x + 1.48) / 2.96 * 1480; const pz = ((z0 + [0.06, 0.24, 0.42, 0.6, 0.78][r]) - (-1.09)) / 1.02 * 510; lgg.font = (l.length > 2 ? '600 17px' : '600 30px') + ' -apple-system, Segoe UI, sans-serif'; lgg.fillText(l, px, pz); }); });
const legT = new THREE.CanvasTexture(lgc); legT.colorSpace = THREE.SRGBColorSpace; legT.anisotropy = 8;
const leyendas = new THREE.Mesh(new THREE.PlaneGeometry(2.96, 1.02), new THREE.MeshBasicMaterial({ map: legT, transparent: true, depthWrite: false })); leyendas.rotation.x = -Math.PI / 2; leyendas.position.set(0, 0.1406, -0.58); lap.add(leyendas);
/* trackpad */
const trackpad = new THREE.Mesh(new RoundedBoxGeometry(1.2, 0.006, 0.7, 2, 0.003), new THREE.MeshPhysicalMaterial({ color: 0xaab2c4, metalness: 0.9, roughness: 0.22, envMapIntensity: 1.2 })); trackpad.position.set(0, 0.112, 0.62); lap.add(trackpad);
/* bocinas laterales (puntos) */
const bc = document.createElement('canvas'); bc.width = 128; bc.height = 512; const bg = bc.getContext('2d'); bg.fillStyle = 'rgba(0,0,0,0)'; bg.clearRect(0, 0, 128, 512); bg.fillStyle = '#242a38'; for (let y = 10; y < 512; y += 16) for (let x = 12 + ((y / 16) % 2) * 8; x < 128; x += 16) { bg.beginPath(); bg.arc(x, y, 3.2, 0, 7); bg.fill(); }
const bt = new THREE.CanvasTexture(bc); bt.colorSpace = THREE.SRGBColorSpace;
[-1, 1].forEach((s) => { const p = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.8), new THREE.MeshBasicMaterial({ map: bt, transparent: true, depthWrite: false })); p.rotation.x = -Math.PI / 2; p.position.set(s * 1.52, 0.1108, -0.58); lap.add(p); });
/* puertos en el costado izquierdo */
[0.15, 0.4].forEach((z) => { const pu = new THREE.Mesh(new RoundedBoxGeometry(0.02, 0.035, 0.1, 2, 0.01), negro); pu.position.set(-1.6, 0.055, z); lap.add(pu); });
/* base inferior con patas de goma */
[[-1.35, -0.9], [1.35, -0.9], [-1.35, 0.95], [1.35, 0.95]].forEach(([x, z]) => { const pata = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.02, 20), negro); pata.position.set(x, -0.008, z); lap.add(pata); });
base.position.y = 0.055;

/* tapa: bisagra en el borde trasero */
const bisagra = new THREE.Group(); bisagra.position.set(0, 0.1475, -1.1); lap.add(bisagra);
const cilindro = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 2.9, 28), aluOscuro); cilindro.rotation.z = Math.PI / 2; cilindro.position.set(0, -0.02, 0); lap.add(cilindro); cilindro.position.set(0, 0.135, -1.1);
/* logo de la tapa: pulido (espejo) sobre aluminio mate */
const lc = document.createElement('canvas'); lc.width = 1024; lc.height = 700; const lg = lc.getContext('2d'); lg.fillStyle = '#c3c9d6'; lg.fillRect(0, 0, 1024, 700); lg.fillStyle = 'rgba(11,16,32,.85)'; lg.font = '800 160px -apple-system, Segoe UI, sans-serif'; lg.textAlign = 'center'; lg.fillText('HHA', 512, 410);
const lt = new THREE.CanvasTexture(lc); lt.colorSpace = THREE.SRGBColorSpace; lt.anisotropy = 8;
const rc = document.createElement('canvas'); rc.width = 512; rc.height = 350; const rg = rc.getContext('2d'); rg.fillStyle = '#fff'; rg.fillRect(0, 0, 512, 350); rg.fillStyle = '#222'; rg.font = '800 80px -apple-system, Segoe UI, sans-serif'; rg.textAlign = 'center'; rg.fillText('HHA', 256, 205);
const rt = new THREE.CanvasTexture(rc);
const tapaTop = new THREE.MeshPhysicalMaterial({ color: 0xffffff, map: lt, metalness: 1, roughness: 0.32, roughnessMap: rt, envMapIntensity: 1.15, anisotropy: 0.35 });
const tapa = marcaCast(new THREE.Mesh(new RoundedBoxGeometry(3.2, 0.075, 2.1, 5, 0.035), [alu, alu, tapaTop, negro, alu, alu])); tapa.position.set(0, 0, 1.05); bisagra.add(tapa);
/* pantalla */
const pantalla = new THREE.Mesh(new THREE.PlaneGeometry(2.96, 1.85), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false })); pantalla.rotation.x = Math.PI / 2; pantalla.position.set(0, -0.0392, 1.075); bisagra.add(pantalla);
/* vidrio sobre la pantalla: reflejos suaves del entorno */
const vidrio = new THREE.Mesh(new THREE.PlaneGeometry(3.08, 1.97), new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.04, transparent: true, opacity: 0.09, clearcoat: 1, clearcoatRoughness: 0.03, envMapIntensity: 1.6, depthWrite: false })); vidrio.rotation.x = Math.PI / 2; vidrio.position.set(0, -0.0402, 1.06); bisagra.add(vidrio);
/* cámara */
const cam = new THREE.Mesh(new THREE.CircleGeometry(0.018, 20), new THREE.MeshBasicMaterial({ color: 0x1b2540 })); cam.rotation.x = Math.PI / 2; cam.position.set(0, -0.0394, 2.06); bisagra.add(cam);

/* piso: sombra suave real + sombra de contacto */
const piso = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.26 })); piso.rotation.x = -Math.PI / 2; piso.position.y = -0.02; piso.receiveShadow = true; scene.add(piso);
const sombra = new THREE.Mesh(new THREE.PlaneGeometry(7.5, 5), (() => { const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'); const gr = x.createRadialGradient(128, 128, 20, 128, 128, 128); gr.addColorStop(0, 'rgba(11,16,32,.42)'); gr.addColorStop(1, 'rgba(11,16,32,0)'); x.fillStyle = gr; x.fillRect(0, 0, 256, 256); const t = new THREE.CanvasTexture(c); return new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false }); })());
sombra.rotation.x = -Math.PI / 2; sombra.position.set(0, -0.015, -0.05); scene.add(sombra);

/* ---------- trayectoria de la cámara: una espiral alrededor del portátil que se acerca a la pantalla en cada servicio ---------- */
const LOOK_P = new THREE.Vector3(0, 1.12, -1.4);  // centro de la pantalla abierta
const claves = [
  [0.00, [-6.4, 4.8, 5.4], [0, 0.1, 0]], [0.07, [-2.6, 3.4, 6.8], [0, 0.2, 0]], [0.14, [5.0, 2.8, 5.2], [0, 0.55, -0.4]], [0.20, [0.4, 1.9, 7.0], [0, 1.0, -1.1]],
  [0.28, [-0.7, 1.35, 4.5], [0, 1.12, -1.4]], [0.36, [3.9, 2.0, 6.4], [0, 1.0, -1.0]],
  [0.44, [0.8, 1.25, 4.4], [0, 1.12, -1.4]], [0.52, [-4.0, 2.4, 5.8], [0, 1.0, -1.0]],
  [0.60, [-0.5, 1.2, 4.5], [0, 1.12, -1.4]], [0.68, [4.4, 1.5, 5.2], [0, 1.0, -1.0]],
  [0.76, [0.7, 1.3, 4.4], [0, 1.12, -1.4]], [0.84, [-4.6, 2.9, 5.0], [0, 1.0, -1.0]],
  [0.92, [-0.3, 1.25, 4.5], [0, 1.12, -1.4]], [1.00, [0.0, 1.7, 7.8], [0, 0.9, -0.8]],
].map(([p, c, l]) => ({ p, c: new THREE.Vector3(...c), l: new THREE.Vector3(...l) }));
const curvaC = new THREE.CatmullRomCurve3(claves.map((k) => k.c), false, 'centripetal');
const curvaL = new THREE.CatmullRomCurve3(claves.map((k) => k.l), false, 'centripetal');
function tDe(p) { for (let j = 0; j < claves.length - 1; j++) { const a = claves[j].p, b = claves[j + 1].p; if (p <= b) return (j + smooth(clamp((p - a) / (b - a)))) / (claves.length - 1); } return 1; }


  function ajustar() {
    const w = stage.clientWidth, h = stage.clientHeight
    renderer.setSize(w, h, false); camera.aspect = w / h
    camera.fov = w < 860 ? 46 : 34
    if (w >= 860) camera.setViewOffset(w, h, Math.min(190, w * 0.1), 0, w, h); else camera.clearViewOffset()
    camera.updateProjectionMatrix()
    ultimaP = -1
  }
  let ultimaP = -1
  function pintar(p: number) {
    if (p === ultimaP) return
    ultimaP = p
    const theta = smooth(clamp((p - 0.06) / 0.14)) * 1.86
    bisagra.rotation.x = -theta
    const t = tDe(p); camera.position.copy(curvaC.getPoint(t)); camera.lookAt(curvaL.getPoint(t))
    lap.rotation.y = Math.sin(p * Math.PI * 2) * 0.12
    let idx = 0, local = 0
    if (p >= T0) { idx = Math.min(N - 1, Math.floor((p - T0) / TRAMO)); local = clamp((p - T0 - idx * TRAMO) / TRAMO) }
    const mezcla = p >= T0 && idx < N - 1 ? smooth(clamp((local - 0.82) / 0.18)) : 0
    pintarMezcla(idx, mezcla)
    renderer.render(scene, camera)
  }
  ajustar()
  pintar(0)
  return {
    pintar,
    ajustar,
    destroy: () => {
      renderer.dispose()
      scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); const m = o.material; if (m) (Array.isArray(m) ? m : [m]).forEach((x) => { x.map?.dispose?.(); x.dispose() }) })
    },
  }
}
