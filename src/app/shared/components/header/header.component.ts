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

  constructor(public loginService:LoginService,public registrationService:RegistrationService,private router: Router, private authService: AuthenticationService) { 
    if(StorageService.GetItem('Token')!=undefined){
      this.loginService.userProfileVisible=true;
      this.loginService.Name=StorageService.GetItem('Name');
    }
    else{
      this.loginService.userProfileVisible=false;
    }
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule,
    //LoginFormModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
