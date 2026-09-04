import { InfoPage, InfoSection } from "@/components/info/info-page";
import { SITE_URL } from "@/lib/structured-data";

export const metadata = {
  title: "Privacy",
  description:
    "What the Avail documentation site collects — analytics, stored preferences, optional wallet connections, and page feedback — and how to opt out.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy"
      lede="This page describes what docs.availproject.org collects when you read it. It covers this documentation site only — not the Avail network itself, which is a public blockchain, and not other Avail properties."
    >
      <InfoSection heading="Analytics">
        <p>
          We use PostHog to understand which pages are useful and where people
          get stuck. It records page views, how far down a page you scroll, how
          long you stay, and clicks on links, buttons and forms. Analytics
          requests are proxied through this domain rather than sent to a
          third-party domain directly.
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
          The site is hosted on Vercel, which processes standard request data
          such as IP address and user agent in order to serve pages and protect
          the service. Uploaded feedback screenshots are stored in Vercel Blob
          storage.
        </p>
      </InfoSection>

      <InfoSection heading="Questions">
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
