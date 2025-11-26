"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

interface Collection {
  id: string | number;
  handle?: string;
  name: string;
  image: string;
}

interface HeaderProps {
  collections?: Collection[];
  forceWhite?: boolean;
}

export function Header({ collections = [], forceWhite = false }: HeaderProps) {
  const { cart } = useCart();
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            handle: "drop-001",
            name: "Drop 001",
            image:
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
          },
          {
            id: "drop002",
            handle: "drop-002",
            name: "Drop 002",
            image:
              "https://images.unsplash.com/photo-1529139574466-a302c27e3844?q=80&w=1000&auto=format&fit=crop",
          },
        ];

  const isWhiteBackground =
    forceWhite || isScrolled || isCollectionsOpen || isShopOpen || isHeaderHovered;

  return (
    <header
      className={cn(
        "fixed top-[15px] md:top-[25px] left-0 w-full z-[60] transition-all duration-300",
        isWhiteBackground
          ? "bg-white text-black shadow-sm"
          : "bg-transparent text-white"
      )}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => {
        setIsCollectionsOpen(false);
        setIsShopOpen(false);
        setIsHeaderHovered(false);
      }}
    >
      <div
        className={cn(
          "flex items-center justify-between px-6 transition-all duration-300 relative z-[60] py-2"
        )}
      >
        <div className="hidden md:flex items-center gap-6 text-xs font-medium tracking-widest uppercase">
          <button
            className="hover:opacity-70 transition-opacity focus:outline-none font-medium uppercase tracking-widest py-4"
            onMouseEnter={() => { setIsShopOpen(true); setIsCollectionsOpen(false); }}
          >
            {t.header.shop}
          </button>
          <button
            className="hover:opacity-70 transition-opacity focus:outline-none font-medium uppercase tracking-widest py-4"
            onMouseEnter={() => { setIsCollectionsOpen(true); setIsShopOpen(false); }}
          >
            {t.header.collections}
          </button>
          <Link
            href="/about"
            className="hover:opacity-70 transition-opacity py-4"
            onMouseEnter={() => { setIsCollectionsOpen(false); setIsShopOpen(false); }}
          >
            {t.header.about}
          </Link>
        </div>

        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 hover:opacity-70 transition-opacity"
          >
          <Menu className="w-6 h-6" />
          </button>
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
          <button 
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
            className="hover:opacity-70 transition-opacity"
          >
            <span className="hidden md:inline text-xs font-medium uppercase tracking-widest mr-2">
              {language.toUpperCase()}
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

      {/* Shop Dropdown (Mega Menu style) */}
      <div
        className={cn(
          "absolute top-full left-0 w-full bg-white border-t border-gray-100 overflow-hidden transition-all duration-500 ease-in-out hidden md:block",
          isShopOpen
            ? "max-h-[300px] opacity-100"
            : "max-h-0 opacity-0"
        )}
        onMouseEnter={() => setIsShopOpen(true)}
        onMouseLeave={() => setIsShopOpen(false)}
      >
        <div className="w-full px-6 py-12">
          <div className="max-w-[1600px] mx-auto flex gap-24">
            {/* Column 1: Clothing */}
            <div className="flex flex-col gap-6">
               <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
                 {t.header.clothing}
               </h3>
               <div className="flex flex-col gap-4">
                  <Link href="/shop" className="text-xs font-medium uppercase tracking-widest text-black hover:text-neutral-500 transition-colors w-fit">
                    {t.header.view_all}
                  </Link>
                  <Link href="/shop?category=t-shirt" className="text-xs font-medium uppercase tracking-widest text-black hover:text-neutral-500 transition-colors w-fit">
                    {t.header.t_shirts}
                  </Link>
                  <Link href="/shop?category=hoodie" className="text-xs font-medium uppercase tracking-widest text-black hover:text-neutral-500 transition-colors w-fit">
                    {t.header.hoodies}
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collections Dropdown */}
      <div
        className={cn(
          "absolute top-full left-0 w-full bg-white border-t border-gray-100 overflow-hidden transition-all duration-500 ease-in-out hidden md:block",
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
                href={`/collections/${collection.handle || collection.id}`}
                className="group relative flex flex-col gap-4 cursor-pointer"
                onClick={() => setIsCollectionsOpen(false)}
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
                  <h3 className="text-xs font-medium uppercase tracking-widest text-black">
                    {collection.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[70] transition-opacity duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[300px] bg-white text-black z-[80] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] md:hidden flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex justify-between items-center border-b border-neutral-100">
          <h2 className="text-xl font-bold uppercase tracking-tighter">{t.header.menu}</h2>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 -mr-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
          <Link 
            href="/" 
            className="text-lg font-bold uppercase tracking-wide hover:text-neutral-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.header.home}
          </Link>
          <Link 
            href="/shop" 
            className="text-lg font-bold uppercase tracking-wide hover:text-neutral-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.header.shop}
          </Link>
          
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">{t.header.collections}</span>
            {displayCollections.map((collection) => (
               <Link
                 key={collection.id}
                 href={`/collections/${collection.handle || collection.id}`}
                 className="block text-base font-medium uppercase tracking-wide text-black hover:text-neutral-500 transition-colors"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                  {collection.name}
               </Link>
            ))}
          </div>

          <Link 
            href="/about" 
            className="text-lg font-bold uppercase tracking-wide hover:text-neutral-500 transition-colors pt-4 border-t border-neutral-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t.header.about}
          </Link>
          
          <div className="pt-4 border-t border-neutral-100 space-y-4">
             <Link 
                href="/account"
                className="flex items-center gap-3 text-sm font-medium uppercase tracking-wide hover:text-neutral-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
             >
                <User className="w-5 h-5" /> {t.header.account}
             </Link>
             <Link 
                href="/contact"
                className="flex items-center gap-3 text-sm font-medium uppercase tracking-wide hover:text-neutral-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
             >
                {t.header.contact}
             </Link>
             <button 
                onClick={() => { setLanguage(language === "es" ? "en" : "es"); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-3 text-sm font-medium uppercase tracking-wide hover:text-neutral-500 transition-colors w-full text-left"
             >
                Language: {language.toUpperCase()}
             </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
