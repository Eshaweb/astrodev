import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'settings.component.html',
  styleUrls: [ './settings.component.scss' ]
})

export class SettingsComponent {
  items: { Id: number; Text: string; }[];
  defaultVisible: boolean;
  settingsMenu:any;
  constructor(public router: Router) {
    this.defaultVisible = false;
    this.items=[{Id:0,Text:'Raju'},{Id:1,Text:'Raju'}];
    this.settingsMenu=[{Path:'/settings/orderHistory',Name:'Order History'},
    {Path:'/settings/generalConfig',Name:'General Configuration'},
    {Path:'/settings/muhurthaConfig',Name:'Muhurtha Configuration'},
    {Path:'/settings/changePassword',Name:'Change Password'}];
  }
  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
  }
  onItemClick(event){
    this.router.navigate([event.itemData.Path]);
  }
  OnGeneralConfig_Click() {
    this.router.navigate(["/settings/generalConfig"]);
  }
  OnMuhurthaConfig_Click() {
    this.router.navigate(["/settings/muhurthaConfig"]);
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
