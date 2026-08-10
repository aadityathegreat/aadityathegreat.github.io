// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // User site, so it serves from the domain root rather than a /repo path.
  site: "https://aadityathegreat.github.io",
  build: {
    // One page, one stylesheet. Keeps the CSS in a file the browser can cache
    // instead of re-sending it inline on every visit.
    inlineStylesheets: "never",
  },
});
