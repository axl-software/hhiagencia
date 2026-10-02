-- =====================================================================
-- Tabla de solicitudes de los formularios de la web (contacto y diagnóstico).
-- Cómo usarlo: Supabase → SQL Editor → New query → pegar todo → Run.
-- Se puede ejecutar más de una vez sin problema: si la tabla ya existe,
-- solo agrega lo que falte.
--
-- Seguridad: desde la web (clave publishable) SOLO se pueden agregar
-- solicitudes. Nadie puede leerlas, cambiarlas ni borrarlas desde afuera;
-- el equipo las ve en Supabase → Table Editor.
-- =====================================================================

-- 1) Tabla y columnas
create table if not exists public.solicitudes_cotizacion (
  id bigint generated always as identity primary key
);

alter table public.solicitudes_cotizacion
  add column if not exists created_at  timestamptz not null default now(),
  add column if not exists nombre      text,
  add column if not exists negocio     text,
  add column if not exists email       text,
  add column if not exists telefono    text,
  add column if not exists servicios   text[] not null default '{}',
  add column if not exists diagnostico jsonb,
  add column if not exists origen      text,   -- 'formulario' o 'diagnostico'
  add column if not exists canal       text,   -- 'whatsapp' o 'email'
  add column if not exists pagina      text,   -- página desde donde se envió
  add column if not exists estado      text not null default 'nueva'; -- para que el equipo marque su avance

-- 2) Reglas básicas de los datos (la web ya las cumple; esto evita basura enviada directo)
do $$ begin
  alter table public.solicitudes_cotizacion
    add constraint sc_nombre check (char_length(nombre) between 1 and 120);
exception when duplicate_object then null; end $$;

do $$ begin
  alter table public.solicitudes_cotizacion
    add constraint sc_contacto check (coalesce(email, '') <> '' or coalesce(telefono, '') <> '');
exception when duplicate_object then null; end $$;

do $$ begin
  alter table public.solicitudes_cotizacion
    add constraint sc_largos check (
      char_length(coalesce(negocio, '')) <= 200
      and char_length(coalesce(email, '')) <= 160
      and char_length(coalesce(telefono, '')) <= 40
      and char_length(coalesce(pagina, '')) <= 200
      and cardinality(servicios) <= 12
    );
exception when duplicate_object then null; end $$;

do $$ begin
  alter table public.solicitudes_cotizacion
    add constraint sc_valores check (
      (origen is null or origen in ('formulario', 'diagnostico'))
      and (canal is null or canal in ('whatsapp', 'email'))
    );
exception when duplicate_object then null; end $$;

-- 3) Seguridad: la web solo puede AGREGAR
alter table public.solicitudes_cotizacion enable row level security;

revoke all on public.solicitudes_cotizacion from anon, authenticated;
grant insert (nombre, negocio, email, telefono, servicios, diagnostico, origen, canal, pagina)
  on public.solicitudes_cotizacion to anon;

drop policy if exists "La web puede agregar solicitudes" on public.solicitudes_cotizacion;
create policy "La web puede agregar solicitudes"
  on public.solicitudes_cotizacion
  for insert to anon
  with check (true);

-- 4) Revisión: muestra las reglas de acceso que quedaron en la tabla.
--    Debe aparecer SOLO "La web puede agregar solicitudes" (INSERT, anon).
select policyname as regla, cmd as accion, roles
from pg_policies
where schemaname = 'public' and tablename = 'solicitudes_cotizacion';
