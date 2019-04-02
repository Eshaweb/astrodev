import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { DxDataGridModule, DxFormModule, DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule, DxPopupModule, DxNumberBoxModule, DxResponsiveBoxModule, DxPopoverModule, DxListModule, DxMenuModule, DevExtremeModule } from 'devextreme-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AgmCoreModule } from '@agm/core';
import { NgxLoadingModule } from 'ngx-loading';
import { RegistrationFormComponent } from './shared/components/registration-form/registration-form/registration-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { EmailVerifyComponent } from './pages/email-verify/email-verify.component';
import { OfflinepaymentComponent } from './pages/offline-payment/offline-payment.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { HomeComponent } from './pages/home/home.component';
import { TermsandConditionsComponent } from './pages/termsand-conditions/termsand-conditions.component';
import { DisclaimerComponent } from './pages/disclaimer/disclaimer.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { ProductComponent } from './pages/product/product.component';
//import { EventsModule } from 'angular4-events';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'Forgot', component:ForgotComponent },
  { path: 'Verify', component: EmailVerifyComponent },
  { path: 'TandC', component: TermsandConditionsComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'privacy', component:PrivacyComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'products', component: ProductComponent },
  {
    path:'offlinePayment', component:OfflinepaymentComponent
  },
  {
    path: 'services',
    component: ServicesComponent,
    canActivate: [ AuthGuardService ]
  },
  // {
  //   path: 'login-form',
  //   component: LoginFormComponent, 
  //   canActivate: [ AuthGuardService ]
  // },
  // {
  //   path: 'registration-form',
  //   component: RegistrationFormComponent,
  //   canActivate: [ AuthGuardService ]
  // },
  
  {
    path: 'horoscope',
    //component: HoroscopeComponent,
    loadChildren: './pages/horoscope/horoscope.module#HoroscopeModule'
  },
  {
    path: 'registration-form',
    loadChildren: './shared/components/registration-form/registration-form.module#RegistrationFormModule'
  },
  {
    path: 'login-form',
    loadChildren: './shared/components/login-form/login-form.component#LoginFormModule'
  },
  {
    path: 'astamangala',
    loadChildren: './pages/astamangala/astamangala.module#AstamangalaModule'
  },
  {
    path: 'matchMaking',
    loadChildren: './pages/matchMaking/matchMaking.module#MatchMakingModule'
  },
  {
    path: 'numerology',
    loadChildren: './pages/numerology/numerology.module#NumerologyModule'
  },
  {
    path: 'panchanga',
    loadChildren: './pages/panchanga/panchanga.module#PanchangaModule'
  },
  {
    path: 'muhurtha',
    loadChildren: './pages/muhurtha/muhurtha.module#MuhurthaModule'
  },
  {
    path: 'settings',
    loadChildren: './pages/settings/settings.module#SettingsModule'
  },
  {
    path: 'wallet',
    loadChildren: './pages/wallet/wallet.module#WalletModule'
  },
  {
    path: 'purchase',
    loadChildren: './pages/purchase/purchase.module#PurchaseModule'
  },
  // {
  //   path: 'panchapakshi',
  //   loadChildren: './pages/panchapakshi/panchapakshi.module#PanchapakshiModule'
  // },
  {
    path: 'admin',
    loadChildren: './pages/admin/admin.module#AdminModule'
  },
  { path: '**', redirectTo: 'home',canActivate: [ AuthGuardService ]},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // {
    //   preloadingStrategy: PreloadAllModules
    // }
    ), 
    //NgxLoadingModule.forRoot({}),
    //EventsModule.forRoot(),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es',
      libraries: ['places']
    }),
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    DevExtremeModule
    // DxMenuModule,
    // DxDataGridModule, DxFormModule, DxPopoverModule,
    // DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    // DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule,
    // DxTextBoxModule, DxRadioGroupModule,
    // DxPopupModule, DxNumberBoxModule,DxResponsiveBoxModule, DxListModule
  ],  
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [ServicesComponent, ProfileComponent,
    EmailVerifyComponent, ForgotComponent,
    // SortingOrderHistoryPipe,
    OfflinepaymentComponent, HomeComponent,
    // HoroscopeComponent,
    // HoroscopeFreeDataComponent,
  ]
})
export class AppRoutingModule { }
