import { InfoPage, InfoSection } from "@/components/info/info-page";
import { SITE_URL } from "@/lib/structured-data";

export const metadata = {
  title: "Privacy Notice",
  description:
    "What personal data the Avail documentation site collects, why it collects it, and what rights you have.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy Notice" lede="Last updated: 25 Sep 2026">
      <p className="body-16 text-secondary-foreground">
        This notice explains what personal data docs.availproject.org (the
        &ldquo;Site&rdquo;) collects when you use it, why, and what rights you
        have. It covers this documentation site only. It does not cover the
        Avail network, which is a public blockchain, or other Avail websites and
        products.
      </p>

      <InfoSection heading="Analytics">
        <p>
          We use 3rd party services like PostHog to understand which pages are
          useful and where people get stuck. It records page views, how far down
          a page you scroll, how long you stay, and clicks on links, buttons and
          forms. Analytics requests are proxied through this domain rather than
          sent to a third-party domain directly.
        </p>
        <p>
          Where session recordings are captured, all text inputs are masked
          before anything leaves your browser, so what you type is not recorded.
          Analytics state is kept in your browser&rsquo;s local storage and a
          cookie.
        </p>
        <p>
          If your browser sends a <code>Do Not Track</code> signal, analytics
          are disabled automatically. Blocking the analytics script does not
          affect any documentation content.
        </p>
      </InfoSection>

      <InfoSection heading="Preferences stored in your browser">
        <p>
          Two settings are saved locally so the site behaves consistently
          between visits: the network you have selected (mainnet or testnet) and
          your light or dark theme choice. These stay in your browser and are
          not sent to us. Clearing site data removes them.
        </p>
      </InfoSection>

      <InfoSection heading="Connecting a wallet">
        <p>
          Some Avail Nexus pages include live demo widgets that you can connect
          a wallet to. Connecting is entirely optional, and no documentation
          requires it. When you connect, the site reads your public address and
          the balances needed to render the demo. We never receive your private
          keys or seed phrase, and every transaction is signed in your own
          wallet.
        </p>
      </InfoSection>

      <InfoSection heading="Page feedback">
        <p>
          Each page has a feedback control. When you submit it, we receive your
          rating, the path of the page you were on, and anything you chose to
          add — a comment, contact details, or a screenshot.
        </p>
        <p>
          Please note that feedback is filed as an issue in a{" "}
          <a href="https://github.com/availproject/docs">
            public GitHub repository
          </a>
          . Anything you include, including contact details and screenshots,
          will be publicly visible. Leave out anything you would not want
          published, and use the channels on the <a href="/contact">Contact</a>{" "}
          page for private matters.
        </p>
      </InfoSection>

      <InfoSection heading="Hosting">
        <p>
          The site is hosted on 3rd party services such as Vercel, which
          processes standard request data such as IP address and user agent in
          order to serve pages and protect the service. Uploaded feedback
          screenshots are stored in 3rd party Blob storage.
        </p>
      </InfoSection>

      <InfoSection heading="Service providers and international transfers">
        <p>
          We use 3rd party service providers, which process personal data on our
          behalf under contracts that limit how they can use it.
        </p>
        <p>
          Some of these providers process data outside your country, including
          in the United States. Where required, we rely on appropriate
          safeguards such as the EU-US Data Privacy Framework or the European
          Commission&rsquo;s Standard Contractual Clauses.
        </p>
      </InfoSection>

      <InfoSection heading="Security">
        <p>
          We use reasonable technical and organisational measures to protect
          personal data, including encrypted connections and access controls. No
          method of transmission or storage is completely secure.
        </p>
      </InfoSection>

      <InfoSection heading="Changes to this notice">
        <p>
          We may update this notice from time to time. We will change the
          &ldquo;Last updated&rdquo; date above and, for material changes.
        </p>
      </InfoSection>

      <InfoSection heading="Contact">
        <p>
          For questions about this page, or to ask us to remove something you
          submitted, email{" "}
          <a href="mailto:info@availproject.org">info@availproject.org</a>.
          Security issues should go to{" "}
          <a href="mailto:security@availproject.org">
            security@availproject.org
          </a>{" "}
          instead — see <a href="/contact">Contact</a>.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
