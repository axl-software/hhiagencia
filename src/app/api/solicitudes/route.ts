import { createClient } from '@supabase/supabase-js'
import { validar } from '@/lib/contacto'

/* Guarda en Supabase cada solicitud de los formularios (contacto y diagnóstico), además del mensaje
   que el visitante envía por WhatsApp o correo. Tabla: solicitudes_cotizacion (supabase/solicitudes_cotizacion.sql).
   La tabla solo acepta agregar filas desde la web (nadie puede leerlas con la clave pública);
   el equipo las ve en el panel de Supabase.
   Variables: NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (.env.local y Vercel). */

const URL_SUPABASE = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, '')
const CLAVE = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
const TABLA = 'solicitudes_cotizacion'

const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const lista = (v: unknown, max: number, largo: number) =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string').slice(0, max).map((x) => x.trim().slice(0, largo)) : []
const respuesta = (ok: boolean, status = 200) => Response.json({ ok }, { status })

export async function POST(req: Request) {
  if (!URL_SUPABASE || !CLAVE) {
    console.error('[solicitudes] faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY')
    return respuesta(false, 503)
  }

  /* Solo se aceptan envíos desde el propio sitio */
  const origen = req.headers.get('origin')
  if (origen && new URL(origen).host !== req.headers.get('host')) return respuesta(false, 403)

  let b: Record<string, unknown>
  try {
    b = await req.json()
  } catch {
    return respuesta(false, 400)
  }

  /* Contra bots: un campo invisible que una persona nunca llena, y un mínimo de tiempo para completar
     el formulario. Al bot se le responde "ok" para que no insista, pero no se guarda nada. */
  if (texto(b.sitio, 200)) return respuesta(true)
  const ms = Number(b.ms)
  if (Number.isFinite(ms) && ms >= 0 && ms < 2500) return respuesta(true)

  const datos = {
    nombre: texto(b.nombre, 120),
    negocio: texto(b.negocio, 200) || null,
    email: texto(b.email, 160) || null,
    telefono: texto(b.telefono, 40) || null,
    servicios: lista(b.servicios, 12, 80),
    diagnostico: Array.isArray(b.diagnostico)
      ? b.diagnostico.slice(0, 5).map((r) => ({
          pregunta: texto((r as Record<string, unknown>)?.pregunta, 80),
          respuesta: texto((r as Record<string, unknown>)?.respuesta, 120),
        }))
      : null,
    origen: b.origen === 'diagnostico' ? 'diagnostico' : 'formulario',
    canal: b.canal === 'email' ? 'email' : 'whatsapp',
    pagina: texto(b.pagina, 200) || null,
  }
  /* Mismas reglas que en la página: nombre, y correo o WhatsApp */
  if (validar({ nombre: datos.nombre, email: datos.email ?? '', telefono: datos.telefono ?? '' })) return respuesta(false, 400)

  const supabase = createClient(URL_SUPABASE, CLAVE, { auth: { persistSession: false, autoRefreshToken: false } })
  const { error } = await supabase.from(TABLA).insert(datos)
  if (error) {
    console.error('[solicitudes] no se pudo guardar:', error.code, error.message)
    return respuesta(false, 502)
  }
  return respuesta(true)
}
