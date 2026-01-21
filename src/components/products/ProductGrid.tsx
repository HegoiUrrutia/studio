import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { useLocalization } from "@/contexts/localization-context";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  const { t } = useLocalization();
  if (products.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 text-center">
        <h3 className="text-xl font-semibold tracking-tight">{t('no_products_found')}</h3>
        <p className="text-muted-foreground">{t('try_adjusting_filters')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
