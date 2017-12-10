import {Injectable} from '@angular/core';
import {Socket} from 'ng-socket-io';
import {Order} from './order';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {
  private orderUrl = 'http://localhost:8080/api/order';

  constructor(private http: Http,
              private socket: Socket) {
  }

  createOrder(newOrder: Order): Promise<void | Order> {
    return this.http.post(this.orderUrl, newOrder)
      .toPromise()
      .then(response => response.json() as Order)
      .catch(this.handleError);
  }

  getAll(): Promise<void | Order[]> {
    return this.http.get(this.orderUrl)
      .toPromise()
      .then(response => response.json() as Order[])
      .catch(this.handleError);
  }

  emitDeliveryTimeAdded(order: Order) {
    this.socket.emit('delivery-time-added', order);
  }

  emitNewOrder(orderId: string) {
    this.socket.emit('new-order', orderId);
  }

  update(updatedOrder: Order): Promise<void | Order> {
    return this.http.put(this.orderUrl + '/' + updatedOrder._id, updatedOrder)
      .toPromise()
      .then(response => response.json() as Order)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

  getNewOrder() {
    return this.socket.fromEvent('order');
  }

  getDeliveryTime() {
    return this.socket.fromEvent('delivery-time');
  }
}
