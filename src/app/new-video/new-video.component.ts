import { take } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { DailogBoxComponent } from './../dailog-box/dailog-box.component';
import { CreateNewVideoService } from './../services/create-new-video.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-video',
  templateUrl: './new-video.component.html',
  styleUrls: ['./new-video.component.scss'],
})
export class NewVideoComponent implements OnInit {
  theFile: File;
  theFileName: string;
  theDownloadURI: string = '';
  currentUser: firebase.default.User;
  loading: boolean;

  newVideoForm: FormGroup;

  constructor(
    private newVideo: CreateNewVideoService,
    private dailog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.newVideoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      subTitle: ['', [Validators.required, Validators.minLength(10)]],
      uri: '',
    });

    this.authService.getUserState().subscribe((user) => {
      this.currentUser = user;
    });

    this.loading = false;
  }

  get name() {
    return this.newVideoForm.get('name');
  }

  get subTitle() {
    return this.newVideoForm.get('subTitle');
  }

  get uri() {
    return this.newVideoForm.get('uri');
  }

  checkFile(event) {
    this.loading = true;
    this.theFile = event.target.files[0];
    if (this.theFile) {
      this.theFileName = this.theFile.name;
      this.upload();
    }
  }

  upload() {
    this.newVideo
      .uploadNewFile(this.theFile.name, this.theFile)
      .then((data) => {
        data.task.snapshot.ref.getDownloadURL().then((downUrl) => {
          this.theDownloadURI = downUrl;

          this.uri.setValue(this.theDownloadURI);
          this.uri.disable();
          this.loading = false;
        });
      });
  }

  cancel() {
    const dailogBox = this.dailog.open(DailogBoxComponent, {
      data: {
        title: 'Cancel?',
        message: 'Are you sure that you wish to cancel?',
      },
    });

    dailogBox
      .afterClosed()
      .pipe(take(1))
      .subscribe((ans) => {
        if (ans === 'true') this.router.navigate(['/']);
      });
  }

  uploadVideoFile() {
    let name = this.name.value;
    let subTitle = this.subTitle.value;
    let uri = this.uri.value;
    let uploadedBy = this.currentUser.uid;

    this.newVideo
      .saveVideoDetails(name, subTitle, uri, uploadedBy)
      .then(() => {
        this.snackBar.open('The Video was success fully uploaded', 'Dismiss', {
          duration: 5000,
        });
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.snackBar.open('The Video was success fully uploaded', 'Dismiss', {
          duration: 5000,
        });
      });
  }
}
