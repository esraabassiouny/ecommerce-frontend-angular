import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})

export class ServiceCart{

    constructor(private http: HttpClient){}
    private apiUrl = 'http://localhost:5000/api/cart/';

    getCartByUserId(id: any): Observable<Cart>
    {
        const orders = this.http.get<Cart>(`http://localhost:5000/api/cart/${id}`); 
        console.log(orders);
        return orders;
    }
}