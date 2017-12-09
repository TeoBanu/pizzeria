import mongoose, {Schema} from "mongoose";
import ModelHelper from "../model.helper";
import User from "../user/user.model";
import Pizza from "../pizza/pizza.model";

let elementsSchema = mongoose.Schema({
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Pizza
  },
  count: Number
}, {_id: false});

let OrderSchema = new Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },
        elements: [elementsSchema],
        //minutes
        deliveryTime: {
            type: Number
        },
        completed: {
          type: Boolean
        }
    },
    {timestamps: true}
);

let OrderModel = mongoose.model('Order', OrderSchema);
OrderModel.clear = ModelHelper.clear(OrderModel);
export default OrderModel;

