import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {UserService} from '../../login/user.service';
import {Order} from '../order';

@Component({
  selector: 'order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  isLoggedIn: boolean;
  deliveryTime: number;

  constructor(private orderService: OrderService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.isLoggedIn().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
    this.orderService.getDeliveryTime().subscribe((order: Order) => {
      if(this.isLoggedIn && localStorage.getItem('id') === order.userId) {
        this.deliveryTime = order.deliveryTime;
      }
    });
  }

}
