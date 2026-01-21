export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Games' | 'Consoles' | 'Merchandise';
  platform?: 'PlayStation' | 'Xbox' | 'Nintendo' | 'PC';
  imageId: string;
  rating: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
