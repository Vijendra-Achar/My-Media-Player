import { VideoService } from './../services/video.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var shaka: any;

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  // Properties
  videoURI: string;
  $videoSub: Subscription;

  theErrorSnackBar: any;

  constructor(private video: VideoService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.$videoSub = this.video.$videoURI.subscribe((uri) => {
      this.videoURI = uri;
      if (uri) {
        this.initApp();
        if (this.theErrorSnackBar) this.theErrorSnackBar.dismiss();
      }
    });
  }

  initApp() {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }

  initPlayer() {
    // Create a Player instance.
    const video = document.getElementById('video');
    const player = new shaka.Player(video);

    // Listen for error events.
    player.addEventListener('error', this.onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(this.videoURI)
      .then(function () {
        // This runs if the asynchronous load is successful.
        console.log('The video has now been loaded!');
      })
      .catch((error) => {
        // this.onError(error);
        this.theErrorSnackBar = this.snackBar.open(
          'The Video Could not be played',
          'Dismiss'
        );
      }); // onError is executed if the asynchronous load fails.
  }

  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }

  ngOnDestroy() {
    this.$videoSub.unsubscribe();
  }
}
