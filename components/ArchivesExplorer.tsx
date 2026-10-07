"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArchivesSelector } from "./ArchivesSelector";
import { ArchiveDisplay } from "./ArchiveDisplay";
import { ArchivePanel } from "./ArchivePanel";
import { isArchiveColor } from "./ArchiveMedia";
import type { Archive } from "@/lib/data/archives";

interface ArchivesExplorerProps {
  archives: Archive[];
  initialIndex: number;
}

const SWIPE_THRESHOLD = 50;

export function ArchivesExplorer({ archives, initialIndex }: ArchivesExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  const archive = archives[index];

  const select = useCallback(
    (nextIndex: number) => {
      const clamped = ((nextIndex % archives.length) + archives.length) % archives.length;
      setIndex(clamped);
      router.replace(`${pathname}?archive=${archives[clamped].slug}`, { scroll: false });
    },
    [archives, pathname, router],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") select(index + 1);
      if (event.key === "ArrowLeft") select(index - 1);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, select]);

  useEffect(() => {
    const next = archives[(index + 1) % archives.length];
    const previous = archives[(index - 1 + archives.length) % archives.length];
    [next, previous].forEach((item) => {
      if (item.image && !isArchiveColor(item.image)) {
        const preload = new window.Image();
        preload.src = item.image;
      }
    });
  }, [index, archives]);

  function handleTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      select(deltaX < 0 ? index + 1 : index - 1);
    }
    touchStartX.current = null;
  }

  return (
    <div className="flex flex-col lg:h-screen lg:flex-row lg:overflow-hidden">
      <div className="order-3 lg:order-1 lg:h-full lg:basis-[28%]">
        <ArchivesSelector archives={archives} selectedSlug={archive.slug} onSelect={select} />
      </div>

      <div
        className="order-1 h-[60dvh] lg:order-2 lg:h-full lg:basis-[40%]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ArchiveDisplay archive={archive} archives={archives} onSelect={select} />
      </div>

      <div className="order-2 lg:order-3 lg:h-full lg:basis-[32%]">
        <ArchivePanel archive={archive} />
      </div>
    </div>
  );
}
