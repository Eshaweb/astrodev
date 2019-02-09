import { Component } from '@angular/core';


@Component({
    selector: 'app-matchMaking-free-data',
    templateUrl: './matchMaking-free-data.component.html',
    styleUrls: [ './matchMaking-free-data.component.css' ]
  })
  
  export class MatchMakingFreeDataComponent {
    items: { Id: number; Text: string; }[];
    constructor() {
      this.items=[{Id:0,Text:'Raju'},{Id:1,Text:'Raju'}];
    }
  }