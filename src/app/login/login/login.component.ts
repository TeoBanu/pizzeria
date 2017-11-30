import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UserService,
      private router: Router) { }

  ngOnInit() {
  }

  login(user: User) {
    this.userService.login(user).then((loggedInUser: User) => {
      this.router.navigate(['/']);
    });
  }

}
