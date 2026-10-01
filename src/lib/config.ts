/* =========================================================
   EDITA AQUÍ TUS DATOS. El sitio se actualiza solo.
   precio: número en CLP (ej: 150000) o null para mostrar "[TU PRECIO]".
   ========================================================= */

export type Servicio = {
  id: string
  nombre: string
  desc: string
  puntual: number | null
  mensual: number | null
}

export type Caso = {
  cat: string
  tag: string
  nombre: string
  /** Ruta dentro de /public (ej: "/img/aaron.jpg"). Vacío = marcador. */
  foto: string
  fotoTxt: string
  resumen: string
  items: string[]
  resultado: string
}

export type Resena = { texto: string; autor: string; rol: string }

export type Integrante = {
  credito: string // rol como en los créditos, ej: "DIRECCIÓN CREATIVA"
  nombre: string
  bio: string
  /** Ruta dentro de /public (ej: "/img/herberth.jpg"). Vacío = marcador. */
  foto: string
  tags: string[]
}

export type Config = {
  whatsapp: string
  instagram: string
  email: string
  servicios: Servicio[]
  casos: Caso[]
  resenas: Resena[]
  equipo: Integrante[]
}

export const CONFIG: Config = {
  whatsapp: '', // ej: "56912345678" (sin + ni espacios)
  instagram: 'hh.condireccion', // confirma la grafía exacta
  email: '', // ej: "hola@hhiagencia.cl"

  servicios: [
    { id: 'direccion', nombre: 'Dirección creativa', desc: 'Concepto, línea visual, guiones y revisión de cada pieza.', puntual: null, mensual: null },
    { id: 'produccion', nombre: 'Producción audiovisual', desc: 'Plan de tomas, rodaje, fotografía y edición.', puntual: null, mensual: null },
    { id: 'redes', nombre: 'Contenido para redes', desc: 'Calendario semanal, carruseles, reels e historias editables.', puntual: null, mensual: null },
    { id: 'eventos', nombre: 'Eventos', desc: 'Formato, pauta minuto a minuto, invitados y cobertura.', puntual: null, mensual: null },
    { id: 'marcas', nombre: 'Propuestas para marcas', desc: 'Idea de campaña o colaboración y documento listo para enviar.', puntual: null, mensual: null },
    { id: 'creadores', nombre: 'Apoyo a creadores', desc: 'Formatos de stream, patrocinadores y clips para redes.', puntual: null, mensual: null },
  ],

  casos: [
    {
      cat: 'Streaming', tag: 'STREAMING · KICK', nombre: 'Aaron / aaronig12', foto: '', fotoTxt: '[FOTO: set del stream de Aaron]',
      resumen: 'Dirección creativa y producción de streams y eventos en su canal de Kick.',
      items: ['Formatos y pautas de cada stream', 'Invitados y actividades en vivo', 'Gestión de patrocinadores', 'Clips para redes'],
      resultado: '[DATO REAL: seguidores, espectadores o patrocinios]',
    },
    {
      cat: 'Gastronomía', tag: 'GASTRONOMÍA · BAR', nombre: 'Bar de Blas', foto: '', fotoTxt: '[FOTO: sesión en Bar de Blas]',
      resumen: 'Apoyo de contenido y marketing para @bardeblas.',
      items: ['Análisis del perfil de Instagram', 'Pauta de contenido', 'Sesión de fotografía'],
      resultado: '[DATO REAL: alcance, reservas o consultas]',
    },
    {
      cat: 'Gastronomía', tag: 'GASTRONOMÍA · FONDA', nombre: 'L@s MALPORTAD@S', foto: '', fotoTxt: '[FOTO: la fonda]',
      resumen: 'Consultoría de marketing para la fonda de Desna y Valeria.',
      items: ['Diagnóstico del negocio', 'Propuesta de marketing', 'Seguimiento'],
      resultado: '[DATO REAL: resultado de la temporada]',
    },
    {
      cat: 'Contenido propio', tag: 'CONTENIDO · HH', nombre: 'Primera Semana Creativa', foto: '', fotoTxt: '[IMAGEN: carruseles de Content2]',
      resumen: 'Sistema de contenido propio: estrategia, calendario y piezas listas.',
      items: ['3 carruseles: “Este tornillo tiene una campaña”, “¿Qué hago con las manos?”, “Una campaña entre dos”', '14 historias en 7 diseños', '2 guiones de reels'],
      resultado: '[DATO REAL: rendimiento al publicar]',
    },
  ],

  // Reseñas reales, textuales y con permiso del cliente.
  resenas: [
    { texto: '[RESEÑA REAL: frase textual de Aaron sobre el trabajo en sus streams.]', autor: 'Aaron', rol: 'STREAMER · KICK' },
    { texto: '[RESEÑA REAL: frase del equipo de Bar de Blas.]', autor: 'Bar de Blas', rol: 'BAR' },
    { texto: '[RESEÑA REAL: frase de Desna o Valeria.]', autor: 'Desna y Valeria', rol: 'L@S MALPORTAD@S' },
  ],

  // Equipo (sección "Créditos" del inicio). Agrega o quita integrantes aquí.
  equipo: [
    {
      credito: 'DIRECCIÓN CREATIVA', nombre: 'Herberth Garay', foto: '',
      bio: '[BIO: 1–2 frases sobre tu rol en HH y lo que haces en cada proyecto.]',
      tags: ['Ideas', 'Guiones', 'Dirección'],
    },
    {
      credito: '[ROL]', nombre: '[NOMBRE]', foto: '',
      bio: '[BIO: qué hace esta persona en el equipo.]',
      tags: ['[ÁREA]', '[ÁREA]'],
    },
    {
      credito: '[ROL]', nombre: '[NOMBRE]', foto: '',
      bio: '[BIO: qué hace esta persona en el equipo.]',
      tags: ['[ÁREA]', '[ÁREA]'],
    },
  ],
}

/** Enlace de WhatsApp (con mensaje opcional) o null si falta el número. */
export const waUrl = (texto?: string) =>
  CONFIG.whatsapp
    ? `https://wa.me/${CONFIG.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`
    : null
