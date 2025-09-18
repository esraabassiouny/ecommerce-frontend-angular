import { Component, Input } from '@angular/core';
import { OrderDetailItem } from '../order-detail-item/order-detail-item';
import { Order } from '../../models/order';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-card',
  imports: [OrderDetailItem, DatePipe],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css'
})
export class OrderCard {
  @Input() order!: Order;

  get orderNo(): string {
    return this.order?._id?.slice(-6).toUpperCase() ?? '';
  }
}

