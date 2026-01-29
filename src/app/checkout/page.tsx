"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/cart-context";
import { useLocalization } from "@/contexts/localization-context";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useFirestore, useUser } from "@/firebase";
import { collection, writeBatch, doc, getDocs } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart();
  const { t } = useLocalization();
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  async function handlePlaceOrder() {
    if (!user || items.length === 0) return;

    setIsPlacingOrder(true);
    const batch = writeBatch(firestore);

    // 1. Create RequestHeader
    const requestHeadersRef = collection(firestore, `users/${user.uid}/requestHeaders`);
    const newHeaderRef = doc(requestHeadersRef); // Auto-generates ID
    batch.set(newHeaderRef, {
      userId: user.uid,
      creationDate: new Date().toISOString(),
      status: 'pending',
    });

    // 2. Create RequestElements
    for (const { product, quantity } of items) {
      const requestElementRef = doc(collection(newHeaderRef, 'requestElements'));
      batch.set(requestElementRef, {
        requestHeaderId: newHeaderRef.id,
        productId: product.id,
        quantity: quantity,
        price: product.price,
      });
    }

    // 3. Clear Basket (using the same batch for atomicity)
    const basketCollectionRef = collection(firestore, `users/${user.uid}/basketElements`);
    const basketSnapshot = await getDocs(basketCollectionRef);
    basketSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    try {
      await batch.commit();
      toast({
        title: t('order_placed'),
        description: t('order_placed_desc'),
      });
      router.push('/orders');
    } catch (error: any) {
      console.error("Order placement failed: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Could not place order.",
      });
      setIsPlacingOrder(false);
    }
  }


  if (items.length === 0 && !isPlacingOrder) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">{t('checkout_empty_title')}</h1>
        <p className="text-muted-foreground">{t('checkout_empty_subtitle')}</p>
        <Button asChild>
          <Link href="/">{t('continue_shopping')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <Button variant="ghost" asChild className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back_to_shop')}
        </Link>
      </Button>
      <h1 className="mb-8 text-center text-4xl font-bold tracking-tight">{t('checkout')}</h1>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('shipping_information')}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">{t('first_name')}</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">{t('last_name')}</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t('address')}</Label>
                <Input id="address" placeholder="192 Anoeta plaza" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">{t('city')}</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">{t('state')}</Label>
                  <Input id="state" placeholder="NY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">{t('zip_code')}</Label>
                  <Input id="zip" placeholder="10001" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t('payment_details')}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">{t('card_number')}</Label>
                <Input id="card-number" placeholder="**** **** **** 1234" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">{t('expiry_date')}</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">{t('cvc')}</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('order_summary')}</CardTitle>
              <CardDescription>{t('order_summary_desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map(({ product, quantity }) => {
                  return (
                    <div key={product.id} className="flex items-center gap-4">
                       {product.imageUrl && (
                         <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="rounded-md object-cover"
                        />
                       )}
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{t('quantity')}: {quantity}</p>
                      </div>
                      <p className="font-medium">${(product.price * quantity).toFixed(2)}</p>
                    </div>
                  )
                })}
                <Separator />
                <div className="flex justify-between font-medium">
                  <p>{t('subtotal')}</p>
                  <p>${getTotalPrice().toFixed(2)}</p>
                </div>
                 <div className="flex justify-between text-muted-foreground">
                  <p>{t('shipping')}</p>
                  <p>{t('free')}</p>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <p>{t('total')}</p>
                  <p>${getTotalPrice().toFixed(2)}</p>
                </div>
              </div>
              <Button onClick={handlePlaceOrder} disabled={isPlacingOrder || items.length === 0} className="mt-6 w-full">
                 {isPlacingOrder && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                 {isPlacingOrder ? 'Placing Order...' : t('place_order')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
