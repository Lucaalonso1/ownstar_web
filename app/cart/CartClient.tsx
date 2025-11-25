"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CartClient() {
  const { cart, updateQuantity, removeFromCart, checkout } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-neutral-400" />
        </div>
        <h1 className="text-2xl font-bold uppercase tracking-tight mb-2">
          Tu cesta está vacía
        </h1>
        <p className="text-neutral-500 mb-8 text-center max-w-md">
          Parece que aún no has añadido nada a tu cesta. Explora nuestra colección
          y encuentra algo único.
        </p>
        <Link
          href="/"
          className="bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <main className="pt-32 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-12">
        Cesta de compra
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-8">
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-4">
            <div className="col-span-6">Producto</div>
            <div className="col-span-2 text-center">Cantidad</div>
            <div className="col-span-2 text-right">Precio</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {cart.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col md:grid md:grid-cols-12 gap-4 py-4 border-b border-neutral-100 last:border-0 items-center"
            >
              {/* Product Details */}
              <div className="col-span-6 w-full flex gap-6">
                <div className="relative w-24 h-32 bg-neutral-100 shrink-0 overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs">
                      No img
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <Link
                    href={`/product/${item.handle}`}
                    className="text-lg font-bold uppercase tracking-tight hover:underline decoration-1 underline-offset-4"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-neutral-500 mt-1">
                    {item.variantTitle !== "Default Title"
                      ? item.variantTitle
                      : "One Size"}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-1 text-xs text-neutral-400 hover:text-red-600 mt-4 uppercase font-medium transition-colors w-fit"
                  >
                    <Trash2 className="w-3 h-3" /> Eliminar
                  </button>
                </div>
              </div>

              {/* Quantity (Mobile & Desktop) */}
              <div className="col-span-2 w-full md:w-auto flex justify-between md:justify-center items-center py-4 md:py-0 border-y md:border-0 border-neutral-100 my-4 md:my-0">
                <span className="md:hidden text-xs font-bold uppercase text-neutral-500">
                  Cantidad
                </span>
                <div className="flex items-center border border-neutral-200">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-3 hover:bg-neutral-50 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-3 hover:bg-neutral-50 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-right hidden md:block text-sm text-neutral-600">
                {item.price} EUR
              </div>

              {/* Total */}
              <div className="col-span-2 w-full md:w-auto flex justify-between md:justify-end items-center">
                <span className="md:hidden text-xs font-bold uppercase text-neutral-500">
                  Total
                </span>
                <span className="text-sm font-bold">
                  {(parseFloat(item.price) * item.quantity).toFixed(2)} EUR
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="bg-neutral-50 p-8 sticky top-32">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-6">
              Resumen
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">{subtotal.toFixed(2)} EUR</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-600">Envío</span>
                <span className="text-neutral-400 text-xs uppercase">Calculado al pagar</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold uppercase tracking-wide">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-bold block">
                    {subtotal.toFixed(2)} EUR
                  </span>
                  <span className="text-[10px] text-neutral-400 uppercase">
                    Impuestos incluidos
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={checkout}
              className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group"
            >
              Tramitar Pedido
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-6 space-y-2">
               <p className="text-[10px] text-neutral-400 text-center uppercase tracking-wide">
                 Pagos seguros con Shopify
               </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

