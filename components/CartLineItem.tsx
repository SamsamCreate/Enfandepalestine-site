"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice, type CartItem } from "@/lib/cart";

interface CartLineItemProps {
  item: CartItem;
}

export function CartLineItem({ item }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <li className="flex gap-4 border-b border-black/10 py-6 first:border-t">
      <button
        type="button"
        onClick={() => removeItem(item.productSlug, item.size)}
        aria-label={`Retirer ${item.name} du panier`}
        className="h-6 w-6 shrink-0 text-black/40 hover:text-black"
      >
        ×
      </button>

      <div className="h-20 w-20 shrink-0" style={{ backgroundColor: item.image }} />

      <div className="flex flex-1 flex-col gap-2">
        <p className="text-sm font-medium leading-snug">{item.name}</p>
        <p className="text-xs text-black/50">
          {[item.variantLabel, `Taille ${item.size}`].filter(Boolean).join(" · ")}
        </p>

        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => updateQuantity(item.productSlug, item.size, item.quantity - 1)}
            aria-label="Diminuer la quantité"
            className="flex h-8 w-8 items-center justify-center border border-black/20 hover:bg-black/5"
          >
            −
          </button>
          <span className="w-4 text-center text-sm">{item.quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(item.productSlug, item.size, item.quantity + 1)}
            aria-label="Augmenter la quantité"
            className="flex h-8 w-8 items-center justify-center border border-black/20 hover:bg-black/5"
          >
            +
          </button>
        </div>
      </div>

      <p className="shrink-0 text-sm font-bold">
        {formatPrice(item.price * item.quantity, item.currency)}
      </p>
    </li>
  );
}
