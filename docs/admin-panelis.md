# Admin panelis

Klients ielogojas adresē `/admin`, izvēlas mājaslapas sadaļu un augšupielādē, labo, paslēpj,
pārkārto vai dzēš tās attēlus. Izmaiņas mājaslapā parādās uzreiz, bez jaunas publicēšanas.

Viss glabājas vienā Supabase projektā: lietotāji (Auth), ieraksti (Postgres) un attēli (Storage).
Jaunas npm pakotnes nav vajadzīgas: ar Supabase tiek runāts caur parasto `fetch`.

**Kamēr vides mainīgie nav ievadīti, panelis ir izslēgts** un mājaslapa strādā kā līdz šim.

## Mapju struktūra

```
app/
  admin/
    layout.tsx              noindex + virsraksts
    page.tsx                /admin -> pāradresē uz login vai dashboard
    login/page.tsx          /admin/login
    dashboard/page.tsx      /admin/dashboard (ielādē sadaļas ierakstus)
  api/admin/upload/route.ts POST: viena attēla augšupielāde + ieraksts datubāzē
  api/admin/replace-image/route.ts POST: esoša ieraksta bildes nomaiņa

components/
  admin/
    AdminShell.tsx          paneļa rāmis (galvene, e-pasts, "Iziet")
    LoginForm.tsx           e-pasts + parole
    LogoutButton.tsx
    NotConfigured.tsx       paziņojums, ja trūkst vides mainīgo
    SectionPicker.tsx       sadaļas izvēle pēc sectionKey
    ImageUploader.tsx       viens vai vairāki attēli, statuss katram
    ItemList.tsx            sadaļas attēlu režģis, secības maiņa pārvelkot
    ItemCard.tsx            nosaukums, cena, izmērs, rādīt lapā, dzēšana
  layout/SiteShell.tsx      /admin lapās nerāda mājaslapas galveni un kājeni
  costumes/*Section.tsx     14 kostīmu sadaļas, visas lasa no datubāzes

lib/
  sections.ts               getSectionItems(key): publiskajām lapām
  costumes.ts               loadCostumes(key, iebūvētaisSaraksts): kostīmu sadaļām
  animatorCharacters.ts     loadAnimatorCharacters(): animatoru tērpi rezervācijas formai
  gallery.ts                loadGalleryImages(key, iebūvētieAttēli): galerijām
  admin/
    sections.ts             pārvaldāmo sadaļu saraksts (sectionKey, nosaukums, lapa)
    types.ts                SectionItem, ActionResult
    config.ts               vides mainīgo nolasīšana
    token.ts                sesijas parakstīšana (HMAC-SHA256)
    session.ts              sīkdatne, getSession, requireSession
    supabase.ts             Auth / REST / Storage izsaukumi
    items.ts                ierakstu lasīšana, izveide, labošana, dzēšana
    validation.ts           ievades pārbaude, attēla veida noteikšana
    actions.ts              server actions: login, logout, update, delete, reorder
    reorder.ts              secības aprēķins (moveId, planReorder)
    revalidate.ts           publiskās lapas atjaunošana pēc izmaiņām
    prepareImage.ts         attēla samazināšana pārlūkā pirms augšupielādes

supabase/
  schema.sql                tabula, piekļuves noteikumi, attēlu krātuve
  seed-helovina-kostimi.sql esošie 29 Helovīna kostīmi un maskas
  seed-kostimi.sql          pārējo 13 kostīmu sadaļu esošie 265 ieraksti
  seed-animatoru-terpi.sql  esošie 109 animatoru tērpi (rezervācijas forma)
  seed-parsteiguma-galerija.sql  esošie 10 pārsteiguma tēla galerijas attēli
  fix-attelu-celi.sql       vienreizējs labojums diviem attēlu ceļiem
```

## Pārvaldāmās sadaļas

Visas kostīmu nomas sadaļas (saraksts ir `lib/admin/sections.ts`):

| Lapa | Sadaļas (`section_key`) |
| --- | --- |
| Mascota tēli | `mascota-teli` |
| Gaisa plūsmas kostīmi | `gaisa-plusmas-kostimi` |
| Kino tēli un citi interesanti kostīmi | `princeses-un-fejas`, `supervaroni`, `kino-teli`, `profesijas`, `dzivnieku-teli` |
| Smieklīgi tēli un parūkas | `smiekligi-teli`, `retro-kostimi`, `uzvalki`, `parukas` |
| Sezonālās kolekcijas | `helovina-kostimi`, `ziemassvetku-kostimi`, `lieldienu-kostimi` |

Pasākumi:

| Lapa | Sadaļa (`section_key`) |
| --- | --- |
| Rezervācija pasākumiem (`/rezervacija-pasakumiem`), tēla izvēle animatoram | `animatoru-terpi` |
| Pārsteiguma tēls (`/pasakumu-organizesana/parsteiguma-tels`), galerija | `parsteiguma-galerija` |
| Radošās darbnīcas (`/pasakumu-organizesana/radosas-darbnicas`), darbnīcas ar bildi un nosaukumu | `radoso-darbnicu-galerija` |

