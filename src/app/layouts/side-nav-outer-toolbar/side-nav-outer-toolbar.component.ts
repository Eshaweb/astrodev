import { Component, OnInit, NgModule, Input } from '@angular/core';
import { SideNavigationMenuModule, HeaderModule, } from '../../shared/components';
import { ScreenService } from '../../shared/services';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { CommonModule } from '@angular/common';

import { Router, NavigationEnd } from '@angular/router';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/login/login.service';
// import { navigation } from 'src/app/app-navigation';
import { navigationAfterLogin, navigationBeforeLogin, navigationAfterLoginForSystem, navigationBeforeLoginForSystem, services } from 'src/app/app-navigation';
import { DxNavBarModule, DxButtonModule, DxMenuModule } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
@Component({
  selector: 'app-side-nav-outer-toolbar',
  templateUrl: './side-nav-outer-toolbar.component.html',
  styleUrls: ['./side-nav-outer-toolbar.component.scss']
})
export class SideNavOuterToolbarComponent implements OnInit {
  //menuItems = navigation;
  // menuItemsAfterLogin = navigationAfterLogin;
  // menuItemsBeforeLogin = navigationBeforeLogin;
  selectedRoute = '';

  menuOpened: boolean;
  temporaryMenuOpened = false;

  @Input()
  title: string;
  logo

  menuMode = 'shrink';
  menuRevealMode = 'expand';
  minMenuSize = 0;
  shaderEnabled = false;
  showSubmenuModes: any;
  showFirstSubmenuModes: any;
  isMobileResolution: boolean;
  menuItems: any;

  constructor(public loadingSwitchService:LoadingSwitchService,public loginService: LoginService, private screen: ScreenService, private router: Router) {
    if (window.location.pathname == '/home') {
      this.loginService.isHomePage=true;
     }
    this.showSubmenuModes = [{
      name: "onHover",
      delay: { show: 0, hide: 500 }
    }, {
      name: "onClick",
      delay: { show: 0, hide: 300 }
    }];
    this.showFirstSubmenuModes = this.showSubmenuModes[0];
    this.menuItems=services;
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
      if (StorageService.GetItem('Token') != undefined) {
        this.loginService.menuItems = navigationAfterLogin;
      }
      else {
        this.loginService.menuItems = navigationBeforeLogin;
      }
    } else {
      this.isMobileResolution = false;
      if (StorageService.GetItem('Token') != undefined) {
        this.loginService.menuItems = navigationAfterLoginForSystem;
      }
      else {
        this.loginService.menuItems = navigationBeforeLoginForSystem;
      }
    }
  }
  selectionChanged(e) {
    this.router.navigate([e.itemData.path]);
  }
  itemClick(data) {
    // if (data.itemData.path == '/registration-form'){
    //   if (StorageService.GetItem('Token') != undefined) {
    //     this.loadingSwitchService.title='Note';
    //     this.loadingSwitchService.popupVisible=true;
    //     this.loadingSwitchService.message='Please Logout, to Register with New UserID';
    //   }
    //   else{
    //     this.router.navigate([data.itemData.path]);
    //   }
    // }
    // else{
    //   this.router.navigate([data.itemData.path]);
    // }
    // this.loginService.isHomePage=false;
    // if (data.itemData.path == '/home'){
    //   this.loginService.isHomePage=true;
    // }
    this.router.navigate([data.itemData.path]);
  }
  ngOnInit() {
    this.menuOpened = this.screen.sizes['screen-large'];
    this.router.events.subscribe(val => {
      // if (val instanceof NavigationEnd) {
      //   this.selectedRoute = val.urlAfterRedirects.split('?')[0];
      // }
      if (StorageService.GetItem('Token') == undefined) {
        // this.router.navigate(['/login-form']);
        //this.selectedRoute = "/login-form";
      }
    });
    
    this.screen.changed.subscribe(() => this.updateDrawer());

    this.updateDrawer();
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.menuMode = isLarge ? 'shrink' : 'overlap';
    this.menuRevealMode = isXSmall ? 'slide' : 'expand';
    this.minMenuSize = isXSmall ? 0 : 60;
    this.shaderEnabled = !isLarge;
  }

  get hideMenuAfterNavigation() {
    return this.menuMode === 'overlap' || this.temporaryMenuOpened;
  }

  get showMenuAfterClick() {
    return !this.menuOpened;
  }

  navigationChanged(event) {
    const path = event.itemData.path;
    const pointerEvent = event.event;
    this.loginService.path = undefined;
    if (path && this.menuOpened) {
      if (event.node.selected) {
        pointerEvent.preventDefault();
      } else {
        this.router.navigate([path]);
      }

      if (this.hideMenuAfterNavigation) {
        this.temporaryMenuOpened = false;
        this.menuOpened = false;
        pointerEvent.stopPropagation();
      }
    } else {
      pointerEvent.preventDefault();
    }
  }

  navigationClick() {
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened = true;
      this.menuOpened = true;
    }
  }
  OnRegistrationform_Click() {
    this.router.navigate(["/registration-form"]);
  }
  OnLogin_Click() {
    this.router.navigate(["/login-form"]);
  }
  OnProfile_Click() {
    this.router.navigate(["/profile"]);
  }
}

@NgModule({
  imports: [SideNavigationMenuModule, DxButtonModule, DxMenuModule, DxDrawerModule, HeaderModule, DxScrollViewModule, CommonModule, DxNavBarModule],
  exports: [SideNavOuterToolbarComponent],
  declarations: [SideNavOuterToolbarComponent]
})
export class SideNavOuterToolbarModule { }
