import type { Metadata } from "next";
import Link from "next/link";
import { AboutPinned } from "@/components/AboutPinned";

export const metadata: Metadata = {
  title: "About us — Enfan de Palestine",
};

export default function AboutPage() {
  return (
    <>
      <AboutPinned />

      <section className="border-t border-black/10 px-6 py-16 text-center lg:px-16 lg:py-20">
        <p className="text-lg font-medium">Chaque achat finance ces actions.</p>
        <Link
          href="/produits"
          className="mt-6 inline-block bg-black px-6 py-3 text-xs uppercase tracking-widest text-white hover:opacity-85"
        >
          Voir les produits
        </Link>
      </section>
    </>
  );
}
