"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function AboutContent() {
  return (
    <main className="pt-24 pb-10 px-4 md:px-8 text-black">
      <div className="max-w-[1800px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-black pb-6">
          <h1 className="text-[12vw] md:text-[10vw] leading-[0.8] font-bold tracking-tighter uppercase">
            The
            <br />
            Origin
          </h1>
          <div className="mt-8 md:mt-0 text-right space-y-2">
            <p className="text-xs md:text-sm font-mono uppercase tracking-wider">
              [ EST. 2024 — SPAIN ]
            </p>
            <p className="text-xs md:text-sm font-bold uppercase tracking-wider max-w-[200px] ml-auto">
              Dos jóvenes. Una visión.
              <br />
              Redefiniendo el juego.
            </p>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-32">
          {/* Story Column (Left) */}
          <div className="lg:col-span-4 flex flex-col justify-between order-2 lg:order-1 pt-4">
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-neutral-600">
                <ArrowDownRight className="w-5 h-5" />
                <span className="text-xs font-mono uppercase">Our Story</span>
              </div>

              <p className="text-lg md:text-xl font-medium leading-relaxed text-black">
                Lo que empezó como conversaciones interminables entre dos amigos en una
                habitación, se convirtió en <span className="font-bold">OWNSTAR</span>.
              </p>

              <p className="text-sm md:text-base text-neutral-800 leading-relaxed text-justify">
                No queríamos ser simplemente otra marca de ropa. Veíamos cómo la moda rápida
                consumía la identidad de la calle, y decidimos ir en la dirección opuesta.
                Nos enfocamos en la <strong>exclusividad</strong>.
              </p>

              <p className="text-sm md:text-base text-neutral-800 leading-relaxed text-justify">
                Nuestra filosofía es simple:{" "}
                <span className="italic">Less is more, but make it heavy.</span> Trabajamos
                con el concepto de "Drops" (colecciones limitadas) porque creemos que lo que
                llevas puesto debe sentirse especial. Cada pieza tiene una historia, un porqué
                y, sobre todo, una identidad que compartimos.
              </p>
            </div>

            <div className="hidden lg:block mt-20">
              <div className="w-full h-[1px] bg-neutral-300 mb-4"></div>
              <p className="text-[10px] font-mono uppercase text-neutral-600">
                From the ground up.
                <br />
                Building a legacy.
              </p>
            </div>
          </div>

          {/* Image Column (Right/Center) */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-neutral-100 rounded-sm">
              <Image
                src="/founders.jpg"
                alt="Ownstar Founders"
                fill
                className="object-cover object-[50%_20%] grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                priority
              />

              {/* Floating Badge */}
              <div className="absolute bottom-0 right-0 bg-black text-white p-6 backdrop-blur-sm bg-opacity-90">
                <p className="text-4xl font-bold tracking-tighter">50%</p>
                <p className="text-[10px] uppercase tracking-widest opacity-70">
                  Passion
                </p>
                <p className="text-4xl font-bold tracking-tighter mt-2">50%</p>
                <p className="text-[10px] uppercase tracking-widest opacity-70">
                  Hustle
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Manifesto / Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-black pt-20 mb-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9]">
              More Than
              <br />
              Just A Brand.
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-xl md:text-2xl font-light">
              "Creamos para quienes entienden que el estilo es el primer paso de la
              comunicación no verbal."
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:underline decoration-2 underline-offset-4"
            >
              Ver Colecciones <ArrowDownRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

