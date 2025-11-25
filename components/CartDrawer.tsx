"use client";

import { X, ShoppingBag, ArrowRight } from "lucide-react";
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
          "fixed inset-0 bg-black/60 z-[90] transition-opacity duration-500 backdrop-blur-sm",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full md:w-[500px] bg-white text-black z-[100] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-neutral-100 bg-white z-10">
          <h2 className="text-2xl font-bold uppercase tracking-tighter">
            {t.cart.title} <span className="text-neutral-300 ml-1 font-normal">({cart.length})</span>
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 -mr-2 hover:bg-neutral-50 rounded-full transition-colors group"
          >
            <X className="w-6 h-6 text-neutral-400 group-hover:text-black transition-colors" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-300 space-y-6">
              <div className="bg-neutral-50 p-6 rounded-full">
                <ShoppingBag className="w-10 h-10 opacity-20 text-black" strokeWidth={1.5} />
              </div>
              <p className="text-sm uppercase tracking-widest font-medium text-neutral-400">
                {t.cart.empty}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 group relative">
                  {/* Image */}
                  <div className="relative w-24 aspect-[3/4] bg-neutral-100 shrink-0 overflow-hidden">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-sm font-bold uppercase tracking-tight leading-tight max-w-[80%]">
                          {item.title}
                        </h3>
                        <span className="text-sm font-medium shrink-0">{item.price} €</span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wide">
                        {item.variantTitle !== "Default Title" ? item.variantTitle : "One Size"}
                      </p>
                      <p className="text-xs text-neutral-400 mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-red-500 transition-colors w-fit border-b border-transparent hover:border-red-500"
                    >
                      {t.cart.remove}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-8 border-t border-neutral-100 bg-white">
            <div className="flex items-end justify-between mb-6">
              <span className="text-sm font-medium uppercase tracking-wide text-neutral-500">Total</span>
              <span className="text-2xl font-bold tracking-tighter">
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
              className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all flex items-center justify-between px-8 group relative overflow-hidden"
            >
              <span className="relative z-10">{t.cart.checkout}</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-neutral-400 text-center mt-4 uppercase tracking-wider">
              {t.cart.taxes}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
