"use client";

import { useEffect } from "react";
import { addRecentPage } from "@/lib/recent-pages";

interface TrackPageVisitProps {
  url: string;
  title: string;
}

export function TrackPageVisit({ url, title }: TrackPageVisitProps) {
  useEffect(() => {
    addRecentPage(url, title);
  }, [url, title]);

  return null;
}
