import {User} from '../login/User';
import {CartElement} from './cart-element';
import {Pizza} from '../pizza/Pizza';

export class Order {
  userId: string;
  elements: CartElement[];
  deliveryTime: string;
}
