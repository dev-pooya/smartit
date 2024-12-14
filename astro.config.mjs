import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "static", // Ensures the site is built as static files
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
    react(),
    mdx(),
  ],
});
