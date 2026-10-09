"use client";

import { useEffect } from "react";
import { scrollToId } from "@/lib/scroll-to-id";

export function FaqHashScroller() {
  useEffect(() => {
    if (window.location.hash !== "#faq") return;
    const timeout = setTimeout(() => scrollToId("faq"), 50);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}
