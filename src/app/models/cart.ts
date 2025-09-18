export interface IProduct {
  _id: string;           
  name: string;
  description?: string;
  price: number;
  stock: number;
  images: string[];      
  isFeatured: boolean;
  categoryId: string;    
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ICartItem {
  product: IProduct;   
  quantity: number;
  price: number;      
}


export class Cart {
  constructor(
    public id: string,
    public userId: string,       
    public items: ICartItem[],   
    public totalPrice: number,  
    public shipping: number,    
    public tax: number,        
    public orderTotal: number,  
    public updatedAt?: Date      
  ) {}
}