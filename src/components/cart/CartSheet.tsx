
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { CartItem } from "./CartItem";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { RecommendedProducts } from "./RecommendedProducts";
import { useLocalization } from "@/contexts/localization-context";

export function CartSheet() {
  const { items, getTotalItems, getTotalPrice, isLoading } = useCart();
  const { t } = useLocalization();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0"
            >
              {totalItems}
            </Badge>
          )}
          <span className="sr-only">{t('cart')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{t('your_cart')}</SheetTitle>
        </SheetHeader>
        {isLoading ? (
             <div className="flex flex-1 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
             </div>
        ) : items.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="pr-6">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </ScrollArea>
             <div className="pr-6">
               <RecommendedProducts />
             </div>
            <SheetFooter className="mt-auto pr-6">
              <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>{t('subtotal')}</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/checkout">{t('proceed_to_checkout')}</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">{t('cart_empty_title')}</h3>
            <p className="text-muted-foreground">{t('cart_empty_subtitle')}</p>
            <SheetClose asChild>
                <Button asChild>
                    <Link href="/">{t('continue_shopping')}</Link>
                </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
