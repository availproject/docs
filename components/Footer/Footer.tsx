"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMobileView } from "../../hooks/useMobileView";
import { useMemo } from "react";
import footerStyle from "./Footer.module.css";
import { ROUTES } from "../../utils/constant";
import { useTheme } from "nextra-theme-docs";
import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

interface SubLinkTypes {
  id: number;
  label: string;
  inActive?: boolean;
  isInternal?: boolean;
  link: string;
}

interface FooterLinkTypes {
  id: number;
  label: string;
  inActive?: boolean;
  subLinks: SubLinkTypes[];
}

export const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

    // Only show the correct logo after component has mounted on client
    useEffect(() => {
      setMounted(true);
    }, []);

    const isDarkMode = mounted && resolvedTheme === "dark";
  const isMobile = useMobileView();
  const footerLinks: FooterLinkTypes[] = [
    {
      id: 1,
      label: "Resources",
      subLinks: [
        {
          id: 1,
          label: "Website",
          link: "https://www.availproject.org/",
        },
        {
          id: 2,
          label: "About Us",
          link: "https://www.availproject.org/about",
        },
        {
          id: 3,
          label: "Careers",
          link: ROUTES.CAREERS,
        },
        {
          id: 4,
          label: "Blog",
          link: ROUTES.BLOG,
        },
        {
          id: 5,
          label: "Privacy Policy",
          link: "https://www.availproject.org/privacy-policy",
        },
        {
          id: 6,
          label: "T & C",
          link: "https://www.availproject.org/terms",
        },
        {
          id: 7,
          label: "Ecosystem",
          link: "https://www.availproject.org/ecosystem",
        },
      ],
    },
    {
      id: 2,
      label: "Avail Nexus",
      subLinks: [
        {
          id: 1,
          label: "Introduction",
          link: "/nexus/introduction-to-nexus",
        },
        {
          id: 2,
          label: "Concepts",
          link: "/nexus/concepts",
        },
        {
          id: 3,
          label: "Reference",
          link: "/nexus/avail-nexus-sdk",
        },
        {
          id: 4,
          label: "How does Avail Nexus work?",
          link: "https://blog.availproject.org/how-avail-nexus-works-simplifying-multichain-fragmentation/",
        },
        {
          id: 5,
          label: "Nexus Elements",
          link: "https://elements.nexus.availproject.org/"
        }
       
      ],
    },
    {
      id: 3,
      label: "Avail DA",
      subLinks: [
        {
          id: 1,
          label: "Introduction",
          link: "/da/welcome-to-avail-docs",
        },
        {
          id: 2,
          label: "Deploy a Rollup",
          link: "/da/build-with-avail/deploy-rollup-on-avail",
        },
        {
          id: 3,
          label: "Run a Validator",
          link: "/da/operate-a-node/become-a-validator",
        },
        {
          id: 4,
          label: "Report a Bug",
          link: "/da/bug-bounty",
        },
        {
          id: 5,
          label: "DA Whitepaper",
          link: ROUTES.REFER_DOCS,
        },
       
      ],
    },
    {
      id: 2,
      label: "Support",
      subLinks: [
        {
          id: 1,
          label: "Discord",
          link: ROUTES.DISCORD,
        },
        {
          id: 2,
          label: "Github",
          link: ROUTES.GITHUB,
        },
      ],
    },
    {
      id: 3,
      label: "Press Kit",
      subLinks: [
        {
          id: 1,
          label: "Brand Assets",
          link: "https://www.availproject.org/brand-assets",
        },
      ],
    },
  ];

  const footerMobile = useMemo(() => {
    if (isMobile) {
      return {
        front: "/mobile/footer_front.png')",
        back: "/mobile/footer_back.png",
      };
    }
    return {
      front: "/desktop/footer_front.png",
      back: "/desktop/footer_back.png",
    };
  }, [isMobile]);

  return (
    <>
      <div className="h-30"></div>
      <footer
        className={`${footerStyle.footer_container} ${
          isDarkMode ? footerStyle.dark : footerStyle.light
        }`}
      >
        <img
          src={footerMobile.back}
          width={"100%"}
          alt={"Footer Back Design"}
        />
        <div className={footerStyle.footer}>
          <div className="dark:!text-white dark:opacity-90 !text-black">
            <img
              src="/avail-logo-blue.svg"
              width={"112px"}
              alt="avail logo"
            />
            <p className="dark:!text-white !text-black">
              Shaping an era of connectivity, where value flows freely and access is unlimited            </p>
            <div>
              <Link href="https://t.me/AvailProject" target="_blank" aria-label="telegram">
                <FaTelegram
                  width={"18px"}
                  height={"18px"}
                />
              </Link>
              <Link href="https://x.com/AvailProject" target="_blank" aria-label="x">
                <FaXTwitter width={"18px"} height={"18px"}/>
              </Link>
              <Link href={ROUTES.DISCORD} target="_blank" aria-label="x">
                <FaDiscord width={"18px"} height={"18px"}/>
              </Link>
              <Link
                href={ROUTES.LINKEDIN}
                target="_blank"
                aria-label="linkedin"
              >
                <FaLinkedin
                  width={"18px"}
                  height={"18px"}
                />
              </Link>
              <Link href="https://www.youtube.com/@Availproject" target="_blank" aria-label="youtube">
                <FaYoutube
                  width={"18px"}
                  height={"18px"}
                />
              </Link>
            </div>
          </div>
          <div className={footerStyle.footer_links}>
            {footerLinks
              .filter((ele: FooterLinkTypes) => !ele.inActive)
              .map((data: FooterLinkTypes) => {
                return (
                  <div key={data.id} className={footerStyle.footer_main}>
                    <div className={`font-medium`}>{data.label}</div>
                    {data.subLinks
                      .filter((ele: SubLinkTypes) => !ele.inActive)
                      .map((link: SubLinkTypes) => {
                        return (
                          <Link
                            href={link.link}
                            key={link.id}
                            target={link.isInternal ? "_self" : "_blank"}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      </footer>
    </>
  );
};