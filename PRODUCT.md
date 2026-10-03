# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Usuario principal: quien decide en un negocio o proyecto de cualquier parte de Chile — dueño o responsable de una PyME, de una empresa de servicios o productos, de un negocio local, de una marca, o un creador — y que llega al sitio buscando resolver un problema concreto: su negocio no se ve profesional online, no consigue suficientes clientes, pierde tiempo en tareas manuales, o tiene herramientas que no trabajan juntas. Llega desde búsquedas, desde Instagram (@hhiagencia.cl) o desde la marca personal de Herberth, normalmente sin vocabulario técnico y sin saber qué servicio pedir.

Audiencias confirmadas, en foco horizontal: PyMEs, empresas de servicio o producto, negocios locales, marcas y creadores seleccionados.

Geografía: HHA tiene su base en la Región de Valparaíso y **trabaja para todo Chile**; más adelante, Latinoamérica. La base no acota el público: un cliente de cualquier región es cliente objetivo. Redacción pública aprobada: "Desde la Quinta Región y alrededores" y, en el footer, "Base en Valparaíso · Trabajamos en todo Chile". En metadatos SEO y datos estructurados se usa el nombre oficial "Región de Valparaíso" más las ciudades principales, para que las búsquedas locales igual calcen.

El trabajo que el visitante viene a hacer tiene dos variantes y el sitio debe servir a ambas:

- **No sabe qué necesita** → debe poder partir desde su problema, sin nombres técnicos, y terminar en el diagnóstico de 3 preguntas.
- **Ya sabe qué quiere** → debe encontrar la categoría, seleccionar servicios o un pack y pedir cotización.

## Product Purpose

hhiagencia.cl es el sitio comercial de HHA Digital Solutions. Su función es generar leads calificados: que un negocio entienda qué puede hacer HHA por él, se identifique con un problema, y deje sus datos para una conversación de diagnóstico.

Prioridad del producto, según la regla aprobada de la empresa (1. sitio comercial que genera leads, 2. sistemas internos, 3. portal de clientes): este sitio es la prioridad número uno, porque el objetivo del negocio ahora es generar capital inicial a través de desarrollo web.

Éxito del sitio = solicitudes reales guardadas en `solicitudes_cotizacion` que se convierten en conversaciones de diagnóstico y, de ahí, en el primer cliente de desarrollo web con fee de implementación más componente mensual recurrente.

Regla operativa que gobierna todas las decisiones: **construir primero lo necesario para vender; automatizar solo lo que ya funciona.**

## Positioning

Posicionamiento aprobado: "Ayudamos a marcas, creadores y empresas con contenido, estrategias, automatizaciones y soluciones digitales."

Gancho principal: **Digitaliza. Automatiza. Escala.**

Lo que un competidor vecino no podría copiar con verdad: HHA llega al problema desde negocio + marketing + tecnología a la vez, con dos fundadores que cubren ambos lados (estrategia y venta por un lado, desarrollo y seguridad por el otro), y entrega implementación más acompañamiento, no solo entrega. La diferenciación confirmada es: personalización, servicio integrado, perspectiva de negocio + marketing + tecnología, implementación más guía, capacitación cuando se requiere, ofertas de entrada accesibles y automatización progresiva.

Postura comercial que el sitio debe sostener: primero una conversación de diagnóstico para entender el negocio, después una propuesta escrita. El sitio no promete una propuesta antes de esa conversación.

## Operating Context

Rutas del sitio:

- `/` — portada: gancho, por qué HHA, método "Así trabajamos contigo", nosotros, equipo, banda de cierre.
- `/servicios` — catálogo agrupado en categorías (Desarrollo web, Marketing y captación, Automatización, IA y consultoría), luego Packs por problema, luego "Tu selección" con cotizador.
- `/proyectos` — casos aprobados; cada uno abre una galería.
- `/como-trabajamos` — el método en detalle.
- `/contacto` — formulario, título "Te contactamos".
- `/privacidad`, `/seguridad`, `/terminos`, y 404 en español.

Flujos reales del visitante:

- **Diagnóstico de 3 preguntas**, abierto desde el header, el menú móvil, la portada ("Te orientamos en 3 preguntas") y Servicios cuando no hay nada seleccionado.
- **Cotizador**: la selección de servicios o un pack viaja a `/contacto?servicios=...` y queda marcada en el formulario.
- **Envío de formulario**: se guarda en Supabase y se muestra una ventana de agradecimiento. No hay redirección a WhatsApp (fundadores, 2026-10-01). Si el guardado falla, la ventana ofrece enviar por WhatsApp o correo con un clic, para no perder el lead.

Contexto de contenido: lo que está vacío en `src/lib/config.ts` simplemente no se muestra. No se usan textos ni fotos de relleno, y nunca se publica una caja de foto vacía en las tarjetas de equipo.

