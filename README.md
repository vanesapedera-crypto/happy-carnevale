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
  layout.tsx, page.tsx      — globālais izkārtojums un sākumlapa
  sitemap.ts, robots.ts
  kostimu-noma/             — kostīmu kategoriju lapas
  pasakumu-organizesana/    — animatori, sejas apgleznošana, pārsteiguma tēls, darbnīcas
  veikals/                  — veikals, produkta lapa, Party Box
  cart/                     — grozs
  rezervacija-kostimiem/, rezervacija-pasakumiem/
  kontakti/
  api/                      — rezervāciju un pasākumu e-pastu sūtīšana (Resend)

components/
  layout/        — Header, Footer
  hero/          — sākumlapas Hero
  costumes/      — kostīmu kategoriju sekcijas
  events/        — pasākumu lapu sekcijas un galerijas
  facepainting/  — sejas apgleznošanas sekcijas
  reservation/   — rezervācijas formas daļas
  shop/          — veikala komponentes
  common/        — PageHero, MixedGallery

context/CartContext.tsx  — groza stāvoklis
data/                    — animatoru, mascotu un gaisa kostīmu tēli
lib/constants.ts         — kontaktinformācija, navigācija, sociālie tīkli
```

## Attēli

Visi attēli atrodas `public/` mapē (`/images/...`, `/kostimi/...`, `/videos/...`).

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
