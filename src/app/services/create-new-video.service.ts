import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class CreateNewVideoService {
  constructor(
    private angularFireStorage: AngularFireStorage,
    private angularFirestore: AngularFirestore
  ) {}

  uploadNewFile(name, file) {
    return this.angularFireStorage.storage
      .ref()
      .child(`${Date.now()}-${name}`)
      .put(file);
  }

  saveVideoDetails(name, subTitle, uri, uploadedBy) {
    return this.angularFirestore
      .collection('theVideoURIs')
      .add({ name, subTitle, uri, uploadedBy });
  }
}
