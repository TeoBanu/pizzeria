import Order from './order.model';
import ServiceHelper from '../service.helper';
import _ from 'lodash';

export default class OrderService {

    static create(req, res, next) {
        let order = new Order(req.body);
        return order.save()
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.handleError(next, 500));
    }

    static show(req, res, next) {
        return Order.findOne({_id: req.params._id})
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.handleError(next, 404));
    }

    static showAll(req, res, next) {
        return Order.find({})
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.handleError(next, 404));
    }

    static showAllByUserId(req, res, next) {
        return Order.find({userId: req.params._id})
            .then(ServiceHelper.respondWithResult(res, 200))
            .then(ServiceHelper.handleError(next, 404));
    }

    static update(req, res, next) {
        let orderId = req.params.id;
        let order = req.body;
        return Order.findById(orderId).exec()
            .then(o => {
                let updatedOrder = _.merge(o, order);
                return updatedOrder.save();
            })
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.handleError(next, 404));
    }
}