import { useEffect, useRef, useState } from "react";

export function useEventListener(
  eventType: string,
  callback: (event: Event) => void,
  element: HTMLElement | Window | null
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}

export default function useHover(ref: React.RefObject<HTMLElement | null>) {
  const [hovered, setHovered] = useState(false);
  useEventListener("mouseover", () => setHovered(true), ref?.current);
  useEventListener("mouseout", () => setHovered(false), ref?.current);
  return hovered;
}
