import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class ServiceOrder {
  private apiUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  // ✅ Get all orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // ✅ Get order by ID
  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  // ✅ Create new order
  createOrder(orderData:any): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/create-order`, orderData);
  }

  // ✅ Cancel order
  cancelOrder(id: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/cancel-order/${id}`, {});
  }
}
