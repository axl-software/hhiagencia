# HHA Systems — producto y qué se muestra en la web

Estado: **BORRADOR para revisión de los fundadores.** Nada de lo que está aquí es una regla aprobada hasta que lo confirmen. Cuando se apruebe, se pasa a HHA_MASTER_CONTEXT.md y HHA_SERVICES.md y se anota en HHA_CHANGELOG.md.

## Qué es
HHA Systems es la línea de productos propios de HHA Digital Solutions SpA. Su idea central: **generalizar el motor, no la experiencia**. La lógica, los datos y la operación se reutilizan; lo que ve el cliente final (diseño, fotos, animación, tono, orden de las secciones) cambia por negocio.

El primer producto se llama internamente **Service Commerce**: un motor para negocios que venden servicios con reserva y también productos (barberías, estética, peluquerías, tatuajes, ópticas simples, wellness). La barbería es el primer caso visual, no el único.

## Cómo se presenta en la web (propuesta)
- Subtítulo: “HHA Systems · by HHA Digital Solutions SpA”.
- Debajo, ventanitas por rubro siempre visibles (sin hacer clic): barbería, estética, peluquería, tatuajes, óptica, wellness.
- Se presenta como una oferta que HHA hace hoy (lo construimos a la medida del negocio), sin la etiqueta “en desarrollo”.
- Condiciones de honestidad: sin cifras de uso, sin clientes ni testimonios, sin capturas que parezcan de un cliente real. Las vistas del panel van rotuladas “Ejemplo”.
- La web no es una web de SaaS: no hay registro, pago ni acceso al producto desde el sitio.

## Qué se puede mostrar y qué queda interno (propuesta)

### Se puede mostrar, con palabras simples
| Función | Cómo decirlo en la web |
|---|---|
| Reserva online del cliente | “Tus clientes eligen servicio, profesional, fecha y hora, y reservan” |
| Venta de productos | “Vende tus productos con carrito y pedidos” |
| Agenda y reservas del negocio | “Ves y ordenas tus reservas en un solo lugar” |
| Panel de resumen | “Ventas, reservas y próximas citas de un vistazo” (solo como ejemplo rotulado) |
| Registro simple de clientes | “Sabes quién te visita y cuándo volvió” |
| Identidad propia | “Se ve como tu marca, no como una plataforma genérica” |

### Se muestra solo como ejemplo (con números de ejemplo claramente rotulados)
- Las métricas del panel: ventas del día, de la semana y del mes, ticket promedio, clientes atendidos, servicios y productos más vendidos, últimas ventas.

### Queda interno (no se publica)
| Tema | Por qué |
|---|---|
| El nombre “Service Commerce” | Es un nombre de trabajo |
| Las tres capas (experiencia, núcleo reutilizable, panel) y los nombres de las entidades (Business, Service, Staff, Availability, Booking, Customer, Product, Variant, Order, OrderItem) | Detalle técnico; no ayuda a vender y revela cómo está construido |
| El principio “generalizar el motor” con esas palabras | Hacia afuera se dice: “cada negocio se ve distinto” |
| La lista de lo que el MVP no incluye (ERP, POS, caja, facturación, CRM avanzado, inventario complejo, multisucursal compleja, IA avanzada, app móvil, marketplace) | Es una decisión de alcance interna. Importante: la web no debe sugerir que el producto incluye nada de esto |
| Planes futuros (automatización y marketing futuros dentro del producto) | No se promete lo que no existe |
| La referencia a Todo al Día y el análisis de la competencia | Material de estrategia |

## Pendientes antes de publicar
- **REVISIÓN LEGAL HHA NECESARIA:** un sistema donde otros negocios guardan datos de sus clientes cambia los Términos y la Privacidad (HHA pasa a tratar datos por cuenta de terceros). Revisar antes de anunciar el producto de forma que implique que ya guarda datos.
- Confirmar si “HHA Systems” puede mostrarse públicamente (se asumió que sí, porque la tarjeta lo usa).
- Definir precios del producto: no se publican hasta estar aprobados.

## Prueba gratis (borrador, 2026-10-05)
- Página pública `/prueba-gratis`: la persona elige su tipo de negocio (barbería/peluquería, estética, tatuajes, óptica/dentista, wellness), escribe el nombre del negocio, su nombre, correo y/o WhatsApp. Duración: `demoPlazo` (7 días). "Primero lo pruebas, si te sirve te quedas."
- Hoy la solicitud se guarda igual que cualquier otra (Supabase) y el equipo prepara la prueba a mano; la vista previa de la página es un ejemplo, no el sistema real creado al instante. **No prometer creación automática hasta que exista.**
- Pendiente de los fundadores: qué incluye exactamente la prueba, qué pasa al terminar los 7 días, y revisión legal (HHA Systems guarda datos de clientes de terceros).
