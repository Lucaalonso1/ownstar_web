"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  id: string; // Variant ID
  productId: string;
  title: string;
  variantTitle: string;
  price: string;
  image: string;
  quantity: number;
  handle: string;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ownstar_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("ownstar_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const checkout = () => {
    // Create Shopify Cart Permalink
    // Format: https://your-store.myshopify.com/cart/variant_id:quantity,variant_id:quantity
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const itemsString = cart
      .map((item) => `${item.id}:${item.quantity}`)
      .join(",");
    
    if (itemsString) {
      window.location.href = `https://${domain}/cart/${itemsString}`;
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, isCartOpen, addToCart, removeFromCart, toggleCart, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

