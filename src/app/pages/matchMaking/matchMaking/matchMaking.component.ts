import { Component } from '@angular/core';


@Component({
    templateUrl: './matchMaking.component.html',
    styleUrls: [ './matchMaking.component.css' ]
  })
  
  export class MatchMakingComponent {
    items: { Id: number; Text: string; }[];
    constructor() {
      this.items=[{Id:0,Text:'Raju'},{Id:1,Text:'Raju'}];
    }
  }