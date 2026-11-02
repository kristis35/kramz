import type { Metadata } from "next";
import { brand, consentVersion } from "@/content/site";
import { Footer, Header } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: `Privatumo politika – ${brand.name}`,
};

/*
 * SVARBU: tai MVP šablonas. Prieš viešinant įrašykite duomenų valdytojo rekvizitus
 * (vardas / įmonė, kodas, adresas) ir, jei įmanoma, leiskite peržiūrėti teisininkui.
 */
export default function PrivacyPage() {
  return (
    <>
      <Header withNav={false} />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Privatumo politika</h1>
        <p className="mt-3 text-sm text-muted">Versija: {consentVersion}</p>

        <div className="mt-10 space-y-8 leading-relaxed [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_p]:text-ink/80 [&_ul]:space-y-1 [&_ul]:text-ink/80">
          <section>
            <h2>1. Kas mes esame</h2>
            <p>
              {brand.domain} – kuriamo maisto produkto „{brand.name}“ projektas. Duomenų valdytojas: [įrašykite vardą
              / įmonės pavadinimą, kodą ir adresą]. Kontaktai privatumo klausimais:{" "}
              <a className="underline" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2>2. Kokius duomenis renkame</h2>
            <ul>
              <li>El. pašto adresą, kurį pateiki registruodamasis į laukiančiųjų sąrašą.</li>
              <li>Apklausos atsakymus (kaip dažnai valgytum, kiek mokėtum, kokio skonio norėtum).</li>
              <li>Tavo sutikimus ir jų pateikimo laiką bei versiją.</li>
              <li>Iš kur atėjai į svetainę (nuorodos šaltinis ir UTM žymos), jei tokia informacija yra.</li>
            </ul>
          </section>

          <section>
            <h2>3. Kam naudojame duomenis ir kokiu pagrindu</h2>
            <ul>
              <li>
                Laukiančiųjų sąrašui administruoti ir pranešti, kai produktą bus galima išbandyti – tavo sutikimu (BDAR 6
                str. 1 d. a p.).
              </li>
              <li>
                Apibendrintai produkto paklausai ir kainai įvertinti – tavo sutikimu. Rezultatus analizuojame tik
                apibendrintai.
              </li>
              <li>Naujienoms ir pasiūlymams siųsti – tik jei atskirai tam sutikai.</li>
            </ul>
          </section>

          <section>
            <h2>4. Lankomumo statistika ir slapukai</h2>
            <p>
              Svetainė nenaudoja reklaminių ar sekimo slapukų. Skaičiuojame tik anoniminius įvykius (puslapio peržiūra,
              mygtuko paspaudimas, formos pildymo pradžia) kartu su šaltiniu ir laiku. Nesaugome IP adreso ir
              nepriskiriame tau jokio identifikatoriaus.
            </p>
          </section>

          <section>
            <h2>5. Kiek laiko saugome</h2>
            <p>
              Duomenis saugome, kol vyksta projektas, bet ne ilgiau kaip 24 mėnesius nuo registracijos, arba kol atšauksi
              sutikimą – tuomet duomenis ištrinsime.
            </p>
          </section>

          <section>
            <h2>6. Kas gali matyti duomenis</h2>
            <p>
              Duomenis matome tik mes. Jie saugomi duomenų bazių paslaugų teikėjo (Supabase) serveriuose ES regione, o
              patvirtinimo laiškai gali būti siunčiami per el. pašto paslaugų teikėją. Duomenų neparduodame ir
              neperduodame trečiosioms šalims rinkodarai.
            </p>
          </section>

          <section>
            <h2>7. Tavo teisės</h2>
            <p>
              Gali bet kada atšaukti sutikimą, prašyti susipažinti su savo duomenimis, juos ištaisyti ar ištrinti – tiesiog
              parašyk{" "}
              <a className="underline" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
              . Taip pat turi teisę pateikti skundą Valstybinei duomenų apsaugos inspekcijai (vdai.lrv.lt).
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
