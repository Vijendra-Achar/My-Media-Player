import { Subject, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetVideosService {
  private $videos = new BehaviorSubject<Array<any>>([]);

  queryObs = this.$videos.asObservable();

  queriedVids: Array<any> = [];

  constructor(private angularFirestore: AngularFirestore) {}

  getAllVideos() {
    return this.angularFirestore.collection('theVideoURIs').valueChanges();
  }

  getVideosForCurrentUser(currentUserId: string) {
    this.angularFirestore
      .collection('theVideoURIs')
      .ref.where('uploadedBy', '==', currentUserId)
      .get()
      .then((query) => {
        query.forEach((video) => {
          this.queriedVids.push({ id: video.id, data: video.data() });
        });
        this.$videos.next(this.queriedVids);
      });
  }

  deleteVideo(videoId: string) {
    return this.angularFirestore
      .collection('theVideoURIs')
      .doc(videoId)
      .delete();
  }
}
