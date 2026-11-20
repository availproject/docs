/**
 * Shared schema.org identity for the docs site.
 *
 * These objects are emitted as JSON-LD so agents can establish who publishes
 * this documentation without scraping the rendered page. Every value here is
 * sourced from content already present on the site — nothing is asserted that
 * cannot be verified from an official Avail property.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://docs.availproject.org";

const AVAIL_HOME = "https://www.availproject.org";

export const AVAIL_SOCIAL_PROFILES = [
  "https://x.com/AvailProject",
  "https://github.com/availproject",
  "https://discord.com/invite/AvailProject",
  "https://t.me/AvailCommunity",
];

export const organizationLd = {
  "@type": "Organization",
  "@id": `${AVAIL_HOME}/#organization`,
  name: "AVAIL",
  alternateName: "AVAIL Project",
  url: AVAIL_HOME,
  logo: `${SITE_URL}/avail_logo.png`,
  description:
    "AVAIL is a modular blockchain stack providing data availability (AVAIL DA) and cross-chain unification (AVAIL Nexus).",
  sameAs: AVAIL_SOCIAL_PROFILES,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      url: "https://discord.com/invite/AvailProject",
      availableLanguage: "en",
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "business@availproject.org",
      availableLanguage: "en",
    },
    {
      "@type": "ContactPoint",
      contactType: "security",
      email: "security@availproject.org",
      availableLanguage: "en",
    },
  ],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationLd,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "AVAIL Documentation",
      description:
        "Documentation for AVAIL DA (data availability) and AVAIL Nexus (cross-chain unification).",
      inLanguage: "en",
      publisher: { "@id": `${AVAIL_HOME}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/api/search?query={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "AVAIL",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux, macOS, Windows",
      url: AVAIL_HOME,
      softwareHelp: SITE_URL,
      publisher: { "@id": `${AVAIL_HOME}/#organization` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};
