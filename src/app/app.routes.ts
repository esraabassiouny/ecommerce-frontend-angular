import { Routes } from '@angular/router';
import { CartPage } from './cart/cart-page/cart-page';
import { OrderList } from './orders/order-list/order-list';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Logout } from './components/auth/logout/logout';
import { AuthGuard } from './services/guards/auth-guard';
import { GuestGuard } from './services/guards/guest-guard';
import { Products } from './products/products';
import { CheckoutPage } from './checkout/checkout-page/checkout-page';
import { OrderSuccess } from './checkout/order-success/order-success';
import { EmptyCart } from './cart/empty-cart/empty-cart';
import { Home } from './core/home/home';
import { AdminDashboardComponent } from '@components/admin-dashboard-component/admin-dashboard-component';
import { NoOrders } from './orders/no-orders/no-orders';
import { AdminGuard } from './services/admin/admin-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login, canActivate: [GuestGuard] },
  { path: 'register', component: Register, canActivate: [GuestGuard] },
  { path: 'logout', component: Logout, canActivate: [AuthGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'cart', component: CartPage },
  { path: 'empty-cart', component: EmptyCart },
  { path: 'no-orders', component: NoOrders },
  { path: 'checkout', component: CheckoutPage },
  { path: 'order-success', component: OrderSuccess },
  { path: 'orders', component: OrderList, canActivate: [AuthGuard] },
  { path: 'products' , component: Products },
];

