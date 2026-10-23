/* Identificadores de Google (opcionales). Se leen de las variables de entorno: sin ellas, no se carga nada.
   NEXT_PUBLIC_GA_ID: ID de medición de Google Analytics 4 (empieza con "G-").
   NEXT_PUBLIC_GSC_VERIFICACION: código de verificación de Google Search Console (método "etiqueta HTML"). */
const limpio = (v?: string) => (v ?? '').trim()
export const GA_ID = /^G-[A-Z0-9]+$/.test(limpio(process.env.NEXT_PUBLIC_GA_ID)) ? limpio(process.env.NEXT_PUBLIC_GA_ID) : ''
export const GSC_VERIFICACION = limpio(process.env.NEXT_PUBLIC_GSC_VERIFICACION)
