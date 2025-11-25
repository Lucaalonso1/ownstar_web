"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, checkout } = useCart();
  const { t } = useLanguage();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full md:w-[450px] bg-white text-black z-[70] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-100">
            <h2 className="text-xl font-bold uppercase tracking-tighter">
              {t.cart.title} ({cart.length})
            </h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-neutral-400 space-y-4">
                <ShoppingBag className="w-12 h-12 opacity-20" />
                <p className="text-sm uppercase tracking-wide">{t.cart.empty}</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-24 bg-neutral-100 shrink-0">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold uppercase leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        {item.variantTitle}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{item.price} EUR</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] uppercase underline text-neutral-400 hover:text-black"
                      >
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-100 bg-neutral-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium uppercase">{t.cart.total}</span>
                <span className="text-lg font-bold">
                  {cart
                    .reduce(
                      (acc, item) => acc + parseFloat(item.price) * item.quantity,
                      0
                    )
                    .toFixed(2)}{" "}
                  EUR
                </span>
              </div>
              <button
                onClick={checkout}
                className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
              >
                {t.cart.checkout}
              </button>
              <p className="text-[10px] text-neutral-400 text-center mt-4">
                {t.cart.taxes}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

