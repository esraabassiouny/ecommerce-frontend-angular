import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})

export class ServiceOrder{

    constructor(private http: HttpClient){}
    private apiUrl = 'http://localhost:5000/api/orders/';

    getOrdersByUserId(id: any): Observable<Order[]>
    {
        const orders = this.http.get<Order[]>(`http://localhost:5000/api/orders/${id}`); 
        console.log(orders);
        return orders;
    }
}