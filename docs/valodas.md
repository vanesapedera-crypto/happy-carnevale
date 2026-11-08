# Mājaslapas valodas (LV / RU / EN)

## Adreses
- Latviešu lapas paliek bez prefiksa: `/kostimu-noma`, `/kontakti` …
- Krievu: `/ru/...`, angļu: `/en/...` (tās pašas adreses daļas, piem. `/ru/kostimu-noma/mascota-teli`).
- `/lv/...` pāradresē uz adresi bez `/lv`.
- Galvenē ir pārslēdzējs **LV | RU | EN**, kas ved uz to pašu lapu citā valodā.

## Kā tas uzbūvēts
- Visas publiskās lapas ir mapē `app/[lang]/`. `middleware.ts` latviešu adreses iekšēji pārvirza uz `/lv/...`.
- `app/admin` un `app/api` paliek ārpus `[lang]` (admin panelim ir savs `app/admin/layout.tsx`).
- `lib/i18n.ts`: valodu saraksts, `lp(lang, "/ceļš")` (saite ar prefiksu), `tr(lang, { lv, ru, en })`,
  `pageMetadata(...)` (title, description, canonical un hreflang saites).
- Klienta komponentēs: `useLang()`, `useLp()`, `useTr()` no `context/LangContext.tsx`.
- Teksti glabājas pie pašas komponentes kā `{ lv: "…", ru: "…", en: "…" }`.
- `app/sitemap.ts` katru lapu ieraksta trīs valodās ar hreflang.

## Kostīmu nosaukumi
Kostīmi nāk no admin paneļa (latviski). Krievu/angļu lapās nosaukumu ņem:
1. no admin paneļa kartītes laukiem **"Nosaukums krieviski / angliski"** (ja aizpildīti);
2. citādi no vārdnīcas `lib/costumeNames.ts` (tur ir visi esošie kostīmi; "Zaķis (2)", "Parūka 5" tulko automātiski);
3. citādi rāda latvisko nosaukumu.

Izmēru/cenu tekstus ("S-XL līdz 185cm") tulko `translateCostumeDetail` tajā pašā failā.
Kostīma lapas adrese vienmēr veidojas no latviskā nosaukuma (tāpēc tā ir vienāda visās valodās).

**Iestatīšana:** Supabase → SQL Editor → palaist `supabase/tulkojumi.sql` (pievieno kolonnu `translations`).
Kamēr tas nav izdarīts, viss strādā, tikai admin panelī tulkojumu nevar saglabāt.

## Formas un e-pasti
- Rezervāciju un pasūtījuma formas sūta `lang`; uzņēmuma e-pastā parādās rinda "Valoda: krievu/angļu".
- Kostīma nosaukums, cena un izmērs rezervācijas e-pastā vienmēr ir latviski.
- Veikala pasūtījuma apstiprinājums klientam ir klienta valodā; rēķins paliek latviski.

## Fonti
Poppins nesatur kirilicu, tāpēc krievu lapās krievu burtus rāda Montserrat (`app/[lang]/layout.tsx`).

## Vēl latviski
- Sākumlapas lielajā bildē (`/images/hero/hero-bubble.svg`) teksts "Sveiki! Es esmu Burbulīte!" ir pašā bildē.
- Radošo darbnīcu nosaukumi (admin panelī) krievu/angļu lapās ir latviski, kamēr kartītē nav ierakstīts tulkojums.
- Kostīmu apraksti krievu/angļu lapās netiek rādīti (tur rāda kategorijas tulkoto aprakstu).

## Jauna sadaļa "Pāru kostīmi"
`/kostimu-noma/paru-kostimi`, admin panelī grupā "Sezonālās kolekcijas". Kartītes bilde kostīmu nomas lapā
ir pirmā admin panelī pievienotā pāru kostīma bilde.
