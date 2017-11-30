import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [UserService]
})
export class RegisterComponent implements OnInit {
    user: User = new User();

    constructor(
        private userService: UserService,
        private router: Router) {
    }

    ngOnInit() {
    }

    createUser(user: User) {
        this.userService.createUser(user).then((newUser: User) => {
            this.router.navigate(['/login']);
        });
    }

}