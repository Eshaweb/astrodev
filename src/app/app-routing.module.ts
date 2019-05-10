import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { DxDataGridModule, DxFormModule, DxValidatorModule, DxButtonModule, DxValidationSummaryModule, DxDateBoxModule, DxSelectBoxModule, DxCheckBoxModule, DxTextBoxModule, DxRadioGroupModule, DxPopupModule, DxNumberBoxModule, DxResponsiveBoxModule, DxPopoverModule, DxListModule, DxMenuModule, DevExtremeModule, DxGalleryModule } from 'devextreme-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AgmCoreModule } from '@agm/core';
import { NgxLoadingModule } from 'ngx-loading';
import { RegistrationFormComponent } from './shared/components/registration-form/registration-form/registration-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { EmailVerifyComponent } from './pages/email-verify/email-verify.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './shared/components/pagenotfound/pagenotfound.component';
import { AuthGuard } from 'src/Services/auth/auth.guard';
import { ShareButtonsModule } from '@ngx-share/buttons';
//import { EventsModule } from 'angular4-events';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: 'Forgot', component:ForgotComponent },
  { path: 'Verify', component: EmailVerifyComponent },
  // {
  //   path: 'services',
  //   component: ServicesComponent,
  //   canActivate: [ AuthGuardService ]
  // },
 
  {
    path: 'horoscope',
    loadChildren: './pages/horoscope/horoscope.module#HoroscopeModule'
  },
  {
    path: 'registration/:id',
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
    path: 'staticpages',
    loadChildren: './pages/staticforms/staticforms.module#StaticFormsModule'
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
    path: 'products',
    loadChildren: './pages/product/product.module#ProductModule'
  },
  {
    path: 'muhurtha',
    loadChildren: './pages/muhurtha/muhurtha.module#MuhurthaModule'
  },
  {
    path: 'services',
    loadChildren: './pages/services/services.component#ServicesModule'
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
  
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent},
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
    FormsModule, ShareButtonsModule,
    //DevExtremeModule
    DxMenuModule, DxGalleryModule,
    DxDataGridModule, DxFormModule, DxPopoverModule,
    DxValidatorModule,DxButtonModule,DxValidationSummaryModule,
    DxDateBoxModule,DxSelectBoxModule,DxCheckBoxModule,
    DxTextBoxModule, DxRadioGroupModule,
    DxPopupModule, DxNumberBoxModule,DxResponsiveBoxModule, DxListModule
  ],  
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    //ServicesComponent, 
    ProfileComponent,
    EmailVerifyComponent, ForgotComponent,
    // SortingOrderHistoryPipe,
     HomeComponent,
    // HoroscopeComponent,
    // HoroscopeFreeDataComponent,
  ]
})
export class AppRoutingModule { }
