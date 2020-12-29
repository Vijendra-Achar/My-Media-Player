import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private videoURI = new BehaviorSubject<string>('');

  $videoURI = this.videoURI.asObservable();

  // newVideoURI = `//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd`;
  newVideoURI = `https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8`;

  constructor() {}

  playVideo(currentVideoURI: string) {
    this.videoURI.next(currentVideoURI);
  }
}
