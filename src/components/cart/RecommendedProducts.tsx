"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { getRecommendationsAction } from "@/app/actions";
import type { Product } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLocalization } from "@/contexts/localization-context";
import { Skeleton } from "@/components/ui/skeleton";
import { AddToCartButton } from "./AddToCartButton";

export function RecommendedProducts() {
  const { items } = useCart();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLocalization();

  useEffect(() => {
    async function fetchRecommendations() {
      if (items.length > 0) {
        setLoading(true);
        const cartItems = items.map((item) => item.product.name);
        try {
          const result = await getRecommendationsAction({ cartItems });
          // Filter out items already in the cart
          const newRecommendations = result.filter(rec => !items.some(item => item.product.id === rec.id));
          setRecommendations(newRecommendations);
        } catch (error) {
          console.error("Failed to fetch recommendations", error);
        } finally {
          setLoading(false);
        }
      } else {
        setRecommendations([]);
      }
    }
    fetchRecommendations();
  }, [items]);

  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };

  if (loading) {
     return (
        <div className="mt-6">
            <h4 className="mb-4 font-semibold">{t('you_might_also_like')}</h4>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-24 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
            </div>
      </div>
     )
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h4 className="mb-4 font-semibold">{t('you_might_also_like')}</h4>
      <div className="grid grid-cols-1 gap-4">
        {recommendations.slice(0, 2).map((product) => {
          const image = getImage(product.imageId);
          return (
            <div key={product.id} className="flex items-center gap-4 rounded-lg border p-2">
              {image && (
                <Image
                  src={image.imageUrl}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                  data-ai-hint={image.imageHint}
                />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-sm font-semibold text-primary">${product.price.toFixed(2)}</p>
              </div>
              <AddToCartButton product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