Animatoru tērpiem ir tikai nosaukums un attēls (bez cenas un izmēra). Lapa tos nolasa
servera pusē (`app/rezervacija-pasakumiem/page.tsx`) un nodod formai kā `animatorCharacters`.

Galerijām (`hasTitle: false`) ir tikai attēli: admin kartītē nav nosaukuma lauka.
Pārsteiguma tēla galerija bez ierakstiem rāda 10 iebūvētos attēlus.
Radošās darbnīcas (`hasTitle: true`): katra darbnīca ir kartīte ar bildi augšā un nosaukumu apakšā; ja admin
panelī nav nevienas darbnīcas, lapā redzams iebūvētais saraksts bez bildēm.

## Datu modelis

Tabula `section_items`: viens ieraksts ir viens attēls kādā sadaļā.

| Kolonna       | Tips        | Nozīme                                                    |
| ------------- | ----------- | --------------------------------------------------------- |
| `id`          | uuid        | identifikators                                            |
| `section_key` | text        | sadaļa, piem. `helovina-kostimi`                          |
| `title`       | text        | nosaukums                                                 |
| `description` | text        | apraksts (neobligāts)                                     |
| `price`       | text / null | cena, piem. `25 €` (tikai sadaļām ar cenu)                |
| `size`        | text / null | izmērs, piem. `XS-L`                                      |
| `image_url`   | text        | attēla adrese                                             |
| `image_path`  | text / null | ceļš Storage; `null`, ja attēls ir mājaslapas `/public`   |
| `active`      | boolean     | vai rādīt mājaslapā                                       |
| `sort_order`  | integer     | secība (mazākais pirmais)                                 |
| `created_at`, `updated_at` | timestamptz |                                              |

Attēli: Storage krātuve `section-images`, ceļš `<section_key>/<uuid>.<jpg|png|webp>`.

## Iestatīšana (vienu reizi)

Supabase izvēlņu nosaukumi laika gaitā nedaudz mainās; meklē līdzīgu.

1. **Supabase projekts.** Izveido bezmaksas projektu vietnē supabase.com.
2. **Datubāze.** SQL Editor -> New query -> ielīmē `supabase/schema.sql` saturu -> Run.
3. **Esošie kostīmi (ieteicams).** Tāpat palaid `supabase/seed-helovina-kostimi.sql`
   un `supabase/seed-kostimi.sql`. Tad visi pašreizējie kostīmi parādās admin panelī
   un klients tos var labot. Sadaļā, kurai seed nav palaists, pēc pirmās augšupielādes
   būs redzams tikai jaunais attēls.
4. **Klienta lietotājs.** Authentication -> Users -> Add user: klienta e-pasts un parole,
   atzīmē "Auto Confirm User".
5. **Aizliedz reģistrāciju.** Authentication -> Sign In / Providers -> izslēdz
   "Allow new users to sign up".
6. **Atslēgas.** Project Settings -> API: nokopē Project URL, anon (publishable) atslēgu
   un service_role (secret) atslēgu.
7. **Vides mainīgie.** Vercel -> Project -> Settings -> Environment Variables
   (un lokāli `.env.local`). Paraugs ir failā `.env.example`:
   `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS`,
   `ADMIN_SESSION_SECRET`.
8. **Publicē no jauna** (Vercel -> Deployments -> Redeploy), lai mainīgie stātos spēkā.
9. Atver `/admin`, ielogojies, augšupielādē vienu testa attēlu un pārbaudi Helovīna lapu.

## Bildes nomaiņa

Katras kartītes attēla stūrī ir poga "Nomainīt bildi". Tā augšupielādē jaunu attēlu
(`POST /api/admin/replace-image`, lauki `id` un `file`) un ierakstam nomaina tikai attēlu:
nosaukums, cena, izmērs, secība un "Rādīt lapā" paliek. Iepriekšējais augšupielādētais
fails tiek izdzēsts no krātuves; mājaslapas pašas attēli (`/public`) netiek aiztikti.

## Secības maiņa

Admin panelī kartīti satver aiz attēla un pārvelk vajadzīgajā vietā; rozā līnija rāda,
kur tā nonāks. Secība tiek saglabāta uzreiz (`reorderItemsAction`), un publiskā lapa
tiek atjaunota. Serveris maina `sort_order` tikai pārvietotajam ierakstam (skaitlis
starp kaimiņiem); ja starp kaimiņiem vairs nav brīvu skaitļu, pārnumurē visu sadaļu.

## Kā pievienot vēl vienu sadaļu

1. `lib/admin/sections.ts`: pievieno ierakstu sarakstā `SECTIONS`
   (`key`, `label`, `path`, `hasPriceAndSize`).
