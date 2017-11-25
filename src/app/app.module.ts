import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { PizzaListComponent } from './pizza/pizza-list/pizza-list.component';
import { PizzaDetailsComponent } from './pizza/pizza-details/pizza-details.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { AccountComponent } from './login/account/account.component';
import { NavbarComponent } from './navbar/navbar.component';

let registerState = {name: 'register', url: '/register', component: RegisterComponent};
let loginState = {name: 'login', url: '/login', component: LoginComponent};
@NgModule({
  declarations: [
    AppComponent,
    PizzaListComponent,
    PizzaDetailsComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
