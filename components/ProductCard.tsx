"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

const PLACEHOLDER_BG = "#F6F0E4";

interface ProductCardProps {
  name: string;
  price: number;
  currency?: string;
  href: string;
  inStock?: boolean;
  /** Photo URLs. Non-URL entries (e.g. hex placeholders) render as the beige placeholder. */
  images?: string[];
  color?: string;
  colorLabel?: string;
  label?: string;
  /** First grid row: load eagerly instead of lazily. */
  priority?: boolean;
}

function isPhotoUrl(src: string) {
  return src.startsWith("/") || src.startsWith("http");
}

function formatCardPrice(price: number, currency: string) {
  return `${price.toFixed(2).replace(".", ",")}${currency.trim()}`;
}

export function ProductCard({
  name,
  price,
  currency = "€",
  href,
  inStock = true,
  images = [],
  color,
  colorLabel,
  label = "NEW IN",
  priority = false,
}: ProductCardProps) {
  const [index, setIndex] = useState(0);
  const slides = images.length > 0 ? images : [""];
  const hasMultipleImages = slides.length > 1;

  function step(direction: 1 | -1, event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIndex((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <div className="group/card relative flex flex-col gap-3">
      {/* Full-card link sits underneath; decorative layers are pointer-events-none so clicks fall through, arrows sit above it. */}
      <Link
        href={href}
        aria-label={inStock ? `${name}, ${formatCardPrice(price, currency)}` : `${name}, épuisé`}
        className="absolute inset-0 z-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      />

      <div
        className="pointer-events-none relative aspect-[4/5] w-full overflow-hidden"
        style={{ backgroundColor: PLACEHOLDER_BG }}
      >
        {slides.map((src, i) => (
          <div
            key={i}
            aria-hidden={i !== index}
            className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-300 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundColor: PLACEHOLDER_BG }}
          >
            {isPhotoUrl(src) ? (
              <Image
                src={src}
                alt={i === 0 ? name : ""}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover"
                priority={priority && i === 0}
                loading={priority && i === 0 ? undefined : "lazy"}
              />
            ) : null}
          </div>
        ))}

        {label ? (
          <span className="absolute left-3 top-3 text-[11px] uppercase leading-none tracking-[0.08em]">
            {label}
          </span>
        ) : null}

        {color ? (
          <span
            role="img"
            aria-label={`Couleur : ${colorLabel ?? color}`}
            className="absolute right-3 top-3 h-2.5 w-2.5"
            style={{ backgroundColor: color }}
          />
        ) : null}
      </div>

      {hasMultipleImages ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden aspect-[4/5] items-center justify-between px-2 opacity-0 motion-safe:transition-opacity motion-safe:duration-200 group-hover/card:opacity-100 group-focus-within/card:opacity-100 lg:flex">
          <button
            type="button"
            onClick={(event) => step(-1, event)}
            aria-label="Image précédente"
            className="pointer-events-auto flex h-8 w-8 items-center justify-center bg-white/80 text-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
          >
            ←
          </button>
          <button
            type="button"
            onClick={(event) => step(1, event)}
            aria-label="Image suivante"
            className="pointer-events-auto flex h-8 w-8 items-center justify-center bg-white/80 text-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
          >
            →
          </button>
        </div>
      ) : null}

      <div className="pointer-events-none flex min-h-11 items-start justify-between gap-3 px-1 text-[12px] leading-[1.25] tracking-[0.04em] md:text-[13px]">
        <p className="line-clamp-2 uppercase">{name}</p>
        {inStock ? (
          <p className="shrink-0 whitespace-nowrap font-semibold">
            {formatCardPrice(price, currency)}
          </p>
        ) : (
          <p className="shrink-0 whitespace-nowrap text-black/40">ÉPUISÉ</p>
        )}
      </div>
    </div>
  );
}
