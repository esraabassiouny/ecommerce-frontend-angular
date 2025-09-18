import { Icategory } from "./iCategory";

export interface Iproduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  categoryId: string | Icategory;
  isFeatured?: boolean;
}


