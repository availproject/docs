"use client";

import { Navbar } from "nextra-theme-docs";
import { useTheme } from "nextra-theme-docs";
import Image from "next/image";

export const CustomNavbar = () => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    
        <div className="flex flex-row items-center">
          <Image
            src={
              isDarkMode
                ? "/avail_light.svg"
                : "/avail_logo_horizontal_dark.svg"
            }
            alt="avail-logo"
            width={125}
            height={40}
          />
        </div>
      
  );
};