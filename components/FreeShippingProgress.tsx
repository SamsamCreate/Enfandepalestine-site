import { SHIPPING_SETTINGS, formatEuros } from "@/lib/data/shipping";

interface FreeShippingProgressProps {
  subtotal: number;
  threshold?: number;
  /** "compact": one line (message + bar side by side), for tight spots like the mobile fixed bar. */
  variant?: "full" | "compact";
  className?: string;
}

export function FreeShippingProgress({
  subtotal,
  threshold = SHIPPING_SETTINGS.freeShippingThreshold,
  variant = "full",
  className = "",
}: FreeShippingProgressProps) {
  const remaining = Math.max(0, threshold - subtotal);
  const isReached = remaining === 0;
  const ratio = threshold > 0 ? Math.min(1, subtotal / threshold) : 1;

  const bar = (
    <div
      role="progressbar"
      aria-label="Progression vers la livraison offerte"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
      className="h-1 w-full overflow-hidden bg-black/10"
    >
      <div
        className="h-full origin-left bg-black motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out"
        style={{ transform: `scaleX(${ratio})` }}
      />
    </div>
  );

  if (variant === "compact") {
    return (
      <div aria-hidden="true" className={`flex items-center gap-3 ${className}`}>
        <p className="min-w-0 flex-1 truncate text-xs">
          {isReached
            ? "Livraison offerte ✓"
            : `Plus que ${formatEuros(remaining)} pour la livraison offerte`}
        </p>
        <div className="w-20 shrink-0">{bar}</div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p aria-live="polite" className="text-sm">
        {isReached
          ? "Livraison offerte en point relais ✓"
          : `Plus que ${formatEuros(remaining)} pour la livraison offerte en point relais`}
      </p>
      {bar}
    </div>
  );
}
