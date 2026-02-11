import {
  Rocket,
  Lightbulb,
  LayoutDashboard,
  Code,
  BookOpen,
  Hammer,
  Server,
  Compass,
} from "lucide-react";
import { CategoryCard } from "@/components/home/category-card";

const nexusCategories = [
  {
    href: "/docs/nexus/get-started",
    icon: Rocket,
    title: "Get started",
    description: "Set up Nexus and start building.",
  },
  {
    href: "/docs/nexus/concepts",
    icon: Lightbulb,
    title: "Concepts",
    description: "Core ideas behind Nexus.",
  },
  {
    href: "/docs/nexus/nexus-ui-elements",
    icon: LayoutDashboard,
    title: "UI Elements",
    description: "Pre-built components for your app.",
  },
  {
    href: "/docs/nexus/nexus-sdk",
    icon: Code,
    title: "Nexus SDK",
    description: "Integrate Nexus programmatically.",
  },
];

const daCategories = [
  {
    href: "/docs/da/welcome-to-avail-docs",
    icon: Compass,
    title: "Get started",
    description: "Introduction to Avail DA.",
  },
  {
    href: "/docs/da/learn-about-avail",
    icon: BookOpen,
    title: "Learn about Avail",
    description: "Understand data availability.",
  },
  {
    href: "/docs/da/build-with-avail",
    icon: Hammer,
    title: "Build with Avail",
    description: "Guides for builders and developers.",
  },
  {
    href: "/docs/da/operate-a-node",
    icon: Server,
    title: "Operate a Node",
    description: "Run and maintain Avail nodes.",
  },
];

export function ProductGrid() {
  return (
    <section className="mx-auto w-full max-w-[938px] px-6 pb-16 md:pb-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {/* Nexus column */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-center text-2xl text-brand md:text-[28px]"
            style={{ fontFamily: "Delight, sans-serif", fontWeight: 500 }}
          >
            Avail Nexus
          </h2>
          <div className="flex flex-col">
            {nexusCategories.map((cat) => (
              <CategoryCard key={cat.href} {...cat} className="-mt-px first:mt-0" />
            ))}
          </div>
        </div>

        {/* DA column */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-center text-2xl text-brand md:text-[28px]"
            style={{ fontFamily: "Delight, sans-serif", fontWeight: 500 }}
          >
            Avail DA
          </h2>
          <div className="flex flex-col">
            {daCategories.map((cat) => (
              <CategoryCard key={cat.href} {...cat} className="-mt-px first:mt-0" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
