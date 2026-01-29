"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import { getRecommendationsAction } from "@/app/actions";
import type { Product } from "@/lib/types";
import { useLocalization } from "@/contexts/localization-context";
import { Skeleton } from "@/components/ui/skeleton";
import { AddToCartButton } from "./AddToCartButton";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";

export function RecommendedProducts() {
  const { items } = useCart();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLocalization();
  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(() => collection(firestore, 'products'), [firestore]);
  const { data: allProducts } = useCollection<Product>(productsQuery as any);

  useEffect(() => {
    async function fetchRecommendations() {
      if (items.length > 0 && allProducts) {
        setLoading(true);
        const cartItems = items.map((item) => item.product.name);
        try {
          const recommendedNames = await getRecommendationsAction({ cartItems });
          
          const recommendedProducts = recommendedNames
            .map(recName => allProducts.find(p => p.name === recName))
            .filter((p): p is Product => !!p);

          const newRecommendations = recommendedProducts.filter(rec => !items.some(item => item.product.id === rec.id));
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
  }, [items, allProducts]);

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
          return (
            <div key={product.id} className="flex items-center gap-4 rounded-lg border p-2">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
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
