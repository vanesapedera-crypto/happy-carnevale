-- Kostīmu bildes bez fona (admin panelis tās izveido pats).
alter table public.section_items
  add column if not exists cutout jsonb;
