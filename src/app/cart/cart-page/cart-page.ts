import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart';
import { FormsModule } from '@angular/forms';  
import { CartItem} from '../cart-item/cart-item';
import { ServiceCart } from '../../services/service-cart';

@Component({
  selector: 'app-cart-page',
  imports: [FormsModule, CartItem],
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.css']
})
export class CartPage implements OnInit {

  constructor(private cartService: ServiceCart) {}

  userId: string = "68bd22017307f5712865691e";

  cart!: Cart 
  header: string = "Shopping Cart";

  ngOnInit(): void {
  this.loadCart();
}

loadCart() {
    this.cartService.getCartByUserId(this.userId).subscribe({
      next: (data) => {
        console.log("Backend cart:", data);
        this.cart = data
      },
      error: (err) => {
        if (err.status === 404) {
        console.log("Cart not found for this user (404).");
        }else
        console.log("Error in fetching cart:", err);
      }
    });
}


 onRemove(productId: string) {
  const oldItems = [...this.cart.items];

  // update ui
  this.cart.items = this.cart.items.filter(item => item.product._id !== productId);

  // Call backend
  this.cartService.removeCartItem(this.userId, productId).subscribe({
    next: (data) => {
      console.log('Backend confirmed:', data);
      this.loadCart();
      // this.cart = data;
    },
    error: (err) => {
      console.error('Remove failed:', err);
      this.loadCart();
      // this.cart.items = oldItems;
    }
  });
}


  onUpdate(event: { productId: string, quantity: number }){
  this.cartService.updateCartItem(this.userId, event.productId, event.quantity).subscribe({
    next: (data) => {
      console.log('Backend confirmed:', data);
      this.loadCart();
      //this.cart = data;
    },
    error: (err) => {
      console.error('Remove failed:', err);
      this.loadCart();
      // this.cart.items = oldItems;
    }
  });
} 

}
