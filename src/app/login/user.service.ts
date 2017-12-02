import {Injectable} from "@angular/core";
import {User} from "./user";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class UserService {
    private usersUrl = 'http://localhost:8080/api/users';
    private loginUrl = 'http://localhost:8080/api/login';

    isLoggedInSubject = new BehaviorSubject<Boolean>(this.hasUserId());
    isAdminSubject = new BehaviorSubject<Boolean>(false);

    constructor(private http: Http) {
      let id = localStorage.getItem('id');
      if(id) {
          this.getUser(id).then((user: User) => this.isAdminSubject.next(user.isAdmin));
      }
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

    login(user: User): Promise<void | User> {
        return this.http.post(this.loginUrl, user)
        .toPromise()
        .then(response => {
            let usr: User = response.json() as User;
            localStorage.setItem('id', usr._id);
            this.isLoggedInSubject.next(true);
            this.isAdminSubject.next(usr.isAdmin);
            return usr;
        })
        .catch(this.handleError);
    }

    logout() {
        localStorage.removeItem('id');
        this.isLoggedInSubject.next(false);
        this.isAdminSubject.next(false);
    }

    isLoggedIn(): Observable<boolean> {
        return this.isLoggedInSubject.asObservable();
    }

    isAdmin(): Observable<boolean> {
        return this.isAdminSubject.asObservable();
    }

    private hasUserId(): boolean {
        return !!localStorage.getItem('id');
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
    }
}
