import { Header } from "@/components/Header";
import { getCollections } from "@/lib/shopify";
import AboutContent from "./AboutContent";

export default async function AboutPage() {
  let collectionsData: any[] = [];

  // Try to fetch collections for header
  if (
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN
  ) {
    try {
      const shopifyCollections = await getCollections();
      if (shopifyCollections.length > 0) {
        collectionsData = shopifyCollections.map((c: any) => ({
          id: c.id,
          handle: c.handle,
          name: c.title,
          image: c.image?.src || "",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch collections for about page:", error);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header collections={collectionsData} forceWhite={true} />
      <AboutContent />
    </div>
  );
}
