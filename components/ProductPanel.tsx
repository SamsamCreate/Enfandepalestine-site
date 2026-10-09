"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AccordionItem } from "./AccordionItem";
import { SizeSheet } from "./SizeSheet";
import { useCart } from "@/lib/cart-context";
import { scrollToId } from "@/lib/scroll-to-id";
import type { Product } from "@/lib/products";

const CARE_INSTRUCTIONS =
  "Lavage en machine à 30 °C maximum, sur l'envers. Ne pas utiliser de sèche linge. Repassage à basse température, sur l'envers uniquement.";

const SHIPPING_INFO =
  "Les commandes sont préparées sous un délai de 24 à 72 heures ouvrées (hors précommande). Les articles en précommande sont expédiés sous un délai estimé de 5 à 6 semaines. Livraison sous un délai de 2 à 5 jours ouvrés pour la France, 6 jours ouvrés pour l'Europe et 8 jours ouvrés pour le reste du Monde. Vous disposez d'un délai de 14 jours après réception pour exercer votre droit de rétractation. Toute demande de retour doit être effectuée par e-mail afin de recevoir la procédure correspondante.";

const SIZE_GUIDE_ID = "taille-et-coupe";
const JUST_ADDED_MS = 1500;
const TOAST_MS = 5000;

interface ProductPanelProps {
  product: Product;
  chooseSizeLabel?: string;
}

export function ProductPanel({ product, chooseSizeLabel = "Choisir une taille" }: ProductPanelProps) {
  const isSingleSize = product.sizes.length === 1;
  const unavailableSizes = product.unavailableSizes ?? [];

  const [selectedSize, setSelectedSize] = useState<string | null>(
    isSingleSize ? product.sizes[0] : null,
  );
  const [sizeError, setSizeError] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [toastSize, setToastSize] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>("detail");
  const [justAdded, setJustAdded] = useState(false);
  const [isMainCtaVisible, setIsMainCtaVisible] = useState(true);
  const { addItem } = useCart();

  const mainCtaRef = useRef<HTMLButtonElement>(null);
  const barButtonRef = useRef<HTMLButtonElement>(null);
  const sizeFieldsetRef = useRef<HTMLFieldSetElement>(null);
  const justAddedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const el = mainCtaRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setIsMainCtaVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      clearTimeout(justAddedTimer.current);
      clearTimeout(toastTimer.current);
    },
    [],
  );

  function toggleSection(key: string) {
    setOpenSection((current) => (current === key ? null : key));
  }

  // Single entry point for every add-to-cart path: never adds without a size.
  function addToCart(size: string | null) {
    if (!size || !product.inStock || unavailableSizes.includes(size)) return false;

    addItem({
      productSlug: product.slug,
      name: product.name,
      size,
      price: product.price,
      currency: product.currency,
      quantity: 1,
      image: product.images[0],
    });
    setJustAdded(true);
    clearTimeout(justAddedTimer.current);
    justAddedTimer.current = setTimeout(() => setJustAdded(false), JUST_ADDED_MS);
    return true;
  }

  function selectSize(size: string) {
    setSelectedSize(size);
    setSizeError(false);
  }

  function handleMainCta() {
    if (addToCart(selectedSize) || selectedSize) return;

    setSizeError(true);
    const fieldset = sizeFieldsetRef.current;
    fieldset?.querySelector<HTMLInputElement>("input:not(:disabled)")?.focus();
    if (fieldset && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fieldset.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(6px)" },
          { transform: "translateX(-4px)" },
          { transform: "translateX(4px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 400, easing: "ease-in-out" },
      );
    }
  }

  function handleBarButton() {
    if (!product.inStock) return;
    if (!selectedSize) {
      setIsSheetOpen(true);
      return;
    }
    addToCart(selectedSize);
  }

  const closeSheet = useCallback(() => {
    setIsSheetOpen(false);
    requestAnimationFrame(() => barButtonRef.current?.focus());
  }, []);

  function handleSheetSelect(size: string) {
    selectSize(size);
    if (!addToCart(size)) return;
    closeSheet();
    setToastSize(size);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastSize(null), TOAST_MS);
  }

  function openSizeGuide() {
    setOpenSection("fit");
    setIsSheetOpen(false);
    // Two frames: the sheet's scroll lock is released and the accordion content is rendered.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(SIZE_GUIDE_ID)));
  }

  let barLabel: string;
  if (!product.inStock) barLabel = "Épuisé";
  else if (justAdded) barLabel = "Ajouté ✓";
  else if (!selectedSize) barLabel = chooseSizeLabel;
  else barLabel = isSingleSize ? "Add to cart" : `Add to cart · ${selectedSize}`;

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

      {!isSingleSize ? (
        <div className="flex flex-col gap-2">
          <fieldset
            ref={sizeFieldsetRef}
            aria-describedby={sizeError ? "size-error" : undefined}
            className="grid grid-cols-4 gap-2"
          >
            <legend className="sr-only">Taille</legend>
            {product.sizes.map((size) => {
              const isUnavailable = unavailableSizes.includes(size);
              return (
                <label key={size} className={isUnavailable ? "cursor-not-allowed" : "cursor-pointer"}>
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    disabled={isUnavailable}
                    onChange={() => selectSize(size)}
                    className="peer sr-only"
                  />
                  <span className="flex h-11 w-full items-center justify-center border border-black/20 px-2 text-sm peer-checked:border-black peer-checked:bg-black peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black peer-disabled:border-black/10 peer-disabled:text-black/30 peer-disabled:line-through">
                    {size}
                    {isUnavailable ? <span className="sr-only"> (indisponible)</span> : null}
                  </span>
                </label>
              );
            })}
          </fieldset>
          {sizeError ? (
            <p id="size-error" role="alert" className="text-xs text-red-700">
              Choisis ta taille
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="flex gap-3">
        <button
          ref={mainCtaRef}
          type="button"
          disabled={!product.inStock}
          onClick={handleMainCta}
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
        <div id={SIZE_GUIDE_ID} className="scroll-mt-[calc(56px+env(safe-area-inset-top))] lg:scroll-mt-0">
          <AccordionItem
            title="Taille & Coupe"
            isOpen={openSection === "fit"}
            onToggle={() => toggleSection("fit")}
          >
            <p>{product.sizeGuide ?? "Guide des tailles à venir"}</p>
          </AccordionItem>
        </div>
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
          ref={barButtonRef}
          type="button"
          disabled={!product.inStock}
          onClick={handleBarButton}
          aria-haspopup={!selectedSize && product.inStock ? "dialog" : undefined}
          className="flex min-h-11 shrink-0 items-center justify-center bg-black px-6 text-xs uppercase tracking-widest text-white hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {barLabel}
        </button>
      </div>
    ) : null}

    <div
      role="status"
      className="fixed inset-x-4 z-40 lg:hidden"
      style={{ bottom: "calc(80px + env(safe-area-inset-bottom))" }}
    >
      {toastSize ? (
        <div className="flex items-center justify-between gap-4 bg-black px-4 py-1 text-sm text-white">
          <span>Ajouté : taille {toastSize}</span>
          <Link href="/panier" className="flex min-h-11 items-center underline underline-offset-4">
            Voir le panier
          </Link>
        </div>
      ) : null}
    </div>

    <SizeSheet
      isOpen={isSheetOpen}
      sizes={product.sizes}
      unavailableSizes={unavailableSizes}
      selectedSize={selectedSize}
      onSelect={handleSheetSelect}
      onClose={closeSheet}
      onOpenSizeGuide={openSizeGuide}
      title={chooseSizeLabel}
    />
    </>
  );
}
