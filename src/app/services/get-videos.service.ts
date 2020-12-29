import { Video } from './video.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetVideosService {
  constructor() {}

  private allVideos = new BehaviorSubject<Array<Video>>([
    {
      name: 'Star Wars',
      subTitle: 'Space ship flying around',
      uri: '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
    },
    {
      name: 'Business Ad',
      subTitle: 'Just Technical Stuff',
      uri:
        'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8',
    },
  ]);

  getAllVides = this.allVideos.asObservable();
}
