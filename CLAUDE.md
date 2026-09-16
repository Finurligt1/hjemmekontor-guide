# Projektoversigt

Dette er et statisk affiliate content-site bygget med Astro. Sitet
anmelder produkter inden for én niche (sæt niche i `src/site.config.ts`)
og tjener penge via affiliate-links.

Vigtige mapper:
- `src/content/produkter/` - alle artikler (Markdown), én fil pr. produkt.
- `templates/artikel-skabelon.md` - skabelonen nye artikler skal følge.
- `src/content/config.ts` - schema (felter og typer) for hver artikel.
- `src/layouts/ArticleLayout.astro` - viser CTA-knap og disclosure-boks automatisk.
- `src/pages/index.astro` - forsiden. Lister automatisk alle artikler i
  `src/content/produkter/` sorteret efter nyeste dato - der skal IKKE
  opdateres en menu eller liste manuelt, når en ny artikel oprettes.

## Arbejdsgang: "Nyt produkt: [navn] – [link]"

Når brugeren skriver en besked i formen:

```
Nyt produkt: [produktnavn] – [affiliate-link]
```

(eller en tydelig variant af det, fx "Nyt produkt: XYZ Kaffemaskine, link:
https://..."), skal du gøre følgende uden at spørge om lov først, medmindre
noget er tvetydigt:

1. **Opret filen.** Lav en slug ud fra produktnavnet (små bogstaver, danske
   tegn omsat til ASCII, mellemrum til bindestreg) og opret
   `src/content/produkter/<slug>.md` baseret på strukturen i
   `templates/artikel-skabelon.md` og schemaet i `src/content/config.ts`.

2. **Udfyld frontmatter:**
   - `productName`: produktnavnet som brugeren skrev det.
   - `affiliateLink`: linket som brugeren gav. Indsæt det som det er i
     `affiliateLink`-feltet - selve `rel="sponsored nofollow"`-attributten
     sættes automatisk af `CtaButton.astro`, så du skal ikke tilføje den i
     Markdown-filen.
   - `title`: foreslå en SEO-venlig titel (inkl. produktnavn + noget i stil
     med "anmeldelse" eller "test").
   - `description`: foreslå en meta-beskrivelse på ca. 150-155 tegn.
   - `excerpt`: en kort tekst (1-2 sætninger) til produktkortet på forsiden.
   - `priceTier`: gæt fornuftigt ud fra produktet ("budget", "mellem" eller
     "premium"), og skriv evt. en `priceNote`.
   - `pros`/`cons`: foreslå 3-5 realistiske fordele og 2-3 ulemper baseret
     på produkttype - gør det tydeligt i din chat-besked til brugeren, at
     disse er forslag, som bør efterses/redigeres, da du ikke har testet
     produktet i virkeligheden.
   - `image`/`imageAlt`: sæt en midlertidig sti (fx `/images/<slug>.jpg`) og
     en beskrivende alt-tekst. Gør opmærksom på, at brugeren selv skal
     lægge et billede i `public/images/`.
   - `pubDate`: dagens dato.
   - `draft: false`.

3. **Skriv en kort brødtekst** (afsnittene "Hvem er produktet til?",
   "Vores vurdering", "Konklusion") som brugeren efterfølgende kan redigere.
   Gør det tydeligt at det er et udkast.

4. **Ikke rør forsiden manuelt.** Forsiden henter artikler automatisk fra
   `src/content/produkter/`, så der skal ikke tilføjes noget i
   `src/pages/index.astro`.

5. **Opsummér til brugeren** hvad du har oprettet: filsti, foreslået
   SEO-titel, meta-beskrivelse, og en påmindelse om at tilføje et rigtigt
   produktbillede og tjekke fordele/ulemper.

Spørg kun brugeren om noget, hvis produktnavn eller link mangler helt, eller
hvis beskeden er reelt tvetydig.
