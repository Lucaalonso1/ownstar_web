"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  handle: string;
  price: string;
  image: string;
  colors: string[];
  isNew: boolean;
  isAvailable?: boolean;
}

interface ShopClientProps {
  products: Product[];
}

export default function ShopClient({ products }: ShopClientProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger intro animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Simple Intersection Observer for scroll animations could be added here
  // For now we use CSS group-hover and entry animations

  return (
    <main className="min-h-screen">
      {/* Creative Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden flex items-center justify-center bg-neutral-100">
         {/* Placeholder creative image/video background - User can replace */}
         <div className="absolute inset-0 z-0">
            {/* Example Image to be replaced */}
             <Image 
                src="/bg-girls.jpg"
                alt="Shop Hero"
                fill
                className="object-cover object-top opacity-80 grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                priority
             />
         </div>
         
         {/* Overlay Content */}
         <div className={cn(
            "relative z-10 text-center transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
         )}>
             <h1 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter text-white mix-blend-difference">
                 The Collection
             </h1>
             <p className="text-white/80 uppercase tracking-[0.2em] mt-4 text-sm md:text-base font-medium">
                 Essential / Minimal / Timeless
             </p>
         </div>
      </section>

      {/* Filter Bar (Minimalist) */}
      <div className="sticky top-[54px] z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100 py-4 px-6 md:px-12 flex justify-between items-center mt-0">
         <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            {products.length} Productos
         </span>
         <div className="flex gap-6 text-xs font-bold uppercase tracking-widest cursor-pointer">
             <span className="hover:text-neutral-500 transition-colors">Filtrar</span>
             <span className="hover:text-neutral-500 transition-colors">Ordenar</span>
         </div>
      </div>

      {/* Creative Grid */}
      <section className="px-4 md:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-y-24">
           {products.map((product, index) => (
              <div 
                key={product.id}
                className={cn(
                    "group relative transition-all duration-700 ease-out transform",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                )}
                style={{ transitionDelay: `${index * 100}ms` }} // Stagger effect
              >
                 {/* Image Container with parallax-like hover effect */}
                 <Link href={`/product/${product.handle}`} className="block overflow-hidden relative aspect-[4/5] mb-4 bg-neutral-100">
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 items-start">
                        {product.isAvailable === false && (
                            <span className="bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                            Sold Out
                            </span>
                        )}
                        {product.isNew && product.isAvailable !== false && (
                             <span className="bg-black text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                             New In
                             </span>
                        )}
                    </div>

                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    
                    {/* Quick Add Button (appears on hover) */}
                    <button className="absolute bottom-4 right-4 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white z-20">
                        <Plus className="w-5 h-5" />
                    </button>
                 </Link>

                 {/* Product Info */}
                 <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide group-hover:underline decoration-1 underline-offset-4">
                            {product.name}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1">
                            {product.isAvailable === false ? "Agotado" : "Disponible"}
                        </p>
                    </div>
                    <span className="text-sm font-medium">
                        {product.price}
                    </span>
                 </div>
              </div>
           ))}
        </div>

        {products.length === 0 && (
            <div className="h-[50vh] flex items-center justify-center text-neutral-400 uppercase tracking-widest text-sm">
                No se encontraron productos
            </div>
        )}
      </section>
    </main>
  );
}

