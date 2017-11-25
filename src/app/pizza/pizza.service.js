"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var PizzaService = (function () {
    function PizzaService(http) {
        this.http = http;
        this.pizzasUrl = 'http://localhost:8080/api/pizza';
    }
    PizzaService.prototype.getPizzas = function () {
        return this.http.get(this.pizzasUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PizzaService.prototype.getPizza = function (id) {
        return this.http.get(this.pizzasUrl + '/' + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PizzaService.prototype.createPizza = function (newPizza) {
        return this.http.post(this.pizzasUrl, newPizza)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PizzaService.prototype.updatePizza = function (updatedPizza) {
        return this.http.put(this.pizzasUrl + '/' + updatedPizza._id, updatedPizza)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PizzaService.prototype.deletePizza = function (id) {
        return this.http.delete(this.pizzasUrl + '/' + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PizzaService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
    };
    return PizzaService;
}());
PizzaService = __decorate([
    core_1.Injectable()
], PizzaService);
exports.PizzaService = PizzaService;
