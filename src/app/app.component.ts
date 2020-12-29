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

  audioSources = [
    {
      src: 'http://loomba.kozow.com:8001',
      type: 'audio/mp3',
    }
  ];

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
    console.log(this.audioSources);
  }

  playLive(): void {
    this.offset = 0;
    this.audioSources = [
      {
        src: 'http://loomba.kozow.com:8001',
        type: 'audio/mp3',
      }
    ];
  }

  playTop(): void {
    this.offset = new Date().getMinutes()*60 + new Date().getSeconds() - 30; // 60s fudge bc the player is delayed anyway
    this.audioSources = [
      {
        src: 'http://loomba.kozow.com:8001/test?offset='+this.offset,
        type: 'audio/mp3',
      }
    ];
  }

  ready(): void {
    this.player.play();
  }

}
