import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Drop005Section } from "@/components/Drop005Section";
import { getProductsInCollection, getCollections, getCollectionByHandle, getProductByHandle } from "@/lib/shopify";

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
  handle: string;
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
  let drop005Data: {
    title: string;
    description?: string;
    image?: string;
    products: Array<{
      id: string;
      name: string;
      handle: string;
      price: string;
      compareAtPrice?: string | null;
      image: string;
      secondImage?: string | null;
      isAvailable: boolean;
    }>;
    handle: string;
  } | null = null;

  // Try to fetch from Shopify if env vars are present
  if (
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN
  ) {
    try {
      // Fetch products, collections, and drop005 in parallel
      const [shopifyProducts, shopifyCollections, drop005Collection] = await Promise.all([
        getProductsInCollection(),
        getCollections(),
        getCollectionByHandle("drop005").catch(() => null), // Silently fail if drop005 doesn't exist
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
          handle: c.handle,
          name: c.title,
          image: c.image?.src || "", // Collections might not have images, header handles empty string check
        }));
      }

      // Process Drop005 Collection
      if (drop005Collection && drop005Collection.products?.edges) {
        const drop005Products = drop005Collection.products.edges
          .slice(0, 3) // Only take first 3 products
          .map(({ node }: any) => {
            const firstVariant = node.variants?.edges[0]?.node;
            const compareAtPrice = firstVariant?.compareAtPrice?.amount;
            const price = firstVariant?.price?.amount || node.priceRange?.minVariantPrice?.amount || "0.00";
            const currencyCode = firstVariant?.price?.currencyCode || firstVariant?.compareAtPrice?.currencyCode || node.priceRange?.minVariantPrice?.currencyCode || "EUR";
            
            return {
              id: node.id,
              name: node.title,
              handle: node.handle,
              price: `${price} ${currencyCode}`,
              compareAtPrice: compareAtPrice ? `${compareAtPrice} ${currencyCode}` : null,
              image: node.images?.edges[0]?.node?.url || "",
              secondImage: node.images?.edges[1]?.node?.url || null,
              isAvailable: node.availableForSale ?? true,
            };
          });

        if (drop005Products.length > 0) {
          drop005Data = {
            title: drop005Collection.title || "Drop 005",
            description: drop005Collection.description || undefined,
            image: drop005Collection.image?.url || undefined,
            products: drop005Products,
            handle: "drop005",
          };

          // Filter out drop005 products from the main products list to avoid duplicates
          const drop005Handles = new Set(drop005Products.map((p: any) => p.handle));
          products = products.filter((p: any) => !drop005Handles.has(p.handle));
        }
      }

      // Always filter out drop005 hardcoded products to avoid duplicates
      // These are the products shown in Drop005Section component
      const drop005HardcodedHandles = new Set([
        "rodeo-crewneck",
        "ownstar-studios-crewneck",
        "ownstar-staff-member-crewneck"
      ]);
      products = products.filter((p: any) => !drop005HardcodedHandles.has(p.handle));
    } catch (error) {
      console.error("Failed to fetch data from Shopify:", error);
    }
  } else {
    // Even if Shopify is not configured, filter out drop005 products from dummy data
    const drop005HardcodedHandles = new Set([
      "rodeo-crewneck",
      "ownstar-studios-crewneck",
      "ownstar-staff-member-crewneck"
    ]);
    products = products.filter((p: any) => !drop005HardcodedHandles.has(p.handle));
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
        {/* Drop005 Section - Featured Collection - Always shown */}
        <Drop005Section products={drop005Data?.products} />
        
        {/* All Products Grid */}
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
