import { GetVideosService } from './../services/get-videos.service';
import { VideoService } from './../services/video.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allVideos: Array<string>;

  constructor(
    private video: VideoService,
    private getVideos: GetVideosService
  ) {}

  ngOnInit(): void {
    this.getVideos.getAllVides.subscribe((videos) => {
      this.allVideos = videos;
    });
  }

  playMe(theVideoId: string) {
    this.video.playVideo(theVideoId);
  }
}
