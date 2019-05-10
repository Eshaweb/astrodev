import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TermsandConditionsComponent } from './termsand-conditions/termsand-conditions.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AuthGuard } from 'src/Services/auth/auth.guard';
import { OfflinepaymentComponent } from './offline-payment/offline-payment.component';


const routes: Routes = [
  { path: 'TandC', component: TermsandConditionsComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'privacy', component:PrivacyComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'offlinePayment', component:OfflinepaymentComponent, canActivate: [AuthGuard] },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class StaticFormsRoutingModule { }