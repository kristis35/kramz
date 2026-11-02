/**
 * VISAS SVETAINĖS TURINYS VIENOJE VIETOJE.
 *
 * Čia keiskite tekstus, kainą, apklausos klausimus ir DUK – kodo liesti nereikia.
 * Apklausos atsakymai saugomi JSON formatu, todėl pridėjus / pakeitus klausimą
 * duomenų bazės migruoti nereikia. Keisdami klausimą, pakeiskite ir jo `id`,
 * kad seni ir nauji atsakymai nesusimaišytų statistikoje.
 */

export const brand = {
  name: "kramz",
  domain: "kramz.lt",
  url: "https://kramz.lt",
  email: "labas@kramz.lt",
  // Projekto statusas, rodomas poraštėje ir administravime.
  status: "Produktas kuriamas. Šiuo metu renkame laukiančiųjų sąrašą ir tiriame susidomėjimą.",
};

export const nav = [
  { href: "#kaip-veikia", label: "Kaip veikia?" },
  { href: "#kaina", label: "Kaina" },
  { href: "#duk", label: "DUK" },
];

export const hero = {
  eyebrow: "Ateities maistas",
  title: "Maistas be gaminimo.",
  titleAccent: "Be kompromisų.",
  text: "Kuriame traškų, maistingą maistą, kurį galėsi valgyti tiesiai iš pakuotės. Jokio virimo, maišymo ar pasiruošimo.",
  cta: "Noriu išbandyti pirmas",
  note: "Produktas kuriamas • Prisijungimas nemokamas",
};

export const problem = {
  eyebrow: "Problema",
  title: "Valgyti sveikai neturėtų būti antras darbas.",
  text: "Kasdien tas pats ratas: sugalvoti, ką valgyti, nupirkti, pagaminti, suskaičiuoti, išplauti indus. O kai laiko pritrūksta – užkandis bėgant arba nieko.",
  points: [
    {
      title: "Gaminimas atima laiką",
      text: "Pusryčiai, pietūs, vakarienė – kiekvienas valgis reikalauja pasiruošimo ir tvarkymosi po jo.",
    },
    {
      title: "Planavimas vargina",
      text: "Meniu, pirkinių sąrašai, maisto ruošimas savaitei į priekį – daug sprendimų dėl vieno dalyko.",
    },
    {
      title: "Skaičiuoti sunku",
      text: "Norint žinoti, kiek kalorijų ir baltymų suvalgei, tenka sverti, ieškoti ir vesti užrašus.",
    },
  ],
};

export const solution = {
  eyebrow: "Sprendimas",
  title: "Kramtomas, o ne geriamas.",
  text: "kramz – tai traškus maistas, kurį tiesiog atidarai ir valgai. Ne kokteilis, ne milteliai, kuriuos reikia maišyti, ne batonėlis. Tikras kąsnis, kurį kramtai – su aiškiai žinoma porcija.",
  bullets: [
    "Traški tekstūra – valgai, o ne geri",
    "Valgoma tiesiai iš pakuotės",
    "Aiški maistinė vertė kiekvienoje porcijoje",
  ],
};

export const benefits = {
  eyebrow: "Kodėl kramz?",
  title: "Paprasta. Aišku. Visada po ranka.",
  items: [
    {
      icon: "clock",
      title: "Taupo laiką",
      subtitle: "Jokio gaminimo",
      text: "Nereikia virti, maišyti ar plauti indų. Atidarai ir valgai.",
    },
    {
      icon: "scale",
      title: "Mitybos kontrolė",
      subtitle: "Aiškios porcijos",
      text: "Žinai, kiek suvalgei – be svarstyklių ir programėlių.",
    },
    {
      icon: "bag",
      title: "Patogu",
      subtitle: "Valgyk bet kur",
      text: "Biure, kelionėje, sporto salėje ar automobilyje. Nereikia šaldytuvo ar mikrobangų krosnelės.",
    },
  ],
};

export const howItWorks = {
  eyebrow: "Kaip tai veiks?",
  title: "Trys žingsniai. Paskutinis – skaniausias.",
  steps: [
    { n: "01", title: "Pasirenki porciją", text: "Pasirenki porciją pagal savo poreikius." },
    { n: "02", title: "Atidarai pakuotę", text: "Jokių įrankių, vandens ar indų." },
    { n: "03", title: "Valgai", text: "Jokių papildomų veiksmų." },
  ],
};

export const nutrition = {
  eyebrow: "Maistinė vertė",
  title: "Planuojama maistinė vertė",
  badge: "Formulė dar kuriama",
  per: "100 g",
  values: [
    { value: "~400", unit: "kcal", label: "Energinė vertė" },
    { value: "~30", unit: "g", label: "Baltymų" },
  ],
  disclaimer:
    "Tai tiksliniai, o ne laboratorijoje patvirtinti rodikliai. Galutinė sudėtis ir maistinė vertė bus paskelbta, kai produktas bus pagamintas ir ištirtas. kramz nėra skirtas pakeisti visos mitybos – tai patogus, maistingas valgis tarp kitų.",
};

export const pricing = {
  eyebrow: "Kaina",
  title: "Preliminari kaina",
  priceFrom: "19,90",
  priceTo: "24,90",
  currency: "€",
  unit: "kg",
  portions: "~10 porcijų viename kilograme",
  perPortion: "≈ 2,00–2,50 € už porciją",
  question: "Ar tokia kaina tau priimtina? Pasakyk mums registracijos formoje – tai padės nustatyti galutinę kainą.",
  cta: "Įvertinti kainą",
};

