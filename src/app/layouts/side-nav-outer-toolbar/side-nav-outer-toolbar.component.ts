import { Component, OnInit, NgModule, Input } from '@angular/core';
import { SideNavigationMenuModule, HeaderModule, FooterModule, } from '../../shared/components';
import { ScreenService } from '../../shared/services';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { CommonModule } from '@angular/common';

import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
// import { navigation } from 'src/app/app-navigation';
import { navigationAfterLogin, navigationBeforeLogin, navigationAfterLoginForSystem, navigationBeforeLoginForSystem, services, serviceListAfterLogin, serviceListBeforeLogin, navigationAfterLoginForSystemForAdmin } from 'src/app/app-navigation';
import { DxNavBarModule, DxButtonModule, DxMenuModule } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { LoginService } from 'src/Services/LoginService/LoginService';
import { ItemService } from 'src/Services/ItemService/ItemService';
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
  menuMode = 'shrink';
  menuRevealMode = 'expand';
  minMenuSize = 0;
  shaderEnabled = false;
  showSubmenuModes: any;
  showFirstSubmenuModes: any;
  isMobileResolution: boolean;
  menuItems: any;
  serviceList:any;

  constructor(public loadingSwitchService:LoadingSwitchService,public loginService: LoginService, private screen: ScreenService, 
    private router: Router, public itemService:ItemService) {
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
    if (window.innerWidth < 900) {
      this.isMobileResolution = true;
      if (StorageService.GetItem('refreshToken') != undefined) {
        this.loginService.menuItems = navigationAfterLogin;
        if(StorageService.GetItem('isAdmin')=='true'){
          this.loginService.menuItems = navigationAfterLogin;
        }
      }
      else {
        this.loginService.menuItems = navigationBeforeLogin;
      }
    } else {
      this.isMobileResolution = false;
      if (StorageService.GetItem('refreshToken') != undefined) {
        this.loginService.menuItems = navigationAfterLoginForSystem;
        this.loginService.serviceList= serviceListAfterLogin;
        if(StorageService.GetItem('isAdmin')=='true'){
          this.loginService.menuItems = navigationAfterLoginForSystemForAdmin;
        }
      }
      else {
        this.loginService.menuItems = navigationBeforeLoginForSystem;
        this.loginService.serviceList= serviceListBeforeLogin;
      }
    }
  }
  selectionChanged(e) {
    this.router.navigate([e.itemData.path]);
  }

  itemClick(data) {
    this.router.navigate([data.itemData.path]);
  }

  ngOnInit() {
    this.menuOpened = this.screen.sizes['screen-large'];
    this.router.events.subscribe(val => {
      if (StorageService.GetItem('refreshToken') == undefined) {
        
      }
    });
    
    this.screen.changed.subscribe(() => this.updateDrawer());
    this.updateDrawer();
  }

  OnServiceClick(path){
    this.router.navigate([path]);
  }

  getActive(Path){
    if(window.location.pathname==Path){
      return 'active';
    }
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
  onBuyNowClick() {
      this.router.navigate(["/purchase/paidServices"]);
  }
  
}

@NgModule({
  imports: [SideNavigationMenuModule, DxButtonModule, DxMenuModule, DxDrawerModule, HeaderModule, DxScrollViewModule, CommonModule, DxNavBarModule, 
    FooterModule, RouterModule
  ],
  exports: [SideNavOuterToolbarComponent],
  declarations: [SideNavOuterToolbarComponent]
})
export class SideNavOuterToolbarModule { }
