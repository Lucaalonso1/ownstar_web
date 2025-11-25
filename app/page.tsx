import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsInCollection, getCollections } from "@/lib/shopify";

interface ShopifyImage {
  src: string;
}

interface ShopifyVariant {
  price: string;
  compare_at_price: string | null;
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

// Fallback dummy data in case Shopify is not configured yet
const dummyProducts = [
  {
    id: "1",
    name: "Desert Puffer Jacket",
    handle: "desert-puffer-jacket",
    price: "199,00 EUR",
    image:
      "https://images.unsplash.com/photo-1544923246-7740a90c230d?q=80&w=1000&auto=format&fit=crop",
    colors: ["#4a5d23", "#e5e5e5"],
    isNew: true,
    isAvailable: true,
  },
];

export default async function Home() {
  let products = dummyProducts;
  let collectionsData: { id: number; name: string; image: string }[] = [];

  // Try to fetch from Shopify if env vars are present
  if (
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN
  ) {
    try {
      // Fetch products and collections in parallel
      const [shopifyProducts, shopifyCollections] = await Promise.all([
        getProductsInCollection(),
        getCollections(),
      ]);

      // Process Products
      if (shopifyProducts.length > 0) {
        products = shopifyProducts.map((p: ShopifyProduct) => {
          const totalInventory = p.variants.reduce((acc, v) => acc + (v.inventory_quantity || 0), 0);
          const isAvailable = totalInventory > 0;
          const firstVariant = p.variants[0];

          return {
            id: p.id.toString(),
            name: p.title,
            handle: p.handle,
            price: `${firstVariant?.price || "0.00"} EUR`,
            compareAtPrice: firstVariant?.compare_at_price ? `${firstVariant.compare_at_price} EUR` : null,
            image: p.image?.src || p.images[0]?.src || "",
            secondImage: p.images[1]?.src || null,
            colors: ["#000"],
            isNew: p.tags?.includes("new") || false,
            isAvailable,
          };
        });

        // Sort: Available first, then Sold Out
        products.sort((a, b) => {
          if (a.isAvailable === b.isAvailable) return 0;
          return a.isAvailable ? -1 : 1;
        });
      }

      // Process Collections for Header
      if (shopifyCollections.length > 0) {
        collectionsData = shopifyCollections.map((c: ShopifyCollection) => ({
          id: c.id,
          name: c.title,
          image: c.image?.src || "", // Collections might not have images, header handles empty string check
        }));
      }
    } catch (error) {
      console.error("Failed to fetch data from Shopify:", error);
    }
  }

  return (
    <main className="min-h-screen flex flex-col relative">
      <Header collections={collectionsData} />
      {/* Hero Container - acts as a placeholder for the fixed Hero */}
      <div className="h-screen w-full relative z-0">
        <Hero />
      </div>

      {/* Content that slides over the fixed hero */}
      <div className="relative z-10 bg-white">
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
