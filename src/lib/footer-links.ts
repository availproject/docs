export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const pagesColumn1: FooterLink[] = [
  { label: "Home", href: "https://www.availproject.org", external: true },
  {
    label: "About us",
    href: "https://www.availproject.org/aboutus",
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

export const pagesColumn2: FooterLink[] = [
  { label: "Blog", href: "https://blog.availproject.org", external: true },
  {
    label: "Ecosystem",
    href: "https://www.availproject.org/ecosystem",
    external: true,
  },
  {
    label: "T&C",
    href: "https://www.availproject.org/termsandconditions",
    external: true,
  },
  {
    label: "Whitepaper",
    href: "https://www.availproject.org/whitepaper",
    external: true,
  },
];

export const supportLinks: FooterLink[] = [
  { label: "Docs", href: "/docs/da/get-started" },
  {
    label: "Discord",
    href: "https://discord.com/invite/AvailProject",
    external: true,
  },
  { label: "GitHub", href: "https://github.com/availproject", external: true },
];

export const pressKitLinks: FooterLink[] = [
  {
    label: "Brand Assets",
    href: "https://www.availproject.org/brand",
    external: true,
  },
];

export const socialLinks: FooterLink[] = [
  { label: "X (Twitter)", href: "https://x.com/AvailProject", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/availproject/",
    external: true,
  },
  { label: "Telegram", href: "https://t.me/AvailCommunity", external: true },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Availproject",
    external: true,
  },
];
