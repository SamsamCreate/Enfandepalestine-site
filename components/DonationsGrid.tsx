"use client";

import { useRef, useState } from "react";
import { DonationCard } from "./DonationCard";
import type { Donation } from "@/lib/data/donations";

interface DonationsGridProps {
  donations: Donation[];
}

const INITIAL_COUNT = 6;

export function DonationsGrid({ donations }: DonationsGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const visible = donations.slice(0, INITIAL_COUNT);
  const rest = donations.slice(INITIAL_COUNT);

  function toggle() {
    if (isExpanded) {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsExpanded((current) => !current);
  }

  return (
    <div ref={topRef}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {visible.map((donation) => (
          <DonationCard
            key={donation.id}
            variant="compact"
            date={donation.dateLabel}
            handle={donation.organization}
            amount={donation.amount}
            description={donation.description}
          />
        ))}
      </div>

      {rest.length > 0 ? (
        <>
          <div
            className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out"
            style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {rest.map((donation) => (
                  <DonationCard
                    key={donation.id}
                    variant="compact"
                    date={donation.dateLabel}
                    handle={donation.organization}
                    amount={donation.amount}
                    description={donation.description}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={toggle}
            className="mt-8 inline-flex min-h-11 items-center underline underline-offset-4 hover:opacity-60"
          >
            {isExpanded ? "Voir moins −" : `Voir les ${rest.length} autres dons +`}
          </button>
        </>
      ) : null}
    </div>
  );
}
