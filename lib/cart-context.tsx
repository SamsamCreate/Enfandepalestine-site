"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "./cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (productSlug: string, size: string) => void;
  updateQuantity: (productSlug: string, size: string, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "edp-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // Reading localStorage on mount (not during render) avoids an SSR/client markup mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // localStorage unavailable (private mode, etc.) — start with an empty cart.
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable — the cart still works for this session.
    }
  }, [items, isHydrated]);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (item) => item.productSlug === newItem.productSlug && item.size === newItem.size,
      );
      if (existingIndex !== -1) {
        const next = [...current];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + newItem.quantity,
        };
        return next;
      }
      return [...current, newItem];
    });
  }, []);

  const removeItem = useCallback((productSlug: string, size: string) => {
    setItems((current) =>
      current.filter((item) => !(item.productSlug === productSlug && item.size === size)),
    );
  }, []);

  const updateQuantity = useCallback(
    (productSlug: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productSlug, size);
        return;
      }
      setItems((current) =>
        current.map((item) =>
          item.productSlug === productSlug && item.size === size ? { ...item, quantity } : item,
        ),
      );
    },
    [removeItem],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, itemCount, addItem, removeItem, updateQuantity }),
    [items, itemCount, addItem, removeItem, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
