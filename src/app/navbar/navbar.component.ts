import {Component, OnInit} from '@angular/core';
import {UserService} from '../login/user.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(public userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.isLoggedIn().subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      }
    );
    this.userService.isAdmin().subscribe(
      (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    );
  }

  logout() {
    this.userService.logout();
  }

}
