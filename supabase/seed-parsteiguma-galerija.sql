-- Pārsteiguma tēla galerija: esošie 10 attēli (tie paši, kas šobrīd ir mājaslapas kodā).
-- Palaid PĒC schema.sql: SQL Editor -> ielīmē visu failu -> Run.
-- Sadaļa tiek aizpildīta tikai tad, ja tajā vēl nav neviena ieraksta,
-- tāpēc skriptu var droši palaist atkārtoti.

insert into public.section_items (section_key, image_url, sort_order)
select * from (values
  ('parsteiguma-galerija', '/images/surprise/1.jpg', 10),
  ('parsteiguma-galerija', '/images/surprise/2.jpg', 20),
  ('parsteiguma-galerija', '/images/surprise/3.jpg', 30),
  ('parsteiguma-galerija', '/images/surprise/4.jpg', 40),
  ('parsteiguma-galerija', '/images/surprise/5.jpg', 50),
  ('parsteiguma-galerija', '/images/surprise/6.jpg', 60),
  ('parsteiguma-galerija', '/images/surprise/7.jpg', 70),
  ('parsteiguma-galerija', '/images/surprise/8.jpg', 80),
  ('parsteiguma-galerija', '/images/surprise/9.jpg', 90),
  ('parsteiguma-galerija', '/images/surprise/10.jpg', 100)
) as seed (section_key, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'parsteiguma-galerija'
);
