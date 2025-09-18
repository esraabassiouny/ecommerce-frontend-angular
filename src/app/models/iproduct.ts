export interface Iproduct {
  _id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: number;
  isFeatured:boolean;
}
