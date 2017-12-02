import{Component, OnInit}from "@angular/core";
import {Router} from "@angular/router";
import {Pizza}from "../pizza";
import {PizzaService}from "../pizza.service";
import {UserService}from "../../login/user.service";
import {Observable}from "rxjs";
import {Order}from '../../cart/Order';

@Component({
    selector: 'pizza-list',
    templateUrl: './pizza-list.component.html',
    styleUrls: ['./pizza-list.component.css'],
    providers: [PizzaService]
})
export class PizzaListComponent implements OnInit {

    pizzas: Pizza[] = [];
    cart: Order;
    selectedPizza: Pizza;
    isLoggedIn: boolean;
    isAdmin: boolean;


    constructor(
        private pizzaService: PizzaService,
        private userService: UserService,
        private router: Router) {
    }

    ngOnInit() {
        this.userService.isLoggedIn().subscribe(
            (isLoggedIn) => {
                this.isLoggedIn = isLoggedIn;
            }
        );
        this.userService.isAdmin().subscribe(
            (isAdmin) => {
                this.isAdmin = isAdmin;
            }
        );
        this.pizzaService
        .getPizzas()
        .then((pizzas: Pizza[]) => {
            this.pizzas = pizzas;
        })
    }

    private getIndexOfPizza = (pizzaId: String) => {
        return this.pizzas.findIndex((pizza) => {
            return pizza._id === pizzaId;
        });
    };

    selectPizza(pizza: Pizza) {
        this.selectedPizza = pizza;
    }

    createNewPizza() {
        let pizza: Pizza = {
            name: '',
            ingredients: String[''],
            price: 0
        };

        // By default, a newly-created pizza will have the selected state.
        this.selectPizza(pizza);
    }

    addToCart(pizza: Pizza) {
      if(this.isLoggedIn) {
        this.cart.pizzas.push(pizza);
      } else {
          this.router.navigate(['/register']);
      }
    }

    deletePizza = (pizzaId: String) => {
        let idx = this.getIndexOfPizza(pizzaId);
        if (idx !== -1) {
            this.pizzas.splice(idx, 1);
            this.selectPizza(null);
        }
        return this.pizzas;
    };

    addPizza = (pizza: Pizza) => {
        console.log(this.pizzas);
        this.pizzas.push(pizza);
        this.selectPizza(pizza);
        return this.pizzas;
    };

    updatePizza = (pizza: Pizza) => {
        let idx = this.getIndexOfPizza(pizza._id);
        if (idx !== -1) {
            this.pizzas[idx] = pizza;
            this.selectPizza(pizza);
        }
        return this.pizzas;
    };

}
