"use client";

import { useEffect, useRef, useState } from "react";
import { AccordionItem } from "./AccordionItem";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

const CARE_INSTRUCTIONS =
  "Lavage en machine à 30 °C maximum, sur l'envers. Ne pas utiliser de sèche linge. Repassage à basse température, sur l'envers uniquement.";

const SHIPPING_INFO =
  "Les commandes sont préparées sous un délai de 24 à 72 heures ouvrées (hors précommande). Les articles en précommande sont expédiés sous un délai estimé de 5 à 6 semaines. Livraison sous un délai de 2 à 5 jours ouvrés pour la France, 6 jours ouvrés pour l'Europe et 8 jours ouvrés pour le reste du Monde. Vous disposez d'un délai de 14 jours après réception pour exercer votre droit de rétractation. Toute demande de retour doit être effectuée par e-mail afin de recevoir la procédure correspondante.";

interface ProductPanelProps {
  product: Product;
}

export function ProductPanel({ product }: ProductPanelProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [openSection, setOpenSection] = useState<string | null>("detail");
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [isMainCtaVisible, setIsMainCtaVisible] = useState(true);
  const mainCtaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = mainCtaRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setIsMainCtaVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function toggleSection(key: string) {
    setOpenSection((current) => (current === key ? null : key));
  }

  function handleAddToCart() {
    addItem({
      productSlug: product.slug,
      name: product.name,
      size: selectedSize,
      price: product.price,
      currency: product.currency,
      quantity: 1,
      image: product.images[0],
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <>
    <div className="flex flex-col gap-6 border-t border-black/10 px-6 py-8 lg:sticky lg:top-6 lg:max-h-screen lg:basis-96 lg:grow lg:shrink-0 lg:overflow-y-auto lg:border-t-0 lg:border-l lg:px-16 lg:py-10">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-lg font-bold">{product.name}</h1>
        {product.inStock ? (
          <p className="shrink-0 text-lg font-bold">
            {product.price}
            {product.currency}
          </p>
        ) : (
          <p className="shrink-0 text-black/40">Épuisé</p>
        )}
      </div>

      <p className="text-xs text-black/50">{product.formatsLabel}</p>

      <p className="text-sm leading-relaxed text-black/70">{product.description}</p>

      <fieldset className="grid grid-cols-4 gap-2">
        <legend className="sr-only">Taille</legend>
        {product.sizes.map((size) => (
          <label key={size} className="cursor-pointer">
            <input
              type="radio"
              name="size"
              value={size}
              checked={selectedSize === size}
              onChange={() => setSelectedSize(size)}
              className="peer sr-only"
            />
            <span className="flex h-11 w-full items-center justify-center border border-black/20 px-2 text-sm peer-checked:border-black peer-checked:bg-black peer-checked:text-white">
              {size}
            </span>
          </label>
        ))}
      </fieldset>

      <div className="flex gap-3">
        <button
          ref={mainCtaRef}
          type="button"
          disabled={!product.inStock}
          onClick={handleAddToCart}
          className="flex min-h-11 flex-1 items-center justify-center bg-black text-xs uppercase tracking-widest text-white hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {!product.inStock ? "Épuisé" : justAdded ? "Ajouté ✓" : "Add to cart"}
        </button>
        <button
          type="button"
          className="flex min-h-11 flex-1 items-center justify-center border border-black/20 text-xs uppercase tracking-widest hover:bg-black/5"
        >
          Add to wishlist
        </button>
      </div>

      <div className="border-b border-black/10">
        <AccordionItem
          title="Détail du Produit"
          isOpen={openSection === "detail"}
          onToggle={() => toggleSection("detail")}
        >
          <p>{product.detail ?? "Détail à venir"}</p>
        </AccordionItem>
        <AccordionItem
          title="Matière & Entretien"
          isOpen={openSection === "care"}
          onToggle={() => toggleSection("care")}
        >
          <p>{CARE_INSTRUCTIONS}</p>
        </AccordionItem>
        <AccordionItem
          title="Taille & Coupe"
          isOpen={openSection === "fit"}
          onToggle={() => toggleSection("fit")}
        >
          <p>{product.sizeGuide ?? "Guide des tailles à venir"}</p>
        </AccordionItem>
        <AccordionItem
          title="Livraison"
          isOpen={openSection === "shipping"}
          onToggle={() => toggleSection("shipping")}
        >
          <p>{SHIPPING_INFO}</p>
        </AccordionItem>
      </div>
    </div>

    {!isMainCtaVisible ? (
      <div
        className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-black/10 bg-white px-4 py-3 lg:hidden"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate text-sm font-medium">{product.name}</p>
          {product.inStock ? (
            <p className="text-sm font-bold">
              {product.price}
              {product.currency}
            </p>
          ) : (
            <p className="text-sm text-black/40">Épuisé</p>
          )}
        </div>
        <button
          type="button"
          disabled={!product.inStock}
          onClick={handleAddToCart}
          className="flex min-h-11 shrink-0 items-center justify-center bg-black px-6 text-xs uppercase tracking-widest text-white hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {!product.inStock ? "Épuisé" : justAdded ? "Ajouté ✓" : "Add to cart"}
        </button>
      </div>
    ) : null}
    </>
  );
}
