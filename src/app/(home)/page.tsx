import Link from "next/link";
import { AvailDALogo } from "@/components/logos/avail-da-logo";
import { AvailNexusLogo } from "@/components/logos/avail-nexus-logo";
import { products } from "@/lib/products";

const productCards = [
  {
    product: products[0],
    Logo: AvailDALogo,
    description: "The modular blockchain layer for data availability.",
  },
  {
    product: products[1],
    Logo: AvailNexusLogo,
    description: "The unification layer connecting blockchains.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Avail Documentation</h1>
      <p className="text-muted-foreground mb-10">
        Choose a product to get started.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {productCards.map(({ product, Logo, description }) => (
          <Link
            key={product.slug}
            href={product.startUrl}
            className="flex flex-col gap-4 rounded-xl border border-card-border bg-card p-6 transition-colors hover:bg-accent"
          >
            <Logo className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground">{description}</p>
            <span className="text-sm font-medium text-primary">
              Get started &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
