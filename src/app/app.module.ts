import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, HeaderModule, LoginFormModule } from './shared/components';
import { AuthenticationService, ScreenService, AppInfoService } from './shared/services';
import { SocialUser, AuthService, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider, AuthServiceConfig } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { Service } from './shared/services/app.service';
import { HoroScopeService } from 'src/Services/HoroScopeService/HoroScopeService';
import { MatchMakingService } from 'src/Services/MatchMakingService/MatchMakingService';
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
import { CaptionDbService } from 'src/Services/CaptionService/captionDb.service';
import { NgxLoadingModule } from 'ngx-loading';
import { DxPopupModule, DxButtonModule, DxLoadPanelModule, DxGalleryModule, DxTextBoxModule } from 'devextreme-angular';
import { AstamangalaService } from 'src/Services/AstamanglaService/AstamanglaService';
import { ItemService } from 'src/Services/ItemService/ItemService';
import { OrderService } from 'src/Services/OrderService/OrderService';
import { NumerologyService } from 'src/Services/NumerologyService/NumerologyService';
import { PanchangaService } from 'src/Services/PanchangaService/PanchangaService';
import { StorageService } from 'src/Services/StorageService/Storage_Service';
import { MuhurthaService } from 'src/Services/MuhoorthaService/MuhoorthaService';
import { PanchaPakshiService } from 'src/Services/PanchaPakshiService/PanchaPakshiService';
import { ConfigerationService } from 'src/Services/ConfigerationService/ConfigerationService';
import { OrderHistoryService } from 'src/Services/OrderHistoryService/OrderHistoryService';
import { AdminService } from 'src/Services/AdminService/AdminService';
import { LoginService } from 'src/Services/LoginService/LoginService';
//import { ProductComponent } from './pages/product/product.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ProductService } from 'src/Services/ProductService/ProductService';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { RazorPayService } from 'src/Services/RazorPayService/RazorPayService';
import {ConnectionServiceModule, ConnectionServiceOptions, ConnectionServiceOptionsToken} from 'ng-connection-service';
import { UpdateService } from 'src/Services/update.service';
import { VersionCheckService } from 'src/Services/version-check.service';
import { BabyNamingService } from 'src/Services/BabyNamingService/BabyNamingService';
import { PrathamartavaService } from '../Services/PrathamartavaService/PrathamartavaService';
import { KaaliDrushtiService } from 'src/Services/KaaliDrushtiService/KaaliDrushtiService';
import { ShraddhaMaasikaService } from 'src/Services/ShraddhaMaasikaService/ShraddhaMaasikaService';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(LoginService.Google_client_Id)
    
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(LoginService.Facebook_client_Id)
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
    //NgxLoadingModule.forRoot({}),
    BrowserModule,
    SideNavOuterToolbarModule,
    //SingleCardModule,
    FooterModule,
    ConnectionServiceModule,
    //LoginFormModule,
    //RegistrationFormModule,
    AppRoutingModule,
    HttpClientModule,
    DxPopupModule,
    DxButtonModule,
    DxLoadPanelModule,ShareButtonsModule,
    DxTextBoxModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    //DevExtremeModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, ItemService, PanchangaService, ConfigerationService,
    Service, AuthenticationService, CaptionDbService, OrderService, NumerologyService, PanchaPakshiService,
    HoroScopeService, MatchMakingService, LoginService, LoadingSwitchService, MuhurthaService,
    PartyService, RegistrationService, AuthGuard, AstamangalaService, UIService, RegistrationService, 
    LoaderService, SalesService, WalletService, OrderHistoryService, StorageService, AdminService,
    ProductService, BabyNamingService, PrathamartavaService, KaaliDrushtiService, ShraddhaMaasikaService,
    RazorPayService, UpdateService,
    VersionCheckService,
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
    {
      provide: ConnectionServiceOptionsToken,
      useValue: <ConnectionServiceOptions>{
        enableHeartbeat: false,
        heartbeatUrl: '/assets/ping.json',
        requestMethod: 'get',
        heartbeatInterval: 3000
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
