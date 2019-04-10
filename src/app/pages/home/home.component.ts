import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { services } from 'src/app/app-navigation';
import { LoginService } from 'src/Services/LoginService/LoginService';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
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
  constructor(public loginService: LoginService, public router: Router) {
    this.defaultVisible = false;

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
    this.router.navigate(["/astamangala"]);
  }
  OnNumerology_Click() {
    this.router.navigate(["/numerology"]);
  }
  OnPanchanga_Click() {
    this.router.navigate(["/panchanga"]);
  }
  OnWalletDeposit_Click() {
    if (StorageService.GetItem('Token') != undefined) {
      this.router.navigate(['/wallet/depoToWallet']);
    }
    else {
      this.loginService.path = '/wallet/depoToWallet';
      this.router.navigate(['/login-form']);
    }
  }

  OnReadMore_click(value) {
    switch (value) {
      case "Astamangala":
        this.contentFullAstamangala = true;
        break;
      case "Horoscope":
        this.contentFullHoroscope = true;
        break;
      case "MatchMaking":
        this.contentFullMatchMaking = true;
        break;
      case "Muhurtha":
        this.contentFullMuhurtha = true;
        break;
      case "Panchanga":
        this.contentFullPanchanga = true;
        break;
      case "Numerology":
        this.contentFullNumerology = true;
        break;
        case "PanchaPakshi":
        this.contentFullPanchaPakshi= true;
        break;
      case "HanumanJyothisha":
        this.contentFullHanumanJyothisha = true;
        break;
        case "ShraddhaMaasika":
        this.contentFullShraddhaMaasika = true;
        break;
      case "Wallet":
        this.contentFullWallet = true;
        break;
      default: break;
    }

  }
  OnReadLess_click(value) {
    switch (value) {
      case "Astamangala":
        this.contentFullAstamangala = false;
        break;
      case "Horoscope":
        this.contentFullHoroscope = false;
        break;
      case "MatchMaking":
        this.contentFullMatchMaking = false;
        break;
      case "Muhurtha":
        this.contentFullMuhurtha = false;
        break;
      case "Panchanga":
        this.contentFullPanchanga = false;
        break;
      case "Numerology":
        this.contentFullNumerology = false;
        break;
        case "PanchaPakshi":
        this.contentFullPanchaPakshi= false;
        break;
      case "HanumanJyothisha":
        this.contentFullHanumanJyothisha = false;
        break;
        case "ShraddhaMaasika":
        this.contentFullShraddhaMaasika = false;
        break;
      case "Wallet":
        this.contentFullWallet = false;
        break;
      default: break;
    }
  }
}
