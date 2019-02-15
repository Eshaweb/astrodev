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
import { RegistrationFormModule } from './shared/components/registration-form/registration-form.module';
import { PurchaseModule } from './pages/purchase/purchase.module';
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { NgxLoadingModule } from 'ngx-loading';
import { HoroscopeModule } from './pages/horoscope/horoscope.module';
import { WalletModule } from './pages/wallet/wallet.module';
import { DxPopupModule, DxButtonModule, DxLoadPanelModule, DevExtremeModule } from 'devextreme-angular';
import { AstamangalaModule } from './pages/astamangala/astamangala.module';
import { MatchMakingModule } from './pages/matchMaking/matchMaking.module';
import { AstamangalaService } from 'src/Services/AstamanglaService/AstamanglaService';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { NumerologyService } from 'src/Services/NumerologyService/NumerologyService';
import { PanchangaService } from 'src/Services/PanchangaService/PanchangaService';
import { NumerologyModule } from './pages/numerology/numerology.module';
import { OrderHistoryService } from 'src/Services/order';
import { StorageService } from 'src/Services/StorageService/Storage_Service';


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
    AppComponent,
  ],
  imports: [
    NgxLoadingModule.forRoot({}),
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    HoroscopeModule,
    AstamangalaModule,
    MatchMakingModule,
    NumerologyModule,
    WalletModule,
    LoginFormModule,
    RegistrationFormModule,
    //PurchaseModule,
    AppRoutingModule,
    HttpClientModule,
    DxPopupModule,
    DxButtonModule,
    DxLoadPanelModule,
    //DevExtremeModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, ItemService, PanchangaService,
    Service, AuthenticationService, CaptionDbService, OrderService, NumerologyService,
    HoroScopeService, MatchMakingService, LoginService, LoadingSwitchService,
    PartyService, RegistrationService, AuthGuard, AstamangalaService, UIService, RegistrationService, 
    LoaderService, SalesService, WalletService, OrderHistoryService, StorageService,
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
