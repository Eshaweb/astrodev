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
import { LoginService } from 'src/Services/login/login.service';
import { navigationBeforeLogin, navigationAfterLogin, serviceMenus } from 'src/app/app-navigation';
import { DxMenuModule } from 'devextreme-angular';

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
      StorageService.RemoveItem('Token');
      StorageService.RemoveItem('PartyMastId');
      this.loginService.userProfileVisible=false;
      this.loginService.menuItems=navigationBeforeLogin;
      this.loginService.serviceMenus=serviceMenus;
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

  constructor(public loginService:LoginService,public registrationService:RegistrationService,private router: Router, private authService: AuthenticationService) { 
    if(StorageService.GetItem('Token')!=undefined){
      this.loginService.userProfileVisible=true;
      this.loginService.Name=StorageService.GetItem('Name');
    }
    else{
      this.loginService.userProfileVisible=false;
    }
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
    this.loginService.serviceMenus=serviceMenus;
    
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
  onHomeClick(event){
    this.loginService.isHomePage=true;
    this.router.navigate(['/home']);
  }
  onSettingsClick(event){
    this.router.navigate(['/settings']);
  }
  onProfileClick(event){
    this.router.navigate(['/profile']);
  }
  onAdminClick(event){
    this.router.navigate(['/admin']);
  }
  OnLogin_click(){
    this.router.navigate(['/login-form']);
  }
  OnRegister_click(){
    this.router.navigate(['/registration-form']);
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
