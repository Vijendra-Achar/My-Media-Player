import { DailogBoxComponent } from './../dailog-box/dailog-box.component';
import { CreateNewVideoService } from './../services/create-new-video.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-video',
  templateUrl: './new-video.component.html',
  styleUrls: ['./new-video.component.scss'],
})
export class NewVideoComponent implements OnInit {
  theFile: File;
  theFileName: string;

  constructor(
    private newVideo: CreateNewVideoService,
    private dailog: MatDialog
  ) {}

  ngOnInit(): void {}

  checkFile(event) {
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
          console.log(downUrl);
        });
      });
  }

  cancel() {
    this.dailog.open(DailogBoxComponent);
  }
}
