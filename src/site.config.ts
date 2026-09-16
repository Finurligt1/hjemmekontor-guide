// Central konfiguration for sitet. Ret disse værdier til din egen niche.
// "siteUrl" skal matche "site" i astro.config.mjs (uden "base"-delen).
export const siteConfig = {
  /** Sidens navn, vises i header, footer og browser-fane */
  name: "Hjemmekontor Guiden",

  /** Din niche i klartekst */
  niche: "hjemmekontor-udstyr",

  /**
   * Midlertidig GitHub Pages-URL, indtil der er et rigtigt domæne.
   * Skift til det endelige domæne, når det er klar - og husk at opdatere
   * "site" (og evt. fjerne "base") i astro.config.mjs på samme tid.
   */
  siteUrl: "https://finurligt1.github.io",

  /** Bruges som standard meta-beskrivelse og i disclosure-teksten */
  description:
    "Uafhængige anmeldelser og anbefalinger inden for hjemmekontor-udstyr. Vi hjælper dig med at vælge det rigtige produkt.",

  /** Sprog for <html lang="..."> */
  language: "da",

  /** Navn der vises som afsender/forfatter på siden */
  authorName: "Redaktionen",
} as const;
