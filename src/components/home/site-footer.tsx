import Link from "next/link";

const footerColumns = [
  {
    heading: "Pages",
    links: [
      { label: "Avail DA", href: "/docs/da/welcome-to-avail-docs" },
      { label: "Avail Nexus", href: "/docs/nexus/get-started" },
      { label: "Blog", href: "https://blog.availproject.org", external: true },
    ],
  },
  {
    heading: "Support",
    links: [
      {
        label: "Discord",
        href: "https://discord.gg/y6fHnxZQX8",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/availproject",
        external: true,
      },
      {
        label: "FAQs",
        href: "/docs/da/faqs",
      },
    ],
  },
  {
    heading: "Press Kit",
    links: [
      {
        label: "Brand Assets",
        href: "https://github.com/availproject/brand-assets",
        external: true,
      },
    ],
  },
  {
    heading: "Socials",
    links: [
      {
        label: "X (Twitter)",
        href: "https://x.com/AvailProject",
        external: true,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/avail-project/",
        external: true,
      },
      {
        label: "Telegram",
        href: "https://t.me/avaboricuazo",
        external: true,
      },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto max-w-[938px] px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {footerColumns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <h3 className="ui-14 font-medium text-foreground">
                {column.heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ui-14 text-muted-foreground transition-[color] can-hover:hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="ui-14 text-muted-foreground transition-[color] can-hover:hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center ui-14 text-muted-foreground">
          &copy; {new Date().getFullYear()} Avail Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
