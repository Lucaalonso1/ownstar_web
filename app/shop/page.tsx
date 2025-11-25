import { Suspense } from "react";
import { Header } from "@/components/Header";
import { getProductsInCollection, getCollections } from "@/lib/shopify";
import ShopClient from "./ShopClient";

// Types match standard Shopify interfaces used elsewhere
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

export default async function ShopPage() {
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

        // Sort: Available first
        products.sort((a, b) => {
          if (a.isAvailable === b.isAvailable) return 0;
          return a.isAvailable ? -1 : 1;
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
      console.error("Failed to fetch shop data:", error);
    }
  }

  // Fallback dummy data if needed, same as home
  if (products.length === 0 && !process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
     products = [
        {
          id: "1",
          name: "Desert Puffer Jacket",
          handle: "desert-puffer-jacket",
          price: "199,00 EUR",
          image: "https://images.unsplash.com/photo-1544923246-7740a90c230d?q=80&w=1000&auto=format&fit=crop",
          colors: ["#4a5d23", "#e5e5e5"],
          isNew: true,
          isAvailable: true,
        },
     ];
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header collections={collectionsData} forceWhite={true} />
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-white text-black">Loading...</div>}>
        <ShopClient products={products} />
      </Suspense>
    </div>
  );
}

