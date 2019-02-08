import { Component, HostBinding } from '@angular/core';
import { ScreenService, AppInfoService, AuthenticationService } from './shared/services';
import { RegistrationService } from 'src/Services/registration/registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(public registrationService:RegistrationService,public authService: AuthenticationService, private screen: ScreenService, public appInfo: AppInfoService) { }

  isAutorized() {
    return this.authService.isLoggedIn;
  }
}
