"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice, type CartItem } from "@/lib/cart";
import { SHIPPING_SETTINGS } from "@/lib/data/shipping";
import { getProductBySlug, isPreorder } from "@/lib/products";

interface CartLineItemProps {
  item: CartItem;
}

export function CartLineItem({ item }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const preorderDelay = SHIPPING_SETTINGS.preorderDelay.trim();
  const isPreorderLine = isPreorder(getProductBySlug(item.productSlug), item.name);

  return (
    <li className="flex gap-3 border-b border-black/10 py-6 first:border-t sm:gap-4">
      <button
        type="button"
        onClick={() => removeItem(item.productSlug, item.size)}
        aria-label={`Retirer ${item.name} du panier`}
        className="-ml-2.5 flex h-11 w-11 shrink-0 items-center justify-center text-lg text-black/40 hover:text-black"
      >
        ×
      </button>

      <div className="h-20 w-20 shrink-0 sm:h-24 sm:w-24" style={{ backgroundColor: item.image }} />

      <div className="flex flex-1 flex-col gap-3">
        <div>
          <p className="text-sm font-medium leading-snug">{item.name}</p>
          {isPreorderLine ? (
            <p className="mt-1 text-xs font-medium">
              {preorderDelay ? `Précommande · expédition estimée : ${preorderDelay}` : "Précommande"}
            </p>
          ) : null}
          <p className="mt-1 text-xs text-black/50">
            {[item.variantLabel, `Taille ${item.size}`].filter(Boolean).join(" · ")}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateQuantity(item.productSlug, item.size, item.quantity - 1)}
              aria-label="Diminuer la quantité"
              className="flex h-11 w-11 items-center justify-center border border-black/20 hover:bg-black/5"
            >
              −
            </button>
            <span className="w-6 text-center text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.productSlug, item.size, item.quantity + 1)}
              aria-label="Augmenter la quantité"
              className="flex h-11 w-11 items-center justify-center border border-black/20 hover:bg-black/5"
            >
              +
            </button>
          </div>

          <p className="text-sm font-bold">
            {formatPrice(item.price * item.quantity, item.currency)}
          </p>
        </div>
      </div>
    </li>
  );
}
