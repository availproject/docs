import Image from "next/image";
import Link from "next/link";
import type { FooterLink } from "@/lib/footer-links";
import {
  pagesColumn1,
  pagesColumn2,
  pressKitLinks,
  socialLinks,
  supportLinks,
} from "@/lib/footer-links";
import { TrackedExternalLink } from "./tracked-external-link";

function FooterLinkItem({ link }: { link: FooterLink }) {
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
            <FooterLinkItem link={link} />
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
        {/* Mobile: 3 columns — Pages | Support | Socials + Press Kit */}
        {/* Desktop: full 6-column layout */}
        <div className="grid grid-cols-3 gap-x-6 gap-y-8 md:grid-cols-[max-content_1fr_max-content_max-content_1fr_max-content] md:gap-x-4">
          {/* Pages — single list on mobile, two sub-columns on md+ */}
          <div className="col-span-1">
            {/* Mobile: all links in one column */}
            <div className="md:hidden">
              <FooterColumn
                heading="Pages"
                links={[...pagesColumn1, ...pagesColumn2]}
              />
            </div>
            {/* Desktop: two sub-columns */}
            <div className="hidden md:flex md:gap-16">
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
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="col-span-1 md:col-start-3">
            <FooterColumn heading="Support" links={supportLinks} />
          </div>

          {/* Socials + Press Kit: stacked in one cell on mobile, separate grid cells on desktop */}
          <div className="col-span-1 flex flex-col gap-12 md:contents">
            <div className="md:col-start-6">
              <FooterColumn heading="Socials" links={socialLinks} />
            </div>
            <div className="md:col-start-4 md:row-start-1">
              <FooterColumn heading="Press Kit" links={pressKitLinks} />
            </div>
          </div>
        </div>
        <p className="ui-14 text-muted-foreground mt-8">
          Copyright &copy; Avail Project. All rights reserved.
        </p>
      </div>
      <div className="mx-auto max-w-[928px] px-6 md:px-12">
        <Image
          src="/avail-logo-grid.png"
          alt=""
          aria-hidden
          width={614}
          height={614}
          className="w-full dark:opacity-[0.1]"
        />
      </div>
    </footer>
  );
}
