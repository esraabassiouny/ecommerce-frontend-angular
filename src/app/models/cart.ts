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

export class Cart{
    constructor
    (
        public userId: string,
        public items: CartProduct[],
        public totalPrice: number,
    ) {}
    
}

