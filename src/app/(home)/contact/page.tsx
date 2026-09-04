import { InfoPage, InfoSection } from "@/components/info/info-page";
import { SITE_URL } from "@/lib/structured-data";

export const metadata = {
  title: "Contact",
  description:
    "How to reach the Avail team — developer support on Discord, documentation issues on GitHub, security disclosures, and business enquiries.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <InfoPage
      title="Contact"
      lede="How to reach the Avail team, depending on what you need."
    >
      <InfoSection heading="Developer support">
        <p>
          For build questions, integration help, and anything about running
          nodes, the fastest route is the community. Ask in the{" "}
          <a href="https://discord.com/invite/AvailProject">Avail Discord</a>,
          where the engineering team is active, or in the{" "}
          <a href="https://t.me/AvailCommunity">Avail Telegram community</a>.
        </p>
      </InfoSection>

      <InfoSection heading="Documentation issues">
        <p>
          If a page is wrong, out of date, or missing, use the feedback control
          at the bottom of that page — it goes straight to the docs backlog. You
          can also open an issue in the{" "}
          <a href="https://github.com/availproject">
            Avail GitHub organisation
          </a>{" "}
          against the relevant repository.
        </p>
      </InfoSection>

      <InfoSection heading="Security disclosures">
        <p>
          Please do not report vulnerabilities in public channels. Email{" "}
          <a href="mailto:security@availproject.org">
            security@availproject.org
          </a>
          . Scope, rewards, and the disclosure process are described in the{" "}
          <a href="/docs/da/bug-bounty">bug bounty documentation</a>.
        </p>
      </InfoSection>

      <InfoSection heading="Business and partnerships">
        <p>
          For partnership, integration, and commercial enquiries — including
          access to Turbo DA — email{" "}
          <a href="mailto:business@availproject.org">
            business@availproject.org
          </a>
          .
        </p>
      </InfoSection>

      <InfoSection heading="Elsewhere">
        <p>
          Announcements and updates are posted on{" "}
          <a href="https://x.com/AvailProject">X</a>. General information about
          the project, including the team and open roles, lives on the{" "}
          <a href="https://www.availproject.org">main Avail website</a>.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
