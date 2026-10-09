"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./icons/Logo";
import { useCart } from "@/lib/cart-context";
import { PRODUCT_CATEGORIES } from "@/lib/products";
import { scrollToId } from "@/lib/scroll-to-id";
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
  { label: "FaQ", href: "/#faq" },
  { label: "Contact", href: "#contact" },
];

const DEFAULT_CURRENCIES = ["EUR", "USD", "GBP"];

const NAV_FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

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
  const pathname = usePathname();

  function handleAnchorLinkClick(link: NavLink, event: MouseEvent<HTMLAnchorElement>) {
    const targetId =
      link.label === "Contact" ? "contact" : link.label === "FaQ" ? "faq" : null;
    if (!targetId) {
      setIsMenuOpen(false);
      return;
    }

    const isOnHome = pathname === "/";
    // FaQ only exists on the home page: off-home, let the Link navigate to "/#faq" normally.
    if (targetId === "faq" && !isOnHome) {
      setIsMenuOpen(false);
      return;
    }

    event.preventDefault();
    setIsMenuOpen(false);
    // Wait a frame (menu unmount + body scroll restore) before measuring/scrolling.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToId(targetId));
    });
  }

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
      {/* Mobile top bar — fixed, always visible, 3-zone grid for a true centered logo */}
      <div
        className="fixed inset-x-0 top-0 z-40 grid grid-cols-[1fr_auto_1fr] items-center border-b border-black/10 bg-white px-4 text-[17px] tracking-[-0.01em] lg:hidden"
        style={{
          paddingTop: "env(safe-area-inset-top)",
          height: "calc(56px + env(safe-area-inset-top))",
        }}
      >
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-panel"
          className="flex h-11 w-fit items-center justify-self-start"
        >
          {isMenuOpen ? "Fermer" : "Menu"}
        </button>

        <Link
          href={logoHref}
          aria-label="Enfan de Palestine — accueil"
          className="flex h-11 items-center justify-self-center"
        >
          <Logo className="h-6 w-6" />
        </Link>

        <Link href="/panier" className="flex h-11 w-fit items-center justify-self-end">
          <span
            className={`inline-block transition-transform duration-300 ${
              isCartPulsing ? "scale-125" : "scale-100"
            }`}
          >
            Panier<sup className="text-[65%]">({resolvedCartCount})</sup>
          </span>
        </Link>
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
            <ul
              className="flex flex-col gap-[10px] text-xl leading-[1.1] tracking-[-0.02em]"
              role="list"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(event) => handleAnchorLinkClick(link, event)}
                    className={`inline-flex min-h-11 w-fit items-center font-medium hover:opacity-60 ${NAV_FOCUS_RING}`}
                  >
                    {link.label}
                  </Link>

                  {link.children ? (
                    <ul
                      className="mt-1 flex flex-col gap-[5px] pl-3 text-base leading-[1.1] tracking-[-0.01em] text-black/50"
                      role="list"
                    >
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`inline-flex min-h-11 items-center ${NAV_FOCUS_RING}`}
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

        <ul
          className="flex flex-col gap-[10px] text-base leading-[1.1] tracking-[-0.02em] lg:mt-[50px]"
          role="list"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(event) => handleAnchorLinkClick(link, event)}
                className={`font-medium hover:opacity-60 ${NAV_FOCUS_RING}`}
              >
                {link.label}
              </Link>

              {link.children ? (
                <ul
                  className="mt-1 flex flex-col gap-[5px] pl-3 text-sm leading-[1.1] tracking-[-0.01em] text-black/50"
                  role="list"
                >
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={`hover:text-black ${NAV_FOCUS_RING}`}
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
