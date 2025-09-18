import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart';
import { FormsModule } from '@angular/forms';  
import { CartItem} from '../cart-item/cart-item';
import { ServiceCart } from '../../services/service-cart';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [FormsModule, CartItem, RouterLink],
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.css']
})
export class CartPage implements OnInit {

  constructor(private cartService: ServiceCart, private router: Router) {}

  cart!: Cart 
  header: string = "Shopping Cart";

  ngOnInit(): void {
  this.loadCart();
}

loadCart() {
    this.cartService.getCart().subscribe({
      next: (data) => {
        console.log("Backend cart:", data);
        this.cart = data
        this.cartService.setCartSummary(this.cart);
      },
      error: (err) => {
        if (err.status === 404) {
        console.log("Cart not found for this user (404).");
        this.router.navigate(['/empty-cart']); 
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
  this.cartService.removeCartItem(productId).subscribe({
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
  this.cartService.updateCartItem(event.productId, event.quantity).subscribe({
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
