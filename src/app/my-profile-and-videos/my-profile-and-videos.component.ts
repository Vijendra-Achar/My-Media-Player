import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { GetVideosService } from './../services/get-videos.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DailogBoxComponent } from './../dailog-box/dailog-box.component';

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
    private snackBar: MatSnackBar,
    private dailog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userStateSub = this.authService.getUserState().subscribe((user) => {
      this.user = user;
      this.getVideosOfLoggedInUser();
    });
  }

  delete(videoId) {
    const dailogBox = this.dailog.open(DailogBoxComponent, {
      data: {
        title: 'Delete?',
        message: 'Are you sure that you want delete this video?',
      },
    });

    dailogBox
      .afterClosed()
      .pipe(take(1))
      .subscribe((ans) => {
        if (ans === 'true') {
          this.getVideos.deleteVideo(videoId).then(() => {
            this.snackBar.open('Video Deleted', 'Dismiss', {
              duration: 3000,
            });
          });
        }
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
