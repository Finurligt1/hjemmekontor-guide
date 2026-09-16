import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// VIGTIGT: Opdatér "site" til dit rigtige domæne, når du har ét.
// Det bruges bl.a. til sitemap.xml og canonical-links.
export default defineConfig({
  site: "https://dit-domaene.dk",
  integrations: [sitemap()],
});
