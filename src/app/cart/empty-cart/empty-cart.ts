import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-cart',
  imports: [],
  templateUrl: './empty-cart.html',
})
export class EmptyCart {
  constructor(private router: Router) {}

  goToProducts() {
    this.router.navigate(['/products']); // 👈 change if your products route differs
  }
}
