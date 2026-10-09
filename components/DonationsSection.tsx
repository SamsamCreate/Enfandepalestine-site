"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { DonationCard } from "./DonationCard";
import { getSortedDonations, type Donation } from "@/lib/data/donations";

interface DonationsSectionProps {
  donations?: Donation[];
}

export function DonationsSection({
  donations = getSortedDonations(),
}: DonationsSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function updateScrollState() {
      if (!el) return;
      setCanScrollPrev(el.scrollLeft > 2);
      setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
    }

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [donations]);

  function scroll(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scroll(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scroll(1);
    }
  }

  return (
    <section className="border-t border-black/10 px-6 py-16 lg:px-16 lg:py-20">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-tight text-xl leading-[1.15] tracking-[-0.02em] sm:text-2xl">
          Historique de <span className="font-bold">Nos Donations</span>
        </h2>

        <div className="hidden shrink-0 gap-2 lg:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={!canScrollPrev}
            aria-label="Dons précédents"
            className="flex h-8 w-8 items-center justify-center border border-black/20 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={!canScrollNext}
            aria-label="Dons suivants"
            className="flex h-8 w-8 items-center justify-center border border-black/20 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Historique des donations, défilement horizontal"
        className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {donations.map((donation) => (
          <div key={donation.id} className="w-[78vw] shrink-0 snap-start lg:w-[40%]">
            <div className="relative mb-6 h-2 border-t border-dotted border-black/30">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-1.5 w-1.5 -translate-y-1/2 bg-black"
              />
            </div>
            <DonationCard
              date={donation.dateLabel}
              handle={donation.organization}
              amount={donation.amount}
              description={donation.description}
            />
          </div>
        ))}
      </div>

      <Link
        href="/donations"
        className="mt-6 inline-block text-sm underline underline-offset-4 hover:opacity-60"
      >
        Voir tout l&apos;historique +
      </Link>
    </section>
  );
}
