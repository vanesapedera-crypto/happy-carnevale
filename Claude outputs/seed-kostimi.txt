-- Visu pārējo kostīmu sadaļu esošie ieraksti (tie paši, kas šobrīd ir mājaslapas kodā).
-- Palaid PĒC schema.sql: SQL Editor -> ielīmē visu failu -> Run.
-- Helovīna kostīmi ir atsevišķā failā seed-helovina-kostimi.sql.
-- Katra sadaļa tiek aizpildīta tikai tad, ja tajā vēl nav neviena ieraksta,
-- tāpēc skriptu var droši palaist atkārtoti.

-- MascotaSection: 23 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('mascota-teli', 'Angry Birds', '50 €', 'S-XXL', '/kostimi/mascotas/angry-birds.jpg', 10),
  ('mascota-teli', 'Bings', '45 €', 'S-L', '/kostimi/mascotas/bings.jpg', 20),
  ('mascota-teli', 'Čeizs', '45 €', 'S-L', '/kostimi/mascotas/ceizs.jpg', 30),
  ('mascota-teli', 'Džeiks', '25 €', 'XS-M', '/kostimi/mascotas/dzeiks.jpg', 40),
  ('mascota-teli', 'Lācis balletājs', '35 €', '160-180 cm', '/kostimi/mascotas/lacis-balletajs.jpg', 50),
  ('mascota-teli', 'Maršals', '45 €', 'S-L', '/kostimi/mascotas/marsels.jpg', 60),
  ('mascota-teli', 'Melnais kaķis', '50 €', 'S-XL līdz 185cm', '/kostimi/mascotas/melnais-kakis.jpg', 70),
  ('mascota-teli', 'Mikijs', '25 €', '160-180 cm', '/kostimi/mascotas/mikijs.jpg', 80),
  ('mascota-teli', 'Minnija (1)', '25 €', '160-180 cm', '/kostimi/mascotas/minnija-2.jpg', 90),
  ('mascota-teli', 'Minnija (2)', '35 €', 'S-L', '/kostimi/mascotas/minnija-1.jpg', 100),
  ('mascota-teli', 'Plīša lācis', '35 €', '160-185 cm', '/kostimi/mascotas/plisa-lacis.jpg', 110),
  ('mascota-teli', 'Rozā pantera', '35 €', 'XS-M', '/kostimi/mascotas/roza-pantera.jpg', 120),
  ('mascota-teli', 'Skaja', '45 €', 'S-L', '/kostimi/mascotas/skaja.jpg', 130),
  ('mascota-teli', 'Stičs', '50 €', 'S-XL', '/kostimi/mascotas/stich.jpg', 140),
  ('mascota-teli', 'Tīģerītis', '40 €', '165-185 cm', '/kostimi/mascotas/tigeritis.jpg', 150),
  ('mascota-teli', 'Vinnijs Pūks', '40 €', '160-180cm', '/kostimi/mascotas/vinijs-puks.jpg', 160),
  ('mascota-teli', 'Zaķis Kundziņš', '40 €', 'XS-L', '/kostimi/mascotas/zakis-1.jpg', 170),
  ('mascota-teli', 'Zaķis (1)', '40 €', '165-185 cm', '/kostimi/mascotas/zakis-2.jpg', 180),
  ('mascota-teli', 'Zaķis (2)', '25 €', 'XS-L', '/kostimi/mascotas/zakis-3.jpg', 190),
  ('mascota-teli', 'Kaķis', '35 €', 'XS-M', '/kostimi/mascotas/kakis.jpg', 200),
  ('mascota-teli', 'Zelta glittera lācis', '50 €', '175-190 cm', '/kostimi/mascotas/zelta-glittera-lacis.jpg', 210),
  ('mascota-teli', 'Zemeslode', '40 €', 'XS-L', '/kostimi/mascotas/zemeslode.jpg', 220),
  ('mascota-teli', 'Lauva Leo', '45 €', 'XS-M', '/kostimi/mascotas/lauva-leo.jpg', 230)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'mascota-teli'
);

