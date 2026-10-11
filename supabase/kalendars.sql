-- Pieteikumu kalendārs admin panelim.
-- Palaid vienu reizi: SQL Editor -> ielīmē visu failu -> Run. Var droši palaist atkārtoti.

create table if not exists public.bookings (
  id          uuid primary key default gen_random_uuid(),
  kind        text        not null,                 -- 'rezervacija' (kostīms) | 'pasakums'
  title       text        not null default '',      -- kostīms vai pakalpojums
  name        text        not null default '',
  phone       text        not null default '',
  email       text        not null default '',
  event_date  date,                                 -- pasākuma datums
  event_time  text        not null default '',      -- pasākuma laiks, ja norādīts
  pickup_date date,                                 -- kostīma saņemšanas datums
  details     jsonb       not null default '[]',    -- visa pieteikuma informācija: [{label, value}]
  cancelled   boolean     not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists bookings_event_date_idx on public.bookings (event_date);
create index if not exists bookings_pickup_date_idx on public.bookings (pickup_date);
alter table public.bookings enable row level security;
-- Politiku nav: klientu dati ir pieejami tikai serverim.
