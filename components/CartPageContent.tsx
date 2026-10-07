"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/cart";
import { CartLineItem } from "./CartLineItem";

export function CartPageContent() {
  const router = useRouter();
  const { items } = useCart();

  const currency = items[0]?.currency ?? " €";
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="px-6 py-8 lg:px-16 lg:py-10">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-sm underline underline-offset-4 hover:opacity-60"
      >
        ← Retour
      </button>

      <h1 className="mt-6 font-tight text-3xl font-light leading-[1.15] tracking-[-0.02em] sm:text-4xl">
        VOTRE PANIER
      </h1>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <p className="text-black/60">Votre panier est vide</p>
          <Link
            href="/produits"
            className="bg-black px-6 py-3 text-xs uppercase tracking-widest text-white hover:opacity-85"
          >
            Voir les produits
          </Link>
        </div>
      ) : (
        <div className="mt-10 lg:flex lg:items-start lg:gap-12">
          <ul className="flex flex-col lg:flex-1" role="list">
            {items.map((item) => (
              <CartLineItem key={`${item.productSlug}-${item.size}`} item={item} />
            ))}
          </ul>

          <aside className="mt-10 border border-black/10 p-6 lg:mt-0 lg:w-[360px] lg:shrink-0">
            <h2 className="text-sm font-bold uppercase tracking-widest">Total panier</h2>

            <div className="mt-6 flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-black/60">Livraison</span>
                <span>Calculé à l&apos;étape suivante</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Sous-total</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between border-t border-black/10 pt-4">
              <span className="font-bold">Total</span>
              <span className="text-xl font-bold">{formatPrice(subtotal, currency)}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full bg-black py-4 text-center text-xs uppercase tracking-widest text-white hover:opacity-85"
            >
              Procéder au paiement
            </Link>

            <Link
              href="/produits"
              className="mt-4 block text-center text-sm underline underline-offset-4 hover:opacity-60"
            >
              ← Continuer mes achats
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
