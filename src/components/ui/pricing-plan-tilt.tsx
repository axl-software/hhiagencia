"use client"
/* Planes con inclinación 3D (21st.dev "Pricing Plan Tilt"), adaptado por HHA para wAHHllet: precios en pesos chilenos (+ IVA), opción
   anual con 20 % de descuento pagada por adelantado (el cálculo viene de src/lib/precios.ts), colores de la marca y textos en español. */
import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"
import { Check, Minus, Sparkles } from "lucide-react"

export interface PlanFeature {
  text: string
  /** false: la función no viene en este plan (se muestra con una raya). */
  included?: boolean
}

export interface Plan {
  id: string
  name: string
  tagline: string
  /** Precio por mes pagando mes a mes (+ IVA). */
  monthly: number
  /** Equivalente por mes pagando el año por adelantado. */
  yearly: number
  /** Total del año pagado por adelantado (+ IVA). */
  yearlyTotal: number
  /** El monto es "desde". */
  from?: boolean
  /** Línea extra bajo el precio (precio regular, implementación...). */
  extra?: string
  features: PlanFeature[]
  popular?: boolean
  cta?: string
}

export interface PricingPlanTiltProps {
  plans: Plan[]
  currency?: string
  title?: string
  subtitle?: string
  /** Nota al pie de los planes. */
  note?: string
  defaultPlanId?: string
  /** Texto del botón principal que aparece al elegir un plan. */
  actionLabel?: (plan: Plan) => string
  actionHref?: string
  className?: string
}

const CORAL = "#ff5a6d"
const GRADIENT = `linear-gradient(125deg,var(--primary),${CORAL})`
const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ")
const clp = (n: number) => n.toLocaleString("es-CL")

