import mongoose, {Schema} from "mongoose";
import ModelHelper from "../model.helper";

let PizzaSchema = new Schema({
        name: {
            type: String,
            trim: true,
            required: true
        },
        ingredients: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                validate: [ModelHelper.imageFormatValidator, ModelHelper.imageSizeValidator]
            }
        },
    },
    {timestamps: true}
);

let PizzaModel = mongoose.model('Pizza', PizzaSchema);
PizzaModel.clear = ModelHelper.clear(PizzaModel);
export default PizzaModel;

