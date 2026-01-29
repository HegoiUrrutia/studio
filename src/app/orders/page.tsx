"use client";

import { useEffect, useMemo, useState } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useLocalization } from "@/contexts/localization-context";
import type { RequestHeader, RequestElement, Product } from "@/lib/types";
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

type EnrichedRequestElement = RequestElement & { product?: Product };
type EnrichedRequestHeader = RequestHeader & {
  elements: EnrichedRequestElement[];
  total: number;
};

function OrderList({ orders, isLoading }: { orders: EnrichedRequestHeader[], isLoading: boolean }) {
  const { t } = useLocalization();

  if (isLoading) {
     return (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
     )
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 py-16 text-center">
        <h3 className="text-xl font-semibold">{t('no_orders_found')}</h3>
        <p className="text-muted-foreground">{t('no_orders_found_desc')}</p>
        <Button asChild>
          <Link href="/">{t('continue_shopping')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {orders.map((order) => (
        <AccordionItem value={order.id} key={order.id} className="rounded-lg border bg-card">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex w-full flex-col items-start gap-2 text-left sm:flex-row sm:items-center sm:gap-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{t('order_id')}</p>
                <p className="font-mono text-xs font-medium sm:text-sm">{order.id}</p>
              </div>
              <div className="w-full sm:w-auto sm:flex-1">
                <p className="text-sm text-muted-foreground">{t('order_date')}</p>
                <p className="font-medium">{new Date(order.creationDate).toLocaleDateString()}</p>
              </div>
              <div className="w-full sm:w-auto sm:flex-1">
                <p className="text-sm text-muted-foreground">{t('order_total')}</p>
                <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <Separator className="mb-4" />
            <div className="space-y-4">
              {order.elements.map(element => (
                <div key={element.id} className="flex items-center gap-4">
                  {element.product?.imageUrl ? (
                    <Image
                      src={element.product.imageUrl}
                      alt={element.product.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                    />
                  ) : <Skeleton className='h-16 w-16 rounded-md' />}
                  <div className="flex-1">
                    <p className="font-medium">{element.product?.name || 'Product not found'}</p>
                    <p className="text-sm text-muted-foreground">{t('quantity')}: {element.quantity}</p>
                  </div>
                  <p className="font-medium">${(element.price * element.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default function OrdersPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { t } = useLocalization();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const productsQuery = useMemoFirebase(() => collection(firestore, 'products'), [firestore]);
  const { data: allProducts, isLoading: isLoadingProducts } = useCollection<Product>(productsQuery as any);

  const headersQuery = useMemoFirebase(
    () => user ? query(collection(firestore, `users/${user.uid}/requestHeaders`), orderBy('creationDate', 'desc')) : null,
    [user, firestore]
  );
  const { data: requestHeaders, isLoading: isLoadingHeaders } = useCollection<RequestHeader>(headersQuery as any);

  const [requestElements, setRequestElements] = useState<Record<string, RequestElement[]>>({});
  const [isLoadingElements, setIsLoadingElements] = useState(true);

  useEffect(() => {
    if (!requestHeaders || !user) {
      if(!isLoadingHeaders) setIsLoadingElements(false);
      return;
    };
    
    setIsLoadingElements(true);
    const elementsByHeader: Record<string, RequestElement[]> = {};
    const promises = requestHeaders.map(async (header) => {
        const elementsRef = collection(firestore, `users/${user.uid}/requestHeaders/${header.id}/requestElements`);
        const elementsSnap = await getDocs(elementsRef);
        elementsByHeader[header.id] = elementsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as RequestElement));
    });

    Promise.all(promises).then(() => {
        setRequestElements(elementsByHeader);
        setIsLoadingElements(false);
    });

  }, [requestHeaders, user, firestore, isLoadingHeaders]);

  const enrichedOrders = useMemo((): EnrichedRequestHeader[] => {
    if (!requestHeaders || !allProducts) {
      return [];
    }
    
    return requestHeaders.map(header => {
      const elements = requestElements[header.id] || [];
      const enrichedElements = elements.map(element => ({
        ...element,
        product: allProducts.find(p => p.id === element.productId)
      }));
      const total = enrichedElements.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return {
        ...header,
        elements: enrichedElements,
        total,
      };
    }).filter(order => order.elements.length > 0 || (requestHeaders.length > 0 && !isLoadingElements));
  }, [requestHeaders, allProducts, requestElements, isLoadingElements]);

  const isLoading = isUserLoading || isLoadingProducts || isLoadingHeaders;
  
  if (isUserLoading || !user) {
     return (
      <div className="container mx-auto flex h-[80vh] items-center justify-center">
         <Loader2 className="h-8 w-8 animate-spin" />
      </div>
     )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{t('order_history')}</h1>
        <p className="mt-2 text-muted-foreground">{t('order_history_desc')}</p>
      </div>
      <OrderList orders={enrichedOrders} isLoading={isLoading || isLoadingElements} />
    </div>
  );
}
