import { PRODUCTS, getLatestProducts, getProductBySlug, type Product } from "./products";

/**
 * "Complète avec": complementary products of what's in the cart, then same-category
 * products, then "Dernières sorties". Skips products already in the cart and sold-out ones.
 * Below the free-shipping threshold, the picks closest in price to the missing amount come first.
 */
export function getCartSuggestions(cartSlugs: string[], amountToFreeShipping: number, limit = 3): Product[] {
  const inCart = new Set(cartSlugs);
  const cartProducts = [...inCart].map(getProductBySlug).filter((p): p is Product => Boolean(p));
  const cartCategories = new Set(cartProducts.map((product) => product.category));

  const complementary = cartProducts
    .flatMap((product) => product.complementary ?? [])
    .map(getProductBySlug);
  const related = PRODUCTS.filter((product) => cartCategories.has(product.category));

  const picks: Product[] = [];
  for (const product of [...complementary, ...related, ...getLatestProducts()]) {
    if (picks.length === limit) break;
    if (!product || inCart.has(product.slug) || !product.inStock) continue;
    if (picks.some((pick) => pick.slug === product.slug)) continue;
    picks.push(product);
  }

  if (amountToFreeShipping > 0) {
    picks.sort(
      (a, b) => Math.abs(a.price - amountToFreeShipping) - Math.abs(b.price - amountToFreeShipping),
    );
  }
  return picks;
}
