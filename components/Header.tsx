"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "./icons/Logo";
import { useCart } from "@/lib/cart-context";
import { PRODUCT_CATEGORIES } from "@/lib/products";
import type { NavLink } from "@/types";

const DEFAULT_NAV_LINKS: NavLink[] = [
  {
    label: "Produits",
    href: "/produits",
    children: PRODUCT_CATEGORIES.map((category) => ({
      label: category.label,
      href: `/produits?categorie=${category.slug}`,
    })),
  },
  { label: "Donations", href: "/donations" },
  { label: "Archives", href: "/archives" },
  { label: "About us", href: "/about" },
  { label: "FaQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const DEFAULT_CURRENCIES = ["EUR", "USD", "GBP"];

function useCartPulse(itemCount: number) {
  const [isPulsing, setIsPulsing] = useState(false);
  const previousCount = useRef(itemCount);

  useEffect(() => {
    if (itemCount > previousCount.current) {
      setIsPulsing(true);
      const timeout = setTimeout(() => setIsPulsing(false), 500);
      previousCount.current = itemCount;
      return () => clearTimeout(timeout);
    }
    previousCount.current = itemCount;
  }, [itemCount]);

  return isPulsing;
}

interface HeaderProps {
  navLinks?: NavLink[];
  cartCount?: number;
  currencies?: string[];
  currentCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
  /** Left undefined until account pages exist — the slot stays reserved. */
  accountLink?: NavLink;
  logoHref?: string;
}

export function Header({
  navLinks = DEFAULT_NAV_LINKS,
  cartCount,
  currencies = DEFAULT_CURRENCIES,
  currentCurrency = "EUR",
  onCurrencyChange,
  accountLink,
  logoHref = "/",
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const resolvedCartCount = cartCount ?? itemCount;
  const isCartPulsing = useCartPulse(resolvedCartCount);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const currencySelect = (
    <label className="flex items-center gap-2">
      <span className="sr-only">Devise</span>
      <select
        value={currentCurrency}
        onChange={(event) => onCurrencyChange?.(event.target.value)}
        className="h-11 cursor-pointer bg-transparent underline underline-offset-4"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <header className="lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-r lg:border-black/10">
      {/* Mobile top bar — fixed, always visible */}
      <div
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-black/10 bg-white px-4 lg:hidden"
        style={{
          paddingTop: "env(safe-area-inset-top)",
          height: "calc(56px + env(safe-area-inset-top))",
        }}
      >
        <Link
          href={logoHref}
          aria-label="Enfan de Palestine — accueil"
          className="flex h-11 w-11 items-center justify-center"
        >
          <Logo className="h-6 w-6" />
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/panier"
            className="flex h-11 items-center px-2 text-sm underline underline-offset-4"
          >
            <span
              className={`inline-block transition-transform duration-300 ${
                isCartPulsing ? "scale-125" : "scale-100"
              }`}
            >
              Panier ({resolvedCartCount})
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`h-px w-5 bg-black transition-transform ${
                isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-black transition-transform ${
                isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile full-screen panel */}
      {isMenuOpen ? (
        <div
          id="mobile-nav-panel"
          className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-white lg:hidden"
          style={{
            paddingTop: "calc(56px + env(safe-area-inset-top))",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <nav aria-label="Navigation principale" className="flex flex-1 flex-col px-6 py-8">
            <ul className="flex flex-col gap-5 text-xl leading-[1.15]" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex min-h-11 items-center font-medium underline underline-offset-4"
                  >
                    {link.label}
                  </Link>

                  {link.children ? (
                    <ul className="mt-1 flex flex-col gap-1 pl-3 text-base text-black/50" role="list">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="inline-flex min-h-11 items-center underline underline-offset-4"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-6 border-t border-black/10 pt-6 text-sm">
              {accountLink ? (
                <Link
                  href={accountLink.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex min-h-11 w-fit items-center underline underline-offset-4"
                >
                  {accountLink.label}
                </Link>
              ) : null}

              {currencySelect}

              <div className="flex flex-col gap-2 text-black/70">
                <p className="text-base leading-relaxed">
                  Tout achat équivaut à un don à une association partenaire qui
                  agit pour la Palestine.
                </p>
                <Link
                  href="/donations"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex min-h-11 w-fit items-center underline underline-offset-4"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </nav>
        </div>
      ) : null}

      {/* Desktop sidebar */}
      <nav
        aria-label="Navigation principale"
        className="hidden flex-col gap-8 px-6 py-8 lg:flex lg:h-full"
      >
        <Link href={logoHref} aria-label="Enfan de Palestine — accueil">
          <Logo className="h-8 w-8" />
        </Link>

        <ul className="flex flex-col gap-[6px] text-base leading-[1.1] lg:mt-[50px]" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-medium underline underline-offset-4 hover:opacity-60"
              >
                {link.label}
              </Link>

              {link.children ? (
                <ul
                  className="mt-1 flex flex-col gap-[4px] pl-3 text-sm leading-[1.1] text-black/50"
                  role="list"
                >
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="underline underline-offset-4 hover:text-black"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 text-sm lg:mt-auto lg:mb-[300px]">
          {accountLink ? (
            <Link
              href={accountLink.href}
              className="underline underline-offset-4 hover:opacity-60"
            >
              {accountLink.label}
            </Link>
          ) : null}

          {currencySelect}

          <Link href="/panier" className="underline underline-offset-4 hover:opacity-60">
            <span
              className={`inline-block transition-transform duration-300 ${
                isCartPulsing ? "scale-125" : "scale-100"
              }`}
            >
              Panier ({resolvedCartCount})
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
