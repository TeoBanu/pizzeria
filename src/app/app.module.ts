import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import {AppComponent} from './app.component';
import {PizzaListComponent} from './pizza/pizza-list/pizza-list.component';
import {PizzaDetailsComponent} from './pizza/pizza-details/pizza-details.component';
import {LoginComponent} from './login/login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {AccountComponent} from './login/account/account.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UserService} from './login/user.service';
import {CartComponent} from './order/cart/cart.component';
import {OrderComponent} from './order/order.component';
import {OrderService} from './order/order.service';
import { OrderStatusComponent } from './order/order-status/order-status.component';
import {WindowRef} from './window-ref.service';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };
const appRoutes: Routes = [
  {path: 'order-status', component: OrderStatusComponent},
  {path: 'orders', component: OrderComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: PizzaListComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PizzaListComponent,
    PizzaDetailsComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    NavbarComponent,
    PageNotFoundComponent,
    CartComponent,
    OrderComponent,
    OrderStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    UserService,
    OrderService,
    WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule {
}
