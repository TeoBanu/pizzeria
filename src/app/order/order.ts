import {CartElement} from './cart/cart-element';

export class Order {
  _id?: string;
  userId: string;
  elements: CartElement[];
  deliveryTime: number;
  completed: boolean;
}
