import { Component, Input } from '@angular/core';
import { OrderItem } from '../../models/order';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail-item',
  imports: [FormsModule, CommonModule],
  templateUrl: './order-detail-item.html',
  styleUrl: './order-detail-item.css'
})
export class OrderDetailItem {
  @Input() item!: OrderItem;

}
