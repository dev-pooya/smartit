import { defineCollection, z } from "astro:content";

const servicesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    subtitle: z.string().optional(),
    effectiveTitle: z.string().optional(),
    pricingPlansMode: z.enum(["start", "monthly"]),
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

const blogCollection = defineCollection({
  schema: z.object({
    id: z.string(),
    title: z.string(),
    thumbnail: z.string(),
    alt: z.string(),
    tags: z.array(z.string()),
    keywords: z.string().optional(),
    description: z.string().optional(),
    headings: z.array(
      z.object({
        title: z.string(),
        id: z.string(),
        subHeadings: z
          .array(
            z.object({
              title: z.string(),
              id: z.string(),
              subHeadings: z
                .array(
                  z.object({
                    title: z.string(),
                    id: z.string(),
                  })
                )
                .optional(),
            })
          )
          .optional(),
      })
    ),
  }),
});

export const collections = {
  services: servicesCollection,
  portfolios: portfoliosCollection,
  blogs: blogCollection,
};
