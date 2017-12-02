import { Injectable } from '@angular/core';
import { Order } from './Order';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {
    private orderUrl = 'http://localhost:8080/api/order';
    constructor(private http: Http) { }

    createOrder(newOrder: Order): Promise<void|Order> {
          return this.http.post(this.orderUrl, newOrder)
          .toPromise()
          .then(response => response.json() as Order)
          .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
    }
}
