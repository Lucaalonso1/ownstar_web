import { NextResponse } from "next/server";
import { getProductsInCollection } from "@/lib/shopify";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query) {
    // Return recommended products (available ones first) when query is empty
    try {
        const products = await getProductsInCollection();
        // Filter for available products first
        const availableProducts = products.filter((p: any) => {
             const totalInventory = p.variants.reduce((acc: number, v: any) => acc + (v.inventory_quantity || 0), 0);
             return totalInventory > 0;
        });
        
        // If we have enough available products, use them, otherwise mix
        const sourceProducts = availableProducts.length >= 4 ? availableProducts : products;

        // Map first 5 products as recommendations (to fill the row nicely)
        const mappedProducts = sourceProducts.slice(0, 5).map((p: any) => mapProduct(p));
        return NextResponse.json({ products: mappedProducts });
    } catch (error) {
        return NextResponse.json({ products: [] });
    }
  }

  try {
    const products = await getProductsInCollection();
    
    const filteredProducts = products.filter((p: any) => {
      const title = p.title.toLowerCase();
      const tags = p.tags ? p.tags.toLowerCase() : "";
      const productType = p.product_type ? p.product_type.toLowerCase() : "";
      
      // Normalized Search Logic
      const normalizedQuery = normalizeSearchTerm(query);
      
      // Check against mapped terms
      const isMatch = 
        title.includes(normalizedQuery) || 
        tags.includes(normalizedQuery) ||
        productType.includes(normalizedQuery) ||
        // Also check original query for exact matches
        title.includes(query) ||
        tags.includes(query);
        
      return isMatch;
    });

    // Map to our frontend format
    const mappedProducts = filteredProducts.map((p: any) => mapProduct(p)).slice(0, 10); // Limit to 10 results

    return NextResponse.json({ products: mappedProducts });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}

function normalizeSearchTerm(term: string): string {
    const t = term.toLowerCase().trim();
    // Map Spanish terms to English equivalents or common tags
    if (t === 'sudadera' || t === 'sudaderas') return 'hoodie';
    if (t === 'camiseta' || t === 'camisetas') return 't-shirt';
    if (t === 'pantalon' || t === 'pantalones') return 'pants';
    if (t === 'jersey' || t === 'jerseys') return 'sweater';
    return t;
}

function mapProduct(p: any) {
    const firstVariant = p.variants[0];
    const compareAtPrice = firstVariant?.compare_at_price;
    const price = firstVariant?.price || "0.00";
    const onSale = compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price);
    
    // Calculate availability
    const totalInventory = p.variants.reduce((acc: number, v: any) => acc + (v.inventory_quantity || 0), 0);
    const isAvailable = totalInventory > 0;

    // Extract colors from options if available, otherwise default
    const colorOption = p.options?.find((o: any) => o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour");
    const colors = colorOption ? colorOption.values.map((c: string) => mapColorToHex(c)) : ["#000000", "#F5F5F5"]; // Default to Black/White if no colors found

    return {
      id: p.id.toString(),
      name: p.title,
      handle: p.handle,
      price: `${price} EUR`,
      compareAtPrice: onSale ? `${compareAtPrice} EUR` : null,
      image: p.image?.src || p.images[0]?.src || "",
      category: p.product_type,
      colors: colors.slice(0, 4), // Limit to 4 colors
      isAvailable: isAvailable
    };
}

function mapColorToHex(colorName: string): string {
    const c = colorName.toLowerCase();
    if (c.includes("black") || c.includes("negro")) return "#000000";
    if (c.includes("white") || c.includes("blanco")) return "#FFFFFF";
    if (c.includes("blue") || c.includes("azul")) return "#1d4ed8"; // blue-700
    if (c.includes("navy")) return "#1e3a8a"; // blue-900
    if (c.includes("red") || c.includes("rojo")) return "#dc2626"; // red-600
    if (c.includes("green") || c.includes("verde")) return "#15803d"; // green-700
    if (c.includes("gray") || c.includes("grey") || c.includes("gris")) return "#6b7280"; // gray-500
    if (c.includes("beige") || c.includes("ecru") || c.includes("cream")) return "#f5f5dc";
    if (c.includes("yellow") || c.includes("amarillo")) return "#facc15";
    if (c.includes("brown") || c.includes("marron")) return "#78350f";
    return "#d4d4d4"; // default gray
}
