import mongoose, {Schema} from "mongoose";
import ModelHelper from "../model.helper";
import AuthService from "../auth/auth.service";
import NotFoundError from "../error/notFound";

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
            trim: true
        },
        city: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        isAdmin: {
            type: Boolean
        }
    },
    {timestamps: true}
);

/**
 * Methods
 */
UserSchema.methods.authenticate = function (password) {
    // Authenticate - check if the passwords are the same
    return AuthService.encryptPassword(this.salt, password)
        .then((hashedPassword) => {
            if (this.password === hashedPassword) {
                return Promise.resolve(this);
            } else {
                return Promise.reject(new NotFoundError())
            }
        });
};

let UserModel = mongoose.model('User', UserSchema);
UserModel.clear = ModelHelper.clear(UserModel);
export default UserModel;

