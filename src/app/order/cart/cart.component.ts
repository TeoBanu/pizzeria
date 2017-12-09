import { Component, Input } from '@angular/core';
import {Order} from '../order';
import {OrderService} from '../order.service';
import {CartElement} from './cart-element';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [OrderService]
})
export class CartComponent {
    @Input()
    cart: Order;

    @Input()
    createHandler: Function;

    constructor(private orderService: OrderService) {
    }

    createOrder() {
       this.orderService.createOrder(this.cart).then((newOrder: Order) => {
            this.createHandler(newOrder);
        });
    }

    add(element: CartElement) {
      ++element.count;
    }

    remove(element: CartElement) {
      if(element.count === 1) {
        this.cart.elements.splice(this.cart.elements.indexOf(element), 1);
      } else {
        --element.count;
      }
    }

}
