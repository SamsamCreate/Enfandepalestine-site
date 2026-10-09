"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductCard } from "./ProductCard";
import { SizeSheet } from "./SizeSheet";
import { useCart } from "@/lib/cart-context";
import { getCartSuggestions } from "@/lib/cart-suggestions";
import type { Product } from "@/lib/products";

const ACTION_CLASS =
  "mt-3 flex min-h-11 w-full items-center justify-center border border-black text-xs uppercase tracking-widest hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

interface CartSuggestionsProps {
  amountToFreeShipping: number;
}

export function CartSuggestions({ amountToFreeShipping }: CartSuggestionsProps) {
  const router = useRouter();
  const { items, addItem } = useCart();
  const [sheetProduct, setSheetProduct] = useState<Product | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sheetTriggerRef = useRef<HTMLButtonElement | null>(null);

  const suggestions = getCartSuggestions(
    items.map((item) => item.productSlug),
    amountToFreeShipping,
  );

  function addToCart(product: Product, size: string) {
    addItem({
      productSlug: product.slug,
      name: product.name,
      size,
      price: product.price,
      currency: product.currency,
      quantity: 1,
      image: product.images[0],
    });
    // The added product leaves the suggestions, so its button disappears: keep focus in the section.
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  const closeSheet = useCallback(() => {
    setSheetProduct(null);
    requestAnimationFrame(() => sheetTriggerRef.current?.focus());
  }, []);

  if (suggestions.length === 0) return null;

  return (
    <section aria-labelledby="cart-suggestions-title" className="mt-10">
      <h2
        id="cart-suggestions-title"
        ref={headingRef}
        tabIndex={-1}
        className="font-tight text-xl font-medium leading-[1.15] tracking-[-0.02em] focus:outline-none"
      >
        Complète avec
      </h2>

      <ul
        role="list"
        className="-mx-6 mt-5 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {suggestions.map((product) => {
          const href = `/produits/${product.slug}`;
          return (
            <li key={product.slug} className="w-[44%] shrink-0 snap-start lg:w-auto">
              <ProductCard
                name={product.name}
                price={product.price}
                currency={product.currency}
                inStock={product.inStock}
                images={product.images}
                color={product.color}
                colorLabel={product.colorLabel}
                label={product.label}
                href={href}
              />
              {product.sizes.length === 1 ? (
                <button type="button" onClick={() => addToCart(product, product.sizes[0])} className={ACTION_CLASS}>
                  Ajouter au panier
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      sheetTriggerRef.current = event.currentTarget;
                      setSheetProduct(product);
                    }}
                    aria-haspopup="dialog"
                    className={`${ACTION_CLASS} lg:hidden`}
                  >
                    Choisir la taille
                  </button>
                  <Link href={href} className={`${ACTION_CLASS} hidden lg:flex`}>
                    Choisir la taille
                  </Link>
                </>
              )}
            </li>
          );
        })}
      </ul>

      <SizeSheet
        isOpen={sheetProduct !== null}
        sizes={sheetProduct?.sizes ?? []}
        unavailableSizes={sheetProduct?.unavailableSizes}
        selectedSize={null}
        onSelect={(size) => {
          if (!sheetProduct) return;
          setSheetProduct(null);
          addToCart(sheetProduct, size);
        }}
        onClose={closeSheet}
        onOpenSizeGuide={() => sheetProduct && router.push(`/produits/${sheetProduct.slug}`)}
      />
    </section>
  );
}