-- GaisaPlusmasSection: 28 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('gaisa-plusmas-kostimi', 'Vienradzis (1)', '25 €', 'XS-XL', '/kostimi/gaisa-plusma/vienradzis-1.jpg', 10),
  ('gaisa-plusmas-kostimi', 'Vienradzis (2)', '25 €', 'XS-XL', '/kostimi/gaisa-plusma/vienradzis-2.jpg', 20),
  ('gaisa-plusmas-kostimi', 'Kaķis', '25 €', 'XS-XL', '/kostimi/gaisa-plusma/kakis.jpg', 30),
  ('gaisa-plusmas-kostimi', 'Govs', '25 €', 'XS-XL', '/kostimi/gaisa-plusma/govs.jpg', 40),
  ('gaisa-plusmas-kostimi', 'Banāns', '25 €', 'XS-L', '/kostimi/gaisa-plusma/banans.jpg', 50),
  ('gaisa-plusmas-kostimi', 'Kapibara', '25 €', 'XS-XL', '/kostimi/gaisa-plusma/kapibara.jpg', 60),
  ('gaisa-plusmas-kostimi', 'Rozā zaķītis', '30 €', 'XS-XL', '/kostimi/gaisa-plusma/roza-zakitis.jpg', 70),
  ('gaisa-plusmas-kostimi', 'Kosmonauts', '25 €', 'XS-XL', '/kostimi/gaisa-plusma/kosmonauts.jpg', 80),
  ('gaisa-plusmas-kostimi', 'Bite', '50 €', 'XS-XL', '/kostimi/gaisa-plusma/bite.jpg', 90),
  ('gaisa-plusmas-kostimi', 'Dinozaurs (1)', '25 €', '3 pieaugušo kostīmi (165–195 cm) + 1 bērnu kostīms (120–150 cm)', '/kostimi/gaisa-plusma/dinazaurs-1.jpg', 100),
  ('gaisa-plusmas-kostimi', 'Dinozaurs (2)', '25 €', '150-195cm', '/kostimi/gaisa-plusma/dinazaurs-2.jpg', 110),
  ('gaisa-plusmas-kostimi', 'Vienradzis (3)', '25 €', 'XS-XL', '/kostimi/gaisa-plusma/vienradzis-3.jpg', 120),
  ('gaisa-plusmas-kostimi', 'Citplanētietis', '25 €', '160-190 cm', '/kostimi/gaisa-plusma/ciplanetietis.jpg', 130),
  ('gaisa-plusmas-kostimi', 'Pingvīns', '30 €', '160-190 cm', '/kostimi/gaisa-plusma/pingvins.jpg', 140),
  ('gaisa-plusmas-kostimi', 'Olafs', '30 €', '160-190 cm', '/kostimi/gaisa-plusma/olafs.jpg', 150),
  ('gaisa-plusmas-kostimi', 'Sirds', '25 €', '140-190 cm', '/kostimi/gaisa-plusma/sirds.jpg', 160),
  ('gaisa-plusmas-kostimi', 'Lācis 3,60m', '50 €', 'S-XXL', '/kostimi/gaisa-plusma/lacis.jpg', 170),
  ('gaisa-plusmas-kostimi', 'Haizivs', '25 €', '150-190 cm', '/kostimi/gaisa-plusma/haizivs.jpg', 180),
  ('gaisa-plusmas-kostimi', 'Zaķis garausis', '30 €', 'S-XL', '/kostimi/gaisa-plusma/zakis-garausis.jpg', 190),
  ('gaisa-plusmas-kostimi', 'Sumo zils', '20 €', 'S-XL', '/kostimi/gaisa-plusma/sumo-zils.jpg', 200),
  ('gaisa-plusmas-kostimi', 'Sumo sarkans', '20 €', 'S-XL', '/kostimi/gaisa-plusma/sumo-sarkans.jpg', 210),
  ('gaisa-plusmas-kostimi', 'Lieldienu zaķis', '30 €', 'S-XL', '/kostimi/gaisa-plusma/lieldienu-zakis.jpg', 220),
  ('gaisa-plusmas-kostimi', 'Flamingo', '25 €', 'XS-L', '/kostimi/gaisa-plusma/flamingo.jpg', 230),
  ('gaisa-plusmas-kostimi', 'Dinozaurs ar saimnieku (1)', '25 €', 'XS-L', '/kostimi/gaisa-plusma/dinozaurs-ar-saimnieku-1.jpg', 240),
  ('gaisa-plusmas-kostimi', 'Dinozaurs ar saimnieku (2)', '25 €', 'XS-L', '/kostimi/gaisa-plusma/dinozaurs-ar-saimnieku-2.jpg', 250),
  ('gaisa-plusmas-kostimi', 'Gailis', '25 €', 'XS-L', '/kostimi/gaisa-plusma/gailis.jpg', 260),
  ('gaisa-plusmas-kostimi', 'Pīle', '25 €', 'XS-L', '/kostimi/gaisa-plusma/pile.jpg', 270),
  ('gaisa-plusmas-kostimi', 'Daudz laimes!', '25 €', '150-190cm', '/kostimi/gaisa-plusma/daudz-laimes.jpg', 280)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'gaisa-plusmas-kostimi'
);

-- PrincessesSection: 12 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('princeses-un-fejas', 'Anna', '25 €', 'XS-M', '/kostimi/princesses/anna.jpg', 10),
  ('princeses-un-fejas', 'Bārbija', '25 €', 'XS-M', '/kostimi/princesses/barbie.jpg', 20),
  ('princeses-un-fejas', 'Bella', '25 €', 'XS-S', '/kostimi/princesses/bella.jpg', 30),
  ('princeses-un-fejas', 'Meža laumiņa', '25 €', 'XS-M', '/kostimi/princesses/feja-1.jpg', 40),
  ('princeses-un-fejas', 'Feja', '35 €', 'XS-M', '/kostimi/princesses/feja-2.jpg', 50),
  ('princeses-un-fejas', 'Elza (1)', '25 €', 'XS-M', '/kostimi/princesses/frozen-1.jpg', 60),
  ('princeses-un-fejas', 'Elza (2)', '25 €', 'XS-M', '/kostimi/princesses/frozen-2.jpg', 70),
  ('princeses-un-fejas', 'Mazā nāriņa', '25 €', 'XS-M', '/kostimi/princesses/narina.jpg', 80),
  ('princeses-un-fejas', 'Princese Zeltīte', '25 €', 'XS-M', '/kostimi/princesses/princese-zeltite.jpg', 90),
  ('princeses-un-fejas', 'Princese', '25 €', 'S-M', '/kostimi/princesses/princese.jpg', 100),
  ('princeses-un-fejas', 'Princis', '25 €', 'S-L', '/kostimi/princesses/princis.jpg', 110),
  ('princeses-un-fejas', 'Salātlapiņa', '25 €', 'S-L', '/kostimi/princesses/salatlapina.jpg', 120)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'princeses-un-fejas'
);

