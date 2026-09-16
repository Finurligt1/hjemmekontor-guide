# Affiliate content-site

Et statisk affiliate content-site bygget med [Astro](https://astro.build).
Sitet består af en forside med produktoversigt, produktartikler, en om-side
og en affiliate-oplysningsside (FTC/gennemsigtighedskrav).

## Kom i gang lokalt

```sh
npm install
npm run dev
```

Sitet kører herefter på `http://localhost:4321`.

## Før du går i luften

1. Ret `src/site.config.ts`:
   - `name`: sidens navn
   - `niche`: din niche, fx "kaffeudstyr til små lejligheder"
   - `siteUrl`: dit rigtige domæne
   - `description`: kort beskrivelse af sitet
2. Ret `site` i `astro.config.mjs` til samme domæne som `siteUrl` ovenfor
   (bruges til `sitemap.xml` og canonical-links).
3. Slet eller erstat eksempelartiklen
   `src/content/produkter/eksempel-produkt.md`.
4. Læg et rigtigt favicon i `public/favicon.svg`, hvis du vil.

## Deploy

Sitet er en almindelig statisk Astro-side (`npm run build` output i `dist/`)
og kan deployes uden ekstra konfiguration til:

- **Netlify**: Opret nyt site fra dit Git-repo. Build command: `npm run build`,
  publish directory: `dist`.
- **Vercel**: Importér repoet. Vercel genkender Astro automatisk
  (build command `npm run build`, output `dist`).
- **GitHub Pages**: Byg med `npm run build` og deploy indholdet af `dist/`
  til `gh-pages`-branchen (fx via en GitHub Action med
  `withastro/action`), eller brug `@astrojs/github-pages`-integrationen.

## Tilføje en ny artikel

### Med Claude Code (anbefalet fremadrettet)

Skriv bare i chatten:

```
Nyt produkt: [produktnavn] – [affiliate-link]
```

Claude opretter herefter selv en ny Markdown-fil i
`src/content/produkter/`, udfylder strukturen, foreslår en SEO-titel,
meta-beskrivelse og en kort tekst du kan redigere, sætter affiliate-linket
korrekt ind (med `rel="sponsored nofollow"` på CTA-knappen), og artiklen
dukker automatisk op på forsiden - du skal ikke opdatere nogen liste eller
menu manuelt.

Se `CLAUDE.md` for de præcise regler Claude følger for denne arbejdsgang.

### Manuelt / uden Claude

```sh
npm run nyt-produkt -- "Produktnavn" "https://affiliate-link.dk"
```

Dette opretter en ny fil i `src/content/produkter/` ud fra
`templates/artikel-skabelon.md`. Åbn filen bagefter og udfyld resten af
felterne (billede, pris, fordele/ulemper, tekst).

## Artikel-felter (frontmatter)

Se `src/content/config.ts` for det fulde schema. De vigtigste felter:

| Felt            | Beskrivelse                                              |
| --------------- | --------------------------------------------------------- |
| `title`         | SEO-titel (bruges i `<title>` og meta)                    |
| `description`   | Meta-beskrivelse                                           |
| `productName`   | Produktets navn (vises som overskrift)                     |
| `image`/`imageAlt` | Billede + alt-tekst (SEO/tilgængelighed)                |
| `priceTier`     | `budget`, `mellem` eller `premium`                          |
| `excerpt`       | Kort tekst til produktkortet på forsiden                    |
| `pros`/`cons`   | Lister med fordele/ulemper                                  |
| `affiliateLink` | Affiliate-linket (CTA-knappen sætter selv `rel`-attributten) |
| `ctaText`       | Tekst på CTA-knappen, fx "Se pris hos forhandler"           |
| `pubDate`       | Udgivelsesdato                                              |
| `draft`         | Sæt til `true` for at skjule artiklen i produktion          |

## SEO

- `sitemap.xml` genereres automatisk via `@astrojs/sitemap`.
- Hver side har meta description, canonical URL og Open Graph/Twitter-tags
  (`src/layouts/BaseLayout.astro`).
- Alt-tekst er et påkrævet felt på alle produktbilleder.
- `public/robots.txt` peger på sitemap'en.
