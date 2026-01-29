"use server";

import { getProductRecommendations, ProductRecommendationsInput } from "@/ai/flows/product-recommendations";

export async function getRecommendationsAction(input: ProductRecommendationsInput): Promise<string[]> {
  try {
    const { recommendations } = await getProductRecommendations(input);
    return recommendations || [];
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return [];
  }
}
