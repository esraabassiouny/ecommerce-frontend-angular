import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class ServiceCart {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:5000/api/cart/';

  getCart(): Observable<Cart> {
    return this.http.get<{ cart: Cart }>(`${this.apiUrl}`)
      .pipe(map(response => response.cart));
  }

  addToCart(productId: any, quantity: number): Observable<Cart> {
    return this.http.post<{ cart: Cart }>(`${this.apiUrl}add`, {
      productId,
      quantity,
    }).pipe(map(res => res.cart));
  }

  removeCartItem(productId: any): Observable<Cart> {
    return this.http.delete<{ cart: Cart }>(
      `${this.apiUrl}remove/${productId}`
    ).pipe(map(res => res.cart));
  }

  clearCart(): Observable<Cart> {
    return this.http.delete<{ cart: Cart }>(`${this.apiUrl}clear`)
      .pipe(map(res => res.cart));
  }

  updateCartItem(productId: any, quantity: number): Observable<Cart> {
    return this.http.put<{ cart: Cart }>(`${this.apiUrl}update`, {
      productId,
      quantity,
    }).pipe(map(res => res.cart));
  }

itemsPrice = 0;
taxPrice = 0;
shippingPrice = 0;
totalPrice = 0;

setCartSummary(cart:Cart) {
  this.itemsPrice = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  this.taxPrice = cart.tax;
  this.shippingPrice = cart.shipping;
  this.totalPrice = this.itemsPrice + this.taxPrice + this.shippingPrice;
}

}
