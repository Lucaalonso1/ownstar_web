"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Calculate next Friday at 00:00 Madrid time
    const now = new Date();
    
    const getTargetDate = () => {
      // Target: December 4, 2025 at 00:00:00
      // We can set this to a specific timezone if needed, usually Madrid for this project based on context
      // 2025-12-04T00:00:00 in Madrid
      
      // Create date for Dec 4, 2025
      const target = new Date('2025-12-04T00:00:00');
      return target;
    };

    const targetDate = getTargetDate();

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="fixed top-0 left-0 h-screen w-full overflow-hidden bg-neutral-900 text-white z-0">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-40 grayscale"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-2 text-6xl font-bold tracking-tighter uppercase sm:text-8xl md:text-9xl">
          "DROP 005"
        </h1>
        <p className="mb-8 text-xl font-light tracking-widest uppercase sm:text-3xl text-neutral-300">
          04.12.2025
        </p>

        <div className="mb-12 flex gap-8 text-center">
          <div className="flex flex-col">
            <span className="text-4xl font-bold sm:text-6xl">
              {timeLeft.days.toString().padStart(2, "0")}
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              {t.hero.days}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold sm:text-6xl">
              {timeLeft.hours.toString().padStart(2, "0")}
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              {t.hero.hours}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold sm:text-6xl">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              {t.hero.minutes}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold sm:text-6xl">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              {t.hero.seconds}
            </span>
          </div>
        </div>

        <div className="w-full max-w-md space-y-4">
          <p className="text-sm uppercase tracking-wide text-neutral-300">
            {t.hero.early_access}
          </p>
          <form className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder={t.hero.email_placeholder}
              className="flex-1 bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white backdrop-blur-sm transition-colors uppercase"
            />
            <button
              type="submit"
              className="bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
            >
              {t.hero.subscribe}
            </button>
          </form>
          <p className="text-[10px] text-neutral-500 max-w-xs mx-auto leading-relaxed">
            {t.hero.privacy_policy}
          </p>
        </div>
      </div>
    </section>
  );
}
