"use client";

import { useRef } from "react";

export function ThemedImage({
  light,
  dark,
  alt,
  width = "100%",
}: {
  light: string;
  dark: string;
  alt: string;
  width?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openLightbox = () => dialogRef.current?.showModal();

  return (
    <>
      <button
        type="button"
        onClick={openLightbox}
        className="my-8 block dark:hidden cursor-zoom-in p-0 bg-transparent border-none outline-none w-full text-left"
      >
        {/* biome-ignore lint/performance/noImgElement: CSS theme switching requires native img */}
        <img
          src={light}
          alt={alt}
          width={width}
          className="border border-border"
        />
      </button>
      <button
        type="button"
        onClick={openLightbox}
        className="my-8 hidden dark:block cursor-zoom-in p-0 bg-transparent border-none outline-none w-full text-left"
      >
        {/* biome-ignore lint/performance/noImgElement: CSS theme switching requires native img */}
        <img
          src={dark}
          alt={alt}
          width={width}
          className="border border-border"
        />
      </button>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: dialog backdrop click-to-close is standard UX */}
      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="max-w-[70vw] max-h-[70vh] border-none outline-none bg-transparent backdrop:bg-black/80 backdrop:backdrop-blur-sm p-0 m-auto"
      >
        {/* biome-ignore lint/performance/noImgElement: CSS theme switching requires native img */}
        <img
          src={light}
          alt={alt}
          className="max-w-full max-h-[70vh] object-contain block dark:hidden"
        />
        {/* biome-ignore lint/performance/noImgElement: CSS theme switching requires native img */}
        <img
          src={dark}
          alt={alt}
          className="max-w-full max-h-[70vh] object-contain hidden dark:block"
        />
      </dialog>
    </>
  );
}
