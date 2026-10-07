import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ProductsToolbar } from "@/components/ProductsToolbar";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/products";

export const metadata: Metadata = {
  title: "Produits — Enfan de Palestine",
};

interface ProduitsPageProps {
  searchParams: Promise<{ categorie?: string }>;
}

export default async function ProduitsPage({ searchParams }: ProduitsPageProps) {
  const { categorie } = await searchParams;
  const activeCategory = PRODUCT_CATEGORIES.find((category) => category.slug === categorie);
  const products = activeCategory
    ? PRODUCTS.filter((product) => product.category === activeCategory.slug)
    : PRODUCTS;

  return (
    <>
      <ProductsToolbar />

      <section className="px-6 py-10 lg:px-16 lg:py-14">
        {activeCategory ? (
          <p className="mb-6 text-sm text-black/60">
            Catégorie : <span className="font-medium text-black">{activeCategory.label}</span>
            {" · "}
            <Link href="/produits" className="underline underline-offset-4 hover:opacity-60">
              Voir tout
            </Link>
          </p>
        ) : null}

        {products.length === 0 ? (
          <p className="text-sm text-black/60">
            Aucun produit dans cette catégorie pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                variant="grid"
                name={product.name}
                price={product.price}
                currency={product.currency}
                inStock={product.inStock}
                href={`/produits/${product.slug}`}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
