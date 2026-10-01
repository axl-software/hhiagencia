"""Genera la imagen para compartir (Open Graph) y los íconos del sitio con la
paleta, las tipografías y el logo oficiales de HHA (docs/HHA_DESIGN_SYSTEM.md).

Uso (requiere Python con Pillow y fontTools, y haber corrido npm install):
    pip install pillow fonttools
    python scripts/generar_imagenes_seo.py
"""
import os
import tempfile
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # raíz del repo
TMP = tempfile.gettempdir()  # aquí quedan los .ttf convertidos
FS = REPO + '/node_modules/@fontsource'

BG, NAVY, WHITE, RED, GRAY = '#05070A', '#0B1020', '#F8FAFC', '#D7263D', '#94A3B8'


def ttf(pkg, file):
    """Fontsource trae .woff; PIL necesita .ttf: se convierte una vez."""
    out = os.path.join(TMP, file.replace('.woff', '.ttf'))
    if not os.path.exists(out):
        f = TTFont(f'{FS}/{pkg}/files/{file}')
        f.flavor = None
        f.save(out)
    return out


IMPACT = ttf('archivo-black', 'archivo-black-latin-400-normal.woff')
HEAD = ttf('space-grotesk', 'space-grotesk-latin-700-normal.woff')
BODY = ttf('inter', 'inter-latin-400-normal.woff')
MONO = ttf('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff')

logo = Image.open(REPO + '/public/brand/hh-logo-blanco.png').convert('RGBA')


def logo_h(h):
    return logo.resize((round(logo.width * h / logo.height), h), Image.LANCZOS)


# ---------- Open Graph 1200x630 ----------
W, H = 1200, 630
og = Image.new('RGB', (W, H), BG)
d = ImageDraw.Draw(og)
X = 80

lg = logo_h(64)
og.paste(lg, (X, 64), lg)
d.text((X + lg.width + 20, 96), 'HHiAgencia', font=ImageFont.truetype(HEAD, 34), fill=WHITE, anchor='lm')

ky = 196
d.rectangle((X, ky + 9, X + 28, ky + 11), fill=RED)
d.text((X + 42, ky), 'DESARROLLO WEB · AUTOMATIZACIÓN · MARKETING DIGITAL', font=ImageFont.truetype(MONO, 20), fill=GRAY)

hook = ImageFont.truetype(IMPACT, 88)
y = 238
for i, w in enumerate(['Digitaliza.', 'Automatiza.', 'Escala.']):
    d.text((X - 4, y), w, font=hook, fill=RED if i == 2 else WHITE)
    y += 92

d.line((X, 548, W - X, 548), fill='#191D22', width=1)  # gris #94A3B8 al 14 % sobre el fondo (= --line)
small = ImageFont.truetype(BODY, 24)
d.text((X, 580), 'hhiagencia.cl', font=ImageFont.truetype(HEAD, 26), fill=WHITE, anchor='lm')
d.text((W - X, 580), 'Quinta Región y alrededores', font=small, fill=GRAY, anchor='rm')

og.save(REPO + '/src/app/opengraph-image.png', optimize=True)


# ---------- íconos: logo blanco sobre Deep Black ----------
def icono(size, pad):
    im = Image.new('RGBA', (size, size), BG)
    w = size - 2 * pad
    lg = logo.resize((w, round(logo.height * w / logo.width)), Image.LANCZOS)
    im.paste(lg, (pad, (size - lg.height) // 2), lg)
    return im


icono(512, 56).save(REPO + '/src/app/icon.png', optimize=True)
icono(180, 22).convert('RGB').save(REPO + '/src/app/apple-icon.png', optimize=True)
# favicon: a 16-32 px el logo necesita poco margen para leerse
icono(256, 16).save(REPO + '/src/app/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])

for f in ['opengraph-image.png', 'icon.png', 'apple-icon.png', 'favicon.ico']:
    print(f, os.path.getsize(REPO + '/src/app/' + f), 'bytes')
