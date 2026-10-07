"use client";

import { useState } from "react";
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
  { label: "About us", href: "/about" },
  { label: "Donations", href: "/donations" },
  { label: "Archives", href: "/archives" },
  { label: "FaQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const DEFAULT_CURRENCIES = ["EUR", "USD", "GBP"];

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

  return (
    <header className="border-black/10 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-r">
      <div className="flex items-center justify-between border-b border-black/10 px-6 py-5 lg:hidden">
        <Link href={logoHref} aria-label="Enfan de Palestine — accueil">
          <Logo className="h-7 w-7" />
        </Link>
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
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

      <nav
        id="main-nav"
        aria-label="Navigation principale"
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } flex-col gap-8 px-6 pb-8 lg:flex lg:h-full lg:py-8`}
      >
        <Link
          href={logoHref}
          aria-label="Enfan de Palestine — accueil"
          className="hidden lg:block"
        >
          <Logo className="h-8 w-8" />
        </Link>

        <ul
          className="flex flex-col gap-[6px] pt-6 text-base leading-[1.1] lg:pt-0 lg:mt-[50px]"
          role="list"
        >
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

          <label className="flex items-center gap-2">
            <span className="sr-only">Devise</span>
            <select
              value={currentCurrency}
              onChange={(event) => onCurrencyChange?.(event.target.value)}
              className="cursor-pointer bg-transparent underline underline-offset-4"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>

          <Link
            href="/panier"
            className="underline underline-offset-4 hover:opacity-60"
          >
            Panier ({resolvedCartCount})
          </Link>
        </div>
      </nav>
    </header>
  );
}
