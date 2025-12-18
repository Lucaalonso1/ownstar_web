import { NextRequest, NextResponse } from "next/server";
import { getProductByHandle } from "@/lib/shopify";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const handle = searchParams.get("handle");

  if (!handle) {
    return NextResponse.json({ error: "Handle is required" }, { status: 400 });
  }

  try {
    const product = await getProductByHandle(handle);
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const image = product.image?.src || product.images?.[0]?.src || null;

    return NextResponse.json({ image });
  } catch (error) {
    console.error("Error fetching product image:", error);
    return NextResponse.json({ error: "Failed to fetch product image" }, { status: 500 });
  }
}

