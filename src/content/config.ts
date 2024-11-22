import { defineCollection, z } from "astro:content";

const servicesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pricingPlans: z
      .array(
        z.object({
          title: z.string(),
          price: z.string(),
          attributes: z.array(z.string()),
        })
      )
      .optional(),
  }),
});

export const collections = {
  services: servicesCollection,
};
