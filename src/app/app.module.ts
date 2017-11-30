import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {PizzaListComponent} from './pizza/pizza-list/pizza-list.component';
import {PizzaDetailsComponent} from './pizza/pizza-details/pizza-details.component';
import {LoginComponent} from './login/login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {AccountComponent} from './login/account/account.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
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
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes, {enableTracing: true})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
