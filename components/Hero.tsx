"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="fixed top-0 left-0 h-screen w-full overflow-hidden bg-neutral-900 text-white z-0">
      {/* Background Image - Full Opacity, No Grayscale for vivid look like reference */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center"></div>
      
      {/* Subtle gradient for text readability at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"></div>

      {/* Bottom Content Grid */}
      <div className="absolute bottom-0 left-0 w-full z-20 px-3 py-3 sm:px-4 sm:py-4 md:px-24 md:py-12">
        <div className="relative flex flex-row w-full justify-between items-end gap-1 sm:gap-2 md:gap-0 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase">
          
          {/* Left: Collection Info */}
          <div className="flex flex-col justify-end text-left flex-shrink-0 z-10">
            <p className="whitespace-nowrap">FALL / WINTER 2025</p>
          </div>

          {/* Center: Shipping Info */}
          <div className="flex flex-col justify-end text-center flex-shrink-0 absolute left-1/2 transform -translate-x-1/2 bottom-0 z-20">
            <p>PREMIUM</p>
            <p>QUALITY</p>
          </div>

          {/* Right: Copyright/Extra Info */}
          <div className="flex flex-col justify-end text-right flex-shrink-0 ml-auto z-10">
            <p className="whitespace-nowrap leading-tight">CRAFTED WITH</p>
            <p className="whitespace-nowrap leading-tight">CARE ©OWNSTAR</p>
            <p className="mt-0.5 sm:mt-1 md:mt-2 opacity-70 whitespace-nowrap text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs leading-tight">ONLY AVAILABLE</p>
            <p className="opacity-70 whitespace-nowrap text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs leading-tight">AT OWNSTAR.COM</p>
          </div>

        </div>
      </div>
    </section>
  );
}
