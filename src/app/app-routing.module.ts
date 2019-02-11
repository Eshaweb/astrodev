import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { DxDataGridModule, DxFormModule, DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule, DxPopupModule, DxNumberBoxModule, DxResponsiveBoxModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AgmCoreModule } from '@agm/core';
import { NgxLoadingModule } from 'ngx-loading';
import { RegistrationFormComponent } from './shared/components/registration-form/registration-form/registration-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { EmailVerifyComponent } from './pages/email-verify/email-verify.component';
import { OfflinepaymentComponent } from './pages/offline-payment/offline-payment.component';
import { HoroscopeFreeDataComponent } from './pages/horoscope/horoscope-free-data/horoscope-free-data.component';
import { HoroscopeComponent } from './pages/horoscope/horoscope/horoscope.component';
//import { EventsModule } from 'angular4-events';

const routes: Routes = [
  { path: 'Verify', component: EmailVerifyComponent },
  {
    path:'offlinePayment', component:OfflinepaymentComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'registration-form',
    component: RegistrationFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'horoscope',
    component: HoroscopeComponent,
    //loadChildren: './pages/horoscope/horoscope.module#HoroscopeModule'
  },
  {
    path: 'horoscope/getHoroscopeFreeData',
    component: HoroscopeFreeDataComponent,
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
    path: 'wallet',
    loadChildren: './pages/wallet/wallet.module#WalletModule'
  },
  {
    path: 'purchase',
    loadChildren: './pages/purchase/purchase.module#PurchaseModule'
  },
  {
    path: '**',
    redirectTo: 'home',
    canActivate: [ AuthGuardService ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), 
    NgxLoadingModule.forRoot({}),
    //EventsModule.forRoot(),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0nx6AjTNNb24ZEnah5hRBqL0ehgrZ3es',
      libraries: ['places']
    }),
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    DxDataGridModule, DxFormModule,
    DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule,
    DxTextBoxModule, DxRadioGroupModule,
    DxPopupModule, DxNumberBoxModule,DxResponsiveBoxModule 
  ],  
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, 
    EmailVerifyComponent,  
    OfflinepaymentComponent,
    HoroscopeComponent,
    HoroscopeFreeDataComponent

  ]
})
export class AppRoutingModule { }
