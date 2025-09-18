import { IProduct } from "./cart";

// order.model.ts
export interface OrderItem {
  product: IProduct;       // Product ID (ObjectId as string)
  quantity: number;
  price: number;
}

export interface ShippingDetails {
  address: string;
  // optionally you can expand:
  // city?: string;
  // postalCode?: string;
  // phone?: string;
}

export type PaymentMethod = 'COD' | 'Credit Card' | 'PayPal';
export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  _id?: string;               
  user: string;                
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  shippingPrice: number;
  totalPrice: number;
  status: OrderStatus;
  deliveryDate: string; 
  createdAt?: string;          
  updatedAt?: string;
}
