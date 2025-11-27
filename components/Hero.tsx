"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Hero() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % t.hero.rotating_texts.length);
    }, 2000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, [t.hero.rotating_texts.length]);

  return (
    <section className="fixed top-0 left-0 h-screen w-full overflow-hidden bg-neutral-900 text-white z-0">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-40 grayscale"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="font-code-next mb-6 text-6xl font-bold tracking-tighter uppercase sm:text-8xl md:text-9xl text-white drop-shadow-lg">
            {t.hero.black_friday}
          </h1>
          
          <div className="h-20 mb-8 flex items-center justify-center overflow-hidden w-full">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-bold tracking-[0.2em] uppercase sm:text-3xl md:text-4xl text-red-500"
              >
                {t.hero.rotating_texts[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/shop" 
              className="group relative inline-flex items-center justify-center bg-white px-12 py-4 text-sm font-bold text-black uppercase tracking-widest transition-colors hover:bg-neutral-200"
            >
              {t.hero.shop_now}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
