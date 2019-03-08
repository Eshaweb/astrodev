import { Component, OnInit, NgModule, Input } from '@angular/core';
import { SideNavigationMenuModule, HeaderModule,  } from '../../shared/components';
import { ScreenService } from '../../shared/services';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { CommonModule } from '@angular/common';

import { navigation } from '../../app-navigation';
import { Router, NavigationEnd } from '@angular/router';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginService } from 'src/Services/login/login.service';

@Component({
  selector: 'app-side-nav-outer-toolbar',
  templateUrl: './side-nav-outer-toolbar.component.html',
  styleUrls: ['./side-nav-outer-toolbar.component.scss']
})
export class SideNavOuterToolbarComponent implements OnInit {
  menuItems = navigation;
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

  constructor(private loginService:LoginService,private screen: ScreenService, private router: Router) { }

  ngOnInit() {
    this.menuOpened = this.screen.sizes['screen-large'];
    this.router.events.subscribe(val => {
      // if (val instanceof NavigationEnd) {
      //   this.selectedRoute = val.urlAfterRedirects.split('?')[0];
      // }
      if(StorageService.GetItem('Token')==undefined){
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
    this.loginService.path=undefined;
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
}

@NgModule({
  imports: [ SideNavigationMenuModule, DxDrawerModule,HeaderModule, DxScrollViewModule, CommonModule ],
  exports: [ SideNavOuterToolbarComponent ],
  declarations: [ SideNavOuterToolbarComponent ]
})
export class SideNavOuterToolbarModule { }
