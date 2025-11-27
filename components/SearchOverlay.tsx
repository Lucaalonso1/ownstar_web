"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search, ArrowRight, Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Collection {
  id: string | number;
  handle?: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  handle: string;
  price: string;
  compareAtPrice?: string | null;
  image: string;
  category?: string;
  colors?: string[];
  isAvailable?: boolean;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  collections: Collection[];
}

export function SearchOverlay({ isOpen, onClose, collections }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      // Fetch initial recommendations if empty
      if (!query) {
        fetchResults("");
      }
    } else {
      // Reset query when closed
      setTimeout(() => setQuery(""), 300);
    }
  }, [isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const fetchResults = async (searchQuery: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      setResults(data.products || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Live Search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        fetchResults(query);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const popularSearches = [
    'camisetas',
    'sudaderas'
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 z-[50] transition-all duration-500",
        isOpen ? "visible" : "invisible delay-500"
      )}
    >
      {/* Overlay Background */}
      <div
        className={cn(
          "absolute left-0 right-0 bottom-0 top-[85px] md:top-[95px] bg-black/20 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Search Content Wrapper */}
      <div
        className={cn(
          "relative w-full bg-white shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] mt-[85px] md:mt-[80px]",
          isOpen ? "translate-y-0" : "-translate-y-[120%]"
        )}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-12">
            
          {/* Top Bar: Search Input */}
          <div className="flex items-center h-20 border-b border-neutral-100 mb-8">
             <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-4" />
             <form onSubmit={handleSearch} className="flex-1 relative h-full flex items-center">
                <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Encuentra tu estilo..."
                className="w-full text-lg font-medium text-black placeholder:text-neutral-400 focus:outline-none bg-transparent"
                />
             </form>
             <button
               onClick={onClose}
               className="p-2 hover:bg-neutral-50 rounded-full transition-colors ml-4"
             >
               <X className="w-6 h-6 text-black" />
             </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12">
              {/* Left Column: Popular Searches */}
              <div className="w-full md:w-1/4 lg:w-1/5 space-y-6">
                  <h3 className="text-xl font-medium text-black">Lo más buscado</h3>
                  <div className="flex flex-col gap-4">
                      {popularSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="text-left text-sm text-neutral-600 hover:text-black transition-colors capitalize"
                          >
                              &apos;{term}&apos;
                          </button>
                      ))}
                  </div>
              </div>

              {/* Right Column: Results / Recommendations */}
              <div className="flex-1">
                  <h3 className="text-xl font-medium text-black mb-6">
                      {query ? `Resultados para "${query}"` : "Productos recomendados"}
                  </h3>
                  
                  {loading ? (
                      <div className="w-full h-40 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-neutral-300" />
                      </div>
                  ) : results.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
                        {results.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.handle}`}
                                onClick={onClose}
                                className="group flex flex-col gap-3"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
                                    {/* Sold Out Badge and Overlay */}
                                    {product.isAvailable === false && (
                                        <>
                                            <span className="absolute top-2 left-2 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black z-20">
                                            Sold Out
                                            </span>
                                            <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
                                        </>
                                    )}

                                    {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs">No Image</div>
                                    )}
                                    
                                    {/* Plus Button */}
                                    <div className="absolute bottom-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                                        <div className="bg-white/90 backdrop-blur w-8 h-8 flex items-center justify-center rounded-full shadow-sm hover:bg-black hover:text-white transition-colors">
                                            <Plus className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div>
                                    <h4 className="text-[11px] font-bold uppercase tracking-wide text-black truncate pr-2">
                                        {product.name}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        {product.compareAtPrice && (
                                            <span className="text-[11px] text-neutral-400 line-through decoration-neutral-400">
                                                {product.compareAtPrice}
                                            </span>
                                        )}
                                        <span className={cn(
                                            "text-[11px] font-medium",
                                            product.compareAtPrice ? "bg-[#F4E04E] px-1 py-0.5 text-black" : "text-neutral-600"
                                        )}>
                                            {product.price}
                                        </span>
                                    </div>
                                    
                                    {/* Colors */}
                                    {product.colors && product.colors.length > 0 && (
                                        <div className="flex gap-1.5 mt-2">
                                            {product.colors.map((color, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className="w-3 h-3 rounded-full border border-neutral-200 shadow-[inset_0_0_2px_rgba(0,0,0,0.1)]"
                                                    style={{ backgroundColor: color }}
                                                    title={color}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                  ) : (
                      <div className="py-12 text-neutral-400 text-sm">
                          No se encontraron resultados.
                      </div>
                  )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
