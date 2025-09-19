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

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(orderData:any): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/create-order`, orderData);
  }

  cancelOrder(id: string): Observable<{ message: string; order: Order }> {
    return this.http.put<{ message: string; order: Order }>(
      `${this.apiUrl}/cancel-order/${id}`,
      {}
    );
  }
}
