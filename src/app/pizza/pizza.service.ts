import {Injectable} from '@angular/core';
import {Pizza} from './pizza';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PizzaService {
    private pizzasUrl = 'http://localhost:8080/api/pizza';

    constructor(private http: Http) {
    }

    getPizzas(): Promise< void | Pizza[]> {
        return this.http.get(this.pizzasUrl)
        .toPromise()
        .then(response => response.json() as Pizza[])
        .catch(this.handleError);
    }

    getPizza(id: String): Promise<void | Pizza> {
        return this.http.get(this.pizzasUrl + '/' + id)
        .toPromise()
        .then(response => response.json() as Pizza)
        .catch(this.handleError);
    }

    createPizza(newPizza: Pizza): Promise<void|Pizza> {
        return this.http.post(this.pizzasUrl, newPizza)
        .toPromise()
        .then(response => response.json() as Pizza)
        .catch(this.handleError);
    }

    updatePizza(updatedPizza: Pizza): Promise<void | Pizza> {
        return this.http.put(this.pizzasUrl + '/' + updatedPizza._id, updatedPizza)
            .toPromise()
            .then(response => response.json() as Pizza)
            .catch(this.handleError);
    }

    deletePizza(id: String): Promise<void | Pizza> {
        return this.http.delete(this.pizzasUrl + '/' + id)
            .toPromise()
            .then(response => response.json() as Pizza)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
    }
}
