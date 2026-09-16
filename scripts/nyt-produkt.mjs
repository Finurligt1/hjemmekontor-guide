#!/usr/bin/env node
// Opretter en ny produktartikel ud fra templates/artikel-skabelon.md.
// Brug: node scripts/nyt-produkt.mjs "Produktnavn" "https://affiliate-link.dk"
//
// Dette er den manuelle/lokale variant af arbejdsgangen. Når du arbejder med
// Claude Code, kan du i stedet blot skrive i chatten:
//   "Nyt produkt: [navn] – [link]"
// og lade Claude udfylde artiklen for dig (se CLAUDE.md).

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const [, , productName, affiliateLink] = process.argv;

if (!productName || !affiliateLink) {
  console.error(
    'Brug: node scripts/nyt-produkt.mjs "Produktnavn" "https://affiliate-link.dk"'
  );
  process.exit(1);
}

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const slug = slugify(productName);
const targetDir = join(root, "src", "content", "produkter");
const targetFile = join(targetDir, `${slug}.md`);

if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

if (existsSync(targetFile)) {
  console.error(`Filen findes allerede: ${targetFile}`);
  process.exit(1);
}

const templatePath = join(root, "templates", "artikel-skabelon.md");
let template = readFileSync(templatePath, "utf-8");

const today = new Date().toISOString().slice(0, 10);

template = template
  .replace('"[Produktnavn]"', `"${productName}"`)
  .replace(
    '"[SEO-titel - inkludér produktnavn og fx \'anmeldelse\' eller \'test\']"',
    `"${productName} - anmeldelse og test"`
  )
  .replace('"[Affiliate-link til produktet]"', `"${affiliateLink}"`)
  .replace("[ÅÅÅÅ-MM-DD]", today);

writeFileSync(targetFile, template, "utf-8");

console.log(`Oprettet: ${targetFile}`);
console.log(
  "Husk at udfylde beskrivelse, billede, pris, fordele/ulemper og teksten i artiklen."
);
