import Link from "next/link";
import type { FooterLink } from "@/lib/footer-links";
import {
  pagesColumn1,
  pagesColumn2,
  pressKitLinks,
  socialLinks,
  supportLinks,
} from "@/lib/footer-links";

function MiniFooterLink({ link }: { link: FooterLink }) {
  const className =
    "ui-14 text-muted-foreground transition-[color] hover:text-foreground";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

function MiniFooterColumn({
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
            <MiniFooterLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MiniFooter() {
  return (
    <footer className="mt-auto border-t border-border pt-10 pb-4 not-prose">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-[max-content_1fr_max-content_max-content_1fr_max-content] md:gap-x-4">
        {/* Pages — single list on mobile, two sub-columns on md+ */}
        <div className="col-span-1">
          <div className="md:hidden">
            <MiniFooterColumn
              heading="Pages"
              links={[...pagesColumn1, ...pagesColumn2]}
            />
          </div>
          <div className="hidden md:flex md:gap-16">
            <MiniFooterColumn heading="Pages" links={pagesColumn1} />
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
                    <MiniFooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="col-span-1 md:col-start-3">
          <MiniFooterColumn heading="Support" links={supportLinks} />
        </div>

        {/* Socials + Press Kit */}
        <div className="col-span-2 flex gap-x-6 gap-y-8 sm:col-span-1 sm:flex-col sm:gap-12 md:contents">
          <div className="md:col-start-6">
            <MiniFooterColumn heading="Socials" links={socialLinks} />
          </div>
          <div className="md:col-start-4 md:row-start-1">
            <MiniFooterColumn heading="Press Kit" links={pressKitLinks} />
          </div>
        </div>
      </div>
    </footer>
  );
}
