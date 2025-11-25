"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirige al home page inmediatamente
    router.replace("/");
  }, [router]);

  // Muestra una pantalla negra minimalista mientras redirige para evitar flashes blancos
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white">
      <div className="animate-pulse text-xs uppercase tracking-[0.2em] font-bold">
        Ownstar
      </div>
    </div>
  );
}

