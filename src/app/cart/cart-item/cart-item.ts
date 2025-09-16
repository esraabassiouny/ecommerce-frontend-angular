import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart, CartProduct } from '../../models/cart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css'
})
export class CartItem {
  @Input() item!:CartProduct;
  
  @Output() remove = new EventEmitter<number>(); 

  onRemove() {
    this.remove.emit(this.item.id);   
  }

    resetProduct() {
    this.item.quantity = 1;
  }
}


