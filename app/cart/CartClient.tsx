"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CartClient() {
  const { cart, updateQuantity, removeFromCart, checkout } = useCart();

  // Empty State
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 animate-fade-in">
        <div className="mb-8 opacity-20">
          <ShoppingBag strokeWidth={1} className="w-24 h-24" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4 text-center">
          Tu cesta está vacía
        </h1>
        <p className="text-neutral-500 mb-10 text-center max-w-md font-light tracking-wide">
          Descubre nuestra última colección y encuentra tus favoritos.
        </p>
        <Link
          href="/"
          className="group relative overflow-hidden bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors"
        >
          <span className="relative z-10">Volver a la tienda</span>
        </Link>
      </div>
    );
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <main className="pt-32 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 border-b border-neutral-200 pb-6">
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">
          Cesta
          <span className="text-neutral-300 ml-2 text-3xl md:text-5xl align-top">
            ({cart.length})
          </span>
        </h1>
        <Link href="/" className="hidden md:block text-xs font-bold uppercase tracking-widest underline underline-offset-4 hover:text-neutral-500 transition-colors mb-2">
          Continuar comprando
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-12">
          {cart.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col md:flex-row gap-6 md:gap-10 relative"
            >
              {/* Product Image */}
              <Link href={`/product/${item.handle}`} className="shrink-0 block w-full md:w-48 aspect-[3/4] bg-neutral-100 relative overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs uppercase">
                    No Image
                  </div>
                )}
              </Link>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Link
                      href={`/product/${item.handle}`}
                      className="text-xl md:text-2xl font-bold uppercase tracking-tight hover:text-neutral-600 transition-colors"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-neutral-500 uppercase tracking-wide">
                      {item.variantTitle !== "Default Title"
                        ? item.variantTitle
                        : "One Size"}
                    </p>
                  </div>
                  <div className="text-right">
                     <p className="text-lg font-medium">{item.price} EUR</p>
                  </div>
                </div>

                <div className="flex justify-between items-end mt-8 md:mt-0">
                  {/* Quantity Control */}
                  <div className="flex items-center border border-neutral-300">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-12 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 bg-white p-8 border border-neutral-100 shadow-sm">
            <h2 className="text-lg font-bold uppercase tracking-widest mb-8 border-b border-black pb-4">
              Resumen del pedido
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center text-sm uppercase tracking-wide">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-bold">{subtotal.toFixed(2)} EUR</span>
              </div>
              <div className="flex justify-between items-center text-sm uppercase tracking-wide">
                <span className="text-neutral-600">Envío</span>
                <span className="text-neutral-400 text-xs">Calculado al pagar</span>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold uppercase tracking-tight">Total</span>
                <div className="text-right">
                  <span className="text-3xl font-bold block tracking-tighter">
                    {subtotal.toFixed(2)} EUR
                  </span>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wide">
                    Impuestos incluidos
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={checkout}
              className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all hover:px-6 flex items-center justify-between group"
            >
              <span>Tramitar Pedido</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-6 text-center">
               <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
                 Pago seguro garantizado
               </p>
               <div className="flex justify-center gap-2 mt-2 opacity-50 grayscale">
                 {/* Aquí podrías poner iconos de tarjetas si los tuvieras */}
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
