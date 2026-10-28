-- Kalendārā atzīme "Sazinājos ar klientu".
-- Palaid vienreiz: Supabase → SQL Editor → ielīmē un spied "Run".
alter table public.bookings
  add column if not exists contacted_at timestamptz;

-- "Mani komentāri" pie pieteikuma (redzami tikai admin panelī).
alter table public.bookings
  add column if not exists admin_note text not null default '';
