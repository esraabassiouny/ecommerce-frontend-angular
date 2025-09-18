import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Iproduct[]> {
    return this.http.get<{ data: Iproduct[] }>(this.apiUrl).pipe(
      map((res) => res.data)
    );
  }

 addProduct(product: Iproduct): Observable<Iproduct> {

  const newProduct: any = { ...product };

  delete newProduct._id;

  return this.http.post<Iproduct>(this.apiUrl, newProduct);
}

  updateProduct(product: Iproduct) {
  return this.http.patch(`${this.apiUrl}/${product._id}`, product);
}

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
