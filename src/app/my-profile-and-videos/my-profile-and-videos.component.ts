import { MatSnackBar } from '@angular/material/snack-bar';
import { GetVideo } from './../services/getVideo.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { GetVideosService } from './../services/get-videos.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';

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
export class MyProfileAndVideosComponent implements OnInit, OnDestroy {
  user: firebase.default.User;

  videoData: any;

  displayedColumns: string[] = ['no', 'name', 'id', 'delete'];

  userStateSub: Subscription;
  getVidDataSub: Subscription;

  constructor(
    private authService: AuthService,
    private getVideos: GetVideosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userStateSub = this.authService.getUserState().subscribe((user) => {
      this.user = user;
      this.getVideosOfLoggedInUser();
    });
  }

  delete(videoId) {
    this.getVideos.deleteVideo(videoId).then(() => {
      this.snackBar.open('Video Deleted', 'Dismiss', {
        duration: 3000,
      });
    });
  }

  getVideosOfLoggedInUser() {
    this.getVidDataSub = this.getVideos
      .getVideosForCurrentUser(this.user.uid)
      .subscribe((vidData) => {
        this.videoData = vidData;
      });
  }

  ngOnDestroy() {
    this.getVidDataSub.unsubscribe();
    this.userStateSub.unsubscribe();
  }
}
