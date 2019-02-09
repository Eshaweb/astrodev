import { Component } from '@angular/core';


@Component({
    selector: 'app-astamangala-free-data',
    templateUrl: './astamangala-free-data.component.html',
    styleUrls: [ './astamangala-free-data.component.css' ]
  })
  
  export class AstamangalaFreeDataComponent {
    items: { Id: number; Text: string; }[];
    constructor() {
      this.items=[{Id:0,Text:'Raju'},{Id:1,Text:'Raju'}];
    }
  }