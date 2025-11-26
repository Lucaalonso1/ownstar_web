import { Header } from "@/components/Header";
import { getCollections } from "@/lib/shopify";
import AccountClient from "./AccountClient";

export default async function AccountPage() {
  let collectionsData: any[] = [];

  if (
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN
  ) {
    try {
      const fetchedCollections = await getCollections();
      if (fetchedCollections.length > 0) {
        collectionsData = fetchedCollections.map((c: any) => ({
          id: c.id,
          handle: c.handle,
          name: c.title,
          image: c.image?.src || "",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch collections for account page:", error);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header collections={collectionsData} forceWhite={true} />
      <AccountClient />
    </div>
  );
}

