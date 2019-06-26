import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval, Observable, timer } from 'rxjs';

@Injectable()
export class UpdateService {
  constructor(private swUpdate: SwUpdate) {
    // this.swUpdate.available.subscribe(evt => {
    //   alert('Update Available');
    // });
    if (swUpdate.isEnabled) {
      interval(20000).subscribe(() => swUpdate.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }
  }
  public checkForUpdates(): void {
    this.swUpdate.available.subscribe(event => this.promptUser());
  }

  private promptUser(): void {
    console.log('updating to new version');
    this.swUpdate.activateUpdate().then(() => document.location.reload()); 
  }
}