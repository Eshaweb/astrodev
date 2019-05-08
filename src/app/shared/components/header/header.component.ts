import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationService } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { LoginFormComponent, LoginFormModule } from '../login-form/login-form.component';
import { navigationBeforeLogin, navigationAfterLogin, serviceMenusBeforeLogin, serviceMenusAfterLogin, serviceListBeforeLogin } from 'src/app/app-navigation';
import { DxMenuModule } from 'devextreme-angular';
import { LoginService } from 'src/Services/LoginService/LoginService';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title: string;

  userMenuItems = [{
    text: 'Profile',
    icon: 'user',
    onClick: () => {
      this.router.navigate(['/profile']);
    }
  }, {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      //this.authService.logOut();
      //StorageService.RemoveItem('Token');
      StorageService.RemoveItem('PartyMastId');
      this.storageService.RemoveDataFromSession();
      this.loginService.userProfileVisible=false;
      this.loginService.menuItems=navigationBeforeLogin;
      this.loginService.serviceMenus=serviceMenusBeforeLogin;
      this.loginService.serviceList=serviceListBeforeLogin;
      this.loginService.isAdmin=false;
      // this.authService.signOut().then(() => {
      //   window.location.assign('https://accounts.google.com/Logout');
      // });
      this.router.navigate(['/login-form']);
    }
  },
    // {
    //   text: 'Register',
    //   icon: 'runner',
    //   onClick: () => {
    //     this.registrationService.registered = true;
    //     this.router.navigate(['/registration-form']);
    //   }
    // }
  ];
  visible: boolean;
  isMobileResolution: boolean;
  showSubmenuModes: { name: string; delay: { show: number; hide: number; }; }[];
  showFirstSubmenuModes: { name: string; delay: { show: number; hide: number; }; };

  constructor(public storageService:StorageService,public loginService:LoginService,public registrationService:RegistrationService,
    private router: Router, private authenticationService: AuthenticationService, public authService: AuthService) { 
    if(StorageService.GetItem('refreshToken')!=undefined){
      this.loginService.userProfileVisible=true;
      this.loginService.Name=StorageService.GetItem('Name');
      this.loginService.serviceMenus=serviceMenusAfterLogin;
      if(StorageService.GetItem('isAdmin')=='true'){
        this.loginService.isAdmin=true;
      }
    }
    else{
      this.loginService.userProfileVisible=false;
      this.loginService.serviceMenus=serviceMenusBeforeLogin;
    }
    if (window.innerWidth < 900) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
    
    // if (StorageService.GetItem('Token') != undefined) {
    //   this.loginService.menuItems = navigationAfterLogin;
    // }
    // else {
    //   this.loginService.menuItems = navigationBeforeLogin;
    // }

    // this.showSubmenuModes = [{
    //   name: "onHover",
    //   delay: { show: 0, hide: 500 }
    // }, {
    //   name: "onClick",
    //   delay: { show: 0, hide: 300 }
    // }];
    // this.showFirstSubmenuModes = this.showSubmenuModes[0];

    //this.loginService.isHomePage=true;


    this.showSubmenuModes = [{
      name: "onHover",
      delay: { show: 0, hide: 500 }
    }, {
      name: "onClick",
      delay: { show: 0, hide: 300 }
    }];
    this.showFirstSubmenuModes = this.showSubmenuModes[0];
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
  onServicesClick(){
    this.loginService.isHomePage=false;
    this.router.navigate(['/services']);
  }
  onHomeClick(){
    this.loginService.isHomePage=true;
    this.router.navigate(['/home']);
  }
  onSettingsClick(){
    this.router.navigate(['/settings']);
  }
  onProfileClick(){
    this.router.navigate(['/profile']);
  }
  onAdminClick(){
    this.router.navigate(['/admin']);
  }
  onAboutUsClick(){
    this.router.navigate(['/staticpages/aboutus']);
  }
  onContactUsClick(){
    this.router.navigate(['/staticpages/contactus']);
  }
  OnLogin_click(){
    this.router.navigate(['/login-form']);
  }
  onProductsClick(){
    this.router.navigate(['/products']);
  }
  OnRegister_click(){
    this.router.navigate(['/registration/id']);
  }
  itemClick(data) {
    if (data.itemData.path == '/home'){
        this.loginService.isHomePage=true;
      }
      else{
        this.loginService.isHomePage=false;
      }
    this.router.navigate([data.itemData.path]);
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule,
    DxMenuModule
    //LoginFormModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
