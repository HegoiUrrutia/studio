import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "../cart/AddToCartButton";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === product.imageId);

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        {image && (
          <Image
            src={image.imageUrl}
            alt={product.name}
            width={400}
            height={300}
            className="h-48 w-full object-cover"
            data-ai-hint={image.imageHint}
          />
        )}
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="mb-2 text-lg font-semibold leading-tight">
          {product.name}
        </CardTitle>
         <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                key={i}
                className={`h-4 w-4 ${
                    i < product.rating ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground"
                }`}
                />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">({product.rating})</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
