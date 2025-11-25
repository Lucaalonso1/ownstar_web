const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "");
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

export async function getProductByHandle(handle: string) {
  const URL = `https://${domain}/admin/api/2024-01/products.json?handle=${handle}`;

  const options = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }

    const data = await response.json();
    // The API returns an array of products matching the handle (should be 1)
    return data.products[0] || null;
  } catch (error) {
    console.error("Error in Shopify fetch product by handle:", error);
    return null;
  }
}

// --- Storefront API (for Customer Auth) ---

const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const storefrontHeaders = {
  "X-Shopify-Storefront-Access-Token": storefrontAccessToken || "",
  "Content-Type": "application/json",
};

async function storefrontRequest(query: string, variables = {}) {
  if (!storefrontAccessToken) {
    throw new Error("Falta configurar NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN en .env.local");
  }

    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const URL = `https://${domain}/api/2024-01/graphql.json`;

  const options = {
    method: "POST",
    headers: storefrontHeaders,
    body: JSON.stringify({ query, variables }),
  };

  try {
    const response = await fetch(URL, options);
    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data;
  } catch (error) {
    console.error("Error in Shopify Storefront request:", error);
    throw error;
  }
}

export async function createCustomer(email: string, password: string, firstName: string, lastName: string) {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      email,
      password,
      firstName,
      lastName,
    },
  };

  const data = await storefrontRequest(mutation, variables);
  return data.customerCreate;
}

export async function createCustomerAccessToken(email: string, password: string) {
  const mutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      email,
      password,
    },
  };

  const data = await storefrontRequest(mutation, variables);
  return data.customerAccessTokenCreate;
}

export async function createCheckoutUrl(items: { id: string; quantity: number }[]) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  
  const mutation = `
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const lines = items.map((item) => ({
    merchandiseId: item.id.includes("gid://")
      ? item.id
      : `gid://shopify/ProductVariant/${item.id}`,
    quantity: item.quantity,
  }));

  const variables = {
    input: {
      lines,
    },
  };

  const data = await storefrontRequest(mutation, variables);

  if (data.cartCreate?.userErrors?.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate?.cart?.checkoutUrl;
}

export async function getCustomer(accessToken: string) {
  const query = `
    query {
      customer(customerAccessToken: "${accessToken}") {
        id
        firstName
        lastName
        email
        orders(first: 10) {
          edges {
            node {
              id
              orderNumber
              totalPrice {
                amount
                currencyCode
              }
              processedAt
              financialStatus
              fulfillmentStatus
            }
          }
        }
      }
    }
  `;

  const data = await storefrontRequest(query);
  return data.customer;
}

