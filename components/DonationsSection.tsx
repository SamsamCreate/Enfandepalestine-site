"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { DonationCard } from "./DonationCard";
import { WalkingFigure } from "./icons/WalkingFigure";
import { getSortedDonations, type Donation } from "@/lib/data/donations";

const SQUARE_SIZE = 6;
const STOP_DELAY_MS = 150;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface DonationsSectionProps {
  donations?: Donation[];
}

export function DonationsSection({
  donations = getSortedDonations(),
}: DonationsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const friezeRef = useRef<HTMLDivElement>(null);
  const walkerRef = useRef<HTMLDivElement>(null);
  const facingRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isWalking, setIsWalking] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const scroller = scrollerRef.current;
    const frieze = friezeRef.current;
    const walker = walkerRef.current;
    const facing = facingRef.current;
    if (!section || !scroller || !frieze || !walker || !facing) return;

    let friezeWidth = frieze.clientWidth;
    let walkerWidth = walker.offsetWidth;
    let lastScrollLeft = scroller.scrollLeft;
    let frame = 0;
    let stopTimer: ReturnType<typeof setTimeout> | undefined;
    let isVisible = false;
    let walking = false;

    function setWalking(next: boolean) {
      if (walking === next) return;
      walking = next;
      setIsWalking(next);
    }

    // Position is written straight to the DOM each frame; React only re-renders on walk start/stop.
    function render() {
      frame = 0;
      const maxScroll = scroller!.scrollWidth - scroller!.clientWidth;
      const scrollLeft = scroller!.scrollLeft;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollLeft / maxScroll)) : 0;
      const centerX = SQUARE_SIZE / 2 + progress * (friezeWidth - SQUARE_SIZE);
      walker!.style.transform = `translate3d(${centerX - walkerWidth / 2}px, 0, 0)`;

      const delta = scrollLeft - lastScrollLeft;
      if (Math.abs(delta) > 0.5) facing!.style.transform = delta < 0 ? "scaleX(-1)" : "";
      lastScrollLeft = scrollLeft;

      setCanScrollPrev(scrollLeft > 2);
      setCanScrollNext(scrollLeft < maxScroll - 2);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(render);
    }

    function handleScroll() {
      schedule();
      if (!isVisible || prefersReducedMotion()) return;
      setWalking(true);
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => setWalking(false), STOP_DELAY_MS);
    }

    const resizeObserver = new ResizeObserver(() => {
      friezeWidth = frieze.clientWidth;
      walkerWidth = walker.offsetWidth;
      schedule();
    });
    resizeObserver.observe(frieze);
    resizeObserver.observe(scroller);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (!isVisible) {
        clearTimeout(stopTimer);
        setWalking(false);
      }
    });
    intersectionObserver.observe(section);

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    schedule();

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(stopTimer);
    };
  }, [donations]);

  function scroll(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  function scrollToDonation(index: number) {
    const scroller = scrollerRef.current;
    const card = scroller?.children[index];
    if (!scroller || !card) return;
    const left =
      card.getBoundingClientRect().left - scroller.getBoundingClientRect().left + scroller.scrollLeft;
    scroller.scrollTo({ left, behavior: prefersReducedMotion() ? "auto" : "smooth" });
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

  const lastIndex = donations.length - 1;

  return (
    <section ref={sectionRef} className="border-t border-black/10 px-6 py-16 lg:px-16 lg:py-20">
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

      {/* Fixed frieze: dotted line 3.5px above the bottom edge; the figure's feet rest on its top. */}
      <div ref={friezeRef} className="relative mt-6 h-9 lg:h-11">
        <div aria-hidden="true" className="absolute inset-x-0 bottom-[3px] border-t border-dotted border-black/30" />

        {donations.map((donation, index) => {
          const ratio = lastIndex > 0 ? index / lastIndex : 0;
          return (
            <button
              key={donation.id}
              type="button"
              onClick={() => scrollToDonation(index)}
              aria-label={`Aller au don ${donation.dateLabel}, ${donation.organization}`}
              className="group/square absolute top-[calc(100%-3.5px)] flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
              style={{ left: `calc(${SQUARE_SIZE / 2}px + ${ratio} * (100% - ${SQUARE_SIZE}px))` }}
            >
              <span className="block h-1.5 w-1.5 bg-black group-hover/square:scale-150 motion-safe:transition-transform" />
            </button>
          );
        })}

        <div
          ref={walkerRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[4px] left-0 z-10 will-change-transform"
        >
          <div ref={facingRef}>
            <WalkingFigure isWalking={isWalking} className="block h-7 w-[22.4px] lg:h-9 lg:w-[28.8px]" />
          </div>
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
