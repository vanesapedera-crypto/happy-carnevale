-- Happy Carnevale admin panelis: datu modelis.
-- Palaid vienu reizi Supabase projektā: SQL Editor -> New query -> ielīmē -> Run.
-- Skriptu var droši palaist atkārtoti.

-- 1. Tabula: viens ieraksts = viens attēls kādā mājaslapas sadaļā.
create table if not exists public.section_items (
  id          uuid primary key default gen_random_uuid(),
  section_key text        not null,               -- piem. 'helovina-kostimi'
  title       text        not null default '',
  description text        not null default '',
  price       text,                               -- piem. '25 €' (tikai sadaļām ar cenu)
  size        text,                               -- piem. 'XS-L'
  image_url   text        not null,               -- pilna adrese vai ceļš /public mapē
  image_path  text,                               -- ceļš Storage; null, ja attēls ir /public mapē
  active      boolean     not null default true,
  sort_order  integer     not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists section_items_section_order_idx
  on public.section_items (section_key, sort_order, created_at);

-- 2. Piekļuve: apmeklētāji drīkst tikai LASĪT AKTĪVOS ierakstus.
--    Rakstīt var tikai serveris ar service_role atslēgu (tā apiet RLS).
alter table public.section_items enable row level security;

drop policy if exists "Public can read active items" on public.section_items;
create policy "Public can read active items"
  on public.section_items
  for select
  to anon, authenticated
  using (active = true);

-- 3. Attēlu krātuve: publiski lasāma, līdz 4 MB, tikai attēli.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'section-images',
  'section-images',
  true,
  4194304,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
