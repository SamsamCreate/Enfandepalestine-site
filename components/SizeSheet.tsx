"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, TouchEvent } from "react";

const DRAG_CLOSE_THRESHOLD = 80;

interface SizeSheetProps {
  isOpen: boolean;
  sizes: string[];
  unavailableSizes?: string[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
  onClose: () => void;
  onOpenSizeGuide: () => void;
  title?: string;
}

export function SizeSheet({
  isOpen,
  sizes,
  unavailableSizes = [],
  selectedSize,
  onSelect,
  onClose,
  onOpenSizeGuide,
  title = "Choisir une taille",
}: SizeSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const dragOffsetRef = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    const frame = requestAnimationFrame(() => {
      sheetRef.current?.querySelector<HTMLButtonElement>("[data-size]:not(:disabled)")?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(frame);
    };
  }, [isOpen, onClose]);

  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !sheetRef.current) return;
    const focusable = Array.from(
      sheetRef.current.querySelectorAll<HTMLElement>("button:not(:disabled), a[href]"),
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    dragStartY.current = event.touches[0].clientY;
  }

  function handleTouchMove(event: TouchEvent<HTMLDivElement>) {
    if (dragStartY.current === null) return;
    dragOffsetRef.current = Math.max(0, event.touches[0].clientY - dragStartY.current);
    setDragOffset(dragOffsetRef.current);
  }

  function handleTouchEnd() {
    if (dragStartY.current === null) return;
    dragStartY.current = null;
    const shouldClose = dragOffsetRef.current > DRAG_CLOSE_THRESHOLD;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    if (shouldClose) onClose();
  }

  return (
    <div className="lg:hidden">
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/40 motion-safe:transition-opacity motion-safe:duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-sheet-title"
        inert={!isOpen}
        onKeyDown={trapFocus}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`fixed inset-x-0 bottom-0 z-50 bg-white px-4 pt-2 ease-out motion-safe:transition-[translate,visibility] motion-safe:duration-300 ${
          isOpen ? "visible translate-y-0" : "invisible translate-y-full"
        }`}
        style={{
          paddingBottom: "calc(16px + env(safe-area-inset-bottom))",
          ...(dragOffset > 0 ? { translate: `0 ${dragOffset}px`, transition: "none" } : {}),
        }}
      >
        <div aria-hidden="true" className="mx-auto h-1 w-10 rounded-full bg-black/20" />

        <div className="mt-1 flex items-center justify-between">
          <h2 id="size-sheet-title" className="text-sm font-medium uppercase tracking-widest">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="-mr-2 flex h-11 w-11 items-center justify-center"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <div className={`mt-3 grid gap-2 ${sizes.length === 5 ? "grid-cols-5" : "grid-cols-4"}`}>
          {sizes.map((size) => {
            const isUnavailable = unavailableSizes.includes(size);
            const isSelected = size === selectedSize;
            return (
              <button
                key={size}
                type="button"
                data-size
                disabled={isUnavailable}
                aria-pressed={isSelected}
                onClick={() => onSelect(size)}
                className={`flex h-12 items-center justify-center border px-2 text-sm ${
                  isSelected ? "border-black bg-black text-white" : "border-black/20"
                } disabled:cursor-not-allowed disabled:border-black/10 disabled:text-black/30 disabled:line-through`}
              >
                {size}
                {isUnavailable ? <span className="sr-only"> (indisponible)</span> : null}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onOpenSizeGuide}
          className="mt-4 flex min-h-11 items-center text-sm underline underline-offset-4"
        >
          Guide des tailles
        </button>
      </div>
    </div>
  );
}
