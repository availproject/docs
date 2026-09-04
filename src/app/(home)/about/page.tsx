import { InfoPage, InfoSection } from "@/components/info/info-page";
import { SITE_URL } from "@/lib/structured-data";

export const metadata = {
  title: "About",
  description:
    "About the Avail documentation site — what Avail DA and Avail Nexus are, who maintains these docs, and how the content is organised.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <InfoPage
      title="About these docs"
      lede="docs.availproject.org is the official documentation for Avail, published and maintained by the Avail Project."
    >
      <InfoSection heading="What Avail is">
        <p>
          Avail is a modular blockchain stack. It is split into two products,
          and this site documents both of them.
        </p>
        <p>
          <strong>Avail DA</strong> is a data availability layer. Rollups and
          other chains post their transaction data to Avail DA and can prove
          that the data was published, without every participant having to
          download all of it. The docs cover submitting and reading data,
          running full nodes and validators, light clients, network endpoints
          and chain specs, and the node API across TypeScript, Rust and Go.
        </p>
        <p>
          <strong>Avail Nexus</strong> is a cross-chain unification layer. It
          gives applications a single balance and a single transaction flow
          across many chains, through an SDK or through drop-in UI widgets. The
          docs cover the SDK reference, bridging, swaps, supported chains and
          tokens, and the widget components.
        </p>
      </InfoSection>

      <InfoSection heading="How this site is organised">
        <p>
          Content is split by product: everything under <code>/docs/da</code> is
          Avail DA, and everything under <code>/docs/nexus</code> is Avail
          Nexus. Each product has its own Get Started path, conceptual material,
          and API reference.
        </p>
      </InfoSection>

      <InfoSection heading="For AI agents and scripts">
        <p>
          These docs are published in machine-readable form as well as HTML.{" "}
          <a href="/llms.txt">/llms.txt</a> is an intent-based index of the
          whole site, with per-product dumps at{" "}
          <a href="/llms-da.txt">/llms-da.txt</a> and{" "}
          <a href="/llms-nexus.txt">/llms-nexus.txt</a>. Any documentation URL
          returns clean markdown if you append <code>.md</code> to it or send an{" "}
          <code>Accept: text/markdown</code> header, and structured reference
          data is available at{" "}
          <a href="/api/reference.json">/api/reference.json</a>.
        </p>
      </InfoSection>

      <InfoSection heading="Corrections and contributions">
        <p>
          Every page has a feedback control, and the docs are open source. If
          something here is wrong or missing, please tell us — see{" "}
          <a href="/contact">Contact</a> for the ways to reach the team.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
