"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createCheckoutUrl } from "@/lib/shopify";

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
  updateQuantity: (id: string, quantity: number) => void;
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

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const checkout = async () => {
    // DEBUG: Verificar si se está ejecutando la nueva versión
    console.log("Checkout function called");
    
    const validItems = cart.filter((item) => item.id && item.quantity > 0);

    if (validItems.length === 0) {
      alert("El carrito está vacío o tiene ítems inválidos");
      return;
    }

    // 1. Intentar Checkout vía API Storefront
    try {
      console.log("Intentando crear checkout vía API...");
      const url = await createCheckoutUrl(validItems);
      
      if (url) {
        console.log("URL de API recibida:", url);
        window.location.href = url;
        return;
      }
    } catch (error) {
      console.error("Fallo en API checkout:", error);
      // Continuamos al fallback
    }

    // 2. Fallback: Checkout vía Permalink (URL directa)
    let domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    
    if (!domain) {
      console.error("Shopify Domain no configurado");
      return;
    }

    // Limpieza del dominio
    domain = domain.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    
    // Construir URL del permalink
    const itemsString = validItems
      .map((item) => {
        const id = item.id.replace("gid://shopify/ProductVariant/", "");
        return `${id}:${item.quantity}`;
      })
      .join(",");
    
    // Intentamos usar la ruta directa a Shopify.
    // NOTA: Si Shopify tiene ownstar.es como dominio principal, redirigirá allí.
    const permalinkUrl = `https://${domain}/cart/${itemsString}`;
    
    console.log("Redireccionando a Permalink:", permalinkUrl);
    window.location.href = permalinkUrl;
  };

  return (
    <CartContext.Provider
      value={{ cart, isCartOpen, addToCart, removeFromCart, updateQuantity, toggleCart, checkout }}
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

