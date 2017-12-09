import {Component, OnInit} from '@angular/core';
import {OrderService} from './order.service';
import {Order} from './order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {

  pendingOrders: Order[] = [];
  respondedOrders: Order[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getAll().then((orders: Order[]) => {
      this.pendingOrders = orders.filter(o => o.deliveryTime === 0);
      this.respondedOrders = orders.filter(o => o.deliveryTime !== 0);
    });
  }

  addDeliveryTime(order: Order) {
    this.orderService.update(order).then((o: Order) => {
      this.pendingOrders.splice(this.pendingOrders.indexOf(o), 1);
      this.respondedOrders.push(order);
    });
  }

 completeOrder(order: Order) {
    order.completed = true;
    this.orderService.update(order).then((o: Order) =>  this.respondedOrders.splice(this.respondedOrders.indexOf(o), 1));
  }

}