-- SuperheroesSection: 18 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('supervaroni', 'Betmens', '25 €', 'M-XL', '/kostimi/supervaroni/betmens.jpg', 10),
  ('supervaroni', 'Tors', '25 €', 'L-XL', '/kostimi/supervaroni/thors.jpg', 20),
  ('supervaroni', 'Iron Man', '25 €', 'S-M', '/kostimi/supervaroni/iron-man.jpg', 30),
  ('supervaroni', 'Kapteinis Amerika', '25 €', 'S-L', '/kostimi/supervaroni/kapteinis-amerika.jpg', 40),
  ('supervaroni', 'Lady Bug', '20 €', 'XS-S', '/kostimi/supervaroni/lady-bug.jpg', 50),
  ('supervaroni', 'Melnā Pantera', '25 €', 'S-L', '/kostimi/supervaroni/melna-pantera.jpg', 60),
  ('supervaroni', 'Spiderman', '25 €', 'S-L', '/kostimi/supervaroni/spiderman.jpg', 70),
  ('supervaroni', 'Supermeitene', '25 €', 'S-M', '/kostimi/supervaroni/super-meitene.jpg', 80),
  ('supervaroni', 'Ninja Bruņurupucis', '25 €', 'S-L', '/kostimi/multfilmu/turtles-ninja.jpg', 90),
  ('supervaroni', 'Supermens', '25 €', 'M-XL', '/kostimi/supervaroni/supermens.jpg', 100),
  ('supervaroni', 'Wolverine', '15 €', 'S-L', '/kostimi/supervaroni/wolverine.jpg', 110),
  ('supervaroni', 'Zibsnis (1)', '20 €', 'M-L', '/kostimi/supervaroni/zibsnis-1.jpg', 120),
  ('supervaroni', 'Zibsnis (2)', '25 €', 'M-L', '/kostimi/supervaroni/zibsnis-2.jpg', 130),
  ('supervaroni', 'Batgirl', '25 €', 'M-L', '/kostimi/supervaroni/batgirl.jpg', 140),
  ('supervaroni', 'Halks', '25 €', 'M-L', '/kostimi/supervaroni/halks.jpg', 150),
  ('supervaroni', 'Kaķsieviete', '25 €', 'XS-S', '/kostimi/supervaroni/kaksieviete.jpg', 160),
  ('supervaroni', 'Deadpool', '25 €', 'M-L', '/kostimi/supervaroni/deadpool.jpg', 170),
  ('supervaroni', 'Wonder Woman', '25 €', 'M', '/kostimi/supervaroni/wonder-woman.jpg', 180)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'supervaroni'
);

