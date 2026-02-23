import Image from "next/image";
import Link from "next/link";
import { TrackedExternalLink } from "./tracked-external-link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const pagesColumn1: FooterLink[] = [
  { label: "Home", href: "https://www.availproject.org", external: true },
  {
    label: "About us",
    href: "https://www.availproject.org/about",
    external: true,
  },
  { label: "Nexus", href: "/docs/nexus/get-started" },
  { label: "DA", href: "/docs/da/get-started" },
  {
    label: "Careers",
    href: "https://www.availproject.org/careers",
    external: true,
  },
];

const pagesColumn2: FooterLink[] = [
  { label: "Blog", href: "https://blog.availproject.org", external: true },
  {
    label: "Ecosystem",
    href: "https://www.availproject.org/ecosystem",
    external: true,
  },
  {
    label: "Privacy Policy",
    href: "https://www.availproject.org/privacy-policy",
    external: true,
  },
  { label: "T&C", href: "https://www.availproject.org/terms", external: true },
  {
    label: "Whitepaper",
    href: "https://docs.availproject.org/whitepaper.pdf",
    external: true,
  },
];

const supportLinks: FooterLink[] = [
  { label: "Docs", href: "/docs/da/get-started" },
  { label: "Discord", href: "https://discord.gg/y6fHnxZQX8", external: true },
  { label: "GitHub", href: "https://github.com/availproject", external: true },
];

const pressKitLinks: FooterLink[] = [
  {
    label: "Brand Assets",
    href: "https://github.com/availproject/brand-assets",
    external: true,
  },
];

const socialLinks: FooterLink[] = [
  { label: "X (Twitter)", href: "https://x.com/AvailProject", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/avail-project/",
    external: true,
  },
  { label: "Telegram", href: "https://t.me/avaboricuazo", external: true },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Aboricuazo",
    external: true,
  },
];

function FooterLink({ link }: { link: FooterLink }) {
  const className =
    "ui-14 text-muted-foreground transition-[color] hover:text-foreground";

  if (link.external) {
    return (
      <TrackedExternalLink
        href={link.href}
        label={link.label}
        className={className}
      />
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: FooterLink[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="ui-14 font-medium text-foreground">{heading}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="overflow-hidden">
      <div className="mx-auto max-w-[928px] px-6 py-12 md:px-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[max-content_1fr_max-content_max-content_1fr_max-content] md:gap-x-4">
          {/* Pages — two sub-columns */}
          <div className="col-span-2 flex gap-16 md:col-span-1">
            <FooterColumn heading="Pages" links={pagesColumn1} />
            <div className="flex flex-col gap-3">
              <div
                className="ui-14 font-medium text-transparent select-none"
                aria-hidden="true"
              >
                &nbsp;
              </div>
              <ul className="flex flex-col gap-3">
                {pagesColumn2.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support + Copyright */}
          <div className="flex flex-col gap-3 md:col-start-3">
            <FooterColumn heading="Support" links={supportLinks} />
            <p className="ui-14 text-muted-foreground mt-auto pt-3">
              Copyright &copy; Avail Project. All rights reserved.
            </p>
          </div>

          <div className="md:col-start-4">
            <FooterColumn heading="Press Kit" links={pressKitLinks} />
          </div>

          <div className="md:col-start-6">
            <FooterColumn heading="Socials" links={socialLinks} />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          src="/avail-logo-grid.png"
          alt=""
          aria-hidden
          width={614}
          height={614}
          className="w-[614px] max-w-none dark:opacity-[0.1]"
        />
      </div>
    </footer>
  );
}
