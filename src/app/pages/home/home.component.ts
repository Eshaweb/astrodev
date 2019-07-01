import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { services } from 'src/app/app-navigation';
import { LoginService } from 'src/Services/LoginService/LoginService';
let webimages: string[] = [
  "assets/images/morefund_web.jpg",
  "assets/images/traditional.jpg"];
  let mobileimages: string[] = [
    "assets/images/morefund_mobile.jpg",
    "assets/images/traditional_mobile.jpg"];
@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  slideshowDelay = 5000;
  items: { Id: number; Text: string; }[];
  defaultVisible: boolean;
  menuItems: { text: string; path: string; }[];
  showSubmenuModes: any;
  showFirstSubmenuModes: any;
  serviceList: any;
  contentFullAstamangala: boolean;
  contentFullHoroscope: boolean;
  contentFullMatchMaking: boolean;
  contentFullMuhurtha: boolean;
  contentFullPanchanga: boolean;
  contentFullNumerology: boolean;
  contentFullHanumanJyothisha: boolean;
  contentFullWallet: boolean;
  contentFullShraddhaMaasika: boolean;
  contentFullPanchaPakshi: boolean;
  dataSource: string[];
  height: number;
  constructor(public loginService: LoginService, public router: Router) {
    this.defaultVisible = false;
    // this.dataSource =  webimages;
    if (window.innerWidth < 900) {
      this.dataSource =  mobileimages;
      this.height = 130;
    }
    else{
      this.dataSource =  webimages;
      this.height = 350;
    }
    // history.pushState(null, null, location.href);
    // window.onpopstate = function () {       
    //   if (window.location.pathname == '/services') { 
    //     history.go(1);
    //   }
    // };
    //   window.onpopstate= (response) => {
    //     if (window.location.pathname == '/home') {
    //       history.pushState(null, null, "/home");

    //     }
    // }
    if (window.location.pathname == '/home') {
      this.loginService.isHomePage = true;
    }
    this.showSubmenuModes = [{
      name: "onHover",
      delay: { show: 0, hide: 500 }
    }, {
      name: "onClick",
      delay: { show: 0, hide: 300 }
    }];
    this.showFirstSubmenuModes = this.showSubmenuModes[0];
    this.menuItems = services;
    
  }
  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
  }
  OnServiceClick(path) {
    this.router.navigate([path]);
    // if (path == '/home') {
    //   this.loginService.isHomePage=true;
    //  }
    //  else{
    //   this.loginService.isHomePage=false;
    //  }
  }
  OnHoroScope_Click() {
    this.router.navigate(["/horoscope"]);
  }
  OnMatchMaking_Click() {
    this.router.navigate(["/matchMaking"]);
  }
  OnAstamangala_Click() {
    this.router.navigate(["/ashtamangala"]);
  }
  OnMuhurtha_Click(){
    this.router.navigate(["/muhurtha"]);
  }
  OnNumerology_Click() {
    this.router.navigate(["/numerology"]);
  }
  OnBabyNaming_Click() {
    this.router.navigate(["/babyNaming"]);
  }
  OnPrathamartava_Click(){
    this.router.navigate(["/prathamartava"]);
  }
  OnKaalidrushti_Click(){
    this.router.navigate(["/kaalidrushti"]);
  }
  OnPanchanga_Click() {
    this.router.navigate(["/panchanga"]);
  }
  OnComingSoon_Click(){
    this.router.navigate(["/staticpages/comingsoon"]);
  }
  onItemClick(event) {
    if (event.itemIndex == 0) {
      if (StorageService.GetItem('refreshToken') != undefined) {
        this.router.navigate(['/wallet/depoToWallet']);
      }
      else {
        this.loginService.path = '/wallet/depoToWallet';
        this.router.navigate(['/login-form']);
      }
    }
    else if (event.itemIndex == 1) {
        this.router.navigate(['/horoscope']);
    }
  }

  OnWindowsProduct_Click(){
    this.router.navigate(['/products']);
  }

  OnAndroidProduct_Click(){
    this.router.navigate(['/products']);
  }
}
