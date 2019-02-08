import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, LoginFormModule } from './shared/components';
import { AuthenticationService, ScreenService, AppInfoService } from './shared/services';
import { SocialUser, AuthService, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider, AuthServiceConfig } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { Service } from './shared/services/app.service';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
import { LoginService } from 'src/Services/login/login.service';
import { LoadingSwitchService } from 'src/Services/LoadingSwitchService/LoadingSwitchService';
import { PartyService } from 'src/Services/PartyService/PartyService';
import { RegistrationService } from 'src/Services/registration/registration.service';
import { AuthGuard } from 'src/Services/auth/auth.guard';
import { UIService } from 'src/Services/UIService/ui.service';
import { LoaderService } from 'src/Services/shared/loader.service';
import { SalesService } from 'src/Services/sales/sales.service';
import { WalletService } from 'src/Services/Wallet/WalletService';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/Services/auth/auth.interceptor';
import { APP_BASE_HREF } from '@angular/common';
import { ErrorService } from 'src/Services/Error/error.service';
import { HttpService, applicationHttpClientCreator } from 'src/Services/Error/http.service';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('589412237379-s95au712mktgn6o0d9ebocp824si3d0c.apps.googleusercontent.com')

  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1123555431133200")
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    LoginFormModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, 
    Service, AuthenticationService,
    HoroScopeService, MatchMakingService, LoginService, LoadingSwitchService,
    PartyService, RegistrationService, AuthGuard, HoroScopeService, UIService, RegistrationService, 
    LoaderService, SalesService, WalletService,
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    ErrorService,
    {
        provide: HttpService,
        useFactory: applicationHttpClientCreator,
        deps: [HttpClient, ErrorService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
