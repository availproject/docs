import { Link, type DocsThemeConfig } from "nextra-theme-docs";
import Image from "next/image";
import { Footer } from "./components/Footer/Footer";
import { useRouter } from "next/router";

const config: DocsThemeConfig = {
  banner: {
    key: "Avail",
    text: (
      <>
        <h4 className="my-0 sm:mr-5 !px-[5vw] !text-white text-center paragraph !text-sm w-full">
          All phases of Avail's unification drop have now ended,{" "}  👉👉 {"  "}
          { <a
            style={{ color: '#3DA3FC', textDecoration: 'underline' }}
            href="/docs/the-avail-token/avail-unification-drop"
          >
            {" "}
            check out this page
          </a>
          }{"  👈👈  for more information."}
           {"  "}
        </h4>
      </>
    ),
  },
  darkMode: true,
  docsRepositoryBase: "https://github.com/availproject/docs/blob/main",
  chat: {
    link: "https://twitter.com/AvailProject",
    icon: (
      <svg width="24" height="24" viewBox="0 0 248 204">
        <path
          fill="currentColor"
          d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"
        />
      </svg>
    ),
  },
  primaryHue: 198,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  navigation: {
    prev: true,
    next: true,
  },
  footer: {
    component: <Footer />,
  },
  nextThemes: {
    defaultTheme: 'light',
  },
  useNextSeoProps() {
    const { route } = useRouter();
    if (route === "/") {
      return {
        titleTemplate: "Get Started with Building Blockchains",
      };
    } else {
      return {
        titleTemplate: "%s - Avail Developer Docs ",
      };
    }
  },
  head: () => {
    const title = "Get Started with building blockchains";
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} />
        <meta name="twitter:image" content={"/avail_logo_new.png"} />
        <meta property="og:description" content="Developer Documentation" />
      </>
    );
  },
  logo: function Logo() {
    return (
      <div className="flex flex-row items-center">
        <Image src={"/group.png"} alt="avail-logo" width={200} height={40} />
      </div>
    );
  },

  themeSwitch: {
    component: <div></div>,
  },
  search: {},
  project: {
    link: "https://github.com/availproject/docs",
  },
  toc: {
    backToTop: true,
    float: true,
    headingComponent: function Heading({ id, children }) {
      return (
        <>
          {children}
          {id === "installation" && " 💿"}
        </>
      );
    },
  },
};

export default config;