Reglas de contacto vigentes: el teléfono se muestra como texto con enlace `tel:`. No hay botón flotante de WhatsApp ni enlaces `wa.me` directos en contacto o footer (decisión de los fundadores, para reducir spam y bots). El header no muestra redes: solo el cambio de tema y el botón "Haz tu diagnóstico". Los iconos de redes viven en el footer y el menú móvil, y cada uno aparece solo cuando su URL está definida.

Decisiones de proceso que afectan al producto: los cambios se preparan en una rama de trabajo y llegan a `main` solo por pull request aprobado por los fundadores. El protocolo de memoria de `CLAUDE.md` (IDEA / TEST / APPROVED / SUPERSEDED) distingue lluvia de ideas de decisión aprobada; los documentos de `docs/` son la fuente de verdad y, ante conflicto con el código, manda el documento aprobado.

## Capabilities and Constraints

Funcionalidad confirmada: diagnóstico de 3 preguntas, cotizador con selección que viaja al formulario, formulario de contacto, guardado en Supabase (tabla `solicitudes_cotizacion`, solo inserción; el equipo lee desde el dashboard), antispam (honeypot, tiempo mínimo de llenado, chequeo same-site, validación en servidor, límites de longitud en base de datos), webhook opcional de respuesta automática (`SOLICITUDES_WEBHOOK_URL`), cambio de tema claro/oscuro, analítica de Vercel con eventos propios (`guia_inicio`, `guia_fin`, `servicio_agregado`, `formulario_enviado`, `proyecto_visto`), sitemap y robots.

Datos obligatorios en todo formulario: nombre, y correo o WhatsApp (uno basta). Los campos muestran etiqueta "Obligatorio"; si falta algo aparece un aviso amable sobre el botón ("Parece que te faltó…", nunca "error") con un botón que lleva al campo faltante.

Restricciones duras:

- **No se publican precios** hasta que costos, márgenes y alcance de entrega estén aprobados. No se inventan precios.
- **No se inventan** servicios, clientes, casos, métricas ni testimonios. Resultados y testimonios solo con datos reales y permiso del cliente.
- **No se presentan como ofertas maduras**: SaaS propio, agentes de IA a medida, sistemas verticales, dashboards avanzados, portal de clientes.
- **Desarrollo de API a medida no es una capacidad probada** y no se puede prometer. "Integraciones" sí se ofrece, con alcance acotado: conectar herramientas que el cliente ya usa (web, formularios, email marketing, CRM).
- **Plazos de entrega no son públicos**: se definen en la reunión, por proyecto.
- La clave *secret* / *service_role* de Supabase nunca la usa el sitio y nunca se comparte.

Terminología del catálogo (nombres visibles aprobados): Web Start, Web Business, Web Pro; Marketing digital, Captación de clientes, Creación de contenido; Automatización, Integraciones, Procesos digitales; Consultoría y capacitación en IA, Acompañamiento digital. Packs: Crecimiento, Eficiencia, Presencia, Conexión. Los packs se venden completos ("Elegir pack").

Cómo se venden los planes web (fundadores, 2026-10-02): el pago inicial cubre solo desarrollar y lanzar el sitio. El mantenimiento mensual se paga aparte, con plazo mínimo (Web Start 3 meses; Web Business 3, 6 o 12; Web Pro 6). Se ofrece una demo gratuita al cotizar.

Decisiones explícitamente abiertas, que ningún trabajo futuro debe inventar:

- Precios de todos los planes y servicios.
- `demoPlazo`: el plazo de la demo gratuita, aún sin definir por los fundadores.
- `tiempoRespuesta`: la promesa de tiempo de contacto; debe ser alcanzable (respuesta automática o persona de turno).
- Instagram de la marca personal de Herberth: handle por confirmar (`soyherberthgaray`).
- URLs de Facebook y TikTok: cuentas por vincular.
- Uso comercial del video del hero generado con IA: los fundadores deben confirmarlo con un plan pagado.
- La empresa no está constituida todavía; "HHA Digital Solutions SpA" es un nombre legal tentativo.

## Brand Commitments

Nombres: marca madre **HHA Digital Solutions**; nombre comercial visible **HHiAgencia**; título SEO "HHA Digital Solutions | Web, Automatización y Marketing"; nombre legal/comercial en el footer "HHA Digital Solutions".

Logo: el actual se preserva. Es el símbolo "HH" con un punto rojo entre las dos H y arcos de onda de sonido a ambos lados. El punto rojo es parte del arte del logo, no un color de paleta, y no se recolorea. No existe versión vectorial (SVG); no se traza ni se redibuja sin aprobación. No se rediseña ni reemplaza el logo sin aprobación explícita.

Voz y tono: español neutro, directo, claro, educativo, cercano y profesional. "Tú" por defecto, "usted" cuando el contexto lo pida. Se permite humor cuando es natural. Se explican términos técnicos sin superioridad. Personalidad: moderno, premium, minimalista, tecnológico, corporativo, cercano, humano, claro y práctico.

