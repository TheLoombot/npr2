import { Component } from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'npr2';
  player: Plyr;
  offset = 0;
  hostname = 'http://loomba.kozow.com:8001/test';
  playerOptions = { controls: ['play','volume'] };
  seekValue = 15; // seconds to seek back/fwd by

  audioSources = [
    {
      src: this.hostname,
      type: 'audio/mp3',
    }
  ];

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
    console.log(this.audioSources);
  }

  playLive(): void {
    this.offset = 0;
    this.setAudioSource();
  }

  playTop(): void {
    this.offset = this.calcOffset();
    this.setAudioSource();
  }

  ready(): void {
    this.player.play();
  }

  calcOffset(): number {
    var now = new Date();
    return now.getMinutes()*60 + now.getSeconds() - 30; // fudge bc the player is delayed anyway
  }

  atTop(): boolean {
    if (this.calcOffset() <= this.offset + 2) return true; // disabled
    else {
      return false; // enabled
    }
  }

  isLive(): boolean {
    if (this.offset <= 0 && this.isPlaying()) return true;
    else return false;
  }

  isPlaying(): boolean {
    return this.player?.playing || false;
  }

  rewind(): void {
    this.offset = Math.min(this.calcOffset(), this.offset+this.seekValue);
    // this.offset = this.offset+this.seekValue;
    this.setAudioSource();
  }

  setAudioSource() {
    this.audioSources = [
      {
        src: this.hostname + '?offset=' + this.offset,
        type: 'audio/mp3',
      }
    ];
  }

  forward(): void{
    this.offset = Math.max(this.offset-this.seekValue, 0);
    // if (this.offset <= 0) {
    //   this.offset = 0;
    // } else{
    //   this.offset = this.offset-15;
    // }
    this.setAudioSource();
  }

}
