"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface Collection {
  id: string | number;
  name: string;
  image: string;
}

interface HeaderProps {
  collections?: Collection[];
  forceWhite?: boolean;
}

export function Header({ collections = [], forceWhite = false }: HeaderProps) {
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fallback if no collections are passed
  const displayCollections =
    collections.length > 0
      ? collections
      : [
          {
            id: "drop001",
            name: "Drop 001",
            image:
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
          },
          {
            id: "drop002",
            name: "Drop 002",
            image:
              "https://images.unsplash.com/photo-1529139574466-a302c27e3844?q=80&w=1000&auto=format&fit=crop",
          },
        ];

  const isWhiteBackground =
    forceWhite || isScrolled || isCollectionsOpen || isHeaderHovered;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isWhiteBackground
          ? "bg-white text-black shadow-sm"
          : "bg-transparent text-white"
      )}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => {
        setIsCollectionsOpen(false);
        setIsHeaderHovered(false);
      }}
    >
      <div
        className={cn(
          "flex items-center justify-between px-6 transition-all duration-300 relative z-50 py-2"
        )}
      >
        <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide uppercase">
          <Link
            href="/shop"
            className="hover:opacity-70 transition-opacity"
            onMouseEnter={() => setIsCollectionsOpen(false)}
          >
            Tienda
          </Link>
          <button
            className="hover:opacity-70 transition-opacity focus:outline-none font-medium uppercase tracking-wide"
            onMouseEnter={() => setIsCollectionsOpen(true)}
          >
            Colecciones
          </button>
          <Link
            href="/about"
            className="hover:opacity-70 transition-opacity"
            onMouseEnter={() => setIsCollectionsOpen(false)}
          >
            Sobre Nosotros
          </Link>
        </div>

        <div className="md:hidden">
          <Menu className="w-6 h-6" />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <Image
              src="/logo-ownstar.png"
              alt="Ownstar"
              width={240}
              height={80}
              className={cn(
                "h-auto object-contain transition-all duration-300",
                isWhiteBackground ? "w-28" : "w-28 invert brightness-0"
              )}
              priority
            />
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <button className="hover:opacity-70 transition-opacity">
            <span className="hidden md:inline text-sm font-medium uppercase tracking-wide mr-2">
              ES
            </span>
          </button>
          <Link href="/account" className="hover:opacity-70 transition-opacity">
            <User className="w-6 h-6" />
          </Link>
          <button className="hover:opacity-70 transition-opacity">
            <Search className="w-6 h-6" />
          </button>
          <Link
            href="/cart"
            className="hover:opacity-70 transition-opacity relative"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span
                className={cn(
                  "absolute -top-2 -right-2 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full transition-colors duration-300",
                  isWhiteBackground
                    ? "bg-black text-white"
                    : "bg-white text-black"
                )}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Collections Dropdown */}
      <div
        className={cn(
          "absolute top-full left-0 w-full bg-white border-t border-gray-100 overflow-hidden transition-all duration-500 ease-in-out",
          isCollectionsOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        )}
        onMouseEnter={() => setIsCollectionsOpen(true)}
        onMouseLeave={() => setIsCollectionsOpen(false)}
      >
        <div className="w-full px-6 py-12">
          <div className="grid grid-cols-6 gap-4 max-w-[1600px] mx-auto">
            {displayCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="group relative flex flex-col gap-4"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
                  {collection.image ? (
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-black">
                    {collection.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
