import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile-and-videos',
  templateUrl: './my-profile-and-videos.component.html',
  styleUrls: ['./my-profile-and-videos.component.scss'],
})
export class MyProfileAndVideosComponent implements OnInit {
  user: firebase.default.User;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserState().subscribe((user) => {
      this.user = user;
    });
  }
}
