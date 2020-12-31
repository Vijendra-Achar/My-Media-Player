import { Router } from '@angular/router';
import { GetVideosService } from './../services/get-videos.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

export interface MyVideo {
  id: string;
  data: {
    name: string;
    subTitle: string;
    uploadedBy: string;
    uri: string;
  };
}

@Component({
  selector: 'app-my-profile-and-videos',
  templateUrl: './my-profile-and-videos.component.html',
  styleUrls: ['./my-profile-and-videos.component.scss'],
})
export class MyProfileAndVideosComponent implements OnInit {
  user: firebase.default.User;

  videoData: Array<any> = [];

  displayedColumns: string[] = ['no', 'name', 'id', 'delete'];

  constructor(
    private authService: AuthService,
    private getVideos: GetVideosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserState().subscribe((user) => {
      this.user = user;
      this.getVideos.getVideosForCurrentUser(this.user.uid);
    });

    this.getVideos.queryObs.subscribe((data) => {
      this.videoData = data;
    });
  }

  delete(videoId) {
    this.getVideos.deleteVideo(videoId).then(() => {
      location.reload();
    });
  }
}
