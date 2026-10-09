"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import type { FocusEvent, KeyboardEvent, PointerEvent, TouchEvent } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { HERO_SETTINGS, HERO_SLIDES, type HeroSlide } from "@/lib/data/hero";

const SWIPE_THRESHOLD = 40;
const DEFAULT_CTA_LABEL = "Voir les produits";
const DEFAULT_CTA_HREF = "/produits";
const IMAGE_SIZES = "(min-width: 1024px) calc(100vw - 256px), 100vw";
const FOCUS_RING = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}
const getTabHidden = () => document.visibilityState === "hidden";

const getServerFalse = () => false;

function isColor(src: string) {
  return src.startsWith("#");
}

function HeroMedia({ slide, priority }: { slide: HeroSlide; priority: boolean }) {
  if (isColor(slide.image)) {
    return <div className="absolute inset-0" style={{ backgroundColor: slide.image }} />;
  }

  const alt = slide.alt ?? "";

  if (slide.mobileImage && !isColor(slide.mobileImage)) {
    const common = { alt, fill: true, quality: 65 };
    const { props: desktop } = getImageProps({ ...common, src: slide.image, sizes: IMAGE_SIZES });
    const { props: mobile } = getImageProps({ ...common, src: slide.mobileImage, sizes: "100vw" });
    return (
      <picture>
        <source media="(max-width: 767px)" srcSet={mobile.srcSet} sizes="100vw" />
        {/* Art direction (portrait mobile photo) needs <picture>, which next/image can't render. */}
        <img
          {...desktop}
          alt={alt}
          className="object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
      </picture>
    );
  }

  return (
    <Image
      src={slide.image}
      alt={alt}
      fill
      sizes={IMAGE_SIZES}
      quality={65}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      className="object-cover"
    />
  );
}

interface HeroCarouselProps {
  slides?: HeroSlide[];
  autoplay?: boolean;
  slideDurationMs?: number;
}

export function HeroCarousel({
  slides = HERO_SLIDES,
  autoplay = HERO_SETTINGS.autoplay,
  slideDurationMs = HERO_SETTINGS.slideDurationMs,
}: HeroCarouselProps) {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerFalse);
  const isTabHidden = useSyncExternalStore(subscribeVisibility, getTabHidden, getServerFalse);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const canAutoplay = autoplay && !reducedMotion && total > 1;
  const isPlaying = canAutoplay && !isUserPaused && !isHovered && !hasFocusWithin && !isTabHidden;

  const goTo = useCallback(
    (target: number) => {
      const next = ((target % total) + total) % total;
      if (next === index) return;
      setPreviousIndex(index);
      setIndex(next);
    },
    [index, total],
  );

  // Current slide, the next one (preloaded) and the outgoing one (crossfade) render media.
  function isMounted(i: number) {
    return i === index || i === previousIndex || i === (index + 1) % total;
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) >= SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      goTo(index + (deltaX < 0 ? 1 : -1));
    }
  }

  function handlePointerEnter(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse") setIsHovered(true);
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHasFocusWithin(false);
  }

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="À la une"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocusWithin(true)}
      onBlur={handleBlur}
      className="relative isolate -mt-[calc(56px+env(safe-area-inset-top))] h-svh overflow-hidden bg-[#4D4949] lg:mt-0 lg:h-dvh"
    >
      <div aria-live={isPlaying ? "off" : "polite"} className="absolute inset-0">
        {slides.map((slide, i) => {
          const isCurrent = i === index;
          const stateClass = isCurrent
            ? `z-20 opacity-100 ${previousIndex !== null ? "motion-safe:animate-hero-fade-in" : ""}`
            : i === previousIndex
              ? "z-10 opacity-100"
              : "z-0 opacity-0";
          const ctaLabel = slide.ctaLabel ?? DEFAULT_CTA_LABEL;
          const hasButtons = Boolean(ctaLabel || slide.secondaryLabel);

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} sur ${total}`}
              aria-hidden={!isCurrent}
              inert={!isCurrent}
              className={`absolute inset-0 ${stateClass}`}
            >
              {isMounted(i) ? <HeroMedia slide={slide} priority={i === 0} /> : null}

              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-black/25 to-transparent" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-black/45 to-transparent" />

              {slide.caption || hasButtons ? (
                <div className="absolute inset-x-4 bottom-[max(120px,calc(96px+env(safe-area-inset-bottom)))] flex flex-col items-center text-center text-white lg:bottom-24">
                  {slide.caption ? (
                    <p className="text-[18px] leading-snug lg:text-[20px]">{slide.caption}</p>
                  ) : null}
                  {hasButtons ? (
                    <div
                      className={`flex w-full max-w-[280px] flex-col gap-3 md:w-auto md:max-w-none md:flex-row ${
                        slide.caption ? "mt-4" : ""
                      }`}
                    >
                      {ctaLabel ? (
                        <Link
                          href={slide.ctaHref ?? DEFAULT_CTA_HREF}
                          className={`flex min-h-12 items-center justify-center bg-white px-7 py-3.5 text-[15px] font-medium leading-none text-black hover:bg-white/90 ${FOCUS_RING}`}
                        >
                          {ctaLabel}
                        </Link>
                      ) : null}
                      {slide.secondaryLabel ? (
                        <Link
                          href={slide.secondaryHref ?? DEFAULT_CTA_HREF}
                          className={`flex min-h-12 items-center justify-center border border-white px-7 py-3.5 text-[15px] font-medium leading-none text-white hover:bg-white/10 ${FOCUS_RING}`}
                        >
                          {slide.secondaryLabel}
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {canAutoplay ? (
        <button
          type="button"
          onClick={() => setIsUserPaused((paused) => !paused)}
          aria-label={isUserPaused ? "Reprendre la lecture" : "Mettre en pause le carrousel"}
          className={`absolute bottom-[calc(52px+env(safe-area-inset-bottom))] right-4 z-30 flex h-8 w-8 items-center justify-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] hover:opacity-80 lg:bottom-[52px] lg:right-6 ${FOCUS_RING}`}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
            {isUserPaused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />}
          </svg>
        </button>
      ) : null}

      <div className="absolute inset-x-4 bottom-[calc(20px+env(safe-area-inset-bottom))] z-30 flex gap-2 lg:inset-x-6 lg:bottom-5">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Aller à la slide ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={`flex h-6 flex-1 items-center ${FOCUS_RING}`}
          >
            <span className="relative block h-0.5 w-full overflow-hidden bg-white/35">
              {i < index || (i === index && !canAutoplay) ? (
                <span className="absolute inset-0 bg-white" />
              ) : null}
              {i === index && canAutoplay ? (
                <span
                  key={index}
                  onAnimationEnd={() => goTo(index + 1)}
                  className="absolute inset-0 origin-left animate-hero-progress bg-white"
                  style={{
                    animationDuration: `${slideDurationMs}ms`,
                    animationPlayState: isPlaying ? "running" : "paused",
                  }}
                />
              ) : null}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
