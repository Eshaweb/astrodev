import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'admin.component.html',
  styleUrls: [ './admin.component.scss' ]
})

export class AdminComponent {
  items: { Id: number; Text: string; }[];
  defaultVisible: boolean;
  constructor(public router: Router) {
    this.defaultVisible = false;
    this.items=[{Id:0,Text:'Raju'},{Id:1,Text:'Raju'}];
  }
  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
}
 
  OnBasePrice_Click() {
    this.router.navigate(["/admin/basePrice"]);
  }
  OnPriceList_Click(){
    this.router.navigate(["/admin/masterDetail"]);
  }
  OnAssignPriceList_Click(){
    this.router.navigate(["/admin/assignPriceList"]);
  }
  OnWelcomeOffer_Click(){
    this.router.navigate(["/admin/welcomeOffer"]);
  }
  OnPromoCodes_Click(){
    this.router.navigate(["/admin/promoCode"]);
  }
}
