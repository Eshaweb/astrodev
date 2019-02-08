import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { DxDataGridModule, DxFormModule, DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AgmCoreModule } from '@agm/core';
import { NgxLoadingModule } from 'ngx-loading';
import { HoroscopeComponent } from './pages/horoscope/horoscope/horoscope.component';
import { FreeDataComponent } from './pages/horoscope/free-data/free-data.component';
import { RegistrationFormComponent } from './shared/components/registration-form/registration-form/registration-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { DownloadComponent } from './pages/download/download.component';
import { EmailVerifyComponent } from './pages/email-verify/email-verify.component';
import { OfflinePaymentComponent } from './pages/offline-payment/offline-payment.component';
//import { EventsModule } from 'angular4-events';

const routes: Routes = [
  {
    path: 'pages/offline-payment',
    component: OfflinePaymentComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/email-verify',
    component: EmailVerifyComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'pages/download',
    component: DownloadComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'horoscope',
    //component: HoroscopeComponent,
    loadChildren: './pages/horoscope/horoscope.module#HoroscopeModule'
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
    path: 'purchase',
    loadChildren: './pages/purchase/purchase.module#PurchaseModule'
  },
  {
    path: '**',
    redirectTo: 'home',
    canActivate: [ AuthGuardService ]
  }
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
  ],  
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, DownloadComponent, EmailVerifyComponent, OfflinePaymentComponent,  
    //HoroscopeComponent,
    //FreeDataComponent

  ]
})
export class AppRoutingModule { }
