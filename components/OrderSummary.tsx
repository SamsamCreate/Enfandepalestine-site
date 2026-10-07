import { formatPrice, type CartItem } from "@/lib/cart";

interface OrderSummaryProps {
  items: CartItem[];
  shipping?: number;
  discount?: number;
  currency?: string;
  className?: string;
}

export function OrderSummary({
  items,
  shipping = 0,
  discount = 0,
  currency = " €",
  className = "",
}: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shipping - discount;

  return (
    <div className={`border border-black/10 p-6 ${className}`}>
      <h2 className="text-sm font-bold uppercase tracking-widest">
        Récapitulatif de la commande
      </h2>

      <ul className="mt-6 flex flex-col gap-4" role="list">
        {items.map((item) => (
          <li key={`${item.productSlug}-${item.size}-${item.variantLabel}`} className="flex gap-3">
            <div className="h-16 w-16 shrink-0" style={{ backgroundColor: item.image }} />
            <div className="flex flex-1 flex-col text-sm">
              <p className="font-medium">{item.name}</p>
              <p className="text-black/50">
                {[item.variantLabel, item.size].filter(Boolean).join(" · ")}
                {item.quantity > 1 ? ` · x${item.quantity}` : ""}
              </p>
            </div>
            <p className="shrink-0 text-sm font-medium">
              {formatPrice(item.price * item.quantity, currency)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-2 border-t border-black/10 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-black/60">Sous-total</span>
          <span>{formatPrice(subtotal, currency)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black/60">Livraison</span>
          <span>{shipping === 0 ? "0,00 €" : formatPrice(shipping, currency)}</span>
        </div>
        {discount > 0 ? (
          <div className="flex justify-between text-[#7A6666]">
            <span>Réduction</span>
            <span>-{formatPrice(discount, currency)}</span>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex items-baseline justify-between border-t border-black/10 pt-4">
        <span className="font-bold">Total</span>
        <span className="text-xl font-bold">{formatPrice(total, currency)}</span>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-black/10 pt-6 text-center text-xs text-black/60">
        <div className="flex flex-col items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <rect x="5" y="11" width="14" height="9" rx="1.5" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          <span>Paiement sécurisé</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path d="M3 7h11v10H3z" />
            <path d="M14 11h4l3 3v3h-7z" />
            <circle cx="7.5" cy="18.5" r="1.5" />
            <circle cx="17.5" cy="18.5" r="1.5" />
          </svg>
          <span>Livraison gratuite</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path d="M4 12a8 8 0 1 0 3-6.3" />
            <path d="M4 4v4.5H8.5" />
          </svg>
          <span>Retours faciles</span>
        </div>
      </div>
    </div>
  );
}
