import {User} from '../login/User';
import {Pizza} from '../pizza/Pizza';
export class Order {
  user: User;
  pizzas: [Pizza];
  deliveryTime: String
}
