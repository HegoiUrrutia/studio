"use client";

import { useState, useMemo } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import type { Product, Category } from "@/lib/types";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    categories: string[];
    priceRange: [number, number];
  }>({
    categories: [],
    priceRange: [0, 1000],
  });

  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(() => collection(firestore, 'products'), [firestore]);
  const { data: products, isLoading: isLoadingProducts } = useCollection<Product>(productsQuery as any);

  const categoriesQuery = useMemoFirebase(() => collection(firestore, 'categories'), [firestore]);
  const { data: categories, isLoading: isLoadingCategories } = useCollection<Category>(categoriesQuery as any);


  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.categoryId);
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      return (
        matchesSearch && matchesCategory && matchesPrice
      );
    });
  }, [searchQuery, filters, products]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const isLoading = isLoadingProducts || isLoadingCategories;


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          {isLoading ? (
            <Card>
              <CardHeader><Skeleton className="h-8 w-24" /></CardHeader>
              <CardContent className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ) : (
            <FilterSidebar
              categories={categories || []}
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearchChange={handleSearchChange}
              searchQuery={searchQuery}
            />
          )}
        </div>
        <div className="lg:col-span-3 mt-8 lg:mt-0">
          {isLoading ? (
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(9)].map((_, i) => (
                  <Card key={i}>
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-4">
                       <Skeleton className="h-6 w-3/4 mb-2" />
                       <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-10 w-28" />
                    </CardFooter>
                  </Card>
                ))}
             </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}