export type SurveyOption = {
  value: string;
  label: string;
  /** Kainos klausimui – skaitinė vertė eurais (null = nepirktų). */
  amount?: number | null;
};

export type SurveyQuestion = {
  id: string;
  label: string;
  required: boolean;
  options: SurveyOption[];
};

/** Kaina (€/kg), nuo kurios laikome, kad žmogus „pasiruošęs mokėti“ (MVP tikslas). */
export const willingnessThreshold = 19.9;

/** Klausimo id, kuriame klausiama kainos – naudojamas statistikoje. */
export const priceQuestionId = "price_per_kg";

export const survey: SurveyQuestion[] = [
  {
    id: "frequency",
    label: "Kaip dažnai valgytum tokį maistą?",
    required: true,
    options: [
      { value: "daily", label: "Kasdien" },
      { value: "weekly", label: "Kelis kartus per savaitę" },
      { value: "rarely", label: "Tik retkarčiais" },
    ],
  },
  {
    id: priceQuestionId,
    label: "Kiek mokėtum už 1 kg (~10 porcijų)?",
    required: true,
    options: [
      { value: "14.90", label: "14,90 €", amount: 14.9 },
      { value: "19.90", label: "19,90 €", amount: 19.9 },
      { value: "24.90", label: "24,90 €", amount: 24.9 },
      { value: "29.90", label: "29,90 €", amount: 29.9 },
      { value: "none", label: "Nepirkčiau tokiomis kainomis", amount: null },
    ],
  },
  {
    id: "flavor",
    label: "Kokio skonio norėtum?",
    required: true,
    options: [
      { value: "savory", label: "Sūraus" },
      { value: "sweet", label: "Saldaus" },
      { value: "neutral", label: "Neutralaus" },
    ],
  },
];

export const waitlist = {
  eyebrow: "Laukiančiųjų sąrašas",
  title: "Būk tarp pirmųjų",
  text: "Prisijunk prie laukiančiųjų sąrašo ir sužinok, kada galėsi išbandyti kramz. Trys trumpi klausimai padės mums sukurti produktą, kurio tikrai norėsi.",
  emailLabel: "Tavo el. paštas",
  emailPlaceholder: "vardas@pastas.lt",
  privacyConsent: "Susipažinau su privatumo politika ir sutinku, kad mano el. paštas ir atsakymai būtų saugomi laukiančiųjų sąrašui administruoti.",
  marketingConsent: "Sutinku gauti kramz naujienas ir pasiūlymus el. paštu. Atsisakyti galėsiu bet kada.",
  submit: "Prisijungti prie sąrašo",
  submitting: "Siunčiama…",
  successTitle: "Ačiū! Tu sąraše.",
  successText: "Parašysime, kai tik kramz bus paruoštas išbandyti. Tavo atsakymai jau padeda mums kurti produktą.",
  alreadyText: "Šis el. paštas jau yra sąraše – atnaujinome tavo atsakymus. Ačiū!",
  errorText: "Nepavyko išsiųsti. Pabandyk dar kartą po kelių akimirkų.",
};

/** Sutikimų teksto versija – pakeitus sutikimų / privatumo politikos tekstą, padidinkite. */
export const consentVersion = "2026-11-02";

export const faq = {
  eyebrow: "DUK",
  title: "Dažniausi klausimai",
  items: [
    {
      q: "Koks bus skonis?",
      a: "Kuriame kelis skonius – sūrų, saldų ir neutralų. Kuriuos išleisime pirmiausia, priklausys ir nuo tavo atsakymų registracijos formoje.",
    },
    {
      q: "Kokia bus sudėtis?",
      a: "Receptūra dar kuriama. Siekiame paprastos, suprantamos sudėties, kurioje svarbiausias dėmesys – baltymams ir sotumui. Pilną sudėtį paskelbsime prieš pradėdami prekybą.",
    },
    {
      q: "Ar bus alergenų?",
      a: "Kol formulė nepatvirtinta, negalime pateikti galutinio alergenų sąrašo. Visi alergenai bus aiškiai nurodyti ant pakuotės ir svetainėje, kaip reikalauja ES teisė.",
    },
    {
      q: "Ar tai pakeis visą mano mitybą?",
      a: "Ne, to nežadame. kramz kuriamas kaip patogus, maistingas valgis tada, kai nėra laiko gaminti. Jei turite specialių mitybos poreikių, pasitarkite su gydytoju ar dietologu.",
    },
    {
      q: "Kada produktas bus išleistas?",
      a: "Tikslios datos dar neturime – šiuo metu tikriname susidomėjimą ir kuriame receptūrą. Laukiančiųjų sąrašo nariai sužinos pirmieji ir galės išbandyti produktą anksčiau už kitus.",
    },
    {
      q: "Kaip vyks pristatymas?",
      a: "Pirmiausia planuojame pristatymą Lietuvoje – į paštomatus ir į namus. Tikslias sąlygas ir kainas paskelbsime prieš pradėdami prekybą.",
    },
    {
      q: "Ar registracija mane įpareigoja pirkti?",
      a: "Ne. Prisijungimas nemokamas ir niekuo neįpareigoja. Iš sąrašo galėsi išsiregistruoti bet kada.",
    },
  ],
};

export const footer = {
  links: [{ href: "/privatumas", label: "Privatumo politika" }],
};

/** MVP sėkmės tikslai – rodomi administravimo vaizde. */
export const goals = {
  visitors: 500,
  signups: 50,
  conversion: 0.1,
  willingToPay: 20,
};
