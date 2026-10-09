"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { ArchiveMedia } from "./ArchiveMedia";
import type { Archive } from "@/lib/data/archives";

const SWIPE_THRESHOLD = 40;
const TEXT_OUT_MS = 150;
const PHOTO_SIZES = "(min-width: 1024px) calc(50vw - 128px), (min-width: 768px) 50vw, 100vw";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isEditableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName))
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M15 3.5 6.5 12l8.5 8.5" : "M9 3.5 17.5 12 9 20.5"} />
    </svg>
  );
}

function ArchiveText({ archive, isSizer = false }: { archive: Archive; isSizer?: boolean }) {
  const Title = isSizer ? "p" : "h2";

  return (
    <>
      <Title className="mx-auto font-tight text-[clamp(16px,5vw,20px)] font-medium uppercase leading-[1.15] tracking-[-0.01em] md:max-w-[80%] md:text-[clamp(18px,1.7vw,30px)]">
        {`"${archive.title}"`}
      </Title>
      <p className="mt-7 text-[clamp(13px,1.1vw,18px)] uppercase text-[#555]">{archive.date}</p>
      {archive.context ? (
        <p className="mx-auto mt-8 max-w-[min(46ch,90%)] text-[14px] leading-relaxed text-black/60 md:text-[15px]">
          {archive.context}
        </p>
      ) : null}
    </>
  );
}

interface ArchivesCarouselProps {
  archives: Archive[];
  initialIndex: number;
}

export function ArchivesCarousel({ archives, initialIndex }: ArchivesCarouselProps) {
  const total = archives.length;
  const [index, setIndex] = useState(initialIndex);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [textIndex, setTextIndex] = useState(initialIndex);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const textTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const wrap = useCallback((i: number) => ((i % total) + total) % total, [total]);

  const goTo = useCallback(
    (target: number) => {
      const next = wrap(target);
      if (next === index) return;

      setPreviousIndex(index);
      setIndex(next);
      window.history.replaceState(null, "", `?archive=${archives[next].slug}`);

      clearTimeout(textTimer.current);
      if (prefersReducedMotion()) {
        setTextIndex(next);
        setIsTextVisible(true);
        return;
      }
      setIsTextVisible(false);
      textTimer.current = setTimeout(() => {
        setTextIndex(next);
        setIsTextVisible(true);
      }, TEXT_OUT_MS);
    },
    [archives, index, wrap],
  );

  useEffect(() => () => clearTimeout(textTimer.current), []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || isEditableTarget(event.target)) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goTo, index]);

  function handleTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: TouchEvent) {
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

  // Only the current slide, its neighbours (preloaded) and the outgoing slide (crossfade) render media.
  function isMounted(i: number) {
    return i === index || i === previousIndex || i === wrap(index + 1) || i === wrap(index - 1);
  }

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Archives"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="isolate flex h-[calc(100dvh-56px-env(safe-area-inset-top))] flex-col md:grid md:grid-cols-2 lg:h-dvh"
    >
      <h1 className="sr-only">Archives</h1>

      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#4D4949]">
        {archives.map((archive, i) => {
          const isCurrent = i === index;
          const stateClass = isCurrent
            ? `z-20 opacity-100 ${previousIndex !== null ? "motion-safe:animate-archive-photo-in" : ""}`
            : i === previousIndex
              ? "z-10 opacity-100"
              : "z-0 opacity-0";

          return (
            <div
              key={archive.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} sur ${total}`}
              aria-hidden={!isCurrent}
              className={`absolute inset-0 ${stateClass}`}
            >
              {isMounted(i) ? (
                <ArchiveMedia
                  image={archive.image}
                  alt={archive.title}
                  sizes={PHOTO_SIZES}
                  priority={i === initialIndex}
                />
              ) : null}
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-32 bg-linear-to-t from-black/20 to-transparent" />

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Archive précédente"
          className="absolute left-1.5 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <Chevron direction="left" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Archive suivante"
          className="absolute right-1.5 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <Chevron direction="right" />
        </button>

        {/* 24px hit zones overlap by 6px so the visible 8px dots sit 10px apart. */}
        <div className="absolute inset-x-0 bottom-4 z-40 flex justify-center">
          {archives.map((archive, i) => (
            <button
              key={archive.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Aller à l'archive ${i + 1} : ${archive.title}`}
              aria-current={i === index ? "true" : undefined}
              className="group/dot -mx-[3px] flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <span
                className={`block h-2 w-2 rounded-full motion-safe:transition-colors ${
                  i === index ? "bg-white" : "bg-white/50 group-hover/dot:bg-white/80"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-center bg-white px-4 py-6 text-center md:px-0 md:py-0 md:pb-[6vh]">
        {/* Invisible copies of every archive's text reserve the tallest height so nothing jumps. */}
        <div aria-live="polite" className="grid w-full">
          {archives.map((archive) => (
            <div key={archive.slug} aria-hidden="true" className="invisible [grid-area:1/1]">
              <ArchiveText archive={archive} isSizer />
            </div>
          ))}
          <div
            className={`self-center [grid-area:1/1] motion-safe:transition-opacity ${
              isTextVisible ? "opacity-100 motion-safe:duration-[250ms]" : "opacity-0 motion-safe:duration-[150ms]"
            }`}
          >
            <ArchiveText archive={archives[textIndex]} />
          </div>
        </div>
      </div>
    </section>
  );
}
