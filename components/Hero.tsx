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
      <div className="absolute bottom-0 left-0 w-full z-20 px-6 py-6 md:px-24 md:py-12">
        <div className="flex flex-col md:flex-row w-full justify-between items-end text-xs md:text-sm font-bold tracking-widest uppercase">
          
          {/* Left: Collection Info */}
          <div className="flex flex-col justify-end text-center md:text-left mb-6 md:mb-0 w-full md:w-auto">
            <p>FALL / WINTER 2025</p>
          </div>

          {/* Center: Shipping Info */}
          <div className="flex flex-col justify-end text-center mb-6 md:mb-0 w-full md:w-auto absolute left-1/2 transform -translate-x-1/2 bottom-6 md:bottom-12">
            <p>PREMIUM</p>
            <p>QUALITY</p>
          </div>

          {/* Right: Copyright/Extra Info */}
          <div className="flex flex-col justify-end text-center md:text-right w-full md:w-auto">
            <p>CRAFTED WITH</p>
            <p>CARE ©OWNSTAR</p>
            <p className="mt-2 opacity-70">ONLY AVAILABLE</p>
            <p className="opacity-70">AT OWNSTAR.COM</p>
          </div>

        </div>
      </div>
    </section>
  );
}
