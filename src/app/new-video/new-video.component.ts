import { DailogBoxComponent } from './../dailog-box/dailog-box.component';
import { CreateNewVideoService } from './../services/create-new-video.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-video',
  templateUrl: './new-video.component.html',
  styleUrls: ['./new-video.component.scss'],
})
export class NewVideoComponent implements OnInit {
  theFile: File;
  theFileName: string;

  loading: boolean;

  newVideoForm: FormGroup;

  constructor(
    private newVideo: CreateNewVideoService,
    private dailog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newVideoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      subTitle: ['', [Validators.required, Validators.minLength(10)]],
      uri: '',
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
          this.loading = false;
        });
      });
  }

  cancel() {
    this.dailog.open(DailogBoxComponent);
  }

  uploadVideoFile() {
    console.log(this.newVideoForm.value);
  }
}
