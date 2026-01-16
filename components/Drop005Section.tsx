"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";

// Hardcoded Drop005 products
const DROP005_PRODUCTS = [
  {
    id: "drop005-rodeo",
    name: "Rodeo Crewneck",
    handle: "rodeo-crewneck",
    price: "48.95 EUR",
    isAvailable: true,
  },
  {
    id: "drop005-studios",
    name: "Ownstar Studios Crewneck",
    handle: "ownstar-studios-crewneck",
    price: "48.95 EUR",
    isAvailable: true,
  },
  {
    id: "drop005-staff",
    name: "Ownstar Staff Member Crewneck",
    handle: "ownstar-staff-member-crewneck",
    price: "48.95 EUR",
    isAvailable: true,
  },
];

interface ProductWithImage {
  id: string;
  name: string;
  handle: string;
  price: string;
  compareAtPrice?: string | null;
  isAvailable: boolean;
  image?: string;
  secondImage?: string | null;
}

interface Drop005SectionProps {
  products?: ProductWithImage[];
}

export function Drop005Section({ products }: Drop005SectionProps) {
  const [productsWithImages, setProductsWithImages] = useState<ProductWithImage[]>(products || DROP005_PRODUCTS);

  useEffect(() => {
    // If products are passed as props, use them directly (they already have images from Shopify)
    if (products && products.length > 0) {
      setProductsWithImages(products);
      return;
    }

    // Otherwise, fetch images and prices for hardcoded products
    const fetchImages = async () => {
      const updatedProducts = await Promise.all(
        DROP005_PRODUCTS.map(async (product) => {
          try {
            const response = await fetch(`/api/product-image?handle=${product.handle}`);
            if (response.ok) {
              const data = await response.json();
              return { 
                ...product, 
                image: data.image || undefined,
                secondImage: data.secondImage || null,
                price: data.price || product.price,
                compareAtPrice: data.compareAtPrice || null
              };
            }
          } catch (error) {
            console.error(`Error fetching image for ${product.handle}:`, error);
          }
          return product;
        })
      );
      setProductsWithImages(updatedProducts);
    };

    fetchImages();
  }, [products]);

  return (
    <section className="relative w-full bg-white text-black overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-16 md:py-24 mb-12 md:mb-16 border-b-2 border-black"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
          >
            <div className="flex-1">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4"
              >
                <span className="inline-block text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 border border-neutral-300 px-3 py-1.5">
                  New Release
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[15vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] font-bold tracking-tighter uppercase mb-2"
              >
                Drop005
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider mt-2"
              >
                Now Available!
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href="/collections/drop-005"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider border-2 border-black px-6 py-3 hover:bg-black hover:text-white transition-all duration-300"
              >
                Ver Colección
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Products Grid - 3 columns for 3 products */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 pb-20 md:pb-32"
        >
          {productsWithImages.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/product/${product.handle}`}
                className="group block cursor-pointer"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 mb-6">
                  {/* NEW IN Badge */}
                  <span className="absolute top-4 left-4 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black z-20">
                    NEW IN
                  </span>
                  
                  {/* Sold Out Badge */}
                  {product.isAvailable === false && (
                    <>
                      <span className="absolute top-4 right-4 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black z-20">
                        Sold Out
                      </span>
                      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
                    </>
                  )}

                  {/* Main Image */}
                  {product.image ? (
                    <>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-700 ease-in-out ${product.secondImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                      />
                      {product.secondImage && (
                        <Image
                          src={product.secondImage}
                          alt={product.name}
                          fill
                          className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                        />
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                      <span className="text-neutral-400 text-sm uppercase tracking-wider text-center px-4">
                        {product.name}
                      </span>
                    </div>
                  )}

                  {/* Quick Add Button */}
                  {product.isAvailable !== false && (
                    <button className="absolute bottom-4 right-4 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white z-20">
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="text-base md:text-lg font-bold uppercase tracking-wide group-hover:underline decoration-1 underline-offset-4">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider">
                      {product.isAvailable !== false ? "Disponible" : "Agotado"}
                    </p>
                    <div className="flex items-center gap-2">
                      {product.compareAtPrice ? (
                        <>
                          <span className="text-sm md:text-base text-neutral-400 line-through decoration-neutral-400">
                            {product.compareAtPrice}
                          </span>
                          <span className="text-sm md:text-base font-bold text-red-600">
                            {product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm md:text-base text-neutral-600 font-medium">
                          {product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