-- MultfilmuSection: 68 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('kino-teli', 'Ash no Pokemoniem', '25 €', 'S-M', '/kostimi/multfilmu/ash-no-pokemoniem.jpg', 10),
  ('kino-teli', 'Bailīgā mūķene', '25 €', 'XS-L', '/kostimi/multfilmu/bailiga-mukene.jpg', 20),
  ('kino-teli', 'Malificienta', '25 €', 'XS-L', '/kostimi/multfilmu/malificienta.jpg', 30),
  ('kino-teli', 'Bings', '25 €', 'S-L', '/kostimi/multfilmu/bings.jpg', 40),
  ('kino-teli', 'Creeper no Minecraft', '25 €', 'S-L', '/kostimi/multfilmu/creeper-no-minecraft.jpg', 50),
  ('kino-teli', 'Cruella', '20 €', 'XS-L', '/kostimi/multfilmu/cruella.jpg', 60),
  ('kino-teli', 'Dino mazulis', '25 €', 'S-L', '/kostimi/multfilmu/Dino mazulis.jpg', 70),
  ('kino-teli', 'Drakula', '25 €', 'XS-L', '/kostimi/multfilmu/drakula.jpg', 80),
  ('kino-teli', 'Džokers (1)', '25 €', 'M-L', '/kostimi/multfilmu/dzokers-1.jpg', 90),
  ('kino-teli', 'Džokers (2)', '25 €', 'S-L', '/kostimi/multfilmu/dzokers-2.jpg', 100),
  ('kino-teli', 'Fins', '25 €', 'S-L', '/kostimi/multfilmu/fins.jpg', 110),
  ('kino-teli', 'Gabby''s Dollhouse', '25 €', 'XS-M', '/kostimi/multfilmu/gabbu-dollhouse.jpg', 120),
  ('kino-teli', 'Harijs Poters', '25 €', 'M-L', '/kostimi/multfilmu/Harijs potters.jpg', 130),
  ('kino-teli', 'Hārlija', '25 €', 'XS-M', '/kostimi/multfilmu/harlija.jpg', 140),
  ('kino-teli', 'Hello Kitty', '25 €', 'XS-M', '/kostimi/multfilmu/hello-kitty.jpg', 150),
  ('kino-teli', 'Hermione', '25 €', 'XS-M', '/kostimi/multfilmu/Hermione.jpg', 160),
  ('kino-teli', 'Joy', '25 €', 'S-L', '/kostimi/multfilmu/joy.jpg', 170),
  ('kino-teli', 'Klauns', '20 €', 'S-L', '/kostimi/multfilmu/klauns.jpg', 180),
  ('kino-teli', 'Labubu (Lillā)', '25 €', 'XS-L', '/kostimi/multfilmu/labubu-lilla.jpg', 190),
  ('kino-teli', 'Labubu (Rozā)', '25 €', 'XS-L', '/kostimi/multfilmu/labubu-roza.jpg', 200),
  ('kino-teli', 'Spociņš', '20 €', 'XS-L', '/kostimi/multfilmu/spocins.jpg', 210),
  ('kino-teli', 'Karlsons', '20 €', 'S-XL', '/kostimi/multfilmu/karlsons.jpg', 220),
  ('kino-teli', 'LEGO Ninjago', '25 €', 'XS-L', '/kostimi/multfilmu/lego-ninjago.jpg', 230),
  ('kino-teli', 'LOL Balerīna', '25 €', 'XS-M', '/kostimi/multfilmu/lol-balerina.jpg', 240),
  ('kino-teli', 'LOL Queen Bee', '25 €', 'S-M', '/kostimi/multfilmu/lol-queen-bee.jpg', 250),
  ('kino-teli', 'Luigi', '20 €', 'S-L', '/kostimi/multfilmu/luigi.jpg', 260),
  ('kino-teli', 'Māršals', '25 €', 'XS-L', '/kostimi/multfilmu/marsels.jpg', 270),
  ('kino-teli', 'Maša', '25 €', 'XS-L', '/kostimi/multfilmu/Masa-un-lacis.jpg', 280),
  ('kino-teli', 'Minioni', '25 €', 'S-L', '/kostimi/multfilmu/minioni.jpg', 290),
  ('kino-teli', 'Minnija', '25 €', 'S-L', '/kostimi/multfilmu/minnija.jpg', 300),
  ('kino-teli', 'SQUID GAME', '25 €', 'S-L', '/kostimi/multfilmu/money-heist-1.jpg', 310),
  ('kino-teli', 'Money Heist', '25 €', 'S-L', '/kostimi/multfilmu/money-heist-2.jpg', 320),
  ('kino-teli', 'Pennywise', '20 €', 'M-XL', '/kostimi/multfilmu/pennywise.jpg', 330),
  ('kino-teli', 'Pepija Garzeķe', '25 €', 'XS-M', '/kostimi/multfilmu/pepija-garzeke.jpg', 340),
  ('kino-teli', 'Peppa', '25 €', 'S-L', '/kostimi/multfilmu/peppa.jpg', 350),
  ('kino-teli', 'Pikaču', '25 €', 'S-XL', '/kostimi/multfilmu/pikacu.jpg', 360),
  ('kino-teli', 'Avatars', '25 €', 'S-L', '/kostimi/multfilmu/avatars.jpg', 370),
  ('kino-teli', 'Pirātu meitene', '25 €', 'S-M', '/kostimi/multfilmu/pirata-meitene.jpg', 380),
  ('kino-teli', 'Pirāts (1)', '25 €', 'S-L', '/kostimi/multfilmu/pirata-zens-1.jpg', 390),
  ('kino-teli', 'Pirāts (2)', '25 €', 'S-L', '/kostimi/multfilmu/pirata-zens-2.jpg', 400),
  ('kino-teli', 'Pomnija', '30 €', 'S-M', '/kostimi/multfilmu/pomnija.jpg', 410),
  ('kino-teli', 'Poppija', '25 €', 'S-M', '/kostimi/multfilmu/poppija.jpg', 420),
  ('kino-teli', 'Ragana', '25 €', 'S-L', '/kostimi/multfilmu/ragana.jpg', 430),
  ('kino-teli', 'Selestija Vienradzis', '25 €', 'S-L', '/kostimi/multfilmu/selestija-vienradzis.jpg', 440),
  ('kino-teli', 'Simka', '20 €', 'XS-M', '/kostimi/multfilmu/simka-no-fiksiki.jpg', 450),
  ('kino-teli', 'Skaja', '25 €', 'S-M', '/kostimi/multfilmu/skaja.jpg', 460),
  ('kino-teli', 'Everesta', '25 €', 'XS-M', '/kostimi/multfilmu/everesta.jpg', 470),
  ('kino-teli', 'Čeizs', '25 €', 'S-L', '/kostimi/multfilmu/ceizs.jpg', 480),
  ('kino-teli', 'Smurfete', '20 €', 'XS-M', '/kostimi/multfilmu/smurfete.jpg', 490),
  ('kino-teli', 'Soniks', '25 €', 'S-L', '/kostimi/multfilmu/soniks.jpg', 500),
  ('kino-teli', 'Šreks', '25 €', 'S-L', '/kostimi/multfilmu/sreks.jpg', 510),
  ('kino-teli', 'Stičs', '25 €', 'XS-M', '/kostimi/multfilmu/stich.jpg', 520),
  ('kino-teli', 'Sūklis Bobs (1)', '25 €', 'S-L', '/kostimi/multfilmu/suklis-bobs-1.jpg', 530),
  ('kino-teli', 'Sūklis Bobs (2)', '25 €', 'S-L', '/kostimi/multfilmu/suklis-bobs-2.jpg', 540),
  ('kino-teli', 'Patriks Jūras Zvaigzne', '25 €', 'L-XL', '/kostimi/multfilmu/patriks-juras-zvaigzne.jpg', 550),
  ('kino-teli', 'Super Mario', '25 €', 'S-L', '/kostimi/multfilmu/supermario.jpg', 560),
  ('kino-teli', 'Transformeris', '25 €', 'S-L', '/kostimi/multfilmu/transformer.jpg', 570),
  ('kino-teli', 'Twilight Sparkle', '25 €', 'S-L', '/kostimi/multfilmu/twilight-sparkle-unicorn.jpg', 580),
  ('kino-teli', 'Vienradzis', '15 €', 'S-L', '/kostimi/multfilmu/vienradzis.jpg', 590),
  ('kino-teli', 'Vinnijs Pūks', '25 €', 'S-L', '/kostimi/multfilmu/vinnijs.jpg', 600),
  ('kino-teli', 'Wednesday', '25 €', 'XS-L', '/kostimi/multfilmu/wednesday.jpg', 610),
  ('kino-teli', 'Zars', '25 €', 'S-L', '/kostimi/multfilmu/zars.jpg', 620),
  ('kino-teli', 'Eglīte', '25 €', 'XS-M', '/kostimi/ziemassvetki/egle.jpg', 630),
  ('kino-teli', 'Rūķis', '30 €', 'XS-XL', '/kostimi/ziemassvetki/rukis-smaidulis.jpg', 640),
  ('kino-teli', 'Sniegbaltīte', '25 €', 'S-M', '/kostimi/ziemassvetki/sniegbaltite.jpg', 650),
  ('kino-teli', 'Ziemassvētku vecītis', '50 €', 'S-XL', '/kostimi/ziemassvetki/ziemassvetku-vecitis.jpg', 660),
  ('kino-teli', 'Grinčš', '25 €', 'S-L', '/kostimi/ziemassvetki/grincs.jpg', 670),
  ('kino-teli', 'Lego Ninjago', '25 €', 'XS-L', '/kostimi/mascotas/lego-ninjago.jpg', 680)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'kino-teli'
);

