import { Routes } from '@angular/router';
import { CartPage } from './cart/cart-page/cart-page';
import { App } from './app';
import { OrderList } from './orders/order-list/order-list';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Logout } from './components/auth/logout/logout';
import { AuthGuard } from './services/auth-guard';
import { GuestGuard } from './services/guest-guard';
import { Products } from './products/products';
import { CheckoutPage } from './checkout/checkout-page/checkout-page';
import { OrderSuccess } from './checkout/order-success/order-success';
import { EmptyCart } from './cart/empty-cart/empty-cart';

export const routes: Routes =
[
    { path: '', component: App },
    { path: 'login', component: Login, canActivate: [GuestGuard] },
    { path: 'register', component: Register, canActivate: [GuestGuard] },
    { path: 'logout', component: Logout, canActivate: [AuthGuard] },
    { path: 'cart', component: CartPage },
    { path: 'empty-cart', component: EmptyCart },
    { path: 'checkout', component: CheckoutPage },
    { path: 'order-success', component: OrderSuccess },
    { path: 'orders', component: OrderList, canActivate: [AuthGuard] },
     {path:'products' , component:Products},
];
