import {
  ConceptsIcon,
  GetStartedIcon,
  NexusSdkIcon,
  UiElementsIcon,
} from "@/components/home/card-icons";
import { CategoryCard } from "@/components/home/category-card";

const nexusCategories = [
  {
    href: "/docs/nexus/get-started",
    icon: <GetStartedIcon />,
    title: "Get started",
    description:
      "Pick your path — SDK for headless apps or drop-in UI Elements.",
  },
  {
    href: "/docs/nexus/concepts",
    icon: <ConceptsIcon />,
    title: "Concepts",
    description:
      "Intents, solvers, liquidity routing, and how cross-chain operations work under the hood.",
  },
  {
    href: "/docs/nexus/nexus-ui-elements",
    icon: <UiElementsIcon />,
    title: "UI Elements",
    description:
      "Drop-in widgets for bridging, swaps, deposits, balances, and transaction history.",
  },
  {
    href: "/docs/nexus/nexus-sdk",
    icon: <NexusSdkIcon />,
    title: "Nexus SDK",
    description:
      "Bridge and swap methods, React hooks, and full TypeScript API reference.",
  },
];

const daCategories = [
  {
    href: "/docs/da/get-started",
    icon: <GetStartedIcon />,
    title: "Get started",
    description:
      "Overview of Avail DA's architecture with quick links to guides, APIs, and tutorials.",
  },
  {
    href: "/docs/da/concepts",
    icon: <ConceptsIcon />,
    title: "Concepts",
    description:
      "Networks, app IDs, the block explorer, and transaction pricing.",
  },
  {
    href: "/docs/da/build",
    icon: <UiElementsIcon />,
    title: "Build",
    description:
      "Post data, deploy rollups with OP Stack, Arbitrum, or CDK, and integrate Turbo DA.",
  },
  {
    href: "/docs/da/operate",
    icon: <NexusSdkIcon />,
    title: "Operate",
    description:
      "Run light clients, full nodes, or become a validator on the Avail network.",
  },
];

export function ProductGrid() {
  return (
    <section className="mx-auto w-full max-w-[938px] px-6 pb-16 md:pb-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {/* Nexus column */}
        <div className="relative flex flex-col gap-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-1"
            style={{
              background:
                "radial-gradient(ellipse 100% 56% at 50% 50%, var(--color-hero-glow) 0%, transparent 100%)",
            }}
          />
          <h2
            className="text-center text-2xl text-brand md:text-[28px]"
            style={{ fontFamily: "Delight, sans-serif", fontWeight: 500 }}
          >
            Avail Nexus
          </h2>
          <div className="flex flex-col">
            {nexusCategories.map((cat) => (
              <CategoryCard
                key={cat.href}
                {...cat}
                className="-mt-px first:mt-0"
              />
            ))}
          </div>
        </div>

        {/* DA column */}
        <div className="relative flex flex-col gap-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-1"
            style={{
              background:
                "radial-gradient(ellipse 100% 56% at 50% 50%, var(--color-hero-glow) 0%, transparent 100%)",
            }}
          />
          <h2
            className="text-center text-2xl text-brand md:text-[28px]"
            style={{ fontFamily: "Delight, sans-serif", fontWeight: 500 }}
          >
            Avail DA
          </h2>
          <div className="flex flex-col">
            {daCategories.map((cat) => (
              <CategoryCard
                key={cat.href}
                {...cat}
                className="-mt-px first:mt-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
