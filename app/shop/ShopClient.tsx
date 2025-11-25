"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface Product {
  id: string;
  name: string;
  handle: string;
  price: string;
  image: string;
  secondImage?: string | null;
  colors: string[];
  isNew: boolean;
  isAvailable?: boolean;
}

interface ShopClientProps {
  products: Product[];
}

export default function ShopClient({ products, hideHero = false }: ShopClientProps & { hideHero?: boolean }) {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [activeProducts, setActiveProducts] = useState(products);
  
  // Filter & Sort States
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState("default");
  const [filterOption, setFilterOption] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Read category from URL on mount and change
  useEffect(() => {
    const category = searchParams.get("category");
    setCategoryFilter(category);
  }, [searchParams]);

  // Trigger intro animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Logic for Sorting and Filtering
  useEffect(() => {
    let filtered = [...products];

    // 0. Category Filter (from URL)
    if (categoryFilter) {
      if (categoryFilter === "t-shirt") {
         filtered = filtered.filter(p => 
            p.name.toLowerCase().includes("t-shirt") || 
            p.name.toLowerCase().includes("shirt") ||
            p.name.toLowerCase().includes("camiseta")
         );
      } else if (categoryFilter === "hoodie") {
         filtered = filtered.filter(p => 
            p.name.toLowerCase().includes("hoodie") || 
            p.name.toLowerCase().includes("sudadera")
         );
      }
    }

    // 1. Filter
    if (filterOption === "available") {
      filtered = filtered.filter((p) => p.isAvailable !== false);
    } else if (filterOption === "new") {
      filtered = filtered.filter((p) => p.isNew);
    }

    // 2. Sort
    if (sortOption === "price-asc") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.,]/g, "").replace(",", "."));
        const priceB = parseFloat(b.price.replace(/[^0-9.,]/g, "").replace(",", "."));
        return priceA - priceB;
      });
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.,]/g, "").replace(",", "."));
        const priceB = parseFloat(b.price.replace(/[^0-9.,]/g, "").replace(",", "."));
        return priceB - priceA;
      });
    } else if (sortOption === "newest") {
      filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    }

    setActiveProducts(filtered);
  }, [products, sortOption, filterOption, categoryFilter]);

  // Close menus when clicking outside (simple version using backdrop)
  const closeMenus = () => {
    setShowSort(false);
    setShowFilter(false);
  };

  return (
    <main className="min-h-screen">
      {/* Creative Hero Section */}
      {!hideHero && (
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
      )}

      {/* Filter Bar (Minimalist) */}
      {!hideHero && (
      <div className="sticky top-[54px] z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100 py-4 px-6 md:px-12 flex justify-between items-center mt-0">
         <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            {activeProducts.length} {t.shop.products}
         </span>
         
         <div className="flex gap-6 text-xs font-bold uppercase tracking-widest relative">
             {/* Filter Button & Dropdown */}
             <div className="relative">
               <button 
                 onClick={() => { setShowFilter(!showFilter); setShowSort(false); }}
                 className={cn("hover:text-neutral-500 transition-colors", filterOption !== 'all' && "text-black underline")}
               >
                 {t.shop.filter}
               </button>
               
               {showFilter && (
                 <div className="absolute top-full right-0 mt-4 w-48 bg-white border border-neutral-100 shadow-xl p-2 flex flex-col gap-1 z-50">
                   {[
                     { label: t.shop.filters.all, value: "all" },
                     { label: t.shop.filters.available, value: "available" },
                     { label: t.shop.filters.new, value: "new" }
                   ].map((opt) => (
                     <button
                       key={opt.value}
                       onClick={() => { setFilterOption(opt.value); setShowFilter(false); }}
                       className={cn(
                         "text-left px-4 py-2 text-[10px] uppercase tracking-wide hover:bg-neutral-50 transition-colors",
                         filterOption === opt.value ? "font-bold text-black" : "text-neutral-500"
                       )}
                     >
                       {opt.label}
                     </button>
                   ))}
                 </div>
               )}
             </div>

             {/* Sort Button & Dropdown */}
             <div className="relative">
               <button 
                 onClick={() => { setShowSort(!showSort); setShowFilter(false); }}
                 className={cn("hover:text-neutral-500 transition-colors", sortOption !== 'default' && "text-black underline")}
               >
                 {t.shop.sort}
               </button>

               {showSort && (
                 <div className="absolute top-full right-0 mt-4 w-48 bg-white border border-neutral-100 shadow-xl p-2 flex flex-col gap-1 z-50">
                   {[
                     { label: t.shop.sorting.relevance, value: "default" },
                     { label: t.shop.sorting.newest, value: "newest" },
                     { label: t.shop.sorting.price_asc, value: "price-asc" },
                     { label: t.shop.sorting.price_desc, value: "price-desc" }
                   ].map((opt) => (
                     <button
                       key={opt.value}
                       onClick={() => { setSortOption(opt.value); setShowSort(false); }}
                       className={cn(
                         "text-left px-4 py-2 text-[10px] uppercase tracking-wide hover:bg-neutral-50 transition-colors",
                         sortOption === opt.value ? "font-bold text-black" : "text-neutral-500"
                       )}
                     >
                       {opt.label}
                     </button>
                   ))}
                 </div>
               )}
             </div>
         </div>
      </div>
      )}

      {/* Backdrop for closing menus */}
      {(showSort || showFilter) && (
        <div className="fixed inset-0 z-30 bg-transparent" onClick={closeMenus} />
      )}

      {/* Creative Grid */}
      <section className="px-4 md:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-y-24">
           {activeProducts.map((product, index) => (
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
                            {language === "es" ? t.product.sold_out_es : t.product.sold_out}
                            </span>
                        )}
                        {product.isNew && product.isAvailable !== false && (
                             <span className="bg-black text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                             {t.product.new_in}
                             </span>
                        )}
                    </div>

                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-700 ease-in-out ${product.secondImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                    />

                    {product.secondImage && (
                      <Image
                        src={product.secondImage}
                        alt={product.name}
                        fill
                        className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                      />
                    )}
                    
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
                            {product.isAvailable === false ? (language === "es" ? t.product.sold_out_es : t.product.sold_out) : t.shop.filters.available}
                        </p>
                    </div>
                    <span className="text-sm font-medium">
                        {product.price}
                    </span>
                 </div>
              </div>
           ))}
        </div>

        {activeProducts.length === 0 && (
            <div className="h-[50vh] flex items-center justify-center text-neutral-400 uppercase tracking-widest text-sm">
                {t.shop.no_products}
            </div>
        )}
      </section>
    </main>
  );
}

