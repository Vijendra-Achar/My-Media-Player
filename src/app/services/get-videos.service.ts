import { GetVideo } from './getVideo.model';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetVideosService {
  constructor(private angularFirestore: AngularFirestore) {}

  getAllVideos() {
    return this.angularFirestore.collection('theVideoURIs').valueChanges();
  }

  getVideosForCurrentUser(currentUserId: string) {
    let getVideosCollection = this.angularFirestore.collection<GetVideo[]>(
      'theVideoURIs',
      (ref) => ref.where('uploadedBy', '==', currentUserId)
    );

    return getVideosCollection.snapshotChanges().pipe(
      map((videos) => {
        if (videos) {
          const availableVideos = videos.map((vids) => {
            const data = vids.payload.doc.data();
            const id = vids.payload.doc.id;
            return { id, data };
          });
          return availableVideos;
        }
      })
    );
  }

  deleteVideo(videoId: string) {
    return this.angularFirestore
      .collection('theVideoURIs')
      .doc(videoId)
      .delete();
  }
}
