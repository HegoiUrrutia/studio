"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import type { CartItem as CartItemType } from "@/lib/types";
import { Minus, Plus, X } from "lucide-react";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const { updateItemQuantity, removeItem } = useCart();

  return (
    <div className="flex items-start gap-4 py-4">
      {item.product.imageUrl && (
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          width={80}
          height={80}
          className="rounded-lg object-cover"
        />
      )}
      <div className="flex-1">
        <p className="font-semibold">{item.product.name}</p>
        <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => updateItemQuantity(item.product.id, parseInt(e.target.value, 10) || 1)}
            className="mx-2 h-8 w-14 text-center"
            readOnly
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between self-stretch">
         <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
         <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(item.product.id)}
            >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  );
}
