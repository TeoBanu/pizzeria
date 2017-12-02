import mongoose, {Schema} from "mongoose";
import ModelHelper from "../model.helper";
import User from "../user/user.model";
import Pizza from "../pizza/pizza.model";

let OrderSchema = new Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },
        elements: [{
          pizza: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: Pizza
          },
          count: Number
        }],
        //minutes
        deliveryTime: {
            type: Number
        }
    },
    {timestamps: true}
);

let OrderModel = mongoose.model('Order', OrderSchema);
OrderModel.clear = ModelHelper.clear(OrderModel);
export default OrderModel;

