import { SHIPPING_SETTINGS } from "@/lib/data/shipping";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  width: 16,
  height: 16,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "mt-0.5 shrink-0",
};

export function CartReassurance({ className = "" }: { className?: string }) {
  return (
    <ul role="list" className={`flex flex-col gap-3 text-sm text-black/70 ${className}`}>
      <li className="flex gap-3">
        <svg {...ICON_PROPS}>
          <rect x="5" y="11" width="14" height="9" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        <span>Paiement sécurisé</span>
      </li>
      <li className="flex gap-3">
        <svg {...ICON_PROPS}>
          <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
          <circle cx="7" cy="17.5" r="1.5" />
          <circle cx="17" cy="17.5" r="1.5" />
        </svg>
        <span>{SHIPPING_SETTINGS.deliveryTimesText}</span>
      </li>
      <li className="flex gap-3">
        <svg {...ICON_PROPS}>
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h10a6 6 0 0 1 0 12h-3" />
        </svg>
        <span>Retour sous 14 jours</span>
      </li>
    </ul>
  );
}
