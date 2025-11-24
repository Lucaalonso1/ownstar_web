const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const adminAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN;

const headers = {
  "X-Shopify-Access-Token": adminAccessToken!,
  "Content-Type": "application/json",
};

export async function getProductsInCollection() {
  const URL = `https://${domain}/admin/api/2024-01/products.json?status=active`;

  const options = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error in Shopify fetch products:", error);
    return [];
  }
}

export async function getCollections() {
  const URL = `https://${domain}/admin/api/2024-01/custom_collections.json`;
  const SMART_URL = `https://${domain}/admin/api/2024-01/smart_collections.json`;

  const options = {
    method: "GET",
    headers,
  };

  try {
    // Fetch both custom (manual) and smart (automated) collections
    const [customRes, smartRes] = await Promise.all([
      fetch(URL, options),
      fetch(SMART_URL, options),
    ]);

    const customData = customRes.ok ? await customRes.json() : { custom_collections: [] };
    const smartData = smartRes.ok ? await smartRes.json() : { smart_collections: [] };

    // Combine and filter/sort if needed
    return [...customData.custom_collections, ...smartData.smart_collections];
  } catch (error) {
    console.error("Error in Shopify fetch collections:", error);
    return [];
  }
}
