import { AngularFirestore } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetVideosService {
  constructor(private afs: AngularFirestore) {}

  getAllVideos() {
    return this.afs.collection('theVideoURIs').valueChanges();
  }
}
