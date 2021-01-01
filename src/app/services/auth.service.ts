import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: firebase.default.auth.UserCredential;

  $currentUser: firebase.default.User;

  authErrors = new BehaviorSubject<string>('');

  $authErrors = this.authErrors.asObservable();

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getUserState() {
    return this.angularFireAuth.authState;
  }

  signUpNewUser(name, email, password) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        this.user = userCred;
        this.$currentUser = userCred.user;
        userCred.user.updateProfile({
          displayName: name,
        });

        this.saveUsertoDatabase(userCred, name, email).then((data) => {
          this.snackBar.open(
            'Your account was successfully created and Logged In',
            'Dismiss',
            {
              duration: 5000,
            }
          );
        });
      })
      .catch((error) => {
        this.authErrors.next(error);
      });
  }

  saveUsertoDatabase(
    userCred: firebase.default.auth.UserCredential,
    name: string,
    email: string
  ) {
    return this.angularFirestore.doc(`users/${userCred.user.uid}`).set({
      name,
      email,
      uid: userCred.user.uid,
    });
  }

  login(email, password) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCred) => {
        this.$currentUser = userCred.user;
        this.snackBar.open('Login successful', 'Dismiss', {
          duration: 5000,
        });
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.authErrors.next(error);
      });
  }

  logout() {
    return this.angularFireAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
