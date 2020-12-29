import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private videoURI = new BehaviorSubject<string>('');

  $videoURI = this.videoURI.asObservable();

  constructor() {}

  playVideo(currentVideoURI: string) {
    this.videoURI.next(currentVideoURI);
  }
}
