# Happy Carneval — mājaslapas pamats

Premium klases mājaslapas sākuma versija uzņēmumam **Happy Carneval** (kostīmu noma, pasākumu organizēšana, veikals).

## Tehnoloģijas

- Next.js 15 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Iebūvēta SEO: metadata API, `sitemap.ts`, `robots.ts`, OpenGraph

## Uzstādīšana

```bash
npm install
npm run dev
```

Atver [http://localhost:3000](http://localhost:3000).

## Struktūra

```
app/
  layout.tsx          — fonts (Poppins), globālā metadata, Header/Footer
  page.tsx             — sākumlapa (visas sekcijas apkopotas)
  sitemap.ts, robots.ts
  kostimu-noma/        — placeholder lapa (detalizēts katalogs vēl top)
  pasakumu-organizesana/
  veikals/
  par-mums/
  kontakti/

components/
  layout/   — Header (sticky nav), Footer
  home/     — Hero, CategoryStrip, BentoServices, PopularCostumesSlider,
              WhyUs, AboutTeaser, ContactSection
  ui/       — Button, Container, SectionHeading, Logo, PagePlaceholder

lib/
  constants.ts  — navigācija, kontaktinformācija, sociālie tīkli
  data.ts       — kategorijas, bento pakalpojumi, populārie kostīmi, ieguvumi
```

## Attēli

Šobrīd izmantoti kvalitatīvi Unsplash foto kā vietturi (`images.unsplash.com`,
atļauts `next.config.mjs`). Nomainot pret reālām fotogrāfijām:

1. Ievieto attēlus `/public/images/` mapē.
2. `lib/data.ts` un attiecīgajās komponentēs nomaini `image` URL uz
   `/images/faila-nosaukums.jpg`.
3. Ja izmanto ārējus attēlu resursus, pievieno domēnu
   `next.config.mjs` → `images.remotePatterns`.

## Krāsu un fontu tokeni

Definēti `tailwind.config.ts`:

- `primary` #FF4F9A, `secondary` #7C4DFF, `accent` #35D6AE, `sunshine` #FFD54A
- `ink` #1F2937 (teksta krāsa)
- Fonts: Poppins (`next/font/google`, mainīgais `--font-poppins`)

## Nākamie soļi

- Detalizētas kostīmu kataloga lapas ar filtriem un produktu kartītēm
- Reāla rezervācijas/veikala funkcionalitāte
- Kontaktformas savienošana ar e-pasta/API pakalpojumu
- Reālu fotogrāfiju un Google Maps iegulšanas koda pievienošana
