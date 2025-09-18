import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICartItem } from '@models/cart';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css'
})
export class CartItem {
  @Input() item!: ICartItem;
  
  @Output() remove = new EventEmitter<string>(); 
  @Output() update = new EventEmitter<{ productId: string, quantity: number }>();


  onQuantityChange() {
    this.update.emit({ productId: this.item.product._id, quantity: this.item.quantity });
  }

    onRemove() {
    this.remove.emit(this.item.product._id);
  }
}
