export function formatPrice(amount: number, currency: string) {
  return `${amount.toFixed(2).replace(".", ",")}${currency}`;
}

export interface CartItem {
  productSlug: string;
  name: string;
  variantLabel?: string;
  size: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
}

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    productSlug: "demain-tout-ira-mieux",
    name: "T-shirt - Demain tout ira mieux",
    variantLabel: "Taupe",
    size: "M",
    price: 40,
    currency: " €",
    quantity: 1,
    image: "#7A6666",
  },
  {
    productSlug: "kids-have-dreams-too",
    name: "Marinière - Kids have dreams too",
    variantLabel: "Anthracite",
    size: "S",
    price: 55,
    currency: " €",
    quantity: 1,
    image: "#3F3B38",
  },
];

export const MOCK_SHIPPING = 0;
export const MOCK_DISCOUNT = 0;
