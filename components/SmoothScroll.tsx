'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Duración de la inercia (1.2s es el estándar "premium")
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Función de suavizado
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1, // Sensibilidad de la rueda
      touchMultiplier: 2, // Sensibilidad en táctil
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null; // Este componente no renderiza nada visualmente
}

