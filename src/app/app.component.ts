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

  audioSources = [
    {
      src: 'http://localhost:8001',
      type: 'audio/mp3',
    }
  ];

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
    console.log(this.audioSources);

  }

  playLive(): void {
    this.audioSources = [
      {
        src: 'http://localhost:8001',
        type: 'audio/mp3',
      }
    ];
  }

  playTop(): void {
    var offset = new Date().getMinutes()*60 + new Date().getSeconds();
    this.audioSources = [
      {
        src: 'http://localhost:8001/test?offset='+offset,
        type: 'audio/mp3',
      }
    ];
  }

  ready(): void {
    this.player.play();
  }

}
