-- Esošie Helovīna kostīmi un maskas (tie paši, kas šobrīd ir mājaslapas kodā).
-- Palaid PĒC schema.sql, ja gribi, lai klients tos var labot admin panelī.
-- Attēli paliek mājaslapas /public mapē; jaunie augšupielādētie nonāk Supabase Storage.
-- Skripts neko nedara, ja sadaļā jau ir ieraksti.

insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('helovina-kostimi', 'Wednesday', '25 €', 'XS-L', '/kostimi/multfilmu/wednesday.jpg', 10),
  ('helovina-kostimi', 'Ragana', '25 €', 'S-L', '/kostimi/multfilmu/ragana.jpg', 20),
  ('helovina-kostimi', 'Pennywise', '25 €', 'M-XL', '/kostimi/multfilmu/pennywise.jpg', 30),
  ('helovina-kostimi', 'Drakula', '25 €', 'M-XL', '/kostimi/multfilmu/drakula.jpg', 40),
  ('helovina-kostimi', 'Spociņš', '20 €', 'XS-L', '/kostimi/multfilmu/spocins.jpg', 50),
  ('helovina-kostimi', 'Džokers (1)', '25 €', 'M-L', '/kostimi/multfilmu/dzokers-1.jpg', 60),
  ('helovina-kostimi', 'Malificienta', '25 €', 'XS-L', '/kostimi/multfilmu/malificienta.jpg', 70),
  ('helovina-kostimi', 'Džokers (2)', '25 €', 'S-L', '/kostimi/multfilmu/dzokers-2.jpg', 80),
  ('helovina-kostimi', 'Bailīgā mūķene', '25 €', 'XS-L', '/kostimi/multfilmu/bailiga-mukene.jpg', 90),
  ('helovina-kostimi', 'Līgava', '25 €', 'M-L', '/kostimi/helovini-v2/ligava.jpg', 100),
  ('helovina-kostimi', 'Skelets (spīd tumsā)', '25 €', 'M-L', '/kostimi/helovini-v2/skelets.jpg', 110),
  ('helovina-kostimi', 'Ķirbis', '25 €', 'XS-L', '/kostimi/helovini-v2/kirbis.jpg', 120),
  ('helovina-kostimi', 'Maska (1)', '8 €', 'One size', '/kostimi/helovini-v2/1.jpg', 130),
  ('helovina-kostimi', 'Maska (2)', '8 €', 'One size', '/kostimi/helovini-v2/2.jpg', 140),
  ('helovina-kostimi', 'Maska (3)', '8 €', 'One size', '/kostimi/helovini-v2/3.jpg', 150),
  ('helovina-kostimi', 'Maska (4)', '8 €', 'One size', '/kostimi/helovini-v2/4.jpg', 160),
  ('helovina-kostimi', 'Maska (5)', '8 €', 'One size', '/kostimi/helovini-v2/5.jpg', 170),
  ('helovina-kostimi', 'Maska (6)', '8 €', 'One size', '/kostimi/helovini-v2/6.jpg', 180),
  ('helovina-kostimi', 'Maska (7)', '8 €', 'One size', '/kostimi/helovini-v2/7.jpg', 190),
  ('helovina-kostimi', 'Maska (8)', '8 €', 'One size', '/kostimi/helovini-v2/8.jpg', 200),
  ('helovina-kostimi', 'Maska (9)', '8 €', 'One size', '/kostimi/helovini-v2/9.jpg', 210),
  ('helovina-kostimi', 'Maska (10)', '8 €', 'One size', '/kostimi/helovini-v2/10.jpg', 220),
  ('helovina-kostimi', 'Maska (11)', '8 €', 'One size', '/kostimi/helovini-v2/11.jpg', 230),
  ('helovina-kostimi', 'Maska (12)', '8 €', 'One size', '/kostimi/helovini-v2/12.jpg', 240),
  ('helovina-kostimi', 'Maska (13)', '8 €', 'One size', '/kostimi/helovini-v2/13.jpg', 250),
  ('helovina-kostimi', 'Maska (14)', '8 €', 'One size', '/kostimi/helovini-v2/14.jpg', 260),
  ('helovina-kostimi', 'Maska (15)', '8 €', 'One size', '/kostimi/helovini-v2/15.jpg', 270),
  ('helovina-kostimi', 'Raganas rokas', '8 €', 'One size', '/kostimi/helovini-v2/16.jpg', 280),
  ('helovina-kostimi', 'Šausmu zombija iekšas', '10 €', 'One size', '/kostimi/helovini-v2/17.jpg', 290)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'helovina-kostimi'
);
