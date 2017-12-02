import User from './user.model';
import AuthService from '../auth/auth.service';
import ServiceHelper from '../service.helper';
import _ from 'lodash';

export default class UserService {

    /**
     * Creates a new user.
     */
    static create(req, res, next) {
        let user = new User(req.body);
        return AuthService.hashUsersPassword(user)
            .then(u => u.save())
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.handleError(next, 500));
    }

    static show(req, res, next) {
        return User.findOne({_id: req.params.id})
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.handleError(next, 404));
    }

    static update(req, res, next) {
        let userId = req.params.id;
        let user = req.body;
        return User.findById(userId).exec()
            .then(u => {
                let updatedUser = _.merge(u, user);
                return updatedUser.save();
            })
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.handleError(next, 404));
    }

    static findByEmail(req, res, next) {
        return User.findOne({email: req.body.email}).exec()
            .then(user => user.authenticate(req.body.password))
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.handleError(next, 404));
    }
}