-- ProfessionsSection: 18 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('profesijas', 'Bruņinieks', '25 €', 'M', '/kostimi/profesijas/bruninieks.jpg', 10),
  ('profesijas', 'Ceļotājs', '25 €', 'S-L', '/kostimi/profesijas/celotajs.jpg', 20),
  ('profesijas', 'Ieslodzītais', '25 €', 'M-L', '/kostimi/profesijas/cietumnieks.jpg', 30),
  ('profesijas', 'Cowboy meitene', '25 €', 'S-XL', '/kostimi/profesijas/cowboy-meitene.jpg', 40),
  ('profesijas', 'Cowboy puisis', '25 €', 'S-XL', '/kostimi/profesijas/cowboy-puisis.jpg', 50),
  ('profesijas', 'Dullais profesors', '25 €', 'S-L', '/kostimi/profesijas/dullais-profesors.jpg', 60),
  ('profesijas', 'Kapteinis', '25 €', 'M-L', '/kostimi/profesijas/Kapteinis.jpg', 70),
  ('profesijas', 'Kosmonauts', '25 €', 'S-M', '/kostimi/profesijas/kosmonauts.jpg', 80),
  ('profesijas', 'Mācītājs', '25 €', 'M-L', '/kostimi/profesijas/macitajs.jpg', 90),
  ('profesijas', 'Medmāsa', '20 €', 'XS-S', '/kostimi/profesijas/medmasas-kostims.jpg', 100),
  ('profesijas', 'Pētniece', '25 €', 'XS-M', '/kostimi/profesijas/petniece.jpg', 110),
  ('profesijas', 'Policiste', '20 €', 'XS-M', '/kostimi/profesijas/Policiste.jpg', 120),
  ('profesijas', 'Policists', '20 €', 'M-XL', '/kostimi/profesijas/Policists.jpg', 130),
  ('profesijas', 'Profesore', '25 €', 'S-L', '/kostimi/profesijas/profesore.jpg', 140),
  ('profesijas', 'Rallija meitene', '25 €', 'XS-S', '/kostimi/profesijas/rallij-meitene.jpg', 150),
  ('profesijas', 'Rallija braucējs (1)', '25 €', 'S-M', '/kostimi/profesijas/rallija-braucejs-1.jpg', 160),
  ('profesijas', 'Rallija braucējs (2)', '25 €', 'S-L', '/kostimi/profesijas/rallija-braucejs-2.jpg', 170),
  ('profesijas', 'Stjuarte', '25 €', 'XS-M', '/kostimi/profesijas/Stjuarte.jpg', 180)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'profesijas'
);