/** Los dígitos giran hacia arriba o hacia abajo cuando el número cambia. */
function Roll({ value, dir }: { value: number; dir: 1 | -1 }) {
  const reduce = useReducedMotion()
  const text = clp(value)
  return (
    <span className="inline-flex tabular-nums" aria-label={text}>
      {text.split("").map((d, i, a) => (
        <span key={a.length - i} className="relative inline-block h-[1.1em] overflow-hidden" aria-hidden>
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.span key={d} className="inline-block" initial={{ y: reduce ? 0 : `${dir * 110}%`, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: reduce ? 0 : `${-dir * 110}%`, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22, delay: i * 0.04 }}>{d}</motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  )
}

function PlanCard({ plan, billing, dir, currency, selected, dim, onPick }: { plan: Plan; billing: "monthly" | "yearly"; dir: 1 | -1; currency: string; selected: boolean; dim: boolean; onPick: () => void }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5), my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [11, -11]), { stiffness: 160, damping: 14 }), ry = useSpring(useTransform(mx, [0, 1], [-13, 13]), { stiffness: 160, damping: 14 })
  const lift = useSpring(0, { stiffness: 200, damping: 16 })
  const gx = useTransform(mx, (v) => `${v * 100}%`), gy = useTransform(my, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(180px circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 60%)`
  const price = billing === "yearly" ? plan.yearly : plan.monthly
  return (
    <motion.li className="relative list-none" style={{ perspective: 900 }}
      onPointerMove={(e) => { const b = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - b.left) / b.width); my.set((e.clientY - b.top) / b.height); lift.set(40) }}
      onPointerLeave={() => { mx.set(0.5); my.set(0.5); lift.set(0) }} animate={{ opacity: dim ? 0.7 : 1, scale: dim ? 0.98 : 1 }} transition={{ duration: 0.3 }}>
      <motion.div style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, z: reduce ? 0 : lift, transformStyle: "preserve-3d" }}
        className={cx("relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-5 text-foreground", selected ? "border-transparent" : plan.popular ? "border-primary/50" : "border-border")}>
        {/* luz que recorre el plan destacado; anillo fijo en el elegido */}
        {(plan.popular || selected) && (
          <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <motion.span className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2" style={{ background: `conic-gradient(from 0deg, transparent 0 60%, ${CORAL}, var(--primary), transparent)`, opacity: selected ? 0.9 : 0.5 }}
              animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
            <span className="absolute inset-[1.5px] rounded-[14px] bg-card" />
          </span>
        )}
        {!reduce && <motion.span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-soft-light" style={{ background: glare }} />}

        {plan.popular && (
          <motion.span style={{ transform: "translateZ(50px)", background: GRADIENT }} animate={reduce ? undefined : { y: [0, -3, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-0 right-3 z-10 inline-flex items-center gap-1 rounded-b-lg px-2 py-1 text-[11px] font-semibold text-white shadow-lg"><Sparkles className="size-3" aria-hidden /> Recomendado</motion.span>
        )}
        <div className="relative" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{plan.tagline}</p>
          <p className="mt-4 h-4 text-[11px] text-muted-foreground">{plan.from ? "desde" : ""}</p>
          <p className="flex items-baseline gap-0.5" style={{ transform: "translateZ(24px)" }}>
            <span className="text-lg font-semibold text-muted-foreground">{currency}</span>
            <span className="text-4xl font-bold tracking-tight"><Roll value={price} dir={dir} /></span>
            <span className="ml-1 text-xs text-muted-foreground">+ IVA / mes</span>
          </p>
          {plan.extra && <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{plan.extra}</p>}
          <p className="mt-1 min-h-8 text-[11px] leading-snug text-muted-foreground">
            {billing === "yearly" ? `Pagas ${currency}${clp(plan.yearlyTotal)} + IVA por adelantado, una sola vez al año (−20 %)` : "Pago mensual"}
          </p>
        </div>
        <ul className="relative mt-4 flex-1 space-y-2 text-[13px]" style={{ transform: "translateZ(14px)" }}>
          {plan.features.map((f, i) => (
            <motion.li key={f.text} className={cx("flex items-start gap-2", f.included === false && "text-muted-foreground")} initial={{ opacity: 0, x: reduce ? 0 : -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.06 }}>
              {f.included === false ? (
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border border-border text-muted-foreground"><Minus className="size-2.5" strokeWidth={3.5} aria-hidden /></span>
              ) : (
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full text-white" style={{ background: GRADIENT }}><Check className="size-2.5" strokeWidth={3.5} aria-hidden /></span>
              )}
              {f.text}
            </motion.li>
          ))}
        </ul>
        <motion.button type="button" onClick={onPick} aria-pressed={selected} whileTap={reduce ? undefined : { scale: 0.94 }} whileHover={reduce ? undefined : { y: -2 }} style={{ transform: "translateZ(36px)" }}
          className={cx("relative mt-5 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-xl text-sm font-semibold outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", selected ? "text-white" : "border border-border bg-background hover:border-primary/60")}>
          {selected && <motion.span layoutId="plan-cta" className="absolute inset-0" style={{ background: GRADIENT }} transition={{ type: "spring", stiffness: 300, damping: 24 }} />}
          <span className="relative inline-flex items-center gap-1.5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={selected ? "s" : "n"} className="inline-flex items-center gap-1.5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                {selected && <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1, duration: 0.3 }} /></svg>}
                {selected ? "Elegido" : plan.cta ?? "Elegir plan"}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.button>
      </motion.div>
      {selected && !reduce && <motion.span aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-2xl blur-xl" style={{ background: GRADIENT }} initial={{ opacity: 0 }} animate={{ opacity: [0.35, 0.6, 0.35] }} transition={{ duration: 2.4, repeat: Infinity }} />}
    </motion.li>
  )
}

export function PricingPlanTilt({ plans, currency = "$", title = "Elige tu plan", subtitle, note, defaultPlanId, actionLabel, actionHref = "/contacto", className }: PricingPlanTiltProps) {
  const reduce = useReducedMotion()
  const uid = React.useId()
  const [billing, setBilling] = React.useState<"monthly" | "yearly">("monthly")
  const [dir, setDir] = React.useState<1 | -1>(1)
  const [sel, setSel] = React.useState<string | null>(defaultPlanId ?? null)
  const choose = (b: "monthly" | "yearly") => { if (b === billing) return; setDir(b === "yearly" ? -1 : 1); setBilling(b) }
  const opts: { id: "monthly" | "yearly"; label: string }[] = [{ id: "monthly", label: "Mensual" }, { id: "yearly", label: "Anual" }]
  const key = (e: React.KeyboardEvent) => { if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) { e.preventDefault(); choose(billing === "monthly" ? "yearly" : "monthly") } }
  const picked = plans.find((p) => p.id === sel) ?? null

  return (
    <section aria-label={title} className={cx("relative w-full", plans.length > 3 ? "max-w-6xl" : plans.length > 2 ? "max-w-5xl" : "max-w-3xl", className)}>
      <div className="relative text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3">
          <div role="radiogroup" aria-labelledby={`${uid}-b`} onKeyDown={key} className="relative inline-grid grid-cols-2 rounded-full border border-border bg-card p-1">
            <span id={`${uid}-b`} className="sr-only">Periodo de pago</span>
            {opts.map((o) => (
              <button key={o.id} type="button" role="radio" aria-checked={billing === o.id} tabIndex={billing === o.id ? 0 : -1} onClick={() => choose(o.id)}
                className={cx("relative min-h-11 min-w-24 cursor-pointer rounded-full px-4 text-sm font-medium outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", billing === o.id ? "text-white" : "text-muted-foreground hover:text-foreground")}>
                {billing === o.id && <motion.span layoutId="bill-pill" className="absolute inset-0 rounded-full" style={{ background: GRADIENT }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 20 }} />}
                <span className="relative">{o.label}</span>
              </button>
            ))}
          </div>
          <motion.span animate={reduce ? undefined : billing === "yearly" ? { scale: [1, 1.2, 1], rotate: [0, -6, 0] } : { scale: 1 }} key={billing} transition={{ duration: 0.5 }}
            className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: GRADIENT }}>−20 % pagando el año por adelantado</motion.span>
        </div>
      </div>
      <ul className={cx("relative mt-9 grid items-stretch gap-4 p-0", plans.length > 3 ? "sm:grid-cols-2 lg:grid-cols-4" : plans.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
        {plans.map((p) => <PlanCard key={p.id} plan={p} billing={billing} dir={dir} currency={currency} selected={sel === p.id} dim={!!sel && sel !== p.id} onPick={() => setSel(p.id)} />)}
      </ul>
      {note && <p className="mt-5 text-center text-xs text-muted-foreground">{note}</p>}
      <div className="mt-8 flex min-h-12 justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {picked && (
            <motion.div key={picked.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <Link className="btn-vivo" href={actionHref}>{actionLabel ? actionLabel(picked) : "Solicitar cotización"}</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default PricingPlanTilt
