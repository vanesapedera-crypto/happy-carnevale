-- Atsauksmju lūgumi un iestatījumi admin panelim.
-- Palaid vienu reizi: SQL Editor -> ielīmē visu failu -> Run. Var droši palaist atkārtoti.

-- 1. Iestatījumi (piem. Google atsauksmju saite).
create table if not exists public.site_settings (
  key        text primary key,
  value      text        not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
-- Politiku nav: lasīt un rakstīt var tikai serveris ar service_role atslēgu.

-- 2. Klienti, kuriem var palūgt atsauksmi. Ieraksts rodas pēc katras rezervācijas,
--    pasākuma pieteikuma vai veikala pasūtījuma. Lūgums tiek sūtīts TIKAI tad,
--    kad admin panelī nospiež pogu.
create table if not exists public.review_requests (
  id         uuid primary key default gen_random_uuid(),
  source     text        not null,               -- 'rezervacija' | 'pasakums' | 'veikals'
  name       text        not null default '',
  email      text        not null,
  phone      text        not null default '',
  service    text        not null default '',    -- piem. kostīma vai pakalpojuma nosaukums
  event_date date,                               -- pasākuma datums, ja zināms
  send_at    timestamptz not null default now(),
  status     text        not null default 'scheduled', -- scheduled (gaida) | sending | sent | cancelled (nenotika) | failed
  channel    text,                               -- 'email' | 'whatsapp', kad lūgums nosūtīts
  sent_at    timestamptz,
  error      text,
  created_at timestamptz not null default now()
);
alter table public.review_requests add column if not exists channel text;
create index if not exists review_requests_status_created_idx
  on public.review_requests (status, created_at);
alter table public.review_requests enable row level security;
-- Politiku nav: klientu dati ir pieejami tikai serverim.
