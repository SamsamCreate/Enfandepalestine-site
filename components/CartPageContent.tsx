"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/cart";
import { SHIPPING_SETTINGS, formatEuros } from "@/lib/data/shipping";
import { getProductBySlug, isPreorder } from "@/lib/products";
import { CartLineItem } from "./CartLineItem";
import { CartReassurance } from "./CartReassurance";
import { CartSuggestions } from "./CartSuggestions";
import { FreeShippingProgress } from "./FreeShippingProgress";

export function CartPageContent() {
  const router = useRouter();
  const { items } = useCart();

  const currency = items[0]?.currency ?? " €";
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const amountToFreeShipping = Math.max(0, SHIPPING_SETTINGS.freeShippingThreshold - subtotal);
  const isFreeShipping = amountToFreeShipping === 0;

  const preorderFlags = items.map((item) => isPreorder(getProductBySlug(item.productSlug), item.name));
  const splitShipmentText = SHIPPING_SETTINGS.splitShipmentText.trim();
  const showSplitShipment =
    splitShipmentText !== "" && preorderFlags.includes(true) && preorderFlags.includes(false);

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
        <div className="mt-10 pb-[calc(136px+env(safe-area-inset-bottom))] lg:flex lg:items-start lg:gap-12 lg:pb-0">
          <div className="min-w-0 lg:flex-1">
            <ul className="flex flex-col" role="list">
              {items.map((item) => (
                <CartLineItem key={`${item.productSlug}-${item.size}`} item={item} />
              ))}
            </ul>

            <CartSuggestions amountToFreeShipping={amountToFreeShipping} />
          </div>

          <aside className="mt-10 border border-black/10 p-6 lg:mt-0 lg:w-[360px] lg:shrink-0">
            <h2 className="text-sm font-bold uppercase tracking-widest">Total panier</h2>

            <FreeShippingProgress subtotal={subtotal} className="mt-5" />

            <div className="mt-6 flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-black/60">Sous-total</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              <div>
                <div className="flex justify-between gap-4">
                  <span className="text-black/60">Livraison en point relais</span>
                  <span>{isFreeShipping ? "Offerte" : formatEuros(SHIPPING_SETTINGS.relayPointFee)}</span>
                </div>
                <p className="mt-1 text-xs text-black/50">
                  À domicile (Colissimo) : {SHIPPING_SETTINGS.homeDeliveryFeeLabel}
                </p>
              </div>
              {showSplitShipment ? <p className="text-xs text-black/60">{splitShipmentText}</p> : null}
            </div>

            {/* Desktop: total + CTA inline in the card */}
            <div className="hidden lg:block">
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-black/10 pt-4">
                <span className="font-bold">
                  Total
                  {!isFreeShipping ? (
                    <span className="block text-xs font-normal text-black/50">hors frais de livraison</span>
                  ) : null}
                </span>
                <span className="text-xl font-bold">{formatPrice(subtotal, currency)}</span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block w-full bg-black py-4 text-center text-xs uppercase tracking-widest text-white hover:opacity-85"
              >
                Procéder au paiement
              </Link>
            </div>

            <Link
              href="/produits"
              className="mt-4 block text-center text-sm underline underline-offset-4 hover:opacity-60"
            >
              ← Continuer mes achats
            </Link>

            <CartReassurance className="mt-6 border-t border-black/10 pt-6" />
          </aside>
        </div>
      )}

      {/* Mobile: total + CTA pinned to the bottom of the screen */}
      {items.length > 0 ? (
        <div
          className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white px-4 py-3 lg:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <FreeShippingProgress subtotal={subtotal} variant="compact" className="mb-2" />
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm font-bold">
              Total
              {!isFreeShipping ? (
                <span className="ml-1.5 text-xs font-normal text-black/50">hors livraison</span>
              ) : null}
            </span>
            <span className="text-lg font-bold">{formatPrice(subtotal, currency)}</span>
          </div>
          <Link
            href="/checkout"
            className="flex min-h-11 w-full items-center justify-center bg-black text-xs uppercase tracking-widest text-white hover:opacity-85"
          >
            Procéder au paiement
          </Link>
        </div>
      ) : null}
    </div>
  );
}