2. Sadaļas komponentē nolasi datus tāpat kā `components/costumes/HelovinsSection.tsx`:

   ```tsx
   const cards = await loadCostumes("mana-sadala", iebuvetaisSaraksts);
   ```

   Komponentei jābūt `async` servera komponentei. Sadaļām ar citādu kartīšu uzbūvi
   izmanto `getSectionItems("mana-sadala")` no `lib/sections.ts`.
3. Ja gribi pārcelt esošos attēlus, uztaisi seed failu pēc Helovīna parauga.

## Drošība

- Ielogoties var tikai e-pasti no `ADMIN_EMAILS`, pat ja Supabase projektā ir citi lietotāji.
- Parole tiek pārbaudīta Supabase Auth; mājaslapa paroles neglabā.
- Sesija ir parakstīta `httpOnly` sīkdatne uz 7 dienām. Izņemot e-pastu no `ADMIN_EMAILS`
  vai nomainot `ADMIN_SESSION_SECRET`, esošās sesijas beidzas uzreiz.
- Katra darbība (augšupielāde, labošana, dzēšana) serverī atkārtoti pārbauda sesiju.
- `SUPABASE_SERVICE_ROLE_KEY` izmanto tikai serveris. Apmeklētāji ar anon atslēgu var
  tikai lasīt aktīvos ierakstus (Row Level Security).
- Augšupielādē pieņem tikai JPG, PNG un WebP līdz 4 MB; veidu nosaka pēc faila satura,
  faila nosaukumu un ceļu izvēlas serveris.

## Zināmie ierobežojumi

- Pārlūks lielus attēlus pirms augšupielādes samazina līdz 1600 px garākajā malā.
- Ja sadaļā nav neviena aktīva ieraksta vai datubāze nav sasniedzama, mājaslapa rāda
  kodā iebūvēto sarakstu. Tāpēc sadaļu nevar padarīt pilnīgi tukšu.

## Atsauksmes (`/admin/atsauksmes`)

Admin paneļa sadaļa Google atsauksmju lūgšanai. **Nekas netiek sūtīts automātiski**: lūgums aiziet tikai
tad, kad admin panelī nospiež pogu (piem., kostīms var netikt iznomāts, lai gan pieteikums ir).

- **Google atsauksmju saite** glabājas tabulā `site_settings` (`google_review_url`).
- **Visi pieteikumi:** katra kostīma rezervācija (`/api/reservation`), pasākuma pieteikums (`/api/events`) un
  veikala pasūtījums (`/api/order`) pievieno klientu tabulā `review_requests` (`lib/reviews/record.ts`).
  Pie katra: "Pieprasīt atsauksmi (e-pasts)", "WhatsApp" (atver wa.me ar gatavu ziņu un atzīmē kā palūgtu),
  "Nenotika" / "Atjaunot".
- Pateicības teikums atbilst veidam (kostīma noma / svētki / veikala pasūtījums): `thankYouLine`
  `lib/reviews/whatsapp.ts`; e-pasta noformējums `lib/reviews/email.ts`; sūtīšana caur Resend.
- Iestatīšana: Supabase palaist `supabase/atsauksmes.sql`.

## Kalendārs (`/admin/kalendars`)

Mēneša kalendārs ar visiem pieteikumiem no mājaslapas.
Pēc ielogošanās admin panelis atveras tieši kalendārā (izvēlnē pirmais: Kalendārs, Atsauksmes, Bildes).
Augšā rozā bloks "Tuvākās 2 nedēļas" ar pieteikumiem no šodienas. Katrā pieteikumā pogas
WhatsApp / SMS / Zvanīt / E-pasts ar sagatavotu ziņu "Sveiki, <vārds>! Rakstām no Happy Carnevale par
Jūsu ..." (`components/admin/calendar/BookingCard.tsx`, `ContactButtons.tsx`). Tādas pašas pogas ir arī
paziņojuma e-pastos par jaunu rezervāciju/pasākumu/pasūtījumu (`lib/email/contactButtons.ts`).

- Kostīma rezervācija (`/api/reservation`) un pasākuma pieteikums (`/api/events`) pēc veiksmīgas
  nosūtīšanas tiek saglabāti tabulā `bookings` (`lib/bookings/record.ts`) ar visu informāciju (`details`).
  Veikala pasūtījumiem datuma nav, tāpēc kalendārā tie neparādās.
- Kalendārā: rezervācija pasākuma dienā (rozā) un kostīma saņemšanas dienā (dzeltena), pasākums (violets)
  ar laiku. Zem kalendāra mēneša saraksts pa dienām ar "Visa informācija" un pogu "Atcelt" / "Atjaunot"
  (atcelts paliek redzams pārsvītrots).
- Mēneša maiņa ar `?m=2026-10`.
- "+ Pievienot pieteikumu ar roku": veids, kostīms/pakalpojums, pasākuma datums (obligāts), saņemšanas datums vai laiks,
  kontakti, adrese, piezīmes (`addBookingAction`). Ja ir e-pasts, klients parādās arī atsauksmju sarakstā.
- Iestatīšana: Supabase palaist `supabase/kalendars.sql`.
