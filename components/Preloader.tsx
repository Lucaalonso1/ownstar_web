'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Tiempo reducido: 0.6s total
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }, 600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }} // Salida flash
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} // Scale un poco más marcado para notar el efecto rápido
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }} // Entrada flash
            className="relative w-48 h-48 md:w-64 md:h-64"
          >
            <Image
              src="/logo-ownstar.png"
              alt="OWNSTAR Logo"
              fill
              className="object-contain invert" // invert si el logo es negro para que se vea en fondo negro
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
