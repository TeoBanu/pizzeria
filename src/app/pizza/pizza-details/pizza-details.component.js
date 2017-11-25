"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PizzaDetailsComponent = (function () {
    function PizzaDetailsComponent(pizzaService) {
        this.pizzaService = pizzaService;
    }
    PizzaDetailsComponent.prototype.createPizza = function (pizza) {
        var _this = this;
        this.pizzaService.createPizza(pizza).then(function (newPizza) {
            _this.createHandler(newPizza);
        });
    };
    PizzaDetailsComponent.prototype.updatePizza = function (pizza) {
        var _this = this;
        this.pizzaService.updatePizza(pizza).then(function (updatedPizza) {
            _this.updateHandler(updatedPizza);
        });
    };
    PizzaDetailsComponent.prototype.deletePizza = function (pizzaId) {
        var _this = this;
        this.pizzaService.deletePizza(pizzaId).then(function (deletedPizzaId) {
            _this.deleteHandler(deletedPizzaId);
        });
    };
    return PizzaDetailsComponent;
}());
__decorate([
    core_1.Input()
], PizzaDetailsComponent.prototype, "pizza", void 0);
__decorate([
    core_1.Input()
], PizzaDetailsComponent.prototype, "createHandler", void 0);
__decorate([
    core_1.Input()
], PizzaDetailsComponent.prototype, "updateHandler", void 0);
__decorate([
    core_1.Input()
], PizzaDetailsComponent.prototype, "deleteHandler", void 0);
PizzaDetailsComponent = __decorate([
    core_1.Component({
        selector: 'pizza-details',
        templateUrl: './pizza-details.component.html',
        styleUrls: ['./pizza-details.component.css']
    })
], PizzaDetailsComponent);
exports.PizzaDetailsComponent = PizzaDetailsComponent;
