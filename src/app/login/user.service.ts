import {Injectable} from '@angular/core';
import {User} from './user';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private usersUrl = 'http://localhost:8080/api/users';

    constructor(private http: Http) {
    }

    getUser(id: String): Promise<void | User> {
        return this.http.get(this.usersUrl + '/' + id)
        .toPromise()
        .then(response => response.json() as User)
        .catch(this.handleError);
    }

    createUser(newUser: User): Promise<void | User> {
        return this.http.post(this.usersUrl, newUser)
        .toPromise()
        .then(response => response.json() as User)
        .catch(this.handleError);
    }

    updateUser(updatedUser: User): Promise<void | User> {
        return this.http.put(this.usersUrl + '/' + updatedUser._id, updatedUser)
            .toPromise()
            .then(response => response.json() as User)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
    }
}
