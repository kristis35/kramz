# kramz.lt – MVP landing page

Vieno puslapio svetainė su laukiančiųjų sąrašu ir potencialaus kliento apklausa.
Tikslas – patikrinti, ar žmonės norėtų pirkti traškų, gaminimo nereikalaujantį maistą ir kiek būtų pasiruošę mokėti.

**Technologijos:** Next.js 16 (App Router) · Tailwind CSS 4 · Supabase · (nebūtina) Resend el. laiškams.

## Kur ką keisti

| Ką keisti | Kur |
|---|---|
| Visi tekstai, kaina, DUK, apklausos klausimai, MVP tikslai | `src/content/site.ts` |
| Privatumo politika (įrašyti duomenų valdytojo rekvizitus!) | `src/app/privatumas/page.tsx` |
| Spalvos / šriftai | `src/app/globals.css`, `src/app/layout.tsx` |

Apklausos atsakymai saugomi JSON (`answers`), todėl pridėjus ar pakeitus klausimą duomenų bazės keisti nereikia.

## Puslapis

1. Hero – vertės žinutė, produkto iliustracija, CTA
2. Problema · 3. Sprendimas · 4. Privalumai · Kaip veikia
5. Maistinė vertė (aiškiai pažymėta „planuojama, formulė dar kuriama“)
6. Preliminari kaina 19,90–24,90 €/kg
7. Laukiančiųjų sąrašas: el. paštas + 3 klausimai + sutikimai (privatumo – privalomas, naujienų – atskiras, nebūtinas)
8. DUK · 9. Poraštė (kontaktai, privatumo politika, projekto statusas)

## Administravimas – `/admin`

Apsaugota HTTP Basic Auth (`admin` / `ADMIN_PASSWORD`). Rodo: lankytojus, registracijas, konversiją,
„mokėtų ≥ 19,90 €“ skaičių su progresu iki tikslų (500 / 50 / 10 % / 20), piltuvą
(peržiūra → CTA → formos pradžia → registracija), atsakymų pasiskirstymą, šaltinius (UTM / referrer)
ir naujausias registracijas. CSV eksportas – `/api/admin/export`.

## Analitika

Savo, be slapukų: fiksuojami anoniminiai įvykiai (`page_view`, `cta_click`, `form_start`, `signup`) su UTM
ir šaltiniu. IP ir identifikatoriai nesaugomi, todėl slapukų sutikimo juostos nereikia.
Reklamai naudokite UTM nuorodas, pvz. `https://kramz.lt/?utm_source=facebook&utm_campaign=test1`.

> „Lankytojai“ = puslapio peržiūros (be unikalių lankytojų sekimo, kad nereikėtų slapukų).

## Paleidimas

```bash
npm install
cp .env.example .env.local   # užpildykite reikšmes
npm run dev
```

Be Supabase nustatymų kūrimo režimu duomenys saugomi `.data/db.json`.

### Supabase

1. Sukurkite projektą (rekomenduojama ES regionas, pvz. Frankfurtas).
2. SQL Editor'iuje paleiskite `supabase/migrations/0001_init.sql`.
3. Į aplinkos kintamuosius įrašykite `SUPABASE_URL` ir `SUPABASE_SERVICE_ROLE_KEY` (tik serveryje).

### Diegimas (Vercel)

Importuokite repozitoriją į Vercel, nustatykite `.env.example` kintamuosius ir prijunkite `kramz.lt` domeną.
Patvirtinimo laiškams nustatykite `RESEND_API_KEY` ir `EMAIL_FROM` (domeną patvirtinkite Resend'e).

## Sąžiningumo taisyklės turiniui

- Jokių fiktyvių atsiliepimų ar klientų skaičių.
- Maistinė vertė – tik kaip *planuojama*, kol nepatvirtinta laboratorijoje.
- Nežadame, kad produktas pakeis visą mitybą.
