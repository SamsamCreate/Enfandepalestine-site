"use client";

import { useRef } from "react";
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

  function scroll(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className="border-t border-black/10 px-6 py-16 lg:px-16 lg:py-20">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-tight text-xl leading-[1.15] tracking-[-0.02em] sm:text-2xl">
          Historique de <span className="font-bold">Nos Donations</span>
        </h2>

        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Donation précédente"
            className="flex h-8 w-8 items-center justify-center border border-black/20 hover:bg-black/5"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Donation suivante"
            className="flex h-8 w-8 items-center justify-center border border-black/20 hover:bg-black/5"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative mt-6 mb-8 h-2 border-t border-dotted border-black/30">
        <div className="absolute inset-x-0 top-0 flex -translate-y-1/2 justify-between px-1">
          {donations.map((donation) => (
            <span key={donation.id} aria-hidden="true" className="h-1.5 w-1.5 bg-black" />
          ))}
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {donations.map((donation) => (
          <div key={donation.id} className="snap-start">
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
