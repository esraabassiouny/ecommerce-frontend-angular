import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart';
import { FormsModule } from '@angular/forms';  
import { CartItem} from '../cart-item/cart-item';
import { ServiceCart } from '../../services/service-cart';
import { Router, RouterLink } from '@angular/router';
import { LoadingSpinner } from 'app/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-cart-page',
  imports: [FormsModule, CartItem, RouterLink, LoadingSpinner],
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.css']
})
export class CartPage implements OnInit {

  constructor(private cartService: ServiceCart, private router: Router) {}

  cart!: Cart 
  header: string = "Shopping Cart";
  loading: boolean = true;

  ngOnInit(): void {
  this.loadCart();
}

loadCart() {
  this.loading = true;
    this.cartService.getCart().subscribe({
      next: (data) => {
        console.log("Cart:", data);
        this.cart = data
        this.cartService.setCartSummary(this.cart);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
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

  this.cart.items = this.cart.items.filter(item => item.product._id !== productId);

  this.cartService.removeCartItem(productId).subscribe({
    next: (data) => {
      console.log('Cart:', data);
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
      console.log('Cart:', data);
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
