import Pizza from './pizza.model';
import ServiceHelper from '../service.helper';
import _ from 'lodash';

export default class PizzaService {

    static create(req, res, next) {
        let pizza = new Pizza(req.body);
        return pizza.save()
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.handleError(next, 500));
    }

    static show(req, res, next) {
        return Pizza.find({_id: req.params._id})
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.handleError(next, 404));
    }

    static showAll(req, res, next) {
        return Pizza.find({}).exec()
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.handleError(next, 404));
    }

    static update(req, res, next) {
        let pizzaId = req.params.id;
        let pizza = req.body;
        return Pizza.findById(pizzaId).exec()
            .then(p => {
                let updatedPizza = _.merge(p, pizza);
                return updatedPizza.save();
            })
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.handleError(next, 404));
    }

    static remove(req, res, next) {
        let pizzaId = req.params.id;
        return Pizza.findByIdAndRemove(pizzaId).exec()
            .then(ServiceHelper.respondWithResult(res, 200))
            .catch(ServiceHelper.respondWithResult(next, 404));
    }
}