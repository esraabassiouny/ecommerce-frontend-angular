import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})

export class ServiceCart{

    constructor(private http: HttpClient){}
    private apiUrl = 'http://localhost:5000/api/cart/';

    getCartByUserId(id: any): Observable<Cart>
    {
        return this.http.get<{ cart: Cart }>(`${this.apiUrl}${id}`)
       .pipe(
        map(response => response.cart) 
      );
    }

    addToCart(userId: any, productId: any, quantity: number): Observable<Cart> {
        return this.http.post<{ cart: Cart }>(`${this.apiUrl}add`, {
          userId,
          productId,
          quantity,
        }).pipe(map(res => res.cart));
      }

      removeCartItem(userId: any,productId: any): Observable<Cart> {
        return this.http.delete<{ cart: Cart }>(
          `${this.apiUrl}remove/${productId}` ,{
            body: { userId },
          }
        ).pipe(map(res => res.cart));
      }

      clearCart(userId: any): Observable<Cart> {
        return this.http.delete<{ cart: Cart }>(`${this.apiUrl}clear`, {
          body: { userId }, // send userId if backend expects it
        }).pipe(map(res => res.cart));
      }

      updateCartItem(userId: any, productId: any, quantity: number): Observable<Cart> {
        return this.http.put<{ cart: Cart }>(`${this.apiUrl}update`, {
          userId,
          productId,
          quantity,
        }).pipe(map(res => res.cart));
      }





}