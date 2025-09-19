import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderDetailItem } from '../order-detail-item/order-detail-item';
import { Order } from '../../models/order';
import { DatePipe } from '@angular/common';
import { ServiceOrder } from '@services/service-order';

@Component({
  selector: 'app-order-card',
  imports: [OrderDetailItem, DatePipe],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css'
})
export class OrderCard {
  constructor(private orderService: ServiceOrder){}
  @Input() order!: Order;

  get orderNo(): string {
    return this.order?._id?.slice(-6).toUpperCase() ?? '';
  }

  @Output() cancelOrderEvent = new EventEmitter<string>();

  cancelOrder() {
    this.cancelOrderEvent.emit(this.order._id);
  }
}

