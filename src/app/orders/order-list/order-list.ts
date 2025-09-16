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
  userId:any = "68bd2d8494e30b8403859f1c";
  orders:Order[] = [];

  ngOnInit(): void {
    this.orderService.getOrdersByUserId(this.userId).subscribe({
      next: (data)=>{
        console.log(data);        
        this.orders = data;
      },
      error: (err)=>{
        console.log("Error in fetching orders "+ err);
      }
    }
    )
  }
}
