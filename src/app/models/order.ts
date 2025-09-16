// order.model.ts
export interface OrderItem {
  product: string;       // Product ID (ObjectId as string)
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
  _id?: string;                // Order ID
  user: string;                // User ID (ObjectId as string)
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  shippingPrice: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt?: string;           // timestamps
  updatedAt?: string;
}
