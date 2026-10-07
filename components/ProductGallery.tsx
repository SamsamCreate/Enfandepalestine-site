"use client";

import { useEffect, useRef, useState } from "react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function handleScroll() {
      if (!el) return;
      setActiveIndex(Math.round(el.scrollLeft / el.clientWidth));
    }

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      {/* Mobile: horizontal swipe carousel with pagination dots */}
      <div className="lg:hidden">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((color, index) => (
            <div
              key={index}
              className="aspect-[4/5] w-full shrink-0 snap-center"
              style={{ backgroundColor: color }}
              role="img"
              aria-label={`${name} — photo ${index + 1}`}
            />
          ))}
        </div>

        {images.length > 1 ? (
          <div className="flex justify-center gap-2 py-3" aria-hidden="true">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  index === activeIndex ? "bg-black" : "bg-black/20"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* Desktop: vertical stack, unchanged */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col">
        {images.map((color, index) => (
          <div
            key={index}
            className="aspect-[4/5] w-full"
            style={{ backgroundColor: color }}
            role="img"
            aria-label={`${name} — photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
