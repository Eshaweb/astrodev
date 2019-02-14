import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  items: { Id: number; Text: string; }[];
  defaultVisible: boolean;
  constructor(public router: Router) {
    this.defaultVisible = false;
    this.items=[{Id:0,Text:'Raju'},{Id:1,Text:'Raju'}];
  }
  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
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
  OnNumerology_Click() {
    this.router.navigate(["/numerology"]);
  }
  OnPanchanga_Click() {
    this.router.navigate(["/panchanga"]);
  }
}
