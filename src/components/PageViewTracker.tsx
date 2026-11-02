"use client";

import { useEffect } from "react";
import { track } from "@/lib/client-analytics";

export function PageViewTracker() {
  useEffect(() => {
    track("page_view");
  }, []);
  return null;
}
