"use client";

import { OrderSummary } from "./OrderSummary";
import { useCart } from "@/lib/cart-context";
import { MOCK_SHIPPING, MOCK_DISCOUNT } from "@/lib/cart";

export function CheckoutOrderSummary() {
  const { items } = useCart();

  return <OrderSummary items={items} shipping={MOCK_SHIPPING} discount={MOCK_DISCOUNT} />;
}
