"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./icons/Logo";
import { scrollToId } from "@/lib/scroll-to-id";
import { SOCIAL_LINKS } from "@/lib/data/site";
import type { NavLink, SocialLink } from "@/types";

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Produits", href: "/produits" },
  { label: "Donations", href: "/donations" },
  { label: "Archives", href: "/archives" },
  { label: "About us", href: "/about" },
  { label: "FaQ", href: "/#faq" },
  { label: "Contact", href: "#contact" },
];

const DEFAULT_LEGAL_LINKS: NavLink[] = [
  { label: "CGV", href: "/cgv" },
  { label: "Politique de retour", href: "/politique-de-retour" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Mentions légales", href: "/mentions-legales" },
];

const LINK_CLASS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:opacity-60";

interface FooterProps {
  navLinks?: NavLink[];
  socialLinks?: SocialLink[];
  legalLinks?: NavLink[];
  tagline?: string;
  contactEmail?: string;
}

export function Footer({
  navLinks = DEFAULT_NAV_LINKS,
  socialLinks = SOCIAL_LINKS,
  legalLinks = DEFAULT_LEGAL_LINKS,
  tagline = "Le vêtement comme moyen de sensibiliser, transmettre et agir.",
  contactEmail = "enfandepalestinesav@gmail.com",
}: FooterProps) {
  const pathname = usePathname();
  const visibleSocialLinks = socialLinks.filter((link) => link.href);

  function handleAnchorLinkClick(link: NavLink, event: MouseEvent<HTMLAnchorElement>) {
    const targetId =
      link.label === "Contact" ? "contact" : link.label === "FaQ" ? "faq" : null;
    if (!targetId) return;

    if (targetId === "faq" && pathname !== "/") return;

    event.preventDefault();
    scrollToId(targetId);
  }

  return (
    <footer
      id="contact"
      className="scroll-mt-[calc(56px+env(safe-area-inset-top))] border-t border-black/10 bg-white px-6 py-12 lg:scroll-mt-0 lg:px-16"
    >
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Logo className="h-6 w-6" />
          <p className="text-sm">{tagline}</p>
        </div>

        <ul className="flex flex-col gap-2 text-sm" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(event) => handleAnchorLinkClick(link, event)}
                className={LINK_CLASS}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-6 text-sm">
          <div className="flex flex-col gap-2">
            <p className="font-medium">Contact</p>
            <a href={`mailto:${contactEmail}`} className={LINK_CLASS}>
              {contactEmail}
            </a>
            <p className="text-black/60">
              Un souci avec une commande ? Écris-nous en indiquant ton numéro
              de commande.
            </p>
          </div>

          {visibleSocialLinks.length > 0 ? (
            <ul className="flex gap-4" role="list">
              {visibleSocialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={LINK_CLASS}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          <ul className="flex flex-col gap-2" role="list">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK_CLASS}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