-- DzivniekiSection: 20 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('dzivnieku-teli', 'Bembijs', '25 €', 'XS-M', '/kostimi/dzivnieki/bembijs.jpg', 10),
  ('dzivnieku-teli', 'Bite', '25 €', 'Derēs līdz 195cm', '/kostimi/dzivnieki/bite.jpg', 20),
  ('dzivnieku-teli', 'Bizbizmārīte', '25 €', 'S-L', '/kostimi/dzivnieki/bizbizmarite.jpg', 30),
  ('dzivnieku-teli', 'Bitīte', '25 €', 'M', '/kostimi/dzivnieki/bitite.jpg', 40),
  ('dzivnieku-teli', 'Lapsa meitene', '25 €', 'S-L', '/kostimi/dzivnieki/lapsas.jpg', 50),
  ('dzivnieku-teli', 'Lapsa Kūmiņš', '25 € / līdz 3 diennaktīm', 'S-L', '/kostimi/dzivnieki/lapsa-krumins.jpg', 60),
  ('dzivnieku-teli', 'Lauva', '25 €', 'S-L', '/kostimi/dzivnieki/lauva.jpg', 70),
  ('dzivnieku-teli', 'Runcis', '25 €', 'S-L', '/kostimi/dzivnieki/runcis.jpg', 80),
  ('dzivnieku-teli', 'Zaķis (1)', '25 € / līdz 3 diennaktīm', 'XS-XL', '/kostimi/dzivnieki/zakis-1.jpg', 90),
  ('dzivnieku-teli', 'Zaķis (2)', '25 € / līdz 3 diennaktīm', 'S-L', '/kostimi/dzivnieki/zakis-2.jpg', 100),
  ('dzivnieku-teli', 'Pīle', '25 €', 'XS-L', '/kostimi/smiekligi-teli/IMG_6832.jpg', 110),
  ('dzivnieku-teli', 'Zaķis (3)', '25 €', 'XS-L', '/kostimi/dzivnieki/zakis-4.jpg', 120),
  ('dzivnieku-teli', 'Zaķis (4)', '35 €', 'XS-XXL', '/kostimi/dzivnieki/zakis-5.jpg', 130),
  ('dzivnieku-teli', 'Zaķis (5)', '35 €', 'XS-XXL', '/kostimi/dzivnieki/zakis-7.jpg', 140),
  ('dzivnieku-teli', 'Zaķa zēns', '25 €', 'XS-XXL', '/kostimi/dzivnieki/zakis-3.jpg', 150),
  ('dzivnieku-teli', 'Zaķa meitenīte', '25 €', 'XS-XXL', '/kostimi/dzivnieki/zakis-6.jpg', 160),
  ('dzivnieku-teli', 'Žirafe (1)', '20 €', 'S-L', '/kostimi/dzivnieki/zirafe.jpg', 170),
  ('dzivnieku-teli', 'Lācis', '25 € ', 'XS-XL', '/kostimi/dzivnieki/lacis.jpg', 180),
  ('dzivnieku-teli', 'Žirafe (2)', '25 € ', 'L', '/kostimi/dzivnieki/zirafe-2.jpg', 190),
  ('dzivnieku-teli', 'Stārķis', '25 € ', 'L', '/kostimi/dzivnieki/starkis.jpg', 200)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'dzivnieku-teli'
);

-- SmiekligiTeliSection: 6 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('smiekligi-teli', 'Burgera kostīms', '15 €', 'XS-XXXL', '/kostimi/smiekligi-teli/IMG_6517.jpg', 10),
  ('smiekligi-teli', 'Zivs kostīms', '15 €', 'XS-L', '/kostimi/smiekligi-teli/IMG_6518.jpg', 20),
  ('smiekligi-teli', 'Pīle', '25 €', 'XS-L', '/kostimi/smiekligi-teli/IMG_6832.jpg', 30),
  ('smiekligi-teli', 'Prusaks', '25 €', 'XS-L', '/kostimi/smiekligi-teli/IMG_6833.jpg', 40),
  ('smiekligi-teli', 'Daudz laimes!', '25 €', '150-190cm', '/kostimi/gaisa-plusma/daudz-laimes.jpg', 50),
  ('smiekligi-teli', 'Zirnīši', '20 €', 'XS-M', '/kostimi/multfilmu/zirnisi.jpg', 60)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'smiekligi-teli'
);

