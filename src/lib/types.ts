export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
};

export type Category = {
  id: string;
  name: string;
}

export type CartItem = {
  product: Product;
  quantity: number;
};

export type RequestHeader = {
  id: string;
  userId: string;
  creationDate: string;
  status: string;
};

export type RequestElement = {
  id: string;
  requestHeaderId: string;
  productId: string;
  quantity: number;
  price: number;
};
