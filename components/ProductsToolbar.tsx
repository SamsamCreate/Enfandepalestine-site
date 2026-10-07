"use client";

import { useState } from "react";
import Link from "next/link";

export function ProductsToolbar() {
  const [isPromoVisible, setIsPromoVisible] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="border-b border-black/10">
      <div className="flex items-center justify-between gap-4 px-6 py-4 text-xs uppercase tracking-widest lg:px-16">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFilterOpen((open) => !open)}
            aria-expanded={isFilterOpen}
            className="underline underline-offset-4 hover:opacity-60"
          >
            Filtrer
          </button>

          {isFilterOpen ? (
            <div className="absolute left-0 top-full z-10 mt-3 w-64 border border-black/10 bg-white p-4 normal-case tracking-normal">
              <p className="text-sm text-black/50">Filtres à venir.</p>
            </div>
          ) : null}
        </div>

        {isPromoVisible ? (
          <p className="hidden text-center sm:block">
            Livraison gratuite dès 200€ ·{" "}
            <button
              type="button"
              onClick={() => setIsPromoVisible(false)}
              className="underline underline-offset-4 hover:opacity-60"
            >
              Masquer
            </button>
          </p>
        ) : (
          <span aria-hidden="true" />
        )}

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden underline underline-offset-4 hover:opacity-60 sm:inline"
          >
            Recherche
          </button>
          <Link href="/panier" className="underline underline-offset-4 hover:opacity-60">
            Panier
          </Link>
        </div>
      </div>
    </div>
  );
}
