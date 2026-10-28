-- Kalendārā atzīme "Sazinājos ar klientu".
-- Palaid vienreiz: Supabase → SQL Editor → ielīmē un spied "Run".
alter table public.bookings
  add column if not exists contacted_at timestamptz;
