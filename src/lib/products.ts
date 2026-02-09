export interface Product {
  slug: "da" | "nexus";
  label: string;
  basePath: string;
  startUrl: string;
  logoKey: "avail-da" | "avail-nexus";
}

export const products: Product[] = [
  {
    slug: "da",
    label: "Avail DA",
    basePath: "/docs/da",
    startUrl: "/docs/da/welcome-to-avail-docs",
    logoKey: "avail-da",
  },
  {
    slug: "nexus",
    label: "Avail Nexus",
    basePath: "/docs/nexus",
    startUrl: "/docs/nexus/introduction-to-nexus",
    logoKey: "avail-nexus",
  },
];

export function getActiveProduct(pathname: string): Product | undefined {
  return products.find((p) => pathname.startsWith(p.basePath));
}
