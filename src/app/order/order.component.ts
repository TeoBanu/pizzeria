import {Component, OnInit} from '@angular/core';
import {OrderService} from './order.service';
import {Order} from './order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
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

    this.orderService.getNewOrder()
      .subscribe((data: Order) => this.pendingOrders.push(data));
  }

  addDeliveryTime(order: Order) {
    this.orderService.update(order).then((o: Order) => {
      this.pendingOrders.splice(this.pendingOrders.indexOf(o), 1);
      this.respondedOrders.push(order);
      this.orderService.emitDeliveryTimeAdded(o);
    });
  }

  completeOrder(order: Order) {
    order.completed = true;
    this.orderService.update(order).then((o: Order) => this.respondedOrders.splice(this.respondedOrders.indexOf(o), 1));
  }

}
