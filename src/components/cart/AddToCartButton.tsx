"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useLocalization } from "@/contexts/localization-context";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const { t } = useLocalization();

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: t('item_added_to_cart'),
      description: `${product.name} ${t('has_been_added')}`,
    });
  };

  return (
    <Button onClick={handleAddToCart} className="w-full">
      <ShoppingCart className="mr-2 h-4 w-4" />
      {t('add_to_cart')}
    </Button>
  );
}
