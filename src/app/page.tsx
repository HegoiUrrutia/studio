"use client";

import { useState, useMemo } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    categories: string[];
    platforms: string[];
    priceRange: [number, number];
  }>({
    categories: [],
    platforms: [],
    priceRange: [0, 1000],
  });

  const allCategories = useMemo(() => Array.from(new Set(products.map(p => p.category))), []);
  const allPlatforms = useMemo(() => Array.from(new Set(products.map(p => p.platform).filter(Boolean) as string[])), []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const matchesPlatform =
        filters.platforms.length === 0 ||
        (product.platform && filters.platforms.includes(product.platform));
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      return (
        matchesSearch && matchesCategory && matchesPlatform && matchesPrice
      );
    });
  }, [searchQuery, filters]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <FilterSidebar
            categories={allCategories}
            platforms={allPlatforms}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            searchQuery={searchQuery}
          />
        </div>
        <div className="lg:col-span-3 mt-8 lg:mt-0">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
