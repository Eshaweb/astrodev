import { Component } from '@angular/core';


@Component({
    templateUrl: './astamangala.component.html',
    styleUrls: [ './astamangala.component.css' ]
  })
  
  export class AstamangalaComponent {
    items: { Id: number; Text: string; }[];
    constructor() {
      this.items=[{Id:0,Text:'Raju'},{Id:1,Text:'Raju'}];
    }
  }
  