-- RetroSection: 17 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('retro-kostimi', '70''s Disco', '20 €', 'M', '/kostimi/retro-kostimi/70s-disco.jpg', 10),
  ('retro-kostimi', '70''s meiteņu kostīms', '25 €', 'S-M', '/kostimi/retro-kostimi/70s-meitenu-kostims.jpg', 20),
  ('retro-kostimi', '70''s puišu kostīms', '25 €', 'S-M', '/kostimi/retro-kostimi/70s-puisu-kostims.jpg', 30),
  ('retro-kostimi', 'Boho Girl', '25 €', 'M', '/kostimi/retro-kostimi/boho-girl.jpg', 40),
  ('retro-kostimi', 'Disko meitene (1)', '25 €', 'S-M', '/kostimi/retro-kostimi/disko-meitene-1.jpg', 50),
  ('retro-kostimi', 'Disko meitene (2)', '25 €', 'XS-M', '/kostimi/retro-kostimi/disko-meitene-2.jpg', 60),
  ('retro-kostimi', 'Disko puisis', '25 €', 'S-M', '/kostimi/retro-kostimi/disko-puisis.jpg', 70),
  ('retro-kostimi', 'Great Gatsby', '25 €', 'XS-M', '/kostimi/retro-kostimi/great-gatsby.jpg', 80),
  ('retro-kostimi', 'Hippiju meitene', '25 €', 'S-L', '/kostimi/retro-kostimi/hippy-meitene.jpg', 90),
  ('retro-kostimi', 'Hippiju puisis', '25 €', 'S-L', '/kostimi/retro-kostimi/hippy-puisis.jpg', 100),
  ('retro-kostimi', 'Mamma Mia 70''s', '25 €', 'S-M', '/kostimi/retro-kostimi/mamma-mia-70s-kostims.jpg', 110),
  ('retro-kostimi', 'Rozā disko bikškostīms', '25 €', 'S-L', '/kostimi/retro-kostimi/roza-bikskostims.jpg', 120),
  ('retro-kostimi', 'Sudraba disko tērps', '25 €', 'S-L', '/kostimi/retro-kostimi/sudraba-terps.jpg', 130),
  ('retro-kostimi', '80''s treniņtērps (Sudraba)', '25 €', 'M-L', '/kostimi/retro-kostimi/unisex-80s-treninterps-disco.jpg', 140),
  ('retro-kostimi', '80''s treniņtērps (zelta)', '25 €', 'M-L', '/kostimi/retro-kostimi/unisex-80s-treninterps.jpg', 150),
  ('retro-kostimi', 'Vīrieša disco tērps', '25 €', 'S-L', '/kostimi/retro-kostimi/viriesa-disco-terps.jpg', 160),
  ('retro-kostimi', 'Maikls Džeksons', '30 €', 'M-L', '/kostimi/retro-kostimi/maikls-dzeksons.jpg', 170)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'retro-kostimi'
);

-- UzvalkiSection: 5 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('uzvalki', 'Disko uzvalks - žakete un bikses', '40 €', 'L-XL', '/kostimi/uzvalki/disko-uzvalks.jpg', 10),
  ('uzvalki', 'Krāsains komiksu uzvalks', '30 €', 'M-L', '/kostimi/uzvalki/krasains-komiksu-uzvalks.jpg', 20),
  ('uzvalki', 'Opposuit komiksu uzvalks', '30 €', 'L-XL jeb EU 54', '/kostimi/uzvalki/opposuit-komiksu-uzvalks.jpg', 30),
  ('uzvalki', 'Ziemassvētku uzvalks - žakete + bikses', '35 €', 'M-L jeb EU 52', '/kostimi/uzvalki/opposuit-zakete-bikses.jpg', 40),
  ('uzvalki', 'Sarkans uzvalks', '30 €', 'M', '/kostimi/uzvalki/sarkans-uzvalks.jpg', 50)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'uzvalki'
);

-- ParukasSection: 28 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('parukas', 'Parūka 1', '12 €', 'One size', '/kostimi/parukas/paruka-1.jpg', 10),
  ('parukas', 'Parūka 2', '12 €', 'One size', '/kostimi/parukas/paruka-2.jpg', 20),
  ('parukas', 'Parūka 3', '12 €', 'One size', '/kostimi/parukas/paruka-3.jpg', 30),
  ('parukas', 'Parūka 4', '12 €', 'One size', '/kostimi/parukas/paruka-4.jpg', 40),
  ('parukas', 'Parūka 5', '12 €', 'One size', '/kostimi/parukas/paruka-5.jpg', 50),
  ('parukas', 'Parūka 6', '12 €', 'One size', '/kostimi/parukas/paruka-6.jpg', 60),
  ('parukas', 'Parūka 7', '12 €', 'One size', '/kostimi/parukas/paruka-7.jpg', 70),
  ('parukas', 'Parūka 8', '12 €', 'One size', '/kostimi/parukas/paruka-8.jpg', 80),
  ('parukas', 'Parūka 9', '12 €', 'One size', '/kostimi/parukas/paruka-9.jpg', 90),
  ('parukas', 'Parūka 10', '12 €', 'One size', '/kostimi/parukas/paruka-10.jpg', 100),
  ('parukas', 'Parūka 11', '12 €', 'One size', '/kostimi/parukas/paruka-11.jpg', 110),
  ('parukas', 'Parūka 12', '12 €', 'One size', '/kostimi/parukas/paruka-12.jpg', 120),
  ('parukas', 'Parūka 13', '12 €', 'One size', '/kostimi/parukas/paruka-13.jpg', 130),
  ('parukas', 'Parūka 14', '12 €', 'One size', '/kostimi/parukas/paruka-14.jpg', 140),
  ('parukas', 'Parūka 15', '12 €', 'One size', '/kostimi/parukas/paruka-15.jpg', 150),
  ('parukas', 'Parūka 16', '12 €', 'One size', '/kostimi/parukas/paruka-16.jpg', 160),
  ('parukas', 'Parūka 17', '12 €', 'One size', '/kostimi/parukas/paruka-17.jpg', 170),
  ('parukas', 'Parūka 18', '12 €', 'One size', '/kostimi/parukas/paruka-18.jpg', 180),
  ('parukas', 'Parūka 19', '12 €', 'One size', '/kostimi/parukas/paruka-19.jpg', 190),
  ('parukas', 'Parūka 20', '12 €', 'One size', '/kostimi/parukas/paruka-20.jpg', 200),
  ('parukas', 'Parūka 21', '12 €', 'One size', '/kostimi/parukas/paruka-21.jpg', 210),
  ('parukas', 'Parūka 22', '12 €', 'One size', '/kostimi/parukas/paruka-22.jpg', 220),
  ('parukas', 'Parūka 23', '12 €', 'One size', '/kostimi/parukas/paruka-23.jpg', 230),
  ('parukas', 'Parūka 24', '12 €', 'One size', '/kostimi/parukas/paruka-24.jpg', 240),
  ('parukas', 'Parūka 25', '12 €', 'One size', '/kostimi/parukas/paruka-25.jpg', 250),
  ('parukas', 'Parūka 26', '12 €', 'One size', '/kostimi/parukas/paruka-26.jpg', 260),
  ('parukas', 'Parūka 27', '12 €', 'One size', '/kostimi/parukas/paruka-27.jpg', 270),
  ('parukas', 'Parūka 28', '12 €', 'One size', '/kostimi/parukas/paruka-29.jpg', 280)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'parukas'
);

