import { Component, OnInit } from '@angular/core';
import { OrderCard } from '../order-card/order-card';
import { ServiceOrder } from '../../services/service-order';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-list',
  imports: [OrderCard],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css'
})
export class OrderList implements OnInit{

  constructor(private orderService: ServiceOrder){}

  orders:Order[] = [];

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (data)=>{
        console.log(data);        
        this.orders = data;
        console.log(this.orders);        
      },
      error: (err)=>{
        console.log("Error in fetching orders "+ err);
      }
    }
    )
  }
}
