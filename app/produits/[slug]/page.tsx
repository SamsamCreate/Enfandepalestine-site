import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPanel } from "@/components/ProductPanel";
import { PRODUCTS, getProductBySlug } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return {
    title: product ? `${product.name} — Enfan de Palestine` : "Produit — Enfan de Palestine",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div
      className="pb-[calc(76px+env(safe-area-inset-bottom))] lg:flex lg:items-start lg:pb-0"
    >
      <div className="lg:basis-0 lg:grow-[4]">
        <ProductGallery images={product.images} name={product.name} />
      </div>
      <ProductPanel product={product} />
    </div>
  );
}
