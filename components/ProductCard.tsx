import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  price: number;
  currency?: string;
  imageSrc?: string;
  color?: string;
  href?: string;
  inStock?: boolean;
  /** "compact" — small aplat card used in horizontal drops rows.
   *  "grid" — large portrait card used on the Produits grid. */
  variant?: "compact" | "grid";
}

export function ProductCard({
  name,
  price,
  currency = "",
  imageSrc,
  color = "#D9D5D0",
  href,
  inStock = true,
  variant = "compact",
}: ProductCardProps) {
  const image =
    variant === "grid" ? (
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2F1EE]">
        {imageSrc ? (
          <Image src={imageSrc} alt={name} fill className="object-cover" />
        ) : null}
      </div>
    ) : (
      <div
        className="relative aspect-square w-full overflow-hidden"
        style={{ backgroundColor: imageSrc ? undefined : color }}
      >
        {imageSrc ? (
          <Image src={imageSrc} alt={name} fill className="object-cover" />
        ) : null}
      </div>
    );

  const details =
    variant === "grid" ? (
      <div className="flex flex-col gap-1 text-sm">
        <p className="font-bold uppercase">{name}</p>
        {inStock ? (
          <p className="font-bold">
            {price}
            {currency}
          </p>
        ) : (
          <p className="text-black/40">Épuisé</p>
        )}
      </div>
    ) : (
      <div className="flex items-start justify-between gap-2 text-sm">
        <p className="leading-snug">&ldquo;{name}&rdquo;</p>
        <p className="shrink-0">
          {price}
          {currency}
        </p>
      </div>
    );

  const card = (
    <div className="flex flex-col gap-3">
      {image}
      {details}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:opacity-80">
        {card}
      </Link>
    );
  }

  return card;
}
