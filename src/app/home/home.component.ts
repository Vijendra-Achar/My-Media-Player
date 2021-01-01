import { Video } from './../services/video.model';
import { GetVideosService } from './../services/get-videos.service';
import { VideoService } from './../services/video.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allVideos: Array<Video>;

  isPlaying: boolean = false;

  constructor(
    private video: VideoService,
    private getVideos: GetVideosService
  ) {}

  ngOnInit(): void {
    this.getVideos.getAllVideos().subscribe((videos: Array<Video>) => {
      this.allVideos = videos;
    });
  }

  playMe(theVideoId: string) {
    this.video.playVideo(theVideoId);
    this.isPlaying = true;
  }
}
