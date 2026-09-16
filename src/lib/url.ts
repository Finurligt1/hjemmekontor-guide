// Astro tilføjer IKKE automatisk "base" (fra astro.config.mjs) til hårdkodede
// stier i markup - det skal gøres manuelt. Brug denne helper til alle interne
// links og til stier på billeder i public/ (fx fra content-collection-felter).
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.replace(/^\/+/, "");
  return cleanBase + cleanPath;
}
