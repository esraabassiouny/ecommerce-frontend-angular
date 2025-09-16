import { Routes } from '@angular/router';
import { CartPage } from './cart/cart-page/cart-page';
import { App } from './app';
import { OrderList } from './orders/order-list/order-list';

export const routes: Routes = [  { path: 'cart', component: CartPage }, { path: '', component: App }, 
    { path: 'orders', component: OrderList }
];
