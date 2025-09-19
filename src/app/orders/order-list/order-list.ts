import { Component, OnInit } from '@angular/core';
import { OrderCard } from '../order-card/order-card';
import { ServiceOrder } from '../../services/service-order';
import { Order } from '../../models/order';
import { Router } from '@angular/router';
import { LoadingSpinner } from 'app/shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-order-list',
  imports: [OrderCard, LoadingSpinner],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css'
})
export class OrderList implements OnInit{

  constructor(private orderService: ServiceOrder, private router:Router){}

  orders:Order[] = [];
  loading: boolean = true;


  ngOnInit(): void {
    this.loadOrders()
  }


  loadOrders(){
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (data)=>{
        this.loading = false;
        this.orders = data;
        console.log("Orders:", this.orders);        
      },
      error: (err)=>{
        this.loading = false;
        console.log("Error in fetching orders "+ err);
        if(err.status == 404)
        {
          this.router.navigate(['/no-orders']); 
        }
      }
    }
    )
  }
  onCancelOrder(orderId: string) {
    this.loading = true;
  this.orderService.cancelOrder(orderId).subscribe({
    next: (res) => {
      console.log(res.message,"\norder:",res.order)
      this.loadOrders()
    },
    error: (err) => {
      console.error("Failed to cancel order");
      this.loading = false;
    }
  });
}
}
