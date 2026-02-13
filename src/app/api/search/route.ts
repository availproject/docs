import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

export const { GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
  search: {
    relevance: {
      k: 1.5, // Higher term-frequency saturation
      b: 0.9, // Stronger length normalization — shorter docs score higher
    },
  },
});