-- ZiemassvetkiSection: 9 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('ziemassvetku-kostimi', 'Eglīte', '25 €', 'XS-M', '/kostimi/ziemassvetki/egle.jpg', 10),
  ('ziemassvetku-kostimi', 'Rūķis', '30 €', 'XS-XL', '/kostimi/ziemassvetki/rukis-smaidulis.jpg', 20),
  ('ziemassvetku-kostimi', 'Sniegbaltīte', '25 €', 'S-M', '/kostimi/ziemassvetki/sniegbaltite.jpg', 30),
  ('ziemassvetku-kostimi', 'Ziemassvētku vecītis', '50 €', 'S-XL', '/kostimi/ziemassvetki/ziemassvetku-vecitis.jpg', 40),
  ('ziemassvetku-kostimi', 'Grinčš', '25 €', 'S-L', '/kostimi/ziemassvetki/grincs.jpg', 50),
  ('ziemassvetku-kostimi', 'Ziemassvētku uzvalks - žakete + bikses', '35 €', 'M-L jeb EU 52', '/kostimi/uzvalki/opposuit-zakete-bikses.jpg', 60),
  ('ziemassvetku-kostimi', 'Pingvīns', '30 €', '160-190 cm', '/kostimi/gaisa-plusma/pingvins.jpg', 70),
  ('ziemassvetku-kostimi', 'Olafs', '30 €', '160-190 cm', '/kostimi/gaisa-plusma/olafs.jpg', 80),
  ('ziemassvetku-kostimi', 'Sniegavīrs', '25 €', 'XS-L', '/kostimi/ziemassvetki/sniegavirs.jpg', 90)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'ziemassvetku-kostimi'
);

-- LieldienasSection: 13 ieraksti
insert into public.section_items (section_key, title, price, size, image_url, sort_order)
select * from (values
  ('lieldienu-kostimi', 'Zaķis (1)', '25 €', 'XS-XL', '/kostimi/dzivnieki/zakis-1.jpg', 10),
  ('lieldienu-kostimi', 'Zaķis (2)', '15 €', 'S-L', '/kostimi/dzivnieki/zakis-2.jpg', 20),
  ('lieldienu-kostimi', 'Zaķis (3)', '25 €', 'XS-L', '/kostimi/dzivnieki/zakis-4.jpg', 30),
  ('lieldienu-kostimi', 'Zaķis (4)', '35 €', 'XS-XXL', '/kostimi/dzivnieki/zakis-5.jpg', 40),
  ('lieldienu-kostimi', 'Zaķa zēns', '25 €', 'XS-XXL', '/kostimi/dzivnieki/zakis-3.jpg', 50),
  ('lieldienu-kostimi', 'Zaķa meitenīte', '25 €', 'XS-XXL', '/kostimi/dzivnieki/zakis-6.jpg', 60),
  ('lieldienu-kostimi', 'Rozā zaķītis', '30 €', 'XS-XL', '/kostimi/gaisa-plusma/roza-zakitis.jpg', 70),
  ('lieldienu-kostimi', 'Zaķis garausis', '30 €', 'S-XL', '/kostimi/gaisa-plusma/zakis-garausis.jpg', 80),
  ('lieldienu-kostimi', 'Lieldienu zaķis', '30 €', 'S-XL', '/kostimi/gaisa-plusma/lieldienu-zakis.jpg', 90),
  ('lieldienu-kostimi', 'Zaķis Kundziņš', '40 €', 'XS-L', '/kostimi/mascotas/zakis-1.jpg', 100),
  ('lieldienu-kostimi', 'Zaķis (1)', '40 €', '165-185 cm', '/kostimi/mascotas/zakis-2.jpg', 110),
  ('lieldienu-kostimi', 'Zaķis (2)', '25 €', 'XS-L', '/kostimi/mascotas/zakis-3.jpg', 120),
  ('lieldienu-kostimi', 'Zaķis (3)', '25 €', 'XS-L', '/kostimi/multfilmu/zakis-4.jpg', 130)
) as seed (section_key, title, price, size, image_url, sort_order)
where not exists (
  select 1 from public.section_items where section_key = 'lieldienu-kostimi'
);
