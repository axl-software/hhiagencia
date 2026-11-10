/* eslint-disable */
// @ts-nocheck
/* =========================================================
   NEON LOOP, adaptado a JavaScript para el hero de HHA. Basado en "Neon Loop" de Louis Studios (21st.dev): dos coronas de
   letras en relieve que giran una dentro de la otra; cada letra es una extrusión trazada por rayos sobre un campo de distancia
   (SDF) rasterizado en canvas, con resplandor (bloom) y viñeta roja. Requiere WebGL2.
   Cambios para HHA: texto "HHA", paleta de marca, letras más separadas (opts.slot y opts.fill) y una "vista"
   (setView) para acercar y desplazar el anillo mientras se hace scroll. Es código de shaders y matrices portado casi tal cual:
   por eso lleva @ts-nocheck. neonLoop() devuelve null si el equipo no tiene WebGL2.
   ========================================================= */
export const crearNeonLoop = (function () {
/* ===== Neon Loop (adaptado de "Neon Loop" de Louis Studios, 21st.dev) a JavaScript puro, con el texto "HHA" y la paleta de HHA.
   Dos coronas de letras en relieve que giran una dentro de la otra; cada letra es una extrusión trazada por rayos sobre un campo de
   distancia (SDF) rasterizado en canvas, con resplandor (bloom) y viñeta roja. Requiere WebGL2. ===== */
var SCENE = {
    fov: 93.844, dist: 5, elev: -11.286, target: [0, 0, 0], R: 0.91, H: 0.8, lean: -13.883,
    rings: [
      { c: [-0.304, -0.698, 2.3], roll: -31.233, pitch: 30.057, yaw: -19.698, dir: 1, phase: 0 },
      { c: [0.397, -0.821, 2.086], roll: 169.413, pitch: -155.746, yaw: -279.734, dir: 1, phase: 2.1 }
    ],
    slot: 0.45, omega: (2 * Math.PI) / 13.9
  };
  var TAU = Math.PI * 2;

  var colorCtx = null;
  function parseColor(c, fb) {
    if (!colorCtx) colorCtx = document.createElement('canvas').getContext('2d');
    if (!colorCtx) return fb;
    colorCtx.fillStyle = '#000000'; colorCtx.fillStyle = c;
    var s = String(colorCtx.fillStyle);
    if (s[0] === '#') { var n = parseInt(s.slice(1, 7), 16); return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; }
    var m = s.match(/[\d.]+/g);
    if (!m || m.length < 3) return fb;
    return [+m[0] / 255, +m[1] / 255, +m[2] / 255];
  }

  var INF = 1e20;
  function edt1d(grid, offset, stride, length, f, v, z) {
    v[0] = 0; z[0] = -INF; z[1] = INF; f[0] = grid[offset];
    for (var q = 1, k = 0, s = 0; q < length; q++) {
      f[q] = grid[offset + q * stride];
      var q2 = q * q;
      do { var r = v[k]; s = (f[q] - f[r] + q2 - r * r) / (q - r) / 2; } while (s <= z[k] && --k > -1);
      k++; v[k] = q; z[k] = s; z[k + 1] = INF;
    }
    for (var q2_ = 0, k2 = 0; q2_ < length; q2_++) {
      while (z[k2 + 1] < q2_) k2++;
      var r2 = v[k2], qr = q2_ - r2;
      grid[offset + q2_ * stride] = f[r2] + qr * qr;
    }
  }
  function edt2d(grid, w, h) {
    var n = Math.max(w, h), f = new Float64Array(n), v = new Uint16Array(n), z = new Float64Array(n + 1);
    for (var x = 0; x < w; x++) edt1d(grid, x, w, h, f, v, z);
    for (var y = 0; y < h; y++) edt1d(grid, y * w, 1, w, f, v, z);
  }

  function buildAtlas(chars, font, weight, H) {
    var FS = 128, PAD = 14;
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d', { willReadFrequently: true });
    var fontStr = weight + ' ' + FS + 'px ' + font;
    var condense = function () { try { ctx.fontStretch = 'condensed'; } catch (e) {} };
    ctx.font = fontStr; condense();
    var capM = ctx.measureText('H');
    var cap = Math.max(10, capM.actualBoundingBoxAscent || FS * 0.72);
    var unit = H / cap, desc = 0;
    var metrics = chars.map(function (ch) { var m = ctx.measureText(ch); desc = Math.max(desc, m.actualBoundingBoxDescent || 0); return m; });
    var asc = cap;
    metrics.forEach(function (m) { asc = Math.max(asc, m.actualBoundingBoxAscent || 0); });
    var cellH = Math.ceil(asc + desc + PAD * 2);
    var widths = metrics.map(function (m) { return Math.ceil(Math.max(m.width, (m.actualBoundingBoxLeft || 0) + (m.actualBoundingBoxRight || 0)) + PAD * 2); });
    var cols = Math.max(1, Math.ceil(Math.sqrt(chars.length))), rows = Math.ceil(chars.length / cols), rowW = 0;
    for (var r = 0; r < rows; r++) { var s = 0; for (var k = r * cols; k < Math.min(chars.length, (r + 1) * cols); k++) s += widths[k]; rowW = Math.max(rowW, s); }
    var W = Math.max(4, rowW), Hh = Math.max(4, rows * cellH);
    c.width = W; c.height = Hh;
    ctx.font = fontStr; condense();
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff';
    var glyphs = {}, pos = [], x = 0, y = 0;
    chars.forEach(function (ch, i) {
      if (i % cols === 0) { x = 0; y = Math.floor(i / cols) * cellH; }
      var w = widths[i], m = metrics[i];
      var cx = x + w / 2 + ((m.actualBoundingBoxLeft || 0) - (m.actualBoundingBoxRight || 0)) / 2 + (m.actualBoundingBoxRight || 0) - (m.actualBoundingBoxLeft || 0) - ((m.actualBoundingBoxRight || 0) - (m.actualBoundingBoxLeft || 0)) / 2;
      ctx.fillText(ch, cx, y + PAD + asc);
      pos.push({ x: x, y: y, w: w }); x += w;
    });
    var img = ctx.getImageData(0, 0, W, Hh).data, N = W * Hh;
    var outer = new Float64Array(N), inner = new Float64Array(N);
    for (var i = 0; i < N; i++) {
      var a = img[i * 4 + 3] / 255;
      outer[i] = a >= 0.999 ? 0 : a <= 0.001 ? INF : Math.pow(Math.max(0, 0.5 - a), 2);
      inner[i] = a >= 0.999 ? INF : a <= 0.001 ? 0 : Math.pow(Math.max(0, a - 0.5), 2);
    }
    edt2d(outer, W, Hh); edt2d(inner, W, Hh);
    var data = new Float32Array(N), cap2 = PAD * 1.6;
    for (var j = 0; j < N; j++) { var d = Math.sqrt(outer[j]) - Math.sqrt(inner[j]); data[j] = Math.min(cap2, d) * unit; }
    chars.forEach(function (ch, i) {
      var p = pos[i], m = metrics[i];
      glyphs[ch] = { ch: ch, adv: m.width * unit,
        box: [(-p.w / 2) * unit, -(cellH - PAD - asc) * unit, (p.w / 2) * unit, (PAD + asc) * unit],
        uv: [p.x / W, (p.y + cellH) / Hh, (p.x + p.w) / W, p.y / Hh] };
    });
    return { glyphs: glyphs, data: data, w: W, h: Hh };
  }

  function layoutRing(text, atlas, R, slotAngle, fill) {
    var chars = Array.from(text.length ? text : ' ');
    var letterAdvs = chars.map(function (ch) { return atlas.glyphs[ch] ? atlas.glyphs[ch].adv : 0; }).filter(function (a, i) { return a > 0 && /[A-Za-z0-9]/.test(chars[i]); });
    letterAdvs.sort(function (a, b) { return a - b; });
    var unit = letterAdvs.length ? letterAdvs[Math.floor(letterAdvs.length / 2)] : 0.5;
    var eq = chars.map(function (ch) {
      var g = atlas.glyphs[ch];
      if (!g || !ch.trim()) return 0.24;
      if (!/[A-Za-z0-9]/.test(ch)) return Math.min(0.42, g.adv / unit);
      return Math.max(0.5, Math.min(1.6, g.adv / unit));
    });
    var total = eq.reduce(function (a, b) { return a + b; }, 0);
    var copies = Math.max(1, Math.round(TAU / (total * (slotAngle || SCENE.slot))));
    var slot = TAU / (copies * total);
    var sx = (slot * R * (fill || 0.92)) / unit, slots = [], acc = 0;
    for (var k = 0; k < copies; k++) chars.forEach(function (ch, i) {
      var a = eq[i] * slot, g = atlas.glyphs[ch];
      if (g) slots.push({ g: g, theta: acc + a / 2, sx: sx });
      acc += a;
    });
    return slots;
  }

  var rad = function (d) { return (d * Math.PI) / 180; };
  function m3mul(a, b) { var o = new Array(9).fill(0); for (var c = 0; c < 3; c++) for (var r = 0; r < 3; r++) for (var k = 0; k < 3; k++) o[c * 3 + r] += a[k * 3 + r] * b[c * 3 + k]; return o; }
  function rotX(a) { var c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, c, s, 0, -s, c]; }
  function rotY(a) { var c = Math.cos(a), s = Math.sin(a); return [c, 0, -s, 0, 1, 0, s, 0, c]; }
  function rotZ(a) { var c = Math.cos(a), s = Math.sin(a); return [c, s, 0, -s, c, 0, 0, 0, 1]; }
  function m3v(m, v) { return [m[0] * v[0] + m[3] * v[1] + m[6] * v[2], m[1] * v[0] + m[4] * v[1] + m[7] * v[2], m[2] * v[0] + m[5] * v[1] + m[8] * v[2]]; }
  var sub = function (a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; };
  var add = function (a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; };
  var scl = function (a, s) { return [a[0] * s, a[1] * s, a[2] * s]; };
  var dot = function (a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; };
  var cross = function (a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; };
  var norm = function (a) { return scl(a, 1 / Math.hypot(a[0], a[1], a[2])); };

  function makeCamera(aspect, zoom, dy) {
    var el = rad(SCENE.elev), T = SCENE.target;
    var eye = add(T, [0, Math.sin(el) * SCENE.dist, Math.cos(el) * SCENE.dist]);
    var back = norm(sub(eye, T)), right = norm(cross([0, 1, 0], back)), up = cross(back, right);
    var f0 = 1 / Math.tan(rad(SCENE.fov) / 2), f = (aspect >= 1 ? f0 : f0 * aspect) * (zoom || 1), near = 0.1, far = 40;
    var view = [right[0], up[0], back[0], 0, right[1], up[1], back[1], 0, right[2], up[2], back[2], 0, -dot(right, eye), -dot(up, eye), -dot(back, eye), 1];
    var proj = [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, -(dy || 0), (far + near) / (near - far), -1, 0, 0, (2 * far * near) / (near - far), 0];
    var vp = new Float32Array(16);
    for (var c = 0; c < 4; c++) for (var r = 0; r < 4; r++) { var s = 0; for (var k = 0; k < 4; k++) s += proj[k * 4 + r] * view[c * 4 + k]; vp[c * 4 + r] = s; }
    return { eye: eye, right: right, up: up, fwd: scl(back, -1), f: f, aspect: aspect, vp: vp };
  }

  var LETTER_VS = '#version 300 es\n' +
'layout(location=0) in vec3 aPos;\nlayout(location=1) in vec4 iBox;\nlayout(location=2) in vec4 iUV;\nlayout(location=3) in vec3 iSlot;\n' +
'uniform mat4 uVP;\nuniform vec3 uEye;\nuniform mat3 uRot[2];\nuniform vec3 uPos[2];\nuniform float uPhase[2];\nuniform float uR;\nuniform float uDepth;\nuniform float uLean;\n' +
'out vec3 vLocal;\nflat out vec3 vEyeL;\nflat out vec4 vBox;\nflat out vec4 vUV;\nflat out vec3 vO;\nflat out vec3 vBx;\nflat out vec3 vBy;\nflat out vec3 vBz;\nflat out float vSx;\n' +
'void main(){\n  int r = int(iSlot.x + 0.5);\n  float th = iSlot.y + uPhase[r];\n  mat3 R = uRot[r];\n' +
'  vec3 N = R * vec3(sin(th), 0.0, cos(th));\n  vec3 T0 = R * vec3(cos(th), 0.0, -sin(th));\n  vec3 U0 = R * vec3(0.0, 1.0, 0.0);\n' +
'  vec3 U = cos(uLean) * U0 + sin(uLean) * T0;\n  vec3 T = cos(uLean) * T0 - sin(uLean) * U0;\n  vec3 o = uPos[r] + N * uR;\n' +
'  vec3 lo = vec3(iBox.x * iSlot.z, iBox.y, -uDepth * 0.5);\n  vec3 hi = vec3(iBox.z * iSlot.z, iBox.w, uDepth * 0.5);\n  vec3 l = mix(lo, hi, aPos);\n' +
'  vec3 w = o + T * l.x + U * l.y + N * l.z;\n  vLocal = l;\n  vec3 e = uEye - o;\n  vEyeL = vec3(dot(e, T), dot(e, U), dot(e, N));\n' +
'  vBox = iBox; vUV = iUV; vO = o; vBx = T; vBy = U; vBz = N; vSx = iSlot.z;\n  gl_Position = uVP * vec4(w, 1.0);\n}';

  var LETTER_FS = '#version 300 es\nprecision highp float;\n' +
'in vec3 vLocal;\nflat in vec3 vEyeL;\nflat in vec4 vBox;\nflat in vec4 vUV;\nflat in vec3 vO;\nflat in vec3 vBx;\nflat in vec3 vBy;\nflat in vec3 vBz;\nflat in float vSx;\n' +
'uniform sampler2D uSdf;\nuniform mat4 uVP;\nuniform vec3 uEye;\nuniform float uDepth;\nuniform float uBevel;\nuniform vec3 uCols[5];\nuniform int uNCols;\nuniform vec3 uCenter;\nuniform vec3 uCamR;\nuniform vec3 uCamU;\nuniform vec3 uCamB;\nout vec4 outColor;\n' +
'float sd2(vec2 p){\n  p.x /= vSx;\n  vec2 sz = vBox.zw - vBox.xy;\n  vec2 q = (p - vBox.xy) / sz;\n  vec2 qc = clamp(q, 0.0, 1.0);\n  float d = texture(uSdf, mix(vUV.xy, vUV.zw, qc)).r;\n  return d + length((q - qc) * sz);\n}\n' +
'float sd3(vec3 p){\n  float d2 = sd2(p.xy) * min(vSx, 1.0);\n  vec2 w = vec2(d2 + uBevel, abs(p.z) - uDepth * 0.5 + uBevel);\n  return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - uBevel;\n}\n' +
'vec3 palette(float s){\n  s = clamp(s, 0.0, 1.0) * float(uNCols - 1);\n  int i = int(floor(s));\n  int j = min(i + 1, uNCols - 1);\n  float f = s - float(i);\n  f = f * f * (3.0 - 2.0 * f);\n  return mix(uCols[i], uCols[j], f);\n}\n' +
'void main(){\n  vec3 ro = vEyeL;\n  vec3 rd = normalize(vLocal - vEyeL);\n  vec3 lo = vec3(vBox.x * vSx, vBox.y, -uDepth * 0.5);\n  vec3 hi = vec3(vBox.z * vSx, vBox.w, uDepth * 0.5);\n' +
'  vec3 inv = 1.0 / rd;\n  vec3 t0 = (lo - ro) * inv, t1 = (hi - ro) * inv;\n  vec3 tmn = min(t0, t1), tmx = max(t0, t1);\n  float tn = max(max(tmn.x, tmn.y), tmn.z);\n  float tf = min(min(tmx.x, tmx.y), tmx.z);\n  float t = max(tn, 0.0);\n  bool hit = false;\n  vec3 p;\n' +
'  for (int i = 0; i < 72; i++) {\n    p = ro + rd * t;\n    float d = sd3(p);\n    if (d < 0.0012) { hit = true; break; }\n    t += max(d * 0.92, 0.0015);\n    if (t > tf) break;\n  }\n  if (!hit) discard;\n' +
'  const vec2 k = vec2(1.0, -1.0);\n  const float e = 0.008;\n' +
'  vec3 nl = normalize(k.xyy * sd3(p + k.xyy * e) + k.yyx * sd3(p + k.yyx * e) + k.yxy * sd3(p + k.yxy * e) + k.xxx * sd3(p + k.xxx * e));\n' +
'  vec3 wp = vO + vBx * p.x + vBy * p.y + vBz * p.z;\n  vec3 n = normalize(vBx * nl.x + vBy * nl.y + vBz * nl.z);\n  vec3 v = normalize(uEye - wp);\n  float ndv = dot(n, v);\n' +
'  vec3 q0 = wp - uCenter;\n  vec3 q = vec3(dot(q0, uCamR), dot(q0, uCamU), dot(q0, uCamB));\n' +
'  float s = 0.5 + 0.55 * q.y + 0.3 * q.x - 0.12 * q.z + 0.08 * dot(n, uCamU);\n  float facing = abs(ndv);\n  float az = abs(nl.z);\n' +
'  float farF = smoothstep(0.15, -0.35, dot(vBz, normalize(uEye - vO)));\n  vec3 col;\n' +
'  if (ndv >= 0.0) {\n    col = palette(s) * (0.88 + 0.14 * facing);\n    vec3 wall = mix(palette(s + 0.3) * 0.9, pow(palette(0.62), vec3(1.5)) * 0.45, farF);\n    col = mix(col, wall, smoothstep(0.75, 0.2, az));\n    col = mix(col, pow(palette(mix(0.5, 0.8, clamp(s, 0.0, 1.0))), vec3(1.5)) * 0.8, farF);\n  } else {\n' +
'    col = mix(palette(s + 0.3) * 0.8, palette(mix(0.5, 0.7, clamp(s, 0.0, 1.0))) * (0.15 + 0.07 * facing), farF);\n  }\n' +
'  float bev = smoothstep(0.1, 0.4, az) * (1.0 - smoothstep(0.75, 0.95, az));\n  vec3 ldir = normalize(uCamU * 0.85 - uCamR * 0.35 + uCamB * 0.4);\n  float lit = pow(max(dot(n, ldir), 0.0), 1.5);\n' +
'  if (ndv >= 0.0) col = mix(col, vec3(1.0, 0.98, 1.0), pow(max(dot(n, ldir), 0.0), 2.0) * 0.75 * (0.35 + 0.65 * smoothstep(0.6, 0.0, s)) * (1.0 - 0.8 * farF));\n' +
'  col = mix(col, vec3(1.0, 0.97, 1.0), clamp(bev * lit * 1.6, 0.0, 0.92) * (ndv >= 0.0 ? 1.0 : 0.5) * (1.0 - 0.5 * farF));\n' +
'  vec3 hdir = normalize(ldir + v);\n  col += vec3(1.0, 0.96, 0.98) * pow(max(dot(n, hdir), 0.0), 40.0) * 0.35;\n' +
'  vec4 clip = uVP * vec4(wp, 1.0);\n  gl_FragDepth = clamp(clip.z / clip.w * 0.5 + 0.5, 0.0, 1.0);\n  outColor = vec4(col, 1.0);\n}';

  var QUAD_VS = '#version 300 es\nlayout(location=0) in vec2 aPos;\nout vec2 vUv;\nvoid main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }';
  var DOWN_FS = '#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform vec2 uTexel;\nuniform float uKnee;\nout vec4 o;\n' +
'vec3 tap(vec2 uv){ vec3 c = texture(uTex, uv).rgb; return uKnee > 0.0 ? max(c - uKnee, 0.0) * 1.3 + c * 0.15 : c; }\n' +
'void main(){\n  vec2 h = uTexel;\n  vec3 s = tap(vUv) * 4.0;\n  s += tap(vUv + vec2(-h.x, -h.y)) + tap(vUv + vec2(h.x, -h.y)) + tap(vUv + vec2(-h.x, h.y)) + tap(vUv + vec2(h.x, h.y));\n  o = vec4(s / 8.0, 1.0);\n}';
  var UP_FS = '#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uTex;\nuniform vec2 uTexel;\nuniform float uGain;\nout vec4 o;\n' +
'void main(){\n  vec2 h = uTexel;\n  vec3 s = texture(uTex, vUv + vec2(-2.0 * h.x, 0.0)).rgb + texture(uTex, vUv + vec2(2.0 * h.x, 0.0)).rgb\n         + texture(uTex, vUv + vec2(0.0, -2.0 * h.y)).rgb + texture(uTex, vUv + vec2(0.0, 2.0 * h.y)).rgb;\n' +
'  s += (texture(uTex, vUv + vec2(-h.x, h.y)).rgb + texture(uTex, vUv + vec2(h.x, h.y)).rgb\n      + texture(uTex, vUv + vec2(-h.x, -h.y)).rgb + texture(uTex, vUv + vec2(h.x, -h.y)).rgb) * 2.0;\n  o = vec4(s / 12.0 * uGain, 1.0);\n}';
  var COMP_FS = '#version 300 es\nprecision highp float;\nin vec2 vUv;\nuniform sampler2D uScene;\nuniform sampler2D uBloom;\nuniform vec2 uRes;\nuniform float uAspect;\nuniform float uGlow;\nuniform float uSceneGain;\nuniform vec3 uBg;\nuniform vec3 uHalo;\nout vec4 o;\n' +
'float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }\n' +
'void main(){\n  vec2 p = (vUv - 0.5) * vec2(max(uAspect, 1.0), max(1.0 / uAspect, 1.0));\n  p.y = -p.y;\n  vec2 c = p + 0.5;\n' +
'  vec3 top = mix(uBg, uBg * 0.8 + uHalo * 0.04, c.x);\n  vec3 bot = mix(uHalo * 0.15 + uBg * 0.12, uBg * 0.62, smoothstep(0.0, 0.55, c.x));\n  vec3 bg = mix(top, bot, smoothstep(0.05, 1.0, c.y));\n' +
'  vec2 dv = c - vec2(0.5, 0.8);\n  bg *= 1.0 - 0.4 * exp(-dot(dv, dv) * 6.0);\n  bg += vec3(0.0, 0.055, 0.05) * smoothstep(0.62, 1.0, c.x) * smoothstep(0.35, 0.85, c.y);\n' +
'  vec2 hp = (c - vec2(0.42, 0.36)) * vec2(0.6, 1.5);\n  float hr2 = dot(hp, hp);\n  float hw = exp(-hr2 * 12.0);\n  bg = bg * (1.0 - 0.85 * hw) + uHalo * (0.42 * hw);\n' +
'  vec4 sc = texture(uScene, vUv);\n  vec3 bl = texture(uBloom, vUv).rgb;\n  bl *= vec3(1.0, 0.55, 1.15);\n' +
'  vec3 col = mix(bg + bl * uGlow, sc.rgb * uSceneGain, sc.a) + bl * uGlow * 0.06 * sc.a;\n  vec3 over = max(col - 0.88, 0.0);\n  col = min(col, 0.88) + 0.12 * (1.0 - exp(-over / 0.12));\n  col = clamp(col, 0.0, 1.0);\n  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;\n  o = vec4(col, 1.0);\n}';

  /* opts: text, font, fontWeight, colors, background, halo, glow, speed, tilt, depth, interactive, gate() */
  return function neonLoop(wrap, canvas, opts) {
    var gl = canvas.getContext('webgl2', { antialias: false, alpha: false, premultipliedAlpha: false });
    if (!gl) return null;
    var live = { zoom: 1, dy: 0, glow: opts.glow == null ? 1 : opts.glow, speed: opts.speed == null ? 1 : opts.speed, tilt: opts.tilt || 0, depth: opts.depth == null ? 0.18 : opts.depth, interactive: opts.interactive !== false, colors: opts.colors, background: opts.background, halo: opts.halo };
    var gate = opts.gate || function () { return true; };
    var disposed = false, raf = 0, visible = true, onScreen = true;
    var reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var ptr = { tx: 0, ty: 0, x: 0, y: 0, down: false, lastX: 0, spin: 0, vel: 0, id: -1 };
    var chars = Array.from(new Set(Array.from(opts.text).filter(function (ch) { return ch.trim().length > 0; })));
    var atlas = buildAtlas(chars.length ? chars : ['O'], opts.font, opts.fontWeight, SCENE.H);
    var slotsA = layoutRing(opts.text, atlas, SCENE.R, opts.slot, opts.fill), slots = [];
    slotsA.forEach(function (s) { slots.push({ g: s.g, theta: s.theta, sx: s.sx, ring: 0 }); });
    slotsA.forEach(function (s) { slots.push({ g: s.g, theta: s.theta, sx: s.sx, ring: 1 }); });
    var W = 1, Hh = 1, ss = 1;

    function ringState() {
      var L = live, out = [];
      var G = m3mul(rotY(rad(ptr.x * 10)), rotX(rad(L.tilt + ptr.y * 7)));
      var pivot = SCENE.rings.reduce(function (a, r) { return add(a, scl(r.c, 1 / SCENE.rings.length)); }, [0, 0, 0]);
      SCENE.rings.forEach(function (r) {
        var base = m3mul(rotZ(rad(r.roll)), m3mul(rotX(rad(r.pitch)), rotY(rad(r.yaw))));
        out.push({ rot: m3mul(G, base), pos: add(pivot, m3v(G, sub(r.c, pivot))) });
      });
      return out;
    }
    var clock = 0, last = performance.now();
    var phases = function (t) { return SCENE.rings.map(function (r) { return r.phase - r.dir * (SCENE.omega * t + ptr.spin); }); };

    var hdr = !!gl.getExtension('EXT_color_buffer_float');
    gl.getExtension('OES_texture_float_linear');
    function compile(vs, fs) {
      var p = gl.createProgram();
      function mk(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); gl.attachShader(p, s); }
      mk(gl.VERTEX_SHADER, vs); mk(gl.FRAGMENT_SHADER, fs); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(p));
      var u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (var i = 0; i < n; i++) { var info = gl.getActiveUniform(p, i); u[info.name.replace(/\[0\]$/, '')] = gl.getUniformLocation(p, info.name); }
      return { p: p, u: u };
    }
    var letterP = compile(LETTER_VS, LETTER_FS), downP = compile(QUAD_VS, DOWN_FS), upP = compile(QUAD_VS, UP_FS), compP = compile(QUAD_VS, COMP_FS);

    var sdfTex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, sdfTex);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R16F, atlas.w, atlas.h, 0, gl.RED, gl.FLOAT, atlas.data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    var cube = new Float32Array([
      0,0,1, 1,0,1, 1,1,1, 0,0,1, 1,1,1, 0,1,1,   1,0,0, 0,0,0, 0,1,0, 1,0,0, 0,1,0, 1,1,0,
      1,0,1, 1,0,0, 1,1,0, 1,0,1, 1,1,0, 1,1,1,   0,0,0, 0,0,1, 0,1,1, 0,0,0, 0,1,1, 0,1,0,
      0,1,1, 1,1,1, 1,1,0, 0,1,1, 1,1,0, 0,1,0,   0,0,0, 1,0,0, 1,0,1, 0,0,0, 1,0,1, 0,0,1]);
    var inst = new Float32Array(slots.length * 11);
    slots.forEach(function (s, i) { inst.set(s.g.box.concat(s.g.uv, [s.ring, s.theta, s.sx]), i * 11); });
    var vao = gl.createVertexArray(); gl.bindVertexArray(vao);
    var cb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, cb); gl.bufferData(gl.ARRAY_BUFFER, cube, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
    var ib = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, ib); gl.bufferData(gl.ARRAY_BUFFER, inst, gl.STATIC_DRAW);
    function attr(loc, size, off) { gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 44, off * 4); gl.vertexAttribDivisor(loc, 1); }
    attr(1, 4, 0); attr(2, 4, 4); attr(3, 3, 8);
    gl.bindVertexArray(null);
    var quadVao = gl.createVertexArray(); gl.bindVertexArray(quadVao);
    var qb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, qb); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    function makeTarget(w, h, withDepth) {
      var tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
      if (hdr) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
      else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      var fb = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      var depthRb;
      if (withDepth) { depthRb = gl.createRenderbuffer(); gl.bindRenderbuffer(gl.RENDERBUFFER, depthRb); gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT24, w, h); gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRb); }
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return { fb: fb, tex: tex, w: w, h: h, depth: depthRb };
    }
    function freeTarget(t) { gl.deleteFramebuffer(t.fb); gl.deleteTexture(t.tex); if (t.depth) gl.deleteRenderbuffer(t.depth); }
    var scene = null, mips = [];
    function resizeTargets() {
      if (scene) freeTarget(scene); mips.forEach(freeTarget);
      scene = makeTarget(W * ss, Hh * ss, true); mips = [];
      var w = W, h = Hh;
      for (var i = 0; i < 6; i++) { w = Math.max(1, Math.round(w / 2)); h = Math.max(1, Math.round(h / 2)); mips.push(makeTarget(w, h, false)); }
    }
    function drawQuad() { gl.bindVertexArray(quadVao); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); }

    function render(t) {
      if (!scene) return;
      var L = live, aspect = W / Hh, cam = makeCamera(aspect, L.zoom, L.dy), rs = ringState(), ph = phases(t);
      gl.bindFramebuffer(gl.FRAMEBUFFER, scene.fb); gl.viewport(0, 0, scene.w, scene.h);
      gl.clearColor(0, 0, 0, 0); gl.clearDepth(1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LESS); gl.enable(gl.CULL_FACE); gl.cullFace(gl.BACK);
      gl.useProgram(letterP.p);
      var u = letterP.u;
      gl.uniformMatrix4fv(u.uVP, false, cam.vp); gl.uniform3fv(u.uEye, cam.eye);
      gl.uniformMatrix3fv(u.uRot, false, new Float32Array(rs[0].rot.concat(rs[1].rot)));
      gl.uniform3fv(u.uPos, new Float32Array(rs[0].pos.concat(rs[1].pos)));
      gl.uniform1fv(u.uPhase, new Float32Array(ph));
      gl.uniform1f(u.uR, SCENE.R); gl.uniform1f(u.uLean, rad(SCENE.lean));
      gl.uniform1f(u.uDepth, Math.max(0.01, L.depth) * SCENE.H); gl.uniform1f(u.uBevel, 0.02);
      var cols = (L.colors && L.colors.length >= 2 ? L.colors : ['#3ef4ff', '#ffb27a']).slice(0, 5);
      var cf = new Float32Array(15);
      cols.forEach(function (c, i) { cf.set(parseColor(c, [1, 1, 1]), i * 3); });
      gl.uniform3fv(u.uCols, cf); gl.uniform1i(u.uNCols, cols.length);
      var mid = rs.reduce(function (a, r) { return add(a, scl(add(r.pos, scl(m3v(r.rot, [0, 1, 0]), SCENE.H / 2)), 1 / rs.length)); }, [0, 0, 0]);
      gl.uniform3fv(u.uCenter, mid); gl.uniform3fv(u.uCamR, cam.right); gl.uniform3fv(u.uCamU, cam.up); gl.uniform3fv(u.uCamB, scl(cam.fwd, -1));
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, sdfTex); gl.uniform1i(u.uSdf, 0);
      gl.bindVertexArray(vao); gl.drawArraysInstanced(gl.TRIANGLES, 0, 36, slots.length);
      gl.disable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE);
      gl.useProgram(downP.p);
      var src = scene;
      mips.forEach(function (m, i) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, m.fb); gl.viewport(0, 0, m.w, m.h);
        gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, src.tex);
        gl.uniform1i(downP.u.uTex, 0); gl.uniform2f(downP.u.uTexel, 0.5 / src.w, 0.5 / src.h); gl.uniform1f(downP.u.uKnee, i === 0 ? 0.5 : 0.0);
        drawQuad(); src = m;
      });
      gl.useProgram(upP.p); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
      for (var i = mips.length - 1; i > 1; i--) {
        var from = mips[i], to = mips[i - 1];
        gl.bindFramebuffer(gl.FRAMEBUFFER, to.fb); gl.viewport(0, 0, to.w, to.h);
        gl.bindTexture(gl.TEXTURE_2D, from.tex); gl.uniform1i(upP.u.uTex, 0);
        gl.uniform2f(upP.u.uTexel, 0.5 / from.w, 0.5 / from.h); gl.uniform1f(upP.u.uGain, i >= 5 ? 2.4 : i === 4 ? 1.3 : 1.0);
        drawQuad();
      }
      gl.disable(gl.BLEND);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, W, Hh);
      gl.useProgram(compP.p);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, scene.tex); gl.uniform1i(compP.u.uScene, 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, mips[1].tex); gl.uniform1i(compP.u.uBloom, 1);
      gl.uniform2f(compP.u.uRes, W, Hh); gl.uniform1f(compP.u.uAspect, aspect);
      gl.uniform1f(compP.u.uGlow, Math.max(0, L.glow) * 0.72); gl.uniform1f(compP.u.uSceneGain, 1);
      gl.uniform3fv(compP.u.uBg, parseColor(L.background, [0.11, 0.1, 0.17])); gl.uniform3fv(compP.u.uHalo, parseColor(L.halo, [0.85, 0.11, 0.17]));
      drawQuad(); gl.activeTexture(gl.TEXTURE0);
    }
    function resize() {
      var r = wrap.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(2, Math.round(r.width * dpr)); Hh = Math.max(2, Math.round(r.height * dpr));
      ss = dpr < 1.5 && W * Hh < 1400 * 1400 ? 2 : 1;
      canvas.width = W; canvas.height = Hh; resizeTargets();
    }
    resize();
    function frame(now) {
      raf = 0; if (disposed) return;
      var dt = Math.min(0.1, Math.max(0, (now - last) / 1000)); last = now;
      var still = !!(reduce && reduce.matches);
      if (!still) clock += dt * live.speed;
      var ease = 1 - Math.exp(-dt * 4);
      ptr.x += (ptr.tx - ptr.x) * ease; ptr.y += (ptr.ty - ptr.y) * ease;
      if (!ptr.down) { ptr.spin += ptr.vel * dt; ptr.vel *= Math.exp(-dt * 2.2); }
      render(clock);
      if (!still || Math.abs(ptr.vel) > 1e-3 || Math.abs(ptr.tx - ptr.x) + Math.abs(ptr.ty - ptr.y) > 1e-3 || ptr.down) schedule();
    }
    function schedule() { if (!raf && visible && onScreen && !disposed && gate()) raf = requestAnimationFrame(frame); }

    var ro = new ResizeObserver(function () { resize(); last = performance.now(); schedule(); }); ro.observe(wrap);
    var io = new IntersectionObserver(function (es) { onScreen = es.some(function (e) { return e.isIntersecting; }); last = performance.now(); schedule(); }); io.observe(wrap);
    var onVis = function () { visible = document.visibilityState !== 'hidden'; last = performance.now(); schedule(); };
    document.addEventListener('visibilitychange', onVis);
    function local(e) { var r = wrap.getBoundingClientRect(); return [((e.clientX - r.left) / Math.max(1, r.width)) * 2 - 1, ((e.clientY - r.top) / Math.max(1, r.height)) * 2 - 1]; }
    var onMove = function (e) {
      if (!live.interactive) return;
      var p = local(e); ptr.tx = Math.max(-1, Math.min(1, p[0])); ptr.ty = Math.max(-1, Math.min(1, p[1]));
      if (ptr.down && e.pointerId === ptr.id) {
        var r = wrap.getBoundingClientRect(), dx = (e.clientX - ptr.lastX) / Math.max(1, r.width); ptr.lastX = e.clientX;
        var d = dx * 3.2; ptr.spin -= d; ptr.vel = ptr.vel * 0.6 + (-d / (1 / 60)) * 0.4;
      }
      schedule();
    };
    var onDown = function (e) { if (!live.interactive) return; ptr.down = true; ptr.id = e.pointerId; ptr.lastX = e.clientX; ptr.vel = 0; try { wrap.setPointerCapture(e.pointerId); } catch (x) {} schedule(); };
    var onUp = function (e) { if (e.pointerId !== ptr.id) return; ptr.down = false; ptr.id = -1; schedule(); };
    var onLeave = function () { if (ptr.down) return; ptr.tx = 0; ptr.ty = 0; schedule(); };
    wrap.addEventListener('pointermove', onMove); wrap.addEventListener('pointerdown', onDown); wrap.addEventListener('pointerup', onUp); wrap.addEventListener('pointercancel', onUp); wrap.addEventListener('pointerleave', onLeave);
    last = performance.now(); schedule();
    return {
      kick: function () { last = performance.now(); schedule(); },
      setView: function (zoom, dy) { live.zoom = zoom; live.dy = dy; last = performance.now(); schedule(); },
      destroy: function () {
        disposed = true; if (raf) cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', onVis);
        wrap.removeEventListener('pointermove', onMove); wrap.removeEventListener('pointerdown', onDown); wrap.removeEventListener('pointerup', onUp); wrap.removeEventListener('pointercancel', onUp); wrap.removeEventListener('pointerleave', onLeave);
        if (scene) freeTarget(scene); mips.forEach(freeTarget); gl.deleteTexture(sdfTex);
        [cb, ib, qb].forEach(function (b) { gl.deleteBuffer(b); }); gl.deleteVertexArray(vao); gl.deleteVertexArray(quadVao);
        [letterP, downP, upP, compP].forEach(function (p) { gl.deleteProgram(p.p); });
      }
    };
  };
})()
