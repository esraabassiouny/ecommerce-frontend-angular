import { Component, Input } from '@angular/core';
import { OrderDetailItem } from '../order-detail-item/order-detail-item';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-card',
  imports: [OrderDetailItem],
  templateUrl: './order-card.html',
  styleUrl: './order-card.css'
})
export class OrderCard {
@Input() order!: Order;
}
