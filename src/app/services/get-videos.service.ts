import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetVideosService {
  constructor() {}

  private allVideos = new BehaviorSubject<Array<string>>([
    '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
    'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8',
  ]);

  getAllVides = this.allVideos.asObservable();
}
