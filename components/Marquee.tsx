"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  text?: string;
  className?: string;
  reverse?: boolean;
}

export function Marquee({ 
  text = "REDEFINING STREETWEAR                25% DISCOUNTS              PREMIUM QUALITY                ", 
  className,
  reverse = false
}: MarqueeProps) {
  return (
    <div className={cn("fixed top-0 left-0 w-full overflow-hidden bg-[#000033] py-1 z-[70] relative select-none flex", className)}>
      <div 
        className={cn(
          "animate-marquee whitespace-nowrap flex min-w-full shrink-0",
          reverse && "animate-marquee-reverse"
        )}
      >
        {[...Array(4)].map((_, i) => (
          <span 
            key={i} 
            className="text-white text-xs md:text-sm font-medium uppercase tracking-widest mx-4 whitespace-pre"
          >
            {text}
          </span>
        ))}
      </div>
      
      <div 
        className={cn(
          "animate-marquee whitespace-nowrap flex min-w-full shrink-0",
            reverse && "animate-marquee-reverse"
        )}
      >
        {[...Array(4)].map((_, i) => (
          <span 
            key={i} 
            className="text-white text-xs md:text-sm font-medium uppercase tracking-widest mx-4 whitespace-pre"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

