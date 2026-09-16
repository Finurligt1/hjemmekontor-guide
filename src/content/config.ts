import { defineCollection, z } from "astro:content";

const produkter = defineCollection({
  type: "content",
  schema: z.object({
    // SEO-titel til <title> og meta-beskrivelse. Kan afvige fra produktnavnet.
    title: z.string(),
    description: z.string(),

    // Selve produktet
    productName: z.string(),
    image: z.string(),
    imageAlt: z.string(),

    // Pris-indikator i stedet for en konkret pris, der hurtigt bliver forældet
    priceTier: z.enum(["budget", "mellem", "premium"]),
    priceNote: z.string().optional(),

    // Kort anmeldelse-tekst til produktkort på forsiden
    excerpt: z.string(),

    // Fordele/ulemper
    pros: z.array(z.string()),
    cons: z.array(z.string()),

    // Affiliate. "#" er en gyldig midlertidig placeholder, indtil det
    // rigtige affiliate-link er godkendt og sat ind.
    affiliateLink: z.string().min(1),
    ctaText: z.string().default("Se pris hos forhandler"),

    pubDate: z.date(),
    updatedDate: z.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  produkter,
};
