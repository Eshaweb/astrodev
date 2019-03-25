import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { OrderService } from 'src/Services/OrderService/OrderService';

@Component({
  templateUrl: 'settings.component.html',
  styleUrls: [ './settings.component.scss' ]
})

export class SettingsComponent {
  items: { Id: number; Text: string; }[];
  defaultVisible: boolean;
  settingsMenu:any;
  constructor(public orderService:OrderService,public horoScopeService:HoroScopeService,public storageService:StorageService,public router: Router) {
    this.defaultVisible = false;
    this.items=[{Id:0,Text:'Raju'},{Id:1,Text:'Raju'}];
    this.settingsMenu=[{Path:'/settings/orderHistory',Name:'Order History'},
    {Path:'/settings/generalConfig',Name:'General Configuration'},
    {Path:'/settings/muhurthaConfig',Name:'Muhurtha Configuration'},
    {Path:'/settings/changePassword',Name:'Change Password'},
    {Path:'/settings/walletStatement',Name:'Wallet Statement'}];
    storageService.RemoveDataFromSession();
    this.horoScopeService.birthplace='';
    this.orderService.orderResponse=null;
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
  OnWalletStatement_Click(){
    this.router.navigate(["/settings/walletStatement"]);
  }
}
