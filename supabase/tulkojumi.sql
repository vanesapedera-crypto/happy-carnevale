-- Kostīmu nosaukumu tulkojumi mājaslapas krievu (/ru) un angļu (/en) versijai.
-- Palaid vienreiz: Supabase → SQL Editor → ielīmē un spied "Run".
-- Pēc tam admin panelī katrai kartītei ir lauki "Nosaukums krieviski / angliski".
alter table public.section_items
  add column if not exists translations jsonb not null default '{}'::jsonb;
