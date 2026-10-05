import { Briefcase, Eye, Leaf, PenTool, Scissors, Sparkles, type LucideIcon } from 'lucide-react'

/* Rubros de la portada y de HHA Systems (docs/HHA_SYSTEMS_PRODUCT.md). El primero ("negocio") es el
   texto general de HHA: web, automatización y marketing para cualquier negocio. Los demás son los
   negocios que venden servicios con reserva y también productos. Barbería y peluquería van juntas; óptica y dentista
   también (cualquier consulta de salud con hora). */
export type Rubro = {
  id: string
  /** Texto del botón de la portada */
  chip: string
  /** Palabra que cambia en el titular: "Tu ___, digital y en automático." */
  palabra: string
  icono: LucideIcon
  lead: string
}

const LEAD_GENERAL =
  'Creamos sistemas digitales que ayudan a marcas, creadores y empresas de todo Chile a vender y operar mejor, con estrategia, contenido y tecnología.'
const leadRubro = (x: string) =>
  `Reservas online, venta de productos y un panel para ver tu día, con el diseño y la identidad de tu ${x}.`

export const RUBROS: Rubro[] = [
  { id: 'negocio', chip: 'Tu negocio', palabra: 'negocio', icono: Briefcase, lead: LEAD_GENERAL },
  { id: 'barberia', chip: 'Barbería / Peluquería', palabra: 'barbería o peluquería', icono: Scissors, lead: leadRubro('barbería o peluquería') },
  { id: 'estetica', chip: 'Estética', palabra: 'estudio de estética', icono: Sparkles, lead: leadRubro('estudio de estética') },
  { id: 'tatuajes', chip: 'Tatuajes', palabra: 'estudio de tatuajes', icono: PenTool, lead: leadRubro('estudio de tatuajes') },
  { id: 'optica', chip: 'Óptica / Dentista', palabra: 'óptica o clínica dental', icono: Eye, lead: leadRubro('óptica o clínica dental') },
  { id: 'wellness', chip: 'Wellness', palabra: 'centro wellness', icono: Leaf, lead: leadRubro('centro wellness') },
]