Lo que la voz evita: lenguaje de gurú, promesas futuristas vacías, autoridad falsa, jerga excesiva, frases tipo "revolucionamos tu negocio con el poder de la IA".

Compromisos visuales vinculantes ya aprobados (el detalle completo vive en `docs/HHA_DESIGN_SYSTEM.md`): paleta `#0B1020` · `#05070A` · `#F8FAFC` · `#D7263D` más grises `#64748B` / `#94A3B8`; tipografías Archivo Black (impacto), Space Grotesk (títulos), Inter (texto), JetBrains Mono (etiquetas). No se inventan colores de marca ni se reemplazan las tipografías aprobadas. Lo que el sitio evita por decisión de marca: degradados genéricos de IA, sobrecarga de neón, clichés de robots/cerebros/circuitos, glassmorphism excesivo y ruido visual.

Canales oficiales: Instagram **@hhiagencia.cl**; teléfono/WhatsApp **+56 9 3925 3239**; correo **hhadigitalsolutions@gmail.com**. `@hh.condireccion` pertenece a HH Studio Creativo (marca personal de Herberth) y no se usa como canal de HHA. Ubicación en el footer: "Base en Valparaíso · Trabajamos en todo Chile".

Copy del equipo aprobado, con roles que incluyen a propósito parte del área del otro para mostrar un equipo integrado:

- **Herberth Garay** — Automatización, estrategia, marketing y ventas. Cara pública principal. Bio: "Primero pregunta qué tiene que vender tu negocio. Recién después diseña, escribe o automatiza."
- **Alexander Bello** — Estrategia de desarrollo y automatización. Bio: "Desarrolla las webs y automatizaciones de HHA, y se asegura de que sean seguras y fáciles de mantener."

## Evidence on Hand

Referencias de cliente aprobadas para uso público como referencias de HHA (también son clientes de HH Studio Creativo):

- **Aaron (aaronig12)**, streamer en Kick. Servicios confirmados: automatización de formatos y pautas para cada stream, más contenido y producción de eventos. Portada de la tarjeta: la foto de invitados (elección de los fundadores); el clip del evento va último en la galería.
- **Bar de Blas** (@bardeblas), bar. Servicios confirmados: automatización para editar reels y generar ideas de carrusel, más contenido y marketing.

Material gráfico entregado por los fundadores en `public/img/proyectos/` (Aaron: clip de evento, episodio de stream, invitados, escenario; Bar de Blas: foto de producto, clip de reel, detalle del bar, ambiente, detrás de cámara). Los textos de las láminas son descripciones de referencia de lo que muestra cada imagen; los fundadores los corregirán.

Fondo del hero: `public/img/hero/fondo.mp4` y sus imágenes fijas `.webp`, con versiones propias para modo claro (`fondo-claro.*`). Escena generada con IA, con una nota pequeña "Escena generada con IA" bajo el fondo.

Ausencias que el trabajo futuro no debe rellenar: **no hay precios públicos, no hay reseñas reales publicables, no hay métricas ni testimonios aprobados, y no hay casos de estudio con resultados.** Las reseñas se muestran solo si son reales. **L@s MALPORTAD@S** está retirado de forma permanente y no debe aparecer en material de HHA. **Primera Semana Creativa** es contenido propio de HH Studio Creativo y no es un caso de HHA.

## Product Principles

1. **Construir primero lo necesario para vender.** Automatizar solo lo que ya funciona. Nada del sitio existe para lucirse: existe para que un negocio deje sus datos.
2. **Dos caminos, un sitio.** Quien no sabe qué necesita parte de su problema; quien ya sabe va directo a la categoría. Ninguno de los dos queda frente a una pantalla sin salida.
3. **Verdad antes que promesa.** Sin precios inventados, sin clientes inventados, sin métricas inventadas, sin capacidades no probadas. Lo que está vacío no se muestra.
4. **Negocio + marketing + tecnología en la misma respuesta.** La propuesta del sitio no se parte en tres: se explica desde el problema del negocio y termina en una solución concreta.
5. **Lo aprobado manda.** Los documentos de `docs/` son la fuente de verdad; una idea en conversación no es una decisión, y un cambio de regla se registra en el changelog.

## Accessibility & Inclusion

Requisito aprobado: **WCAG 2.1 AA**. Contraste mínimo 4.5:1 para texto normal y 3:1 para texto grande, navegación completa por teclado, y toda la animación del sitio se detiene con "reduce motion" (carrusel oval del hero, brillos y bordes animados de las tarjetas, línea roja de los pasos, glow de las portadas de proyecto, botón principal).

Reglas específicas ya aprobadas en el design system que la accesibilidad debe preservar: nada de texto pequeño en rojo señal sobre fondo oscuro; texto blanco sobre botones rojos; el contraste se valida, no se asume.
