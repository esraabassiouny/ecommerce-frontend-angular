export interface ICartItem {
  id: number;
  product: 
  {  
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  },
  quantity: number;
  price: number;
}

export interface ICart {
  userId: string;
  items: ICartItem[];
  totalPrice: number;
}

