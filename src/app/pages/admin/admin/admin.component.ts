import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'admin.component.html',
  styleUrls: [ './admin.component.scss' ]
})

export class AdminComponent {
  adminMenu: any;
  defaultVisible: boolean;
  constructor(public router: Router) {
    this.defaultVisible = false;
    this.adminMenu=[{Path:'/admin/basePrice',Name:'Base Price'},
    {Path:'/admin/masterDetail',Name:'Price List'},
    {Path:'/admin/assignPriceList',Name:'Assign Price List'},
    {Path:'/admin/welcomeOffer',Name:'Welcome Offer'},
    {Path:'/admin/promoCode',Name:'Promo Codes'},
    {Path:'/admin/pendingtoDelivery',Name:'Pending To Delivery'}];  
  }
  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
}
onItemClick(event){
  this.router.navigate([event.itemData.Path]);
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
