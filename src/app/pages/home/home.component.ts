import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  items: { Id: number; Text: string; }[];
  constructor(public router: Router) {
    this.items=[{Id:0,Text:'Raju'},{Id:1,Text:'Raju'}];
  }

  OnHoroScope_Click() {
    this.router.navigate(["/horoscope"]);
  }
  OnMatchMaking_Click() {
    this.router.navigate(["/matchMaking"]);
  }
  OnAstamangala_Click() {
    this.router.navigate(["/astamangala"]);
  }
}
