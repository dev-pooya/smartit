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
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

const portfoliosCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    domain: z.string(),
    image: z.string(),
    techStack: z.array(z.string()),
  }),
});

export const collections = {
  services: servicesCollection,
  portfolios: portfoliosCollection,
};
