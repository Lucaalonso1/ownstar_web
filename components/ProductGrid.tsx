"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  handle: string;
  price: string;
  image: string;
  colors: string[];
  isNew: boolean;
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="bg-white w-full min-h-screen px-4 py-24 md:px-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-12">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.handle}`}
            className="group flex flex-col gap-3 cursor-pointer"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
              {/* New Badge */}
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black z-10">
                  New In
                </span>
              )}

              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Plus Button */}
              <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 z-10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wide text-black truncate pr-2">
                {product.name}
              </h3>
              <p className="text-xs text-neutral-600 font-medium">
                {product.price}
              </p>

              {/* Color Dots (Static for now as fetching variants is more complex, can be added later) */}
              <div className="flex gap-1 pt-1">
                {product.colors &&
                  product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
