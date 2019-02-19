import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'settings.component.html',
  styleUrls: [ './settings.component.scss' ]
})

export class SettingsComponent {
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
  OnOrderHistory_Click() {
    this.router.navigate(["/settings/orderHistory"]);
  }
  OnNumerology_Click() {
    this.router.navigate(["/numerology"]);
  }
  OnPanchanga_Click() {
    this.router.navigate(["/panchanga"]);
  }
  OnChangePassword_Click(){
    this.router.navigate(["/settings/changePassword"]);
  }
}
