'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '@/context/CursorContext';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const { cursorType, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position logic using MotionValues for better performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, smoothOptions);
  const smoothY = useSpring(mouseY, smoothOptions);

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const manageMouseLeave = () => {
      setIsVisible(false);
    };

    const manageMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', manageMouseMove);
    window.addEventListener('mouseleave', manageMouseLeave);
    window.addEventListener('mouseenter', manageMouseEnter);

    return () => {
      window.removeEventListener('mousemove', manageMouseMove);
      window.removeEventListener('mouseleave', manageMouseLeave);
      window.removeEventListener('mouseenter', manageMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Variants for the cursor shape/size
  const variants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: 'rgb(0, 0, 0)', // Black dot
      mixBlendMode: 'normal' as const,
    },
    pointer: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Transparent gray
      border: '1px solid rgba(0, 0, 0, 0.2)',
      mixBlendMode: 'normal' as const,
    },
    text: {
      height: 100,
      width: 100,
      backgroundColor: 'rgb(0, 0, 0)', // Invert colors
      mixBlendMode: 'difference' as const,
    },
    product: {
      height: 80,
      width: 80,
      backgroundColor: 'rgb(0, 0, 0)',
      mixBlendMode: 'normal' as const,
    },
    magnetic: {
      height: 30,
      width: 30,
      backgroundColor: 'rgb(0, 0, 0)',
      mixBlendMode: 'normal' as const,
    }
  };

  if (typeof window === 'undefined') return null;

  return (
    <>
        {/* Hide default cursor globally */}
        <style jsx global>{`
            * {
                cursor: none !important;
            }
        `}</style>

        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
            style={{
                left: smoothX,
                top: smoothY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            initial="default"
            animate={cursorType}
            variants={variants}
            transition={{
                type: 'spring',
                damping: 20,
                stiffness: 400,
                mass: 0.5
            }}
        >
            <AnimatePresence mode="wait">
                {cursorText && (
                    <motion.span
                        key={cursorText}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className={cn(
                            "text-xs font-bold uppercase tracking-widest whitespace-nowrap",
                            cursorType === 'text' ? "text-white" : "text-white"
                        )}
                    >
                        {cursorText}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    </>
  );
}

