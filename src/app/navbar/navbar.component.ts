import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DailogBoxComponent } from './../dailog-box/dailog-box.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: firebase.default.User;

  constructor(private authService: AuthService, private dailog: MatDialog) {}

  ngOnInit(): void {
    this.authService.getUserState().subscribe((data) => {
      this.user = data;
    });
  }

  logout() {
    const dailogBox = this.dailog.open(DailogBoxComponent, {
      data: {
        title: 'Logout?',
        message: 'Are you sure that you want logout?',
      },
    });

    dailogBox
      .afterClosed()
      .pipe(take(1))
      .subscribe((ans) => {
        if (ans === 'true') this.authService.logout();
      });
  }
}
