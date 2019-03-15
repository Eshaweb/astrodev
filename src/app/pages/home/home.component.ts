import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/login/login.service';
import { services } from 'src/app/app-navigation';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  items: { Id: number; Text: string; }[];
  defaultVisible: boolean;
  menuItems: { text: string; path: string; }[];
  showSubmenuModes: { name: string; delay: { show: number; hide: number; }; }[];
  showFirstSubmenuModes: { name: string; delay: { show: number; hide: number; }; };
  constructor(public loginService:LoginService,public router: Router) {
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

  this.showSubmenuModes = [{
    name: "onHover",
    delay: { show: 0, hide: 500 }
  }, {
    name: "onClick",
    delay: { show: 0, hide: 300 }
  }];
  this.showFirstSubmenuModes = this.showSubmenuModes[0];
  this.menuItems=services;
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
  OnWalletDeposit_Click(){
    if (StorageService.GetItem('Token') != undefined) {
      this.router.navigate(['/wallet/depoToWallet']);
    }
    else {
      this.loginService.path = '/wallet/depoToWallet';
      this.router.navigate(['/login-form']);
    }
  }
}
