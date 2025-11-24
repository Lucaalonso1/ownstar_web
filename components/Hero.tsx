"use client";

import { useState, useEffect } from "react";

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set a target date 3 days from now for the example
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

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
          Black Week
        </h1>
        <p className="mb-8 text-xl font-light tracking-widest uppercase sm:text-3xl">
          Up to 50% Off
        </p>

        <div className="mb-12 flex gap-8 text-center">
          <div className="flex flex-col">
            <span className="text-4xl font-bold sm:text-6xl">
              {timeLeft.days.toString().padStart(2, "0")}
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              Days
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold sm:text-6xl">
              {timeLeft.hours.toString().padStart(2, "0")}
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              Hours
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold sm:text-6xl">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              Minutes
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold sm:text-6xl">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-400">
              Seconds
            </span>
          </div>
        </div>

        <div className="w-full max-w-md space-y-4">
          <p className="text-sm uppercase tracking-wide text-neutral-300">
            Early Access + Extra 10% Off
          </p>
          <form className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="flex-1 bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white backdrop-blur-sm transition-colors uppercase"
            />
            <button
              type="submit"
              className="bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
            >
              Subscribe
            </button>
          </form>
          <p className="text-[10px] text-neutral-500 max-w-xs mx-auto leading-relaxed">
            By subscribing you agree to our Privacy Policy and terms of use.
          </p>
        </div>
      </div>
    </section>
  );
}
