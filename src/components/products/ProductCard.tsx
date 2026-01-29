import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "../cart/AddToCartButton";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={300}
            className="h-48 w-full object-cover"
          />
        )}
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="mb-2 text-lg font-semibold leading-tight">
          {product.name}
        </CardTitle>
         <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
