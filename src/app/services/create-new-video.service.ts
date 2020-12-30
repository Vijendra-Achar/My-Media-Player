import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class CreateNewVideoService {
  constructor(private angularFireStorage: AngularFireStorage) {}

  uploadNewFile(name, file) {
    return this.angularFireStorage.storage
      .ref()
      .child(`${Date.now()}-${name}`)
      .put(file);
  }
}
