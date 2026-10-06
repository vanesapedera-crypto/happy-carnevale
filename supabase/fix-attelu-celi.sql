-- Salabo divus attēlu ceļus jau ielādētajos ierakstos (faila nosaukums nesakrita ar kodu).
-- Palaid vienu reizi: SQL Editor -> ielīmē -> Run. Var droši palaist atkārtoti.

update public.section_items
set image_url = '/kostimi/multfilmu/ragana.jpg'
where image_url = '/kostimi/multfilmu/Ragana.jpg';

update public.section_items
set image_url = '/kostimi/supervaroni/wonder-women.jpg'
where image_url = '/kostimi/supervaroni/wonder-woman.jpg';
