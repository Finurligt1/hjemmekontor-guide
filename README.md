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

## Nuværende opsætning: GitHub Pages

Sitet deployes lige nu automatisk til **GitHub Pages** ved hvert push til
`main`, via `.github/workflows/deploy.yml`. Live-URL:

**https://finurligt1.github.io/hjemmekontor-guide/**

Dette kræver én engangsindstilling i repoet (se "Aktivér GitHub Pages"
nedenfor). `site` og `base` i `astro.config.mjs` er sat til denne URL, og
`siteUrl` i `src/site.config.ts` matcher.

### Aktivér GitHub Pages (kun én gang)

1. Gå til repoets **Settings → Pages**.
2. Under **Build and deployment → Source**, vælg **GitHub Actions**.
3. Push (eller gen-kør workflowet under **Actions**) - sitet er live på
   URL'en ovenfor et minuts tid efter.

### Skift til eget domæne senere

1. Ret `src/site.config.ts`:
   - `name`: sidens navn
   - `niche`: din niche
   - `siteUrl`: dit rigtige domæne (fx `https://dit-domaene.dk`)
   - `description`: kort beskrivelse af sitet
2. Ret `astro.config.mjs`:
   - `site`: samme domæne som `siteUrl` ovenfor
   - Fjern `base: "/hjemmekontor-guide"` helt (kun nødvendigt for GitHub
     Pages-projektsider under `github.io/<repo>/`)
3. Hvis du fortsat bruger GitHub Pages med eget domæne, tilføj en
   `CNAME`-fil i `public/` med domænet. Ellers kan du deploye til Netlify
   eller Vercel i stedet - begge genkender Astro automatisk (build command
   `npm run build`, output `dist`) uden ekstra konfiguration.
4. Slet eller erstat eksempelartiklen
   `src/content/produkter/eksempel-produkt.md`.
5. Læg et rigtigt favicon i `public/favicon.svg`, hvis du vil.

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
