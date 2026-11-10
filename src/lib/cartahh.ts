import { PRECIOS } from './precios'

/* cartAHH (carta digital con QR). Textos y datos aprobados por los fundadores el 2026-11-10; los montos salen de precios.ts.
   Los valores de cartAHH van con IVA INCLUIDO. Los pedidos por WhatsApp los envía el cliente desde su dispositivo: cartAHH no procesa pagos. */
export const CARTAHH_PLANES = [
  {
    id: 'cart-visual', nombre: 'Visual', lema: 'Carta digital inmersiva',
    incluye: ['Carta digital inmersiva', 'Fotografías de tus productos', 'Categorías', 'Precios', 'Catálogo'],
    demo: 'https://hha-menu-web.vercel.app/?mode=visual', video: 'visual', destacado: false,
  },
  {
    id: 'cart-darkkitchen', nombre: 'DarkKitchen', lema: 'Carta digital + carrito',
    incluye: ['Todo lo de Visual', 'Carrito de compras', 'Pedidos para retiro o delivery por WhatsApp'],
    demo: 'https://hha-menu-web.vercel.app/?mode=whatsapp', video: 'darkitchen', destacado: true,
  },
  {
    id: 'cart-experience', nombre: 'Experience', lema: 'Tu negocio en una experiencia digital',
    incluye: ['Todo lo anterior', 'Portada personalizada', 'Favoritos', 'Eventos', 'Wi-Fi y ubicación', 'Reseñas y redes sociales'],
    demo: 'https://hha-menu-web.vercel.app/', video: 'experience', destacado: false,
  },
]

export const montoCart = (id: string) => PRECIOS[id].monto ?? 0
export const implCart = (id: string) => PRECIOS[id].implementacionMonto ?? 0

export const CARTAHH_EJEMPLO = { nombre: 'Allegra Pizzería', url: 'https://laallegra.hhiagencia.cl' }
