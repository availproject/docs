import Link from "next/link";
import { SiteFooter } from "@/components/home/site-footer";

/**
 * Shell for the standalone informational pages (About, Contact, Privacy).
 *
 * Mirrors the home page frame — muted ground, bordered content panel, shared
 * footer — so these pages read as part of the site rather than bolted on.
 */
export function InfoPage({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main-content" className="relative">
      <div className="md:px-3 md:pt-3">
        <div className="relative overflow-hidden md:border md:border-border bg-background">
          <div className="mx-auto w-full max-w-160 px-6 py-16 md:py-24">
            <nav className="mb-6">
              <Link
                href="/"
                className="ui-16 text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Avail Documentation
              </Link>
            </nav>
            <h1 className="font-serif text-2xl md:text-[28px] font-medium leading-8 md:leading-9 tracking-[0.56px] text-brand">
              {title}
            </h1>
            <p className="body-16 mt-4 text-secondary-foreground">{lede}</p>
            <div className="mt-10 flex flex-col gap-10">{children}</div>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <SiteFooter />
      </div>
    </main>
  );
}

/** A titled block within an {@link InfoPage}. */
export function InfoSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="ui-16 font-medium text-foreground">{heading}</h2>
      <div className="body-16 flex flex-col gap-3 text-secondary-foreground">
        {children}
      </div>
    </section>
  );
}
