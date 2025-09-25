import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '@services/admin/admin-service';
import { ProductService } from '@services/productService';
import { ServiceOrder } from '@services/service-order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-dashboard-component.html',
  styleUrls: ['./admin-dashboard-component.css']
})
export class AdminDashboardComponent implements OnInit {
  selectedSection: 'users' | 'products' | 'orders' | '' = '';
  users: any[] = [];
  products: any[] = [];
  orders: any[] = [];

  editingUser: any = null;
  editingProduct: any = null;

  constructor(
    private adminService: AdminService,
    private productService: ProductService,
    private serviceOrder: ServiceOrder
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.adminService.getUsers().subscribe(data => this.users = data);
    this.productService.getProducts().subscribe(data => this.products = data); 
    this.serviceOrder.getOrders().subscribe(data => this.orders = data);
  }

  onSelect(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'users' | 'products' | 'orders' | '';
    this.selectedSection = value;
  }

  startEdit(user: any) {
    // clone user so changes don’t instantly show in the list
    this.editingUser = { ...user };
  }

  saveUser() {
    if (!this.editingUser) return;

    this.adminService.updateUser(this.editingUser._id, this.editingUser).subscribe({
      next: () => {
        console.log('User updated');
        this.editingUser = null;
        this.loadData();
      },
      error: err => console.error('Error updating user:', err),
    });
  }

  cancelEdit() {
    this.editingUser = null;
    this.editingProduct = null;
  }

  deleteUser(id: string) {
    this.users = this.users.filter(u => u._id !== id);

    this.adminService.deleteUser(id).subscribe({
      next: () => console.log('User deleted'),
      error: err => {
        console.error('Error deleting user:', err);
        this.loadData(); // rollback if failed
      }
    });
  }

  // === product actions ===

  startEditProduct(product: any) {
    this.editingProduct = { ...product };
  }

  saveProduct() {
    if (!this.editingProduct) return;

    this.productService.updateProduct(this.editingProduct).subscribe({
      next: () => {
        console.log('Product updated');
        this.editingProduct = null;
        this.loadData();
      },
      error: err => console.error('Error updating product:', err),
    });
  }

  deleteProduct(id: string) {
    this.products = this.products.filter(p => p._id !== id);

    this.productService.deleteProduct(id).subscribe({
      next: () => console.log('Product deleted'),
      error: err => {
        console.error('Error deleting product:', err);
        this.loadData();
      }
    });
  }
}
