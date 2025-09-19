import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '@models/order';
import { ServiceCart } from '@services/service-cart';
import { ServiceOrder } from '@services/service-order';

@Component({
  selector: 'app-checkout',
  imports:[FormsModule],
  templateUrl: './checkout-page.html'
})
export class CheckoutPage {
  constructor(private orderService: ServiceOrder, private cartService: ServiceCart, private router: Router) {}
  shippingAddress = {
    address: '',
    city: '',
    state: '',
    postalCode: ''
  };

  itemsPrice: number = 0
  taxPrice: number = 0
  ngOnInit() {
    this.itemsPrice = this.cartService.itemsPrice;
    this.taxPrice = this.cartService.taxPrice;
    this.shippingPrice = this.cartService.shippingPrice;
    this.totalPrice = this.cartService.totalPrice;
  }


  paymentMethod: 'COD' | 'Credit Card' | 'PayPal' = 'COD';
  shippingPrice = 20; // example
  totalPrice = 341.68;

    orderData = {
      paymentMethod: this.paymentMethod,
      shippingPrice: this.shippingPrice,
      totalPrice: this.totalPrice,
      status:"Pending"
    };


  placeOrder() {
    this.orderService.createOrder(this.orderData).subscribe({
      next:(order)=>{
        console.log("Order:" , order)
        this.router.navigate(['/order-success']);

      },
      error:(err)=>{
        console.log("err in creating order "+ err.message())
      }
    })
  }
}
