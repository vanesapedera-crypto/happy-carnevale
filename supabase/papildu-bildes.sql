-- Papildu bildes kostīmiem (vairākas bildes vienam kostīmam).
-- Palaid vienreiz: Supabase → SQL Editor → ielīmē un spied "Run".
alter table public.section_items
  add column if not exists extra_images jsonb not null default '[]'::jsonb;
