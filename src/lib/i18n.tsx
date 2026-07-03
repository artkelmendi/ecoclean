"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "sq" | "en";

const dict = {
  sq: {
    nav: {
      sectors: "Sektorët",
      technology: "Teknologjia",
      process: "Procesi",
      contact: "Kontakti",
      cta: "Kërko ofertë",
    },
    hero: {
      eyebrow: "Lavanteri industriale — Kosovë",
      titleA: "Standardi i ri",
      titleB: "i pastërtisë.",
      sub: "Eco Clean kujdeset për tekstilet e institucioneve dhe hoteleve më të mira në vend — me teknologji evropiane të klasit industrial dhe cikël kthimi 24 orë.",
      ctaPrimary: "Kërko ofertë",
      ctaSecondary: "Shiko teknologjinë",
      trustLabel: "Të besuar nga",
      trustPolice: "Policia e Kosovës",
      trustFsk: "FSK",
      trustHotels: "Hotelet premium të vendit",
      videoChip: "Brenda makinave tona",
      statOne: "cikël kthimi",
      statTwo: "sektorë shërbimi",
    },
    wipe: {
      eyebrow: "Provoje vetë",
      title: "Pastrimi është puna jonë.",
      hint: "Fshije ekranin për ta parë ndryshimin",
      revealTitle: "Kaq e pastër.",
      revealSub: "Çdo artikull kthehet i dezinfektuar, i hekurosur dhe i paketuar — gati për përdorim.",
    },
    sectors: {
      eyebrow: "Sektorët",
      title: "Një partner.",
      titleB: "Çdo industri.",
      sub: "Nga kuzhinat me yje deri te repartet spitalore — çdo sektor ka standarde të veçanta, dhe ne i njohim të gjitha.",
      items: [
        {
          name: "Restorante & Katering",
          desc: "Mbulesa tavoline, peceta dhe uniformat e kuzhinës — të pastra në nivelin që e kërkon gastronomia.",
        },
        {
          name: "Shëndetësi",
          desc: "Dezinfektim i certifikuar për çarçafë, uniforma dhe tekstile spitalore, me protokolle strikte higjiene.",
        },
        {
          name: "Akomodim",
          desc: "Çarçafë, peshqirë dhe rroba banje për hotelet që nuk pranojnë kompromis në përshtypjen e parë.",
        },
        {
          name: "Industri",
          desc: "Uniformat e punës, dorëza dhe tekstile teknike — të trajtuara për papastërtitë më të rënda.",
        },
      ],
    },
    tech: {
      slides: [
        {
          title: "Brenda makinës.",
          sub: "Kjo është pamja reale nga brendia e linjave tona të larjes — teknologji evropiane që pak lavanteri në rajon e kanë.",
        },
        {
          title: "Fuqi industriale. Butësi kirurgjikale.",
          sub: "Tonelata tekstil në ditë, me kontroll të saktë të temperaturës, dozimit dhe rrotullimit për çdo lloj pëlhure.",
        },
        {
          title: "Më pak ujë. Më pak energji.",
          sub: "Sistemet tona riciklojnë nxehtësinë dhe ujin — pastërti maksimale me gjurmë minimale në mjedis. Eco, me gjithë kuptimin.",
        },
      ],
    },
    process: {
      eyebrow: "Procesi",
      title: "Nga dera juaj, te dera juaj. Për 24 orë.",
      steps: [
        {
          num: "01",
          name: "Marrja",
          desc: "Flota jonë e mbledh tekstilin direkt nga objekti juaj, sipas orarit që ju përshtatet.",
        },
        {
          num: "02",
          name: "Larja & dezinfektimi",
          desc: "Çdo artikull kalon nëpër programe të dedikuara larjeje me dezinfektim të plotë termik e kimik.",
        },
        {
          num: "03",
          name: "Kontrolli i cilësisë",
          desc: "Inspektim copë për copë, hekurosje industriale dhe paketim higjienik i vulosur.",
        },
        {
          num: "04",
          name: "Dorëzimi",
          desc: "Kthimi brenda 24 orëve — i gatshëm për raftet, dhomat dhe repartet tuaja.",
        },
      ],
    },
    trust: {
      eyebrow: "Besueshmëria",
      title: "Kur siguria e vendit ta beson pastërtinë.",
      sub: "Eco Clean mban kontrata aktive me institucionet më të rëndësishme të Kosovës dhe hotelet më të mira të vendit.",
      cards: [
        {
          name: "Policia e Kosovës",
          desc: "Partner i kontraktuar për trajtimin e uniformave dhe tekstileve të Policisë së Kosovës.",
        },
        {
          name: "FSK",
          desc: "Shërbim i besuar për Forcën e Sigurisë së Kosovës, me standarde të verifikuara sigurie.",
        },
        {
          name: "Hotelet premium",
          desc: "Zgjedhja e hoteleve më të mira në vend për çarçafë e peshqirë pa asnjë njollë.",
        },
      ],
      stats: [
        { value: 24, suffix: "h", label: "cikli i kthimit" },
        { value: 4, suffix: "", label: "sektorë industrie" },
        { value: 100, suffix: "%", label: "siguri furnizimi" },
        { value: 365, suffix: "", label: "ditë në vit operativ" },
      ],
    },
    contact: {
      eyebrow: "Kontakti",
      title: "Të flasim për tekstilet tuaja.",
      sub: "Na tregoni për objektin tuaj dhe kthehemi me një ofertë të personalizuar brenda ditës.",
      name: "Emri juaj",
      company: "Kompania / Institucioni",
      sector: "Sektori",
      sectorOptions: ["Restorant & Katering", "Shëndetësi", "Akomodim", "Industri", "Tjetër"],
      message: "Mesazhi",
      submit: "Dërgo kërkesën",
      note: "Ose na shkruani direkt:",
    },
    footer: {
      tagline: "Lavanteri industriale me standarde evropiane, në zemër të Kosovës.",
      rights: "Të gjitha të drejtat e rezervuara.",
      links: "Navigimi",
      contactTitle: "Kontakti",
    },
  },
  en: {
    nav: {
      sectors: "Sectors",
      technology: "Technology",
      process: "Process",
      contact: "Contact",
      cta: "Get a quote",
    },
    hero: {
      eyebrow: "Industrial laundry — Kosovo",
      titleA: "A new standard",
      titleB: "of clean.",
      sub: "Eco Clean cares for the textiles of the country's leading institutions and finest hotels — with European industrial-grade technology and a 24-hour turnaround.",
      ctaPrimary: "Get a quote",
      ctaSecondary: "See the technology",
      trustLabel: "Trusted by",
      trustPolice: "Police of Kosovo",
      trustFsk: "Kosovo Security Force",
      trustHotels: "The country's premium hotels",
      videoChip: "Inside our machines",
      statOne: "turnaround cycle",
      statTwo: "service sectors",
    },
    wipe: {
      eyebrow: "Try it yourself",
      title: "Cleaning is what we do.",
      hint: "Wipe the screen to see the difference",
      revealTitle: "This clean.",
      revealSub: "Every item comes back disinfected, pressed and sealed — ready to use.",
    },
    sectors: {
      eyebrow: "Sectors",
      title: "One partner.",
      titleB: "Every industry.",
      sub: "From starred kitchens to hospital wards — every sector has its own standards, and we know them all.",
      items: [
        {
          name: "Restaurant & Catering",
          desc: "Tablecloths, napkins and kitchen uniforms — clean to the level gastronomy demands.",
        },
        {
          name: "Health Care",
          desc: "Certified disinfection for sheets, uniforms and hospital textiles under strict hygiene protocols.",
        },
        {
          name: "Accommodation",
          desc: "Linens, towels and bathrobes for hotels that never compromise on first impressions.",
        },
        {
          name: "Industrial",
          desc: "Workwear, gloves and technical textiles — treated for the heaviest soiling.",
        },
      ],
    },
    tech: {
      slides: [
        {
          title: "Inside the machine.",
          sub: "This is real footage from inside our washing lines — European technology few laundries in the region can match.",
        },
        {
          title: "Industrial power. Surgical gentleness.",
          sub: "Tons of textiles a day, with precise control of temperature, dosing and rotation for every fabric type.",
        },
        {
          title: "Less water. Less energy.",
          sub: "Our systems recycle heat and water — maximum cleanliness with a minimal environmental footprint. Eco, in every sense.",
        },
      ],
    },
    process: {
      eyebrow: "Process",
      title: "From your door, to your door. In 24 hours.",
      steps: [
        {
          num: "01",
          name: "Pickup",
          desc: "Our fleet collects textiles directly from your premises, on a schedule that suits you.",
        },
        {
          num: "02",
          name: "Wash & disinfect",
          desc: "Every item runs through dedicated wash programs with full thermal and chemical disinfection.",
        },
        {
          num: "03",
          name: "Quality control",
          desc: "Piece-by-piece inspection, industrial pressing and sealed hygienic packaging.",
        },
        {
          num: "04",
          name: "Delivery",
          desc: "Back within 24 hours — ready for your shelves, rooms and wards.",
        },
      ],
    },
    trust: {
      eyebrow: "Credibility",
      title: "When national security trusts you with clean.",
      sub: "Eco Clean holds active contracts with Kosovo's most important institutions and the country's finest hotels.",
      cards: [
        {
          name: "Police of Kosovo",
          desc: "Contracted partner for the uniforms and textiles of the Police of Kosovo.",
        },
        {
          name: "Kosovo Security Force",
          desc: "Trusted service for the Kosovo Security Force, with verified security standards.",
        },
        {
          name: "Premium hotels",
          desc: "The choice of the country's best hotels for spotless linens and towels.",
        },
      ],
      stats: [
        { value: 24, suffix: "h", label: "turnaround cycle" },
        { value: 4, suffix: "", label: "industry sectors" },
        { value: 100, suffix: "%", label: "supply reliability" },
        { value: 365, suffix: "", label: "days a year operational" },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your textiles.",
      sub: "Tell us about your facility and we'll come back with a tailored offer within the day.",
      name: "Your name",
      company: "Company / Institution",
      sector: "Sector",
      sectorOptions: ["Restaurant & Catering", "Health Care", "Accommodation", "Industrial", "Other"],
      message: "Message",
      submit: "Send request",
      note: "Or write to us directly:",
    },
    footer: {
      tagline: "Industrial laundry with European standards, in the heart of Kosovo.",
      rights: "All rights reserved.",
      links: "Navigation",
      contactTitle: "Contact",
    },
  },
};

export type Dict = (typeof dict)["sq"];

const LangContext = createContext<{
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
}>({ lang: "en", t: dict.en, setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("ecoclean-lang");
    if (saved === "en" || saved === "sq") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ecoclean-lang", l);
    document.documentElement.lang = l;
  };

  return (
    <LangContext.Provider value={{ lang, t: dict[lang] as Dict, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
