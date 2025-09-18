import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '@services/admin/admin-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard-component.html',
  styleUrls: ['./admin-dashboard-component.css']
})

export class AdminDashboardComponent {
  selectedSection: 'users' | 'products' | 'orders' | '' = '';
  users: any[] = [];
  products: any[] = [];
  orders: any[] = [];

  constructor(private adminService: AdminService) {}

  onSelect(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'users' | 'products' | 'orders' | '';
    this.selectedSection = value;

    if (value === 'users') {
      this.adminService.getUsers().subscribe(data => this.users = data);}
    // } else if (value === 'products') {
    //   this.adminService.getProducts().subscribe(data => this.products = data);
    // } else if (value === 'orders') {
    //   this.adminService.getOrders().subscribe(data => this.orders = data);
    // }
  }
}