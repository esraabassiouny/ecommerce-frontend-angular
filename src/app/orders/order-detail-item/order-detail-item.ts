import { Component, Input } from '@angular/core';
import { OrderItem } from '../../models/order';

@Component({
  selector: 'app-order-detail-item',
  imports: [],
  templateUrl: './order-detail-item.html',
  styleUrl: './order-detail-item.css'
})
export class OrderDetailItem {
  @Input() item!: OrderItem;

}
