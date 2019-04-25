import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaidservicesComponent } from './paidservices/paidservices.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentProcessingComponent } from './payment-processing/payment-processing.component';
import { AuthGuard } from 'src/Services/auth/auth.guard';

const routes: Routes = [
    {
      path: 'paidServices',
      component: PaidservicesComponent, canActivate: [AuthGuard]
    },
    {
      path: 'deliveryAddress',
      component:DeliveryAddressComponent, canActivate: [AuthGuard]
      //component:DeliveryAddressOldnewComponent
    },
    {
      path:'payment',
      component:PaymentComponent, canActivate: [AuthGuard]
    },
    // {
    //   path:'offlinePayment',
    //   component:OfflinepaymentComponent
    // },
    {
      path:'paymentProcessing',
      //component:DowloadedSuccesdfullyComponent
      component:PaymentProcessingComponent, canActivate: [AuthGuard]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PurchaseRoutingModule { }