import { Component } from '@angular/core';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  items: { Id: number; Text: string; }[];
  constructor() {
    this.items=[{Id:0,Text:'Raju'},{Id:1,Text:'Raju'}];
  }
}
