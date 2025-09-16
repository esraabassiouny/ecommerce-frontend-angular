import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart';
import { FormsModule } from '@angular/forms';  
import { CartItem as CartItemComponent } from '../cart-item/cart-item';
import { ServiceCart } from '../../services/service-cart';

@Component({
  selector: 'app-cart-page',
  imports: [FormsModule],
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.css']
})
export class CartPage implements OnInit {

  constructor(private cartService: ServiceCart) {}

  userId: string = "68bd22017307f5712865691e";

  cart: Cart = new Cart(
    "",
    this.userId,
    [],
    0
  );

  header: string = "Shopping Cart";

  ngOnInit(): void {
    this.cartService.getCartByUserId(this.userId).subscribe({
      next: (data) => {
        console.log("Backend cart:", data);

        this.cart = new Cart(
          data.id,
          data.userId,
          data.items,
          data.totalPrice,
          data.updatedAt
        );

        console.log("Cart total (from class):", data.totalPrice);
      },
      error: (err) => {
        console.log("Error in fetching cart:", err);
      }
    });
  }

  removeItem(productId: string) {
    this.cart.items = this.cart.items.filter(item => item.product !== productId);

    // Recalculate total price after removing
    this.cart.totalPrice = this.cart.items.reduce(
      (sum, item) => sum + item.price,
      0
    );
  }
}
