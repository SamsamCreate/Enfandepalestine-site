"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ABOUT_INTRO, ABOUT_SECTION_LABEL, ABOUT_ITEMS, type AboutItem } from "@/lib/data/about";

const RUNWAY_VH = 70;
const HIGHLIGHT = "Plus de 228 000 €";

function useShouldStack() {
  // Defaults to the stacked (mobile-safe) layout: the server can't check the
  // viewport, and the pinned layout's unwrapped titles overflow narrow
  // screens if they render even briefly before this effect corrects it.
  const [shouldStack, setShouldStack] = useState(true);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const heightQuery = window.matchMedia("(min-height: 700px)");
    // Mobile never gets the pinned effect, regardless of height.
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    function update() {
      setShouldStack(
        reducedMotionQuery.matches || !heightQuery.matches || !desktopQuery.matches,
      );
    }

    update();
    reducedMotionQuery.addEventListener("change", update);
    heightQuery.addEventListener("change", update);
    desktopQuery.addEventListener("change", update);
    return () => {
      reducedMotionQuery.removeEventListener("change", update);
      heightQuery.removeEventListener("change", update);
      desktopQuery.removeEventListener("change", update);
    };
  }, []);

  return shouldStack;
}

function renderParagraph(item: AboutItem, paragraph: string, key: number, className: string) {
  const highlightIndex = item.slug === "notre-histoire" ? paragraph.indexOf(HIGHLIGHT) : -1;
  if (highlightIndex === -1) {
    return (
      <p key={key} className={className}>
        {paragraph}
      </p>
    );
  }
  const before = paragraph.slice(0, highlightIndex);
  const after = paragraph.slice(highlightIndex + HIGHLIGHT.length);
  return (
    <p key={key} className={className}>
      {before}
      <strong className="font-bold underline underline-offset-4">{HIGHLIGHT}</strong>
      {after}
    </p>
  );
}

function AboutParagraphs({ item, isActive }: { item: AboutItem; isActive: boolean }) {
  return (
    <div
      className={`col-start-1 row-start-1 flex flex-col gap-4 text-base leading-relaxed text-black/70 transition-opacity duration-[250ms] ${
        isActive ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isActive}
    >
      {item.paragraphs.map((paragraph, index) =>
        renderParagraph(item, paragraph, index, "max-w-[38ch]"),
      )}

      {item.link ? (
        <Link
          href={item.link.href}
          tabIndex={isActive ? 0 : -1}
          className="w-fit underline underline-offset-4 hover:opacity-60"
        >
          {item.link.label}
        </Link>
      ) : null}
    </div>
  );
}

function IntroAndLabel() {
  return (
    <>
      <p className="font-tight text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.1] tracking-[-0.02em]">
        {ABOUT_INTRO}
      </p>
      <hr className="my-8 border-black/10" />
    </>
  );
}

export function AboutPinned() {
  const shouldStack = useShouldStack();
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (shouldStack) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sentinelRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    sentinelRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [shouldStack]);

  function goTo(index: number) {
    setActiveIndex(index);
    sentinelRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (shouldStack) {
    return (
      <div className="px-6 py-10 lg:px-16 lg:py-14">
        <IntroAndLabel />
        <span className="text-xs uppercase tracking-wider text-black/40">
          {ABOUT_SECTION_LABEL}
        </span>

        <div className="mt-6 flex flex-col">
          {ABOUT_ITEMS.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={item.slug} className="border-b border-black/10 first:border-t">
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex min-h-11 w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="font-tight text-xl font-bold leading-[1.1] tracking-[-0.02em]">
                    {item.title}
                  </span>
                  <span aria-hidden="true" className="text-xl">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen ? (
                  <div className="pb-5 text-base leading-relaxed text-black/70">
                    {item.paragraphs.map((paragraph, paragraphIndex) =>
                      renderParagraph(item, paragraph, paragraphIndex, "mb-4 last:mb-0"),
                    )}
                    {item.link ? (
                      <Link
                        href={item.link.href}
                        className="w-fit underline underline-offset-4 hover:opacity-60"
                      >
                        {item.link.label}
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative"
      style={{ height: `calc(${ABOUT_ITEMS.length * RUNWAY_VH}dvh + 100dvh)` }}
    >
      {ABOUT_ITEMS.map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            sentinelRefs.current[index] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none absolute w-px"
          style={{ top: `${index * RUNWAY_VH}dvh`, height: `${RUNWAY_VH}dvh` }}
        />
      ))}

      <div className="sticky top-0 flex h-dvh flex-col justify-between px-6 py-10 lg:px-16 lg:py-14">
        <IntroAndLabel />

        <div className="flex flex-1 gap-10 lg:gap-16">
          <span className="hidden shrink-0 text-xs uppercase tracking-wider text-black/40 lg:block lg:w-40">
            {ABOUT_SECTION_LABEL}
          </span>

          <ul className="flex shrink-0 flex-col gap-2 lg:w-64" role="list">
            {ABOUT_ITEMS.map((item, index) => (
              <li key={item.slug}>
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={index === activeIndex}
                  className="font-tight text-left text-2xl font-bold leading-[1.05] tracking-[-0.02em] transition-colors duration-[250ms] lg:text-3xl"
                  style={{ color: index === activeIndex ? "#000000" : "#C8C8C8" }}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>

          <div className="relative grid flex-1" aria-live="polite">
            {ABOUT_ITEMS.map((item, index) => (
              <AboutParagraphs key={item.slug} item={item} isActive={index === activeIndex} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
