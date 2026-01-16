"use client";

import { Navbar } from "nextra-theme-docs";
import { useTheme } from "nextra-theme-docs";
import Image from "next/image";
import { useEffect, useState } from "react";

export const CustomNavbar = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

    // Only show the correct logo after component has mounted on client
    useEffect(() => {
      setMounted(true);
    }, []);
    
    const isDarkMode = mounted && resolvedTheme === "dark";

  return (
    <div className="flex flex-row items-center">
      <Image
        src={
          isDarkMode
            ? "/img/avail-logo-blue.svg"
            : "/img/avail-logo-blue.svg"
        }
        alt="avail-logo"
        width={125}
        height={40}
      />
    </div>
  );
};