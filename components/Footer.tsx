import Link from "next/link";
import { Logo } from "./icons/Logo";
import type { NavLink, SocialLink } from "@/types";

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Produits", href: "/produits" },
  { label: "Donations", href: "/donations" },
  { label: "Archives", href: "/archives" },
  { label: "FaQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

const DEFAULT_LEGAL_LINKS: NavLink[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGV", href: "/cgv" },
];

interface FooterProps {
  navLinks?: NavLink[];
  socialLinks?: SocialLink[];
  legalLinks?: NavLink[];
  tagline?: string;
}

export function Footer({
  navLinks = DEFAULT_NAV_LINKS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  legalLinks = DEFAULT_LEGAL_LINKS,
  tagline = "Le vêtement comme moyen de sensibiliser, transmettre et agir.",
}: FooterProps) {
  return (
    <footer className="border-t border-black/10 bg-white px-6 py-12 lg:px-16">
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
                className="underline underline-offset-4 hover:opacity-60"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 text-sm">
          <ul className="flex gap-4" role="list">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:opacity-60"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2" role="list">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="underline underline-offset-4 hover:opacity-60"
                >
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
