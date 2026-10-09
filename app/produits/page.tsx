import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
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
      <ProductsToolbar activeCategorySlug={activeCategory?.slug} />

      <section className="py-10 lg:py-14">
        {activeCategory ? (
          <p className="mb-6 px-6 text-sm text-black/60 lg:px-16">
            Catégorie : <span className="font-medium text-black">{activeCategory.label}</span>
            {" · "}
            <Link href="/produits" className="underline underline-offset-4 hover:opacity-60">
              Voir tout
            </Link>
          </p>
        ) : null}

        {products.length === 0 ? (
          <p className="px-6 text-sm text-black/60 lg:px-16">
            Aucun produit dans cette catégorie pour le moment.
          </p>
        ) : (
          <ProductGrid>
            {products.map((product, i) => (
              <ProductCard
                key={product.slug}
                name={product.name}
                price={product.price}
                currency={product.currency}
                inStock={product.inStock}
                images={product.images}
                color={product.color}
                colorLabel={product.colorLabel}
                label={product.label}
                href={`/produits/${product.slug}`}
                priority={i < 4}
              />
            ))}
          </ProductGrid>
        )}
      </section>
    </>
  );
}
