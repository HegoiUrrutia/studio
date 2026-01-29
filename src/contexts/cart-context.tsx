
"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import type { Product, CartItem as LocalCartItem } from "@/lib/types";
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { collection, doc, writeBatch } from "firebase/firestore";

// This is the shape of the data in Firestore
type BasketElement = {
  id: string;
  productId: string;
  quantity: number;
  userId: string;
};

type CartContextType = {
  items: LocalCartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LocalCartItem[]>([]);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  // 1. Get all products once
  const productsQuery = useMemoFirebase(() => collection(firestore, 'products'), [firestore]);
  const { data: allProducts, isLoading: isLoadingProducts } = useCollection<Product>(productsQuery as any);

  // 2. Get the user's basket in real-time
  const basketQuery = useMemoFirebase(
    () => (user ? collection(firestore, `users/${user.uid}/basketElements`) : null),
    [user, firestore]
  );
  const { data: basketElements, isLoading: isLoadingBasket } = useCollection<BasketElement>(basketQuery as any);

  // 3. Combine basket elements with product details
  useEffect(() => {
    if (!isLoadingProducts && !isLoadingBasket) {
      if (user && basketElements && allProducts) {
        const cartItems: LocalCartItem[] = basketElements
          .map((basketItem) => {
            const product = allProducts.find((p) => p.id === basketItem.productId);
            return product ? { product, quantity: basketItem.quantity } : null;
          })
          .filter((item): item is LocalCartItem => item !== null);
        setItems(cartItems);
      } else {
        // Not logged in or data not loaded, so cart is empty
        setItems([]);
      }
    }
  }, [basketElements, allProducts, user, isLoadingProducts, isLoadingBasket]);


  const findBasketElement = (productId: string): BasketElement | undefined => {
      return basketElements?.find(item => item.productId === productId);
  }

  const addItem = async (product: Product, quantity = 1) => {
    if (!user) return;

    const existingItem = findBasketElement(product.id);
    const cartRef = collection(firestore, `users/${user.uid}/basketElements`);
    
    if (existingItem) {
        // Update quantity
        const docRef = doc(firestore, `users/${user.uid}/basketElements`, existingItem.id);
        updateDocumentNonBlocking(docRef, { quantity: existingItem.quantity + quantity });
    } else {
        // Add new item
        addDocumentNonBlocking(cartRef, {
            productId: product.id,
            quantity: quantity,
            userId: user.uid,
        });
    }
  };

  const removeItem = (productId: string) => {
    if (!user) return;
    const itemToRemove = findBasketElement(productId);
    if(itemToRemove) {
        const docRef = doc(firestore, `users/${user.uid}/basketElements`, itemToRemove.id);
        deleteDocumentNonBlocking(docRef);
    }
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    if (!user) return;
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    const itemToUpdate = findBasketElement(productId);
    if (itemToUpdate) {
        const docRef = doc(firestore, `users/${user.uid}/basketElements`, itemToUpdate.id);
        updateDocumentNonBlocking(docRef, { quantity });
    }
  };

  const clearCart = async () => {
    if (!user || !basketElements) return;
    const batch = writeBatch(firestore);
    basketElements.forEach(item => {
        const docRef = doc(firestore, `users/${user.uid}/basketElements`, item.id);
        batch.delete(docRef);
    });
    await batch.commit();
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };
  
  const isLoading = isUserLoading || isLoadingProducts || isLoadingBasket;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
