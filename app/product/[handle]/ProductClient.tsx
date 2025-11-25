"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductClientProps {
  product: any; // Using any for raw shopify object flexibility
}

export default function ProductClient({ product }: ProductClientProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [activeImage, setActiveImage] = useState(product.image?.src || "");

  // Get unique options (Size, Color, etc.)
  const options = product.options || [];
  
  // Helper to find variant based on selected options would go here
  // For simplicity with Admin API raw data, we'll just list variants if they are simple sizes

  const images = product.images || [];
  const isAvailable = selectedVariant.inventory_quantity > 0 || selectedVariant.inventory_policy === 'continue';

  const handleAddToCart = () => {
    addToCart({
      id: selectedVariant.id.toString(), // Admin API IDs are numbers often
      productId: product.id.toString(),
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      image: product.image?.src || product.images?.[0]?.src || "",
      quantity: 1,
      handle: product.handle,
    });
  };

  return (
    <main className="pt-24 pb-10 px-4 md:px-8 max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Gallery Section (Left) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.length > 0 ? (
            images.map((img: any) => (
              <div key={img.id} className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ))
          ) : (
            <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
               {/* Fallback image */}
               <div className="w-full h-full flex items-center justify-center text-neutral-300">No Image</div>
            </div>
          )}
        </div>

        {/* Product Info (Right - Sticky) */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-32 space-y-8">
            {/* Header */}
            <div className="space-y-2 border-b border-black/10 pb-6">
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[0.9]">
                {product.title}
              </h1>
              <p className="text-xl font-medium">{selectedVariant.price} EUR</p>
            </div>

            {/* Description */}
            <div 
              className="text-sm leading-relaxed text-neutral-600 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: product.body_html }} 
            />

            {/* Variants / Sizes */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wide text-neutral-400">Select Option</span>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant: any) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={variant.inventory_quantity <= 0 && variant.inventory_policy !== 'continue'}
                    className={cn(
                      "px-6 py-3 text-sm font-bold uppercase border transition-all min-w-[80px]",
                      selectedVariant.id === variant.id
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-neutral-200 hover:border-black",
                      (variant.inventory_quantity <= 0 && variant.inventory_policy !== 'continue') && "opacity-50 cursor-not-allowed bg-neutral-100 text-neutral-400"
                    )}
                  >
                    {variant.title === "Default Title" ? "One Size" : variant.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              {isAvailable ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  Add to Cart <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button disabled className="w-full bg-neutral-200 text-neutral-400 py-4 text-sm font-bold uppercase tracking-widest cursor-not-allowed">
                  Sold Out
                </button>
              )}
              
              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 uppercase tracking-wide">
                <Check className="w-3 h-3" />
                <span>Worldwide Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

