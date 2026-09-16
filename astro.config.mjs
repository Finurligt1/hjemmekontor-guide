import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Midlertidigt sat til GitHub Pages, indtil der er et rigtigt domæne.
// "site" bruges til sitemap.xml og canonical-links, "base" er nødvendig fordi
// GitHub Pages her serverer sitet under /hjemmekontor-guide/ og ikke fra roden.
export default defineConfig({
  site: "https://finurligt1.github.io",
  base: "/hjemmekontor-guide",
  integrations: [sitemap()],
});
