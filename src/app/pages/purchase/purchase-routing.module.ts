import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaidservicesComponent } from './paidservices/paidservices.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentProcessingComponent } from './payment-processing/payment-processing.component';

const routes: Routes = [
    {
      path: 'paidServices',
      component: PaidservicesComponent,
    },
    {
      path: 'deliveryAddress',
      component:DeliveryAddressComponent
      //component:DeliveryAddressOldnewComponent
    },
    {
      path:'payment',
      component:PaymentComponent
    },
    // {
    //   path:'offlinePayment',
    //   component:OfflinepaymentComponent
    // },
    {
      path:'paymentProcessing',
      //component:DowloadedSuccesdfullyComponent
      component:PaymentProcessingComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PurchaseRoutingModule { }