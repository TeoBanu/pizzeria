import mongoose, {Schema} from "mongoose";
import ModelHelper from "../model.helper";
import AuthService from "../auth/auth.service";

let UserSchema = new Schema({
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        salt: String,
        street: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {timestamps: true}
);

/**
 * Methods
 */
UserSchema.methods.authenticate = function(password) {
    // Authenticate - check if the passwords are the same
        return AuthService.encryptPassword(this.salt, password)
            .then((hashedPassword) => {
                return Promise.resolve(this.password === hashedPassword);
            });
    };

let UserModel = mongoose.model('User', UserSchema);
UserModel.clear = ModelHelper.clear(UserModel);
export default UserModel;

