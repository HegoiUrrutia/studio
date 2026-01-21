"use server";

import { getProductRecommendations, ProductRecommendationsInput } from "@/ai/flows/product-recommendations";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";

export async function getRecommendationsAction(input: ProductRecommendationsInput): Promise<Product[]> {
  try {
    const { recommendations } = await getProductRecommendations(input);
    if (!recommendations || recommendations.length === 0) {
      return [];
    }

    // Find the full product objects for the recommended names
    const recommendedProducts = recommendations
      .map(recName => products.find(p => p.name === recName))
      .filter((p): p is Product => !!p);
      
    return recommendedProducts;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return [];
  }
}
