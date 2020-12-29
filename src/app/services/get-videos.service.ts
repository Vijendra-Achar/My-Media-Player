import { AngularFirestore } from '@angular/fire/firestore';
import { Video } from './video.model';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetVideosService {
  private allVideos: Array<Video>;

  constructor(private afs: AngularFirestore) {}

  getAllVideos() {
    return this.afs.collection('theVideoURIs').valueChanges();
  }
}
