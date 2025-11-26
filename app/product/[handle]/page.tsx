import { Header } from "@/components/Header";
import { getProductByHandle, getCollections } from "@/lib/shopify";
import ProductClient from "./ProductClient";

// Fallback dummy product for development or when Shopify is not connected
const dummyProduct = {
  id: 1,
  title: "Desert Puffer Jacket",
  body_html: "<p>Experience ultimate comfort and style with our Desert Puffer Jacket. Designed for the modern explorer, this jacket features premium insulation to keep you warm in chilly conditions while maintaining a sleek, minimalist aesthetic.</p><p>Features:</p><ul><li>Water-resistant outer shell</li><li>Premium down fill</li><li>Adjustable hood and cuffs</li><li>Multiple secure pockets</li></ul>",
  vendor: "OWNSTAR",
  product_type: "Jacket",
  created_at: "2024-01-01T00:00:00-00:00",
  handle: "desert-puffer-jacket",
  updated_at: "2024-01-01T00:00:00-00:00",
  published_at: "2024-01-01T00:00:00-00:00",
  template_suffix: null,
  status: "active",
  published_scope: "global",
  tags: "new, jacket, puffer",
  admin_graphql_api_id: "gid://shopify/Product/1",
  variants: [
    {
      id: 101,
      product_id: 1,
      title: "S",
      price: "199.00",
      sku: "DPJ-S",
      position: 1,
      inventory_policy: "deny",
      compare_at_price: null,
      fulfillment_service: "manual",
      inventory_management: "shopify",
      option1: "S",
      option2: null,
      option3: null,
      created_at: "2024-01-01T00:00:00-00:00",
      updated_at: "2024-01-01T00:00:00-00:00",
      taxable: true,
      barcode: "",
      grams: 1000,
      image_id: null,
      weight: 1.0,
      weight_unit: "kg",
      inventory_item_id: 101,
      inventory_quantity: 10,
      old_inventory_quantity: 10,
      requires_shipping: true,
      admin_graphql_api_id: "gid://shopify/ProductVariant/101",
    },
    {
      id: 102,
      product_id: 1,
      title: "M",
      price: "199.00",
      sku: "DPJ-M",
      position: 2,
      inventory_policy: "deny",
      compare_at_price: null,
      fulfillment_service: "manual",
      inventory_management: "shopify",
      option1: "M",
      option2: null,
      option3: null,
      created_at: "2024-01-01T00:00:00-00:00",
      updated_at: "2024-01-01T00:00:00-00:00",
      taxable: true,
      barcode: "",
      grams: 1000,
      image_id: null,
      weight: 1.0,
      weight_unit: "kg",
      inventory_item_id: 102,
      inventory_quantity: 5,
      old_inventory_quantity: 5,
      requires_shipping: true,
      admin_graphql_api_id: "gid://shopify/ProductVariant/102",
    },
    {
      id: 103,
      product_id: 1,
      title: "L",
      price: "199.00",
      sku: "DPJ-L",
      position: 3,
      inventory_policy: "deny",
      compare_at_price: null,
      fulfillment_service: "manual",
      inventory_management: "shopify",
      option1: "L",
      option2: null,
      option3: null,
      created_at: "2024-01-01T00:00:00-00:00",
      updated_at: "2024-01-01T00:00:00-00:00",
      taxable: true,
      barcode: "",
      grams: 1000,
      image_id: null,
      weight: 1.0,
      weight_unit: "kg",
      inventory_item_id: 103,
      inventory_quantity: 0,
      old_inventory_quantity: 0,
      requires_shipping: true,
      admin_graphql_api_id: "gid://shopify/ProductVariant/103",
    },
  ],
  options: [
    {
      id: 1,
      product_id: 1,
      name: "Size",
      position: 1,
      values: ["S", "M", "L"],
    },
  ],
  images: [
    {
      id: 1,
      product_id: 1,
      position: 1,
      created_at: "2024-01-01T00:00:00-00:00",
      updated_at: "2024-01-01T00:00:00-00:00",
      alt: "Desert Puffer Jacket Front",
      width: 1000,
      height: 1500,
      src: "https://images.unsplash.com/photo-1544923246-7740a90c230d?q=80&w=1000&auto=format&fit=crop",
      variant_ids: [],
      admin_graphql_api_id: "gid://shopify/ProductImage/1",
    },
    {
      id: 2,
      product_id: 1,
      position: 2,
      created_at: "2024-01-01T00:00:00-00:00",
      updated_at: "2024-01-01T00:00:00-00:00",
      alt: "Desert Puffer Jacket Detail",
      width: 1000,
      height: 1500,
      src: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
      variant_ids: [],
      admin_graphql_api_id: "gid://shopify/ProductImage/2",
    },
  ],
  image: {
    id: 1,
    product_id: 1,
    position: 1,
    created_at: "2024-01-01T00:00:00-00:00",
    updated_at: "2024-01-01T00:00:00-00:00",
    alt: "Desert Puffer Jacket Front",
    width: 1000,
    height: 1500,
    src: "https://images.unsplash.com/photo-1544923246-7740a90c230d?q=80&w=1000&auto=format&fit=crop",
    variant_ids: [],
    admin_graphql_api_id: "gid://shopify/ProductImage/1",
  },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  
  console.log("ProductPage handle:", handle); // Debug log

  let product = null;
  let collectionsData: any[] = [];

  if (
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN
  ) {
    try {
      const [fetchedProduct, fetchedCollections] = await Promise.all([
        getProductByHandle(handle),
        getCollections(),
      ]);
      product = fetchedProduct;
      
      if (fetchedCollections.length > 0) {
        collectionsData = fetchedCollections.map((c: any) => ({
          id: c.id,
          handle: c.handle,
          name: c.title,
          image: c.image?.src || "",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch product page data:", error);
    }
  }

  // Fallback if Shopify didn't return a product (or not connected)
  if (!product) {
    // Check if it matches our dummy product handle or just use dummy as default fallback in dev
    if (handle === "desert-puffer-jacket" || !process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
      product = dummyProduct;
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header collections={collectionsData} forceWhite={true} />
      <ProductClient product={product} />
    </div>
  );
}
