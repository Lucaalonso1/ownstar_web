import { Header } from "@/components/Header";
import { getProductsInCollection, getCollections } from "@/lib/shopify";
import ShopClient from "../shop/ShopClient"; // Reuse ShopClient but we might need a stripped down version or just use it as is

// Types match standard Shopify interfaces
interface ShopifyImage {
  src: string;
}

interface ShopifyVariant {
  price: string;
  inventory_quantity: number;
}

interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  variants: ShopifyVariant[];
  image?: ShopifyImage;
  images: ShopifyImage[];
  tags?: string;
}

interface ShopifyCollection {
  id: number;
  title: string;
  image?: ShopifyImage;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const query = q ? q.toLowerCase() : "";

  let products: any[] = [];
  let collectionsData: any[] = [];

  if (
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN
  ) {
    try {
      const [shopifyProducts, shopifyCollections] = await Promise.all([
        getProductsInCollection(),
        getCollections(),
      ]);

      if (shopifyProducts.length > 0) {
        // Filter products by search query
        const filteredShopifyProducts = shopifyProducts.filter((p: any) => 
            p.title.toLowerCase().includes(query) || 
            (p.tags && p.tags.toLowerCase().includes(query))
        );

        products = filteredShopifyProducts.map((p: ShopifyProduct) => {
          const totalInventory = p.variants.reduce((acc, v) => acc + (v.inventory_quantity || 0), 0);
          const isAvailable = totalInventory > 0;

          return {
            id: p.id.toString(),
            name: p.title,
            handle: p.handle,
            price: `${p.variants[0]?.price || "0.00"} EUR`,
            image: p.image?.src || p.images[0]?.src || "",
            colors: ["#000"],
            isNew: p.tags?.includes("new") || false,
            isAvailable,
          };
        });
      }

      if (shopifyCollections.length > 0) {
        collectionsData = shopifyCollections.map((c: ShopifyCollection) => ({
          id: c.id,
          name: c.title,
          image: c.image?.src || "",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch search data:", error);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header collections={collectionsData} forceWhite={true} />
      <div className="pt-32 px-4 md:px-8 max-w-[1800px] mx-auto">
          <h1 className="text-2xl font-bold uppercase mb-8">
              Resultados para: &quot;{q}&quot;
          </h1>
          {products.length > 0 ? (
              // We reuse ShopClient but maybe we should hide the hero section there if it's search?
              // For now let's render a specific grid to keep it simple and clean
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-y-24 pb-20">
                 {/* Reuse ShopClient logic or simplified grid */}
                 {/* Let's reuse ShopClient component but we need to make the hero optional */}
                 {/* For simplicity, I'll render ShopClient but with a prop to hide Hero */}
                 <ShopClient products={products} />
              </div>
          ) : (
              <div className="py-20 text-center text-neutral-400">
                  <p className="uppercase tracking-wide">No se encontraron productos que coincidan con tu búsqueda.</p>
              </div>
          )}
      </div>
    </div>
  );
}

