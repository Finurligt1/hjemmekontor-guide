// Central konfiguration for sitet. Ret disse værdier til din egen niche,
// og husk også at opdatere "site" i astro.config.mjs til samme domæne.
export const siteConfig = {
  /** Sidens navn, vises i header, footer og browser-fane */
  name: "Dit Affiliate Site",

  /** Din niche i klartekst, fx "kaffeudstyr til små lejligheder" */
  niche: "[skriv din niche her]",

  /** Skal matche "site" i astro.config.mjs */
  siteUrl: "https://dit-domaene.dk",

  /** Bruges som standard meta-beskrivelse og i disclosure-teksten */
  description:
    "Uafhængige anmeldelser og anbefalinger inden for [din niche]. Vi hjælper dig med at vælge det rigtige produkt.",

  /** Sprog for <html lang="..."> */
  language: "da",

  /** Navn der vises som afsender/forfatter på siden */
  authorName: "Redaktionen",
} as const;
