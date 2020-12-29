import { VideoService } from './../services/video.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private video: VideoService) {}

  ngOnInit(): void {}

  playMe() {
    this.video.playVideo(
      `https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8`
    );
  }
}
