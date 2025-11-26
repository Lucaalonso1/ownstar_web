import { Header } from "@/components/Header";
import { getCollectionByHandle, getCollections } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ handle: string }>;
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;

  // Fetch data in parallel
  const [collection, allCollections] = await Promise.all([
    getCollectionByHandle(handle),
    getCollections()
  ]);

  if (!collection) {
    notFound();
  }

  // Map header collections
  const headerCollections = allCollections.map((c: any) => ({
    id: c.id,
    handle: c.handle,
    name: c.title,
    image: c.image?.src || "",
  }));

  // Map products
  const products = collection.products?.edges.map(({ node }: any) => ({
    id: node.id,
    name: node.title,
    handle: node.handle,
    price: `${node.priceRange?.minVariantPrice?.amount || "0.00"} ${node.priceRange?.minVariantPrice?.currencyCode || "EUR"}`,
    image: node.images?.edges[0]?.node?.url || "",
    secondImage: node.images?.edges[1]?.node?.url || null,
    colors: ["#000"], // Placeholder
    isNew: false, 
    isAvailable: node.availableForSale
  })) || [];

  return (
    <main className="min-h-screen flex flex-col relative bg-black">
      <Header collections={headerCollections} />
      
      {/* Fixed Hero Section (Parallax Background) */}
      <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          {collection.image ? (
            <Image
              src={collection.image.url}
              alt={collection.image.altText || collection.title}
              fill
              className="object-cover object-center opacity-60 md:opacity-70"
              priority
            />
          ) : (
            <div className="w-full h-full bg-neutral-900" />
          )}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white pb-20">
           <p className="mb-4 text-sm md:text-base font-mono uppercase tracking-widest text-neutral-300">
              [ COLLECTION ]
           </p>
           <h1 className="mb-6 text-[15vw] md:text-[12vw] leading-[0.8] font-bold tracking-tighter uppercase">
             {collection.title}
           </h1>
           {collection.description && (
              <p className="max-w-xl text-sm md:text-lg font-medium uppercase tracking-wider text-neutral-200">
                {collection.description}
              </p>
           )}
        </div>
      </div>

      {/* Spacer to push content below the fixed hero */}
      <div className="h-screen w-full relative z-0 pointer-events-none" />

      {/* Content that slides over the fixed hero */}
      <div className="relative z-10 bg-white min-h-screen">
         <div className="max-w-[1800px] mx-auto px-4 md:px-8 py-24">
             <div className="mb-12 flex items-center justify-between border-b border-black pb-6">
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                  The Drop
                </h2>
                <span className="text-sm font-mono uppercase tracking-wider">
                   {products.length} Items
                </span>
             </div>

             {products.length > 0 ? (
                // Custom Grid for "Destacados" (Large items)
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
                   {products.map((product: any) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.handle}`}
                        className="group flex flex-col gap-4 cursor-pointer"
                      >
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                          {/* Sold Out Badge and Overlay */}
                          {!product.isAvailable && (
                            <>
                                <span className="absolute top-4 left-4 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wider text-black z-20">
                                Sold Out
                                </span>
                                <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
                            </>
                          )}

                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className={`object-cover transition-all duration-1000 ease-in-out ${product.secondImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                          />

                          {product.secondImage && (
                            <Image
                              src={product.secondImage}
                              alt={product.name}
                              fill
                              className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out"
                            />
                          )}

                          {/* Plus Button - Larger for this view */}
                          <button className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 z-10 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                            <Plus className="w-6 h-6" />
                          </button>
                        </div>

                        <div className="flex flex-col items-center text-center space-y-2 pt-4">
                          <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-black">
                            {product.name}
                          </h3>
                          <span className="text-sm md:text-base text-neutral-600 font-medium">
                            {product.price}
                          </span>
                        </div>
                      </Link>
                   ))}
                </div>
             ) : (
                <div className="flex items-center justify-center h-[40vh] text-neutral-500 uppercase tracking-wider text-lg">
                   No products found in this collection
                </div>
             )}
         </div>
      </div>
    </main>
  );
}
