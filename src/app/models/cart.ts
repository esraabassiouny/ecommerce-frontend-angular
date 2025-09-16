// export class CartItem{
//     constructor
//     (
//         public id:number,
//         public product: {
//             name: string,
//             description: string,
//             price: number,
//             category: string,
//             imageUrl: string,
//         },
//         public quantity: number,
//         public price: number,
//     )
//     {}
// }

export interface CartProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  inStock: boolean;
}



// Represents a single item in the cart
export interface CartItem {
  product: string;      // MongoDB ObjectId as string (ref: Product)
  quantity: number;
  price: number;
}

// Represents the entire cart
export class Cart {
  constructor(
    public id:string,
    public userId: string,       // ObjectId of the user
    public items: CartItem[],    // Array of CartItem
    public totalPrice: number,   // Calculated total
    public updatedAt?: Date      // Optional, since backend auto-generates it
  ) {}
}
