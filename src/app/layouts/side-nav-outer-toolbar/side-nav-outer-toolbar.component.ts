import { Component, OnInit, NgModule, Input } from '@angular/core';
import { SideNavigationMenuModule, HeaderModule, FooterModule, } from '../../shared/components';
import { ScreenService } from '../../shared/services';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { CommonModule } from '@angular/common';
import { interval, Observable, timer } from 'rxjs';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
// import { navigation } from 'src/app/app-navigation';
import { navigationAfterLogin, navigationBeforeLogin, navigationAfterLoginForSystem, navigationBeforeLoginForSystem, services, serviceListAfterLogin, serviceListBeforeLogin, navigationAfterLoginForSystemForAdmin } from 'src/app/app-navigation';
import { DxNavBarModule, DxButtonModule, DxMenuModule } from 'devextreme-angular';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { LoginService } from 'src/Services/LoginService/LoginService';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { OrderService } from '../../../Services/OrderService/OrderService';
import { HoroScopeService } from '../../../Services/HoroScopeService/HoroScopeService';
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
  buttonId: any;
  subscribe: import("f:/EshaWebTechnologies/Working folder/astrodev/node_modules/rxjs/internal/Subscription").Subscription;
  sub: any;
  timeExceeded: boolean = false;
  showSuccess: boolean;
  ItName: any;

  constructor(public loadingSwitchService:LoadingSwitchService,public loginService: LoginService, private screen: ScreenService, 
    private router: Router, public itemService:ItemService, public orderService:OrderService, public storageService:StorageService,
  public horoScopeService:HoroScopeService) {
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
  
  onDownloadClick() {
    if (StorageService.GetItem('ItActId') == '#BN') {
      this.loadingSwitchService.loading=true;
      var FreeReport = {
        OrderId:null,
        PartyMastId:StorageService.GetItem('PartyMastId'),
        JSONData:JSON.stringify(this.storageService.GetHoroRequest('#BN')),
        ItActId:StorageService.GetItem('ItActId'),
        ItMastId:"#BNF"
      }
      this.orderService.OrderFreeReport(FreeReport).subscribe((data: any) => {
        var OrderId = data.OrderId;
        this.orderService.CheckForResult(data.OrderId).subscribe((data) => {
          if (data.AstroReportId.length != 0) {
            this.buttonId = data.AstroReportId[0].split('_')[0];
            this.ItName=data.AstroReportId[0].split('_')[1];
            this.DownloadResult(this.buttonId);
          }
          else {
            const source = timer(1000, 1000);
            this.subscribe = source.subscribe(val => {
              if (val == 30) {
                //this.loadPanel.visible = false;
                this.loadingSwitchService.loading= false;
                this.sub.unsubscribe();
                this.subscribe.unsubscribe();
                this.timeExceeded = true;
              }
            });
            this.sub = interval(10000).subscribe((val) => {
              // this.orderService.CheckForResult(this.orderService.orderResponse.OrderId).subscribe((data) => {
              this.orderService.CheckForResult(OrderId).subscribe((data) => {
                if (data.AstroReportId.length != 0) {
                  this.buttonId = data.AstroReportId[0].split('_')[0];
                  this.DownloadResult(this.buttonId);
                }
              });
            });
          }
        });
      });
    }
    else if (StorageService.GetItem('ItActId') == '#PMGD') {

    }
  }
  DownloadResult(buttonId) {
    //this.horoScopeService.DownloadResult(buttonId, (data) => {
    this.horoScopeService.DownloadResult(buttonId).subscribe((data:any)=> {
      var newBlob = new Blob([data], { type: "application/pdf" });
      // const fileName: string = this.orderService.orderResponse.ItName+'.pdf';
      const fileName: string = this.ItName + '.pdf';
      const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
      var url = window.URL.createObjectURL(newBlob);
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      //this.loading = false;
      this.showSuccess = true;
      //this.clearParameters();
      this.storageService.RemoveDataFromSession();
      //this.loadPanel.visible = false;
      this.loadingSwitchService.loading= false;
      this.sub.unsubscribe();
      this.subscribe.unsubscribe();
      console.clear();
    });
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
