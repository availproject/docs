import { FooterColumn, FooterLinkItem } from "@/components/home/site-footer";
import type { FooterLink } from "@/lib/footer-links";
import {
  pagesColumn1,
  pagesColumn2,
  pressKitLinks,
  socialLinks,
  supportLinks,
} from "@/lib/footer-links";

export function MiniFooter() {
  return (
    <footer className="mt-auto pt-10 not-prose">
      <div className="border-t border-border pt-10 pb-4 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-[max-content_1fr_max-content_max-content_1fr_max-content] md:gap-x-4">
        {/* Pages — single list on mobile, two sub-columns on md+ */}
        <div className="col-span-1">
          <div className="md:hidden">
            <FooterColumn
              heading="Pages"
              links={[...pagesColumn1, ...pagesColumn2]}
            />
          </div>
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
                {pagesColumn2.map((link: FooterLink) => (
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

        {/* Socials + Press Kit */}
        <div className="col-span-2 flex gap-x-6 gap-y-8 sm:col-span-1 sm:flex-col sm:gap-12 md:contents">
          <div className="md:col-start-6">
            <FooterColumn heading="Socials" links={socialLinks} />
          </div>
          <div className="md:col-start-4 md:row-start-1">
            <FooterColumn heading="Press Kit" links={pressKitLinks} />
          </div>
        </div>
      </div>
    </footer>
  );
}
