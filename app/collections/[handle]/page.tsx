import { Header } from "@/components/Header";
import { getCollectionByHandle, getCollections } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

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

  // Fallback description if empty
  const description = collection.description || "A unique selection of pieces designed to define the modern aesthetic. Exclusive drops, limited quantities.";

  return (
    <div className="min-h-screen bg-white text-black">
      <Header collections={headerCollections} forceWhite={true} />
      
      <main className="pt-24 pb-10 px-4 md:px-8">
        <div className="max-w-[1800px] mx-auto">
          
          {/* Header Section - Blog Style */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-black pb-6">
            <h1 className="text-[12vw] md:text-[10vw] leading-[0.8] font-bold tracking-tighter uppercase break-words w-full">
              {collection.title}
            </h1>
            <div className="mt-8 md:mt-0 md:ml-8 text-right space-y-2 flex-shrink-0 w-full md:w-auto">
              <p className="text-xs md:text-sm font-mono uppercase tracking-wider">
                [ COLLECTION {new Date().getFullYear()} ]
              </p>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider max-w-[200px] ml-auto">
                {products.length} Items
                <br />
                Available Now
              </p>
            </div>
          </div>

          {/* Hero Grid - Blog Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-32">
            {/* Story Column (Left) */}
            <div className="lg:col-span-4 flex flex-col justify-between order-2 lg:order-1 pt-4">
              <div className="space-y-8">
                <div className="flex items-center gap-2 text-neutral-600">
                  <ArrowDownRight className="w-5 h-5" />
                  <span className="text-xs font-mono uppercase">The Concept</span>
                </div>

                <div className="text-lg md:text-xl font-medium leading-relaxed text-black prose prose-lg">
                  {/* Simple rendering of description - can be enhanced if description contains HTML/Markdown */}
                  <p>{description}</p>
                </div>
              </div>

              <div className="hidden lg:block mt-20">
                <div className="w-full h-[1px] bg-neutral-300 mb-4"></div>
                <p className="text-[10px] font-mono uppercase text-neutral-600">
                  Ownstar Exclusive
                  <br />
                  Limited Edition
                </p>
              </div>
            </div>

            {/* Image Column (Right/Center) */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-neutral-100 rounded-sm">
                {collection.image ? (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-1000 ease-in-out"
                    priority
                  />
                ) : (
                   <div className="w-full h-full flex items-center justify-center bg-neutral-200 text-neutral-400">
                     No Collection Image
                   </div>
                )}
                
                {/* Floating Badge - Optional decorative element */}
                 <div className="absolute bottom-0 right-0 bg-black text-white p-4 backdrop-blur-sm bg-opacity-90">
                    <p className="text-[10px] uppercase tracking-widest opacity-70 mb-1">
                      Status
                    </p>
                    <p className="text-xl font-bold tracking-tighter">
                      RELEASED
                    </p>
                  </div>
              </div>
            </div>
          </div>

          {/* Products Grid Section */}
          <div className="border-t border-black pt-20 mb-20">
            <div className="flex items-center gap-2 mb-12">
                 <ArrowDownRight className="w-6 h-6" />
                 <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter">
                    The Pieces
                 </h2>
            </div>

             {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-y-24">
                   {products.map((product: any) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.handle}`}
                        className="group block cursor-pointer"
                      >
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 mb-4">
                          {/* Sold Out Badge and Overlay */}
                          {!product.isAvailable && (
                            <>
                                <span className="absolute top-4 left-4 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black z-20">
                                Sold Out
                                </span>
                                <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
                            </>
                          )}

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
                          
                          {/* Quick Add Button */}
                          <button className="absolute bottom-4 right-4 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white z-20">
                              <Plus className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex justify-between items-start">
                          <div>
                              <h3 className="text-sm font-bold uppercase tracking-wide group-hover:underline decoration-1 underline-offset-4">
                                  {product.name}
                              </h3>
                              <p className="text-xs text-neutral-500 mt-1">
                                  {product.isAvailable ? "Available Now" : "Sold Out"}
                              </p>
                          </div>
                          <span className="text-sm font-medium">
                              {product.price}
                          </span>
                        </div>
                      </Link>
                   ))}
                </div>
             ) : (
                <div className="flex items-center justify-center h-[20vh] text-neutral-500 uppercase tracking-wider text-sm border border-neutral-200 rounded-sm">
                   No products found in this collection
                </div>
             )}
          </div>

        </div>
      </main>
    </div>
  );
}
