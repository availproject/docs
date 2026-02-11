import { AvailIcon } from "@/components/logos/avail-icon";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center pt-16 pb-10 px-6 md:pt-24 md:pb-14">
      <AvailIcon className="size-14 text-brand mb-6" />
      <h1
        className="text-center text-brand leading-tight tracking-[0.02em]"
        style={{ fontFamily: "Delight, sans-serif", fontWeight: 500 }}
      >
        <span className="block text-3xl md:text-[56px] md:leading-[1.1]">
          Build with Avail
        </span>
        <span className="block text-3xl md:text-[56px] md:leading-[1.1]">
          &amp; Scale Access to the
        </span>
        <span className="block text-3xl md:text-[56px] md:leading-[1.1]">
          Onchain Economy
        </span>
      </h1>
    </section>
  );
}
