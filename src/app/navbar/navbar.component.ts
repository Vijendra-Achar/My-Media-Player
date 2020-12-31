import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: firebase.default.User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserState().subscribe((data) => {
      this.user = data;
    });
  }

  logout() {
    this.authService.logout();
  }
}
