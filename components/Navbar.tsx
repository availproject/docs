"use client";

import Image from "next/image";

export const CustomNavbar = () => {
  return (
    <div className="flex flex-row items-center">
      <Image
        src="/avail-logo-blue.svg"
        alt="Avail"
        width={90}
        height={28}
        className="h-6 w-auto"
      />
    </div>
  );
};