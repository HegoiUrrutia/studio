"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalization } from "@/contexts/localization-context";
import type { Category } from "@/lib/types";

type FilterSidebarProps = {
  categories: Category[];
  filters: {
    categories: string[];
    priceRange: [number, number];
  };
  onFilterChange: (newFilters: Partial<FilterSidebarProps['filters']>) => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
};

export function FilterSidebar({
  categories,
  filters,
  onFilterChange,
  onSearchChange,
  searchQuery
}: FilterSidebarProps) {

  const { t } = useLocalization();

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((c) => c !== categoryId);
    onFilterChange({ categories: newCategories });
  };

  const handlePriceChange = (value: [number]) => {
     onFilterChange({ priceRange: [filters.priceRange[0], value[0]] });
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('filters')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="search" className="text-base font-semibold">{t('search')}</Label>
          <Input
            id="search"
            placeholder={t('search_placeholder')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <h3 className="text-base font-semibold mb-2">{t('category')}</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <Checkbox
                  id={`cat-${category.id}`}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, !!checked)}
                />
                <Label htmlFor={`cat-${category.id}`} className="font-normal">{category.name}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
           <div className="flex justify-between items-center mb-2">
             <h3 className="text-base font-semibold">{t('price')}</h3>
             <span className="text-sm text-muted-foreground">${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
           </div>
          <Slider
            defaultValue={[filters.priceRange[1]]}
            max={1000}
            step={10}
            onValueCommit={handlePriceChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